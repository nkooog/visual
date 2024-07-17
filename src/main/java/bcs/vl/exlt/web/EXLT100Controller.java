package bcs.vl.exlt.web;

import bcs.vl.annotation.ExonaAnnotation;
import bcs.vl.aop.exona.ExonaAPI;
import bcs.vl.lgin.VO.LGIN000VO;
import bcs.vl.util.api.ExonaApiList;
import bcs.vl.util.api.RestUtil;
import bcs.vl.util.json.JsonUtil;
import bcs.vl.util.prop.VisualProperties;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import egovframework.rte.fdl.property.EgovPropertyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.net.InetAddress;
import java.util.HashMap;

@RestController
@RequestMapping("/exlt/*")
public class EXLT100Controller {

	@Resource(name = "RestUtil")
	RestUtil restutil;

	@Resource(name = "EXONApropertiesService")
	EgovPropertyService propertiesService;

	private String DATAFRMID = "EXLT100T";
	private RestTemplate restTemplate;

	@Autowired
	private ObjectMapper objMapper;

	private static final Logger LOGGER = LoggerFactory.getLogger(EXLT100Controller.class);

	public EXLT100Controller(RestTemplate restTemplate) {
		this.restTemplate = restTemplate;
	}

	public String getDATAFRMID() {
		return this.DATAFRMID;
	}

	/**
	 * @Method Name : EXLT100T
	 * @작성일      	: 2024.03.21
	 * @작성자      	: nyh
	 * @변경이력    	:
	 * @Method 설명 	: EXLT/EXLT100T 웹 페이지 열기
	 * @param       :
	 * @return      : EXLT/EXLT100T.jsp
	 */
	@RequestMapping("/EXLT100T")
	public ModelAndView SYSM100T() {
		LOGGER.debug(" EXLT100T ");
		return new ModelAndView("exlt/EXLT100T");
	}

	@ExonaAnnotation
	@RequestMapping("/EXLT100TAPI")
	public ModelAndView EXLT100TAPI(ModelAndView mav, HttpSession session, @RequestBody String body) throws Exception{
		LOGGER.info(" EXLT100TAPI ");

		HashMap<String, Object> resultMap = new HashMap<>();

		try {
			// Rest 통신 호출
//			String body = new JsonUtil().readJsonBody(request);
//			String transMethod = "POST";
//			String url = propertiesService.getString("Url").toString();
//			String urlPaste = ExonaApiList.LiteCallGateStatistics.getUrlPaste();
//
			LGIN000VO loginVO = (LGIN000VO) session.getAttribute("user");
			String apiKey = loginVO.getAccessToken();
//
//			String callServCd = propertiesService.getString("CallServCd") != null ? propertiesService.getString("CallServCd").toString() : null;
//			JSONObject result = restutil.CallHttpUrlToJSONObject(transMethod, url, urlPaste, apiKey, callServCd, body);

			LOGGER.debug("body : " + body);

			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
			headers.set("Authorization", apiKey);

			HttpEntity entity = new HttpEntity(body, headers);
			ResponseEntity<String> response = this.restTemplate.postForEntity(VisualProperties.getProperty("Globals.exona.url") + ExonaApiList.LiteCallgateStatistics.getUrlPaste(), entity, String.class);

			resultMap.put("result", response.getBody());

			mav.setStatus(HttpStatus.OK);

		} catch (Exception e) {
			LOGGER.error("[" + e.getClass() + "] Exception : " + e.getMessage());
			throw e;
		}

		mav.addAllObjects(resultMap);
		mav.setViewName("jsonView");

		return mav;
	}

	/**
	 * @Method Name : EXLT110T
	 * @작성일      	: 2024.03.21
	 * @작성자      	: nyh
	 * @변경이력    	:
	 * @Method 설명 	: EXLT/EXLT110T 웹 페이지 열기
	 * @param       :
	 * @return      : EXLT/EXLT110T.jsp
	 */
	@RequestMapping({"/EXLT110T"})
	public ModelAndView EXLT110T() {
		LOGGER.debug(" EXLT110T ");
		return new ModelAndView("exlt/EXLT110T");
	}

