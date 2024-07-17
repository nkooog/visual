package bcs.vl.aop.exona;

import bcs.vl.comm.service.COMM100Service;
import bcs.vl.lgin.VO.LGIN000VO;
import bcs.vl.util.prop.VisualProperties;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.log4j.Logger;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Aspect
@Component
public class ExonaTokenValidAOP {

	/**
	 * @Author : jypark
	 * @Date   : 2024. 3. 8
	 * @description : exona aop token 검증/발행 관련
	 */
	
	private Logger logger = Logger.getLogger(getClass());

	@Autowired
	private RestTemplate restTemplate;
	
	@Autowired
	private ObjectMapper objMapper;
	
	@Resource(name = "COMM100Service")
	private COMM100Service COMM100Service;
	private final String tokenType = "Bearer";

	@Before("@annotation(bcs.vl.annotation.ExonaAnnotation)")
	public void exonaTokenValid() throws Exception{

		HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
		HttpSession session = httpServletRequest.getSession();

		try {
			if( session != null ) {
				String currentTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
				LGIN000VO loginVO = (LGIN000VO) session.getAttribute("user");

				// 토큰이 세션에 없거나, 토큰이 만료되었을 경우 토큰 발급
				if( loginVO != null && (loginVO.getAccessToken() == null
						|| loginVO.getExpireDate().compareTo(currentTime) < 0) ) {


					JSONObject jsonObject = new JSONObject();

					jsonObject.put("Name", "Authentication");
					jsonObject.put("Method", "Get");

					JSONObject jsonParameter = new JSONObject();
					jsonParameter.put("ClientId", VisualProperties.getProperty("Globals.exona.clientId"));
					jsonParameter.put("ClientSecret", VisualProperties.getProperty("Globals.exona.clientSecret"));

					jsonObject.put("Parameter", jsonParameter);

					HttpHeaders headers = new HttpHeaders();
					headers.setContentType(MediaType.APPLICATION_JSON);

					HttpEntity<?> httpEntity = new HttpEntity<>(jsonObject.toJSONString(), headers);

					ResponseEntity<?> responseEntity = this.restTemplate.postForEntity(ExonaAPI.AUTH.getUrl(), httpEntity, String.class);

					logger.debug(responseEntity.getStatusCode());

					JsonNode rootNode;
					JsonNode resultNode;

					rootNode = objMapper.readTree(responseEntity.getBody().toString());
					resultNode = rootNode.get("Result");

					loginVO.setAccessToken(tokenType + " " + resultNode.get("AccessToken").asText());
					loginVO.setExpireDate(resultNode.get("ExpireDate").asText());

					session.setAttribute("user", loginVO);

				} else {
					logger.debug( " loginVO is null or token is not null [RequestURL :" + httpServletRequest.getServletPath() +"]");
				}
			}
		}catch (Exception ex) {
			ex.printStackTrace();
			throw ex;
		}
	}
	
	@AfterReturning(pointcut = "@annotation(bcs.vl.annotation.ExonaAnnotation)", returning = "returnValue")
	public void handleSuccess(JoinPoint joinPoint, Object returnValue) throws IOException {
		
		logger.debug(" @AfterReturning ");
		Object[] obj = joinPoint.getArgs();

		Arrays.stream(obj).forEach(e -> {
//				logger.debug(e.getClass());
		});
	}
	
	@AfterThrowing(pointcut = "@annotation(bcs.vl.annotation.ExonaAnnotation)", throwing = "ex")
	public void handleException(JoinPoint joinPoint, Exception ex) throws Exception {
		HttpStatusCodeException httpException = (HttpStatusCodeException) ex;
		int statusCode = httpException.getStatusCode().value();

		HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
		HttpServletResponse httpServletResponse = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getResponse();

		BufferedReader input = new BufferedReader(new InputStreamReader(httpServletRequest.getInputStream()));
        StringBuilder builder = new StringBuilder();
        String buffer;

        while ((buffer = input.readLine()) != null) {
            builder.append(buffer);
        }

		// logging
		COMM100Service.userLogInsert(getMethodValue(joinPoint).get("FrameID"), httpServletRequest.getServletPath() , builder.toString(), ResultType.FAIL.result, ex.toString(), httpServletRequest.getSession());

		logger.debug( " >>>>>>>>>>>>>> " + statusCode);

		if(httpServletResponse!=null) {
			httpServletResponse.setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);
			httpServletResponse.setStatus(statusCode);
		}
		throw ex;
	}
	
	public Map<String, String> getMethodValue(JoinPoint joinPoint) throws Exception {
		HashMap<String, String> map = new HashMap<String, String>();
		map.put("FrameID", joinPoint.getTarget().getClass().getDeclaredMethod(VisualProperties.getProperty("Globals.exona.FrameMethod"), new Class<?>[0]).invoke(joinPoint.getTarget()).toString());
		return map;
	}
	
	enum ResultType {
			FAIL("실패")
		,	SUC("성공");
		
		private ResultType(String result) {
			this.result = result;
		}

		private String result;
	}

}
