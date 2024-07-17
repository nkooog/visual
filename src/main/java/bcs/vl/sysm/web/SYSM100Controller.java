package bcs.vl.sysm.web;

import bcs.vl.comm.service.COMM100Service;
import bcs.vl.sysm.VO.SYSM100VO;
import bcs.vl.sysm.service.SYSM100Service;
import bcs.vl.util.json.JsonUtil;
import bcs.vl.util.prop.VisualProperties;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.*;
/***********************************************************************************************
* Program Name : 시스템 관리 Controller
* Creator      : dwson
* Create Date  : 2024.01.26
* Description  : 시스템 관리
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.26     dwson            최초생성
************************************************************************************************/
@RestController
@RequestMapping("/sysm/*")
public class SYSM100Controller {
	
	@Autowired
	MessageSource messageSource;

	@Resource(name = "SYSM100Service")
	private SYSM100Service sysm100Service;
	
	@Resource(name = "COMM100Service")
	private COMM100Service COMM100Service;

	private String DATAFRMID = "SYSM100T";
	private String REQMAPPING = "/sysm";

	public String getDATAFRMID() {
		return DATAFRMID;
	}

	public String getREQMAPPING() {
		return REQMAPPING;
	}

	private static final Logger LOGGER = LoggerFactory.getLogger(SYSM100Controller.class);

    /**
     * @Method Name : SYSM100T
     * @작성일      : 2024.01.26
     * @작성자      : dwson
     * @변경이력    : 
     * @Method 설명 : sysm/SYSM100T 웹 페이지 열기
	 * @param       :  
	 * @return      : sysm/SYSM100T.jsp 
     */	
	@RequestMapping("/SYSM100T")
	public ModelAndView SYSM100T() {
		LOGGER.debug(" SYSM100T ");
		return new ModelAndView("sysm/SYSM100T");
	}	

	/**
	 * @Method Name : SYSM100SEL01
	 * @작성일      	: 2024.01.26
	 * @작성자      	: dwson
	 * @변경이력    	:
	 * @Method 설명 	: restful 시스템 조회
	 * @param       : ModelAndView
	 * @return      : ModelAndView HashMap
	 */
	@RequestMapping(value = "/SYSM100SEL01", method = RequestMethod.POST)
	public ModelAndView SYSM100SEL01(ModelAndView mav, HttpServletRequest request, HttpSession session, Locale locale) throws Exception {
		LOGGER.debug(" SYSM100SEL01 Call ");
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		ObjectMapper objectMapper = new ObjectMapper();
		JsonUtil jsonUtils = new JsonUtil();
		Gson gson = new Gson();
		
		/* 로그 */
		String jsonStr = "";
		String resultType = "성공";
		String errorMsg = "";

		try {
			jsonStr = jsonUtils.readJsonBody(request);

			List<SYSM100VO> list = sysm100Service.SYSM100SEL01(gson.fromJson(jsonStr, SYSM100VO.class));
			
		    resultMap.put("SYSM100Info", objectMapper.writeValueAsString(list));
		    resultMap.put("msg", messageSource.getMessage("success.common.select", null, "success.common.select", locale));
			mav.setStatus(HttpStatus.OK);
			
		} catch(Exception e) {
		    LOGGER.error("["+e.getClass()+"] Exception : " + e.getMessage());
		    mav.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
		    
		    resultMap.put("msg", messageSource.getMessage("fail.request.msg", null, "fail.request.msg", locale));
		    resultMap.put("resultType", "");
		    resultType = "실패";
			errorMsg = e.getMessage();
		} finally {
			COMM100Service.userLogInsert(DATAFRMID, REQMAPPING + "/SYSM100SEL01", jsonStr, resultType, errorMsg, session);
		}
		
		mav.addAllObjects(resultMap);
		
		mav.setViewName("jsonView");

        return mav;
	}
	
	/**
	 * @Method Name : SYSM100INS01
	 * @작성일      : 2024.01.31
	 * @작성자      : dwson
	 * @변경이력    :
	 * @Method 설명 : 시스템 등록
	 * @param       : ModelAndView
	 * @return : ModelAndView HashMap
	 */
	@RequestMapping(value = "/SYSM100INS01", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView SYSM100INS01(ModelAndView mav, HttpServletRequest request, HttpSession session) throws Exception {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		JsonUtil jsonUtils = new JsonUtil();
		Gson gson = new Gson();
		
		/* 로그 */
		String jsonStr = "";
		String resultType = "성공";
		String errorMsg = "";
		
		try {
			jsonStr = jsonUtils.readJsonBody(request);
			JsonObject jsonObject = gson.fromJson(jsonStr, JsonObject.class);
			SYSM100VO vo = gson.fromJson(jsonObject, new TypeToken<SYSM100VO>(){}.getType());

			int result = sysm100Service.SYSM100INS01(vo);
			if(result == 0) {
				resultMap.put("msg", "등록을 실패하였습니다.");
			}
			resultMap.put("result", result);

			mav.addAllObjects(resultMap);
			mav.setStatus(HttpStatus.OK);
			mav.setViewName("jsonView");
		} catch (Exception e) {
			if(!Objects.equals(e, new RuntimeException())){
				LOGGER.error("[" + e.getClass() + "] Exception : " + e.getMessage());
				resultType = "실패";
				errorMsg = e.getMessage();
			}
			resultMap.put("result", "0");
			resultMap.put("msg", "Add failed : " + e.getMessage());
		} finally {
			COMM100Service.userLogInsert(DATAFRMID, REQMAPPING + "/SYSM100INS01", jsonStr, resultType, errorMsg, session);
		}

		return mav;
	}
	
	/**
	 * @Method Name : SYSM100UPT01
	 * @작성일      : 2024.01.31
	 * @작성자      : dwson
	 * @변경이력    :
	 * @Method 설명 : 시스템 수정
	 * @param       : ModelAndView
	 * @return : ModelAndView HashMap
	 */
	@RequestMapping(value = "/SYSM100UPT01", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView SYSM100UPT01(ModelAndView mav, HttpServletRequest request, HttpSession session) throws Exception {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		JsonUtil jsonUtils = new JsonUtil();
		Gson gson = new Gson();
		
		/* 로그 */
		String jsonStr = "";
		String resultType = "성공";
		String errorMsg = "";
		
		try {
			jsonStr = jsonUtils.readJsonBody(request);
			JsonObject jsonObject = gson.fromJson(jsonStr, JsonObject.class);
			SYSM100VO vo = gson.fromJson(jsonObject, new TypeToken<SYSM100VO>(){}.getType());
			
			int result = sysm100Service.SYSM100UPT01(vo);
			if(result == 0){
				resultMap.put("msg", "[ERROR] 수정을 실패하였습니다.");
			}
			resultMap.put("result", result);

			mav.addAllObjects(resultMap);
			mav.setStatus(HttpStatus.OK);
			mav.setViewName("jsonView");
		} catch (Exception e) {
			if(!Objects.equals(e, new RuntimeException())){
				LOGGER.error("[" + e.getClass() + "] Exception : " + e.getMessage());
				resultType = "실패";
				errorMsg = e.getMessage();
			}
			resultMap.put("result", "0");
			resultMap.put("msg", "Update failed : " + e.getMessage());
		} finally {
			COMM100Service.userLogInsert(DATAFRMID, REQMAPPING + "/SYSM100UPT01", jsonStr, resultType, errorMsg, session);
		}

		mav.addAllObjects(resultMap);
		mav.setStatus(HttpStatus.OK);
		mav.setViewName("jsonView");
		return mav;
	}

}