	/**
	 * @Method Name : EXLT110TAPI
	 * @작성일 		: 2023.03.21
	 * @작성자 		: nyh
	 * @변경이력 		:
	 * @Method 설명 	:
	 * @param 		:
	 * @return 		:
	 */
	@ExonaAnnotation
	@RequestMapping("/EXLT110TAPI")
	public ModelAndView EXLT110TAPI(ModelAndView mav, HttpSession session, @RequestBody String body) throws Exception{
		LOGGER.info(" EXLT110TAPI ");

		HashMap<String, Object> resultMap = new HashMap<>();

		try {
			// Rest 통신 호출
//			String body = new JsonUtil().readJsonBody(request);


//			String transMethod = "POST";
//			String url = propertiesService.getString("Url").toString();
//			String urlPaste = ExonaApiList.LiteCallGate.getUrlPaste();

			LGIN000VO loginVO = (LGIN000VO) session.getAttribute("user");
			String apiKey = loginVO.getAccessToken();

//			String callServCd = propertiesService.getString("CallServCd") != null ? propertiesService.getString("CallServCd").toString() : null;
//			JSONObject result = restutil.CallHttpUrlToJSONObject(transMethod, url, urlPaste, apiKey, callServCd, body);

			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
			headers.set("Authorization", apiKey);

			HttpEntity entity = new HttpEntity(body, headers);
			ResponseEntity<String> response = this.restTemplate.postForEntity(VisualProperties.getProperty("Globals.exona.url") + ExonaApiList.LiteCallGate.getUrlPaste(), entity, String.class, new Object[0]);

			resultMap.put("result", response.getBody());

			mav.setStatus(HttpStatus.OK);

		} catch (Exception e) {
			LOGGER.error("[" + e.getClass() + "] Exception : " + e.getMessage());
			throw e;
		}

		mav.addAllObjects(resultMap);
		mav.setViewName("jsonView");

		return mav;
	}

	/**
	 * @Method Name : EXLT120T
	 * @작성일      	: 2024.03.21
	 * @작성자      	: nyh
	 * @변경이력    	:
	 * @Method 설명 	: EXLT/EXLT120T 웹 페이지 열기
	 * @param       :
	 * @return      : EXLT/EXLT120T.jsp
	 */
	@RequestMapping("/EXLT120T")
	public ModelAndView EXLT120T() {
		LOGGER.debug(" EXLT120T ");
		return new ModelAndView("exlt/EXLT120T");
	}

	@ExonaAnnotation()
	@RequestMapping({"/EXLT120TAPI"})
	public ModelAndView EXLT120TAPI(ModelAndView model, HttpSession session, HttpServletRequest request) throws Exception {
		LOGGER.info(" EXLT110TAPI " + VisualProperties.getProperty("Globals.exona.url"));
		HashMap<String, Object> resultMap = new HashMap();

		try {

			String body = new JsonUtil().readJsonBody(request);

			LOGGER.debug("body :" + body);

			LGIN000VO loginVO = (LGIN000VO)session.getAttribute("user");
			String apiKey = loginVO.getAccessToken();

			LOGGER.debug("Authorization : " + apiKey);

			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
			headers.set("Authorization", apiKey);

			HttpEntity entity = new HttpEntity(body, headers);
			ResponseEntity<String> response = this.restTemplate.postForEntity(VisualProperties.getProperty("Globals.exona.url") + ExonaApiList.LiteCallGate.getUrlPaste(), entity, String.class, new Object[0]);

			LOGGER.debug(response.getBody());

			resultMap.put("result", response);
			model.setStatus(response.getStatusCode());

		} catch (Exception e) {
			LOGGER.error("[" + e.getClass() + "] Exception : " + e.getMessage());
			throw e;
		}

		model.addAllObjects(resultMap);
		model.setViewName("jsonView");
		return model;
	}

