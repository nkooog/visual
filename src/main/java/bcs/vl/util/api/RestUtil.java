package bcs.vl.util.api;

import org.springframework.stereotype.Component;
import bcs.vl.util.RestFull.CustomRestTemplateBuilder;
import bcs.vl.util.json.JsonUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import java.nio.charset.StandardCharsets;
import org.springframework.web.client.HttpClientErrorException;

import java.io.IOException;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

/***********************************************************************************************
* Program Name : REST 통신 공통 모듈(RestUtil.java)
* Creator      : nyh
* Create Date  : 2024.03.18
* Description  : API 통신 공통 모듈
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.03.18     nyh            최초생성
************************************************************************************************/

@Component("RestUtil")
public class RestUtil {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(RestUtil.class);

	private String GetUrl(String url, String urlPaste){
		return  url + urlPaste;
	}

	private HttpHeaders getHttpHeaders(String hpropertiesApiKey) {
		HttpHeaders headers = new HttpHeaders();
		headers.set("Content-Type", "application/json");
		headers.set("Connection", "keep-alive");
		headers.setContentType(new MediaType("application","json",StandardCharsets.UTF_8));
		if(hpropertiesApiKey != null && !"".equals(hpropertiesApiKey)) headers.set("Authorization", hpropertiesApiKey);
		return headers;
	}

	public String CallHttpUrl(String transMethod, String url, String urlPaste, String hpropertiesApiKey, String hpropertiesCallServCd, String body) throws IOException {

		long sendTime =  System.currentTimeMillis();
		Timestamp reciveTime = null;
		String resultCd = "11";
		String result ="";
		String  sendQuery = "";

		if(body != null && !"".equals(body))
		{
			JSONObject obj = JsonUtil.parseJSONString(body);
			if(obj != null)
			{
				JSONObject infoObj = obj.get("info") != null ? (JSONObject) obj.get("info") : null;
				String tenantId = "";
				long unfyCntcHistNo = 0;
				String usrId = "";
				if(infoObj != null)
				{
					tenantId = infoObj.get("tenantId") != null ? (String) infoObj.get("tenantId") : null;
					unfyCntcHistNo = infoObj.get("unfyCntcHistNo")!=null ? (long) infoObj.get("unfyCntcHistNo") : 0;
					usrId = infoObj.get("usrId") != null ? (String) infoObj.get("usrId") : null;
				}

				try {

					if("POST".equals(transMethod))
					{
						sendQuery = ((JSONObject) obj.get("body")).toJSONString();
						LOGGER.debug(" RestUril >>>>>>>> " + sendQuery);
						
						result = new CustomRestTemplateBuilder()
								.build()
								.postForObject(GetUrl(url, urlPaste),new HttpEntity<>(sendQuery,getHttpHeaders(hpropertiesApiKey)),String.class);

					} else {

						sendQuery = mapToUrlParam((JSONObject)obj.get("body"), hpropertiesCallServCd);

						ResponseEntity<String> response = new CustomRestTemplateBuilder()
								.build()				
								.exchange(GetUrl(url, urlPaste)+"?"+sendQuery, HttpMethod.GET,new HttpEntity<>(getHttpHeaders(hpropertiesApiKey)),String.class);
						result = response.getBody();
					}
	
					reciveTime = new Timestamp(System.currentTimeMillis());
					resultCd = "10";
				}catch (HttpClientErrorException e) {
					LOGGER.info(e.toString());
					if(e.getStatusCode() == HttpStatus.FORBIDDEN){
						LOGGER.info(e.getResponseBodyAsString());
						result = e.getResponseBodyAsString();
					}else{
						throw new RuntimeException(e);
					}
				}catch (Exception e) {
					LOGGER.info(e.toString());
					throw new RuntimeException(e);
				} finally {
					LoggingInterFace(urlPaste, tenantId, unfyCntcHistNo, usrId, sendQuery, sendTime, reciveTime, resultCd, result);
				}
			}
		}

		return result;
	}

	public HashMap<String,Object> CallHttpUrlToMap(String transMethod, String url, String urlPaste, String hpropertiesApiKey, String hpropertiesCallServCd, String body) throws IOException {
		HashMap<String,Object> resutl = null;
		String re = this.CallHttpUrl(transMethod, url, urlPaste, hpropertiesApiKey, hpropertiesCallServCd, body);

		if(re != null && !"".equals(re)) resutl = new ObjectMapper().readValue(re, HashMap.class);

		return resutl;
	}

	public JSONObject CallHttpUrlToJSONObject(String transMethod, String url, String urlPaste, String hpropertiesApiKey, String hpropertiesCallServCd, String body) throws IOException {
		return JsonUtil.parseJSONString(this.CallHttpUrl(transMethod, url, urlPaste, hpropertiesApiKey, hpropertiesCallServCd, body));
	}

	private void LoggingInterFace(String urlPaste, String tenantId, long unfyCntcHistNo, String usrId, String sendQuery, long sendTime, Timestamp reciveTime, String resultCd, String result) {
//		if(!functionUrl.getHostTranDvCd().equals("0")){
//			HCOM100VO vo = new HCOM100VO();
//			vo.setTenantId(tenantId);
//			vo.setReqDt(new Date(sendTime)); //요청 일
//			vo.setHostTranDvCd(functionUrl.getHostTranDvCd());
//			vo.setTranId(functionUrl.getTranId());
//			vo.setUnfyCntcHistNo(unfyCntcHistNo);
//			vo.setTranReqUsrId(usrId);
//			vo.setReqTm(new Time(sendTime).toString().replaceAll(":","")); //요청 시간
//			vo.setRspsDtm(reciveTime); //응답일시 시간
//			vo.setTranRsltCd(resultCd);
//			vo.setTranReqMsg(sendQuery);
//			vo.setTranRsltMsg(result);
//
//			try{
//				HCOM100Service.HCOM100INS01(vo);
//			}catch(Exception e){
//				LOGGER.error("[" + e.getClass() + "] Exception : " + e.getMessage());
//			}
//		}
	}

	private String mapToUrlParam(JSONObject obj, String hpropertiesCallServCd) throws Exception {
		Map<String, Object> params = new ObjectMapper().readValue(obj.toString(), Map.class);
		StringBuilder paramData = new StringBuilder();
		for (Map.Entry<String, Object> param : params.entrySet()) {
			if (paramData.length() != 0) {
				paramData.append('&');
			}

			paramData.append(param.getKey())
					.append('=')
					.append(CheckValueTream(param));
		}
		paramData.append("&IN_SERVICEID=")
				 .append(hpropertiesCallServCd);

		return paramData.toString();
	}

	private String CheckValueTream(Map.Entry<String, Object> param){
		if(param.getKey() != null){
			if (param.getKey().equals("IN_ADDR1") || param.getKey().equals("IN_ADDR2")) { // 주소는 리플레이스 X
				if(param.getValue() != null) return param.getValue().toString();
				else return "";
			}else{
				if(param.getValue() != null) return param.getValue().toString().trim();
				else return "";
			}
		}else{
			return "";
		}

	}
}