	/**
	 * @Method Name : EXLT130T
	 * @작성일      	: 2024.03.21
	 * @작성자      	: nyh
	 * @변경이력    	:
	 * @Method 설명 	: EXLT/EXLT130T 웹 페이지 열기
	 * @param       :
	 * @return      : EXLT/EXLT130T.jsp
	 */
	@RequestMapping({"/EXLT130T"})
	public ModelAndView EXLT130T() {
		LOGGER.debug(" EXLT100T ");
		return new ModelAndView("exlt/EXLT130T");
	}

	@ExonaAnnotation
	@RequestMapping("/EXLT130TAPI")
	public ModelAndView EXLT130TAPI(ModelAndView mav, HttpSession session, HttpServletRequest request) throws Exception {
		LOGGER.info(" EXLT130TAPI ");

		HashMap<String, Object> resultMap = new HashMap<>();
		try {
			// Rest 통신 호출
			String body = new JsonUtil().readJsonBody(request);

			LOGGER.debug("body :" + body);

			final LGIN000VO loginVO = (LGIN000VO) session.getAttribute("user");
			final String apiKey = loginVO.getAccessToken();
			LOGGER.debug("Authorization : " + apiKey);

			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
			headers.set("Authorization", apiKey);

			HttpEntity entity = new HttpEntity(body, headers);
			ResponseEntity<String> response = this.restTemplate.postForEntity(VisualProperties.getProperty("Globals.exona.url") + ExonaApiList.LiteCallGate.getUrlPaste(), entity, String.class, new Object[0]);

			LOGGER.debug(response.getBody());

			resultMap.put("token", apiKey);
			resultMap.put("result", response.getBody());

			mav.addAllObjects(resultMap);

		} catch (Exception e) {
			LOGGER.error("[" + e.getClass() + "] Exception : " + e.getMessage());
			throw e;
		}

		mav.setStatus(HttpStatus.OK);
		mav.setViewName("jsonView");

		return mav;
	}

	@ExonaAnnotation
	@RequestMapping(value = {"/EXLT130T-srvc-number"}, produces = {"application/json; charset=utf8"})
	public ResponseEntity<String> EXLT130TService_Number(HttpSession session, HttpServletRequest request) throws Exception {

		String body = new JsonUtil().readJsonBody(request);
		LGIN000VO loginVO = (LGIN000VO)session.getAttribute("user");
		String apiKey = loginVO.getAccessToken();

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
		headers.set("Authorization", apiKey);

		if(VisualProperties.getProperty("Globals.exona.url") instanceof String) {
			LOGGER.debug("String Properties Value");
		}

		HttpEntity entity = new HttpEntity(body, headers);
		ResponseEntity<String> response = this.restTemplate.postForEntity(VisualProperties.getProperty("Globals.exona.url") + ExonaApiList.LiteCallGate.getUrlPaste(), entity, String.class, new Object[0]);
		LOGGER.debug(response.getBody().toString());
		return ResponseEntity.ok().body(response.getBody());
	}

	@ExonaAnnotation
	@RequestMapping(value = {"/EXLT130API/LiteCallUpdate"}, produces = {"application/json; charset=utf8"})
	public ResponseEntity<String> EXLT130_LiteCallUpdate(HttpSession session, HttpServletRequest request) throws Exception {

		String body = new JsonUtil().readJsonBody(request);
		LGIN000VO loginVO = (LGIN000VO)session.getAttribute("user");
		String apiKey = loginVO.getAccessToken();

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
		headers.set("Authorization", apiKey);

		HttpEntity entity = new HttpEntity(body, headers);
		ResponseEntity<String> response = this.restTemplate.postForEntity(VisualProperties.getProperty("Globals.exona.url") + ExonaApiList.LiteCallGate.getUrlPaste(), entity, String.class);
		LOGGER.debug(response.getBody().toString());

		return ResponseEntity.ok().body(response.getBody());
	}

	@ExonaAnnotation
	@RequestMapping({"/EXLT130TCallAPI"})
	public ResponseEntity<byte[]> EXLT130TCallAPI(HttpSession session, HttpServletRequest request) throws Exception {
		LOGGER.info(" EXLT130TAPI ");

		String body = new JsonUtil().readJsonBody(request);
		LGIN000VO loginVO = (LGIN000VO)session.getAttribute("user");
		String apiKey = loginVO.getAccessToken();

		LOGGER.debug(" token :" + apiKey);
		LOGGER.debug("body :" + body);

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set("Authorization", apiKey);

		HttpEntity entity = new HttpEntity(body, headers);

		ResponseEntity<byte[]> response = this.restTemplate.postForEntity(VisualProperties.getProperty("Globals.exona.url") + ExonaApiList.LiteCallRecord.getUrlPaste(), entity, byte[].class, new Object[0]);

		return ResponseEntity.ok().body(response.getBody());
	}

	/**
	 * @Method Name : EXLT140T
	 * @작성일      	: 2024.03.21
	 * @작성자      	: nyh
	 * @변경이력    	:
	 * @Method 설명 	: EXLT/EXLT140T 웹 페이지 열기
	 * @param       :
	 * @return      : EXLT/EXLT140T.jsp
	 */
	@RequestMapping({"/EXLT140T"})
	public ModelAndView EXLT140T() {
		LOGGER.debug(" EXLT100T ");
		return new ModelAndView("exlt/EXLT140T");
	}

	@RequestMapping("/EXLT140TAPI")
	public ModelAndView EXLT140TAPI(ModelAndView mav, HttpSession session, HttpServletRequest request) throws Exception {
		LOGGER.info(" EXLT140TAPI ");

		HashMap<String, Object> resultMap = new HashMap<>();
		try {

			String ip = request.getHeader("X-Forwarded-For");

			InetAddress inetAddress = InetAddress.getLocalHost();

			LOGGER.debug(" inetAddress.getHostAddress() :" + inetAddress.getHostAddress());
			LOGGER.debug(" requestip :" + request.getRemoteAddr());
			LOGGER.debug(" ####################### " + ip);

			if (ip == null) ip = request.getRemoteAddr();

			LOGGER.debug(" ####################### " + request.getRemoteAddr());
			LOGGER.debug(" ####################### " + ip);

			final String body= "{\n"
					+ "    \"Name\": \"Authentication\",\n"
					+ "    \"Method\": \"Get\",\n"
					+ "    \"Parameter\": {\n"
					+ "        \"ClientId\": \"" + VisualProperties.getProperty("Globals.exona.clientId") + "\",\n"
					+ "        \"ClientSecret\": \"" + VisualProperties.getProperty("Globals.exona.clientSecret") + "\",\n"
					+ "        \"RemoteIp\": \"" + ip + "\"\n"
					+ "    }\n"
					+ "}";

			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON);

			HttpEntity<?> httpEntity = new HttpEntity<>(body, headers);
			ResponseEntity<?> responseEntity = restTemplate.postForEntity(ExonaAPI.AUTH.getUrl(), httpEntity, String.class);

			JsonNode rootNode;
			JsonNode resultNode;

			rootNode = objMapper.readTree(responseEntity.getBody().toString());
			resultNode = rootNode.get("Result");

			resultMap.put("apiKey", "Bearer " + resultNode.get("AccessToken").asText());
			resultMap.put("apiUrl", ExonaAPI.WEBSOCKET_URL.getUrl());
			mav.addAllObjects(resultMap);
			mav.setStatus(HttpStatus.OK);
			mav.setViewName("jsonView");

		} catch (Exception e) {
			LOGGER.error("[" + e.getClass() + "] Exception : " + e.getMessage());
			throw e;
		}
		return mav;
	}
}
