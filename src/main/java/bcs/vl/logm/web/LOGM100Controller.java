package bcs.vl.logm.web;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import bcs.vl.opst.VO.OPST100VO;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;

import bcs.vl.comm.service.COMM100Service;
import bcs.vl.lgin.VO.LGIN000VO;
import bcs.vl.logm.VO.LOGM100VO;
import bcs.vl.logm.service.LOGM100Service;
import bcs.vl.sysm.VO.SYSM100VO;
import bcs.vl.sysm.VO.SYSM200VO;
import bcs.vl.sysm.service.SYSM100Service;
import bcs.vl.sysm.service.SYSM200Service;
import bcs.vl.util.com.ComnFun;
import bcs.vl.util.json.JsonUtil;
/***********************************************************************************************
* Program Name : 사용자 로그 Controller
* Creator      : dwson
* Create Date  : 2024.02.21
* Description  : 사용자 로그
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.02.21     dwson            최초생성
************************************************************************************************/
@RestController
@RequestMapping("/logm/*")
public class LOGM100Controller {
	
	@Resource(name = "LOGM100Service")
	private LOGM100Service logm100Service;
	
	@Resource(name = "SYSM100Service")
	private SYSM100Service sysm100Service;
	
	@Resource(name = "SYSM200Service")
	private SYSM200Service sysm200Service;
	
	@Resource(name = "COMM100Service")
	private COMM100Service COMM100Service;
	
	private String DATAFRMID = "LOGM100T";
	private String REQMAPPING = "/logm";

	private static final Logger LOGGER = LoggerFactory.getLogger(LOGM100Controller.class);

	private ObjectMapper objectMapper;

	public LOGM100Controller(ObjectMapper objectMapper) {
		this.objectMapper = objectMapper;
	}

	/**
     * @Method Name : LOGM100T
     * @작성일      : 2024.02.21
     * @작성자      : dwson
     * @변경이력    : 
     * @Method 설명 : logm/LOGM100T 웹 페이지 열기
	 * @param       :  
	 * @return      : logm/LOGM100T.jsp 
     */	
	@RequestMapping("/LOGM100T")
	public ModelAndView LOGM100T() {
		return new ModelAndView("logm/LOGM100T");
	}	

	@RequestMapping(value = "/LOGM100SEL01", method = RequestMethod.POST)
	public ModelAndView LOGM100SEL01(ModelAndView mav, HttpServletRequest request, HttpSession session) throws Exception {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		JsonUtil jsonUtils = new JsonUtil();
		Gson gson = new Gson();
		
		/* 로그 */
		String jsonStr = "";
		String resultType = "성공";
		String errorMsg = "";

		try {
			jsonStr = jsonUtils.readJsonBody(request);
			
			LOGM100VO vo = this.objectMapper.readValue(jsonStr, LOGM100VO.class);
			LGIN000VO sessionVo = (LGIN000VO) session.getAttribute("user");
			if(!ComnFun.isEmptyObj(sessionVo)) {
				if(!"00".equals(sessionVo.getUsrGrd())) {
					vo.setTenant(sessionVo.getTenantPrefix());
					vo.setSystemIdx(sessionVo.getSystemIdx());
					
					jsonStr = ToStringBuilder.reflectionToString(vo);
				}
			} else return null;

			List<LOGM100VO> list = logm100Service.LOGM100SEL01(vo);
			
		    resultMap.put("LOGM100Info", this.objectMapper.writeValueAsString(list));

		    mav.addAllObjects(resultMap);
			mav.setStatus(HttpStatus.OK);
			mav.setViewName("jsonView");
		} catch(Exception e) {
		    LOGGER.error("["+e.getClass()+"] Exception : " + e.getMessage());
		    resultType = "실패";
			errorMsg = e.getMessage();
		} finally {
			COMM100Service.userLogInsert(DATAFRMID, REQMAPPING + "/LOGM100SEL01", jsonStr, resultType, errorMsg, session);
		}

		mav.setViewName("jsonView");

        return mav;
	}
	
	/**
	 * @Method Name : LOGM100SEL02
	 * @작성일      	: 2024.02.06
	 * @작성자      	: dwson
	 * @변경이력    	:
	 * @Method 설명 	: restful 시스템 조회
	 * @param       : ModelAndView
	 * @return      : ModelAndView HashMap
	 */
	@RequestMapping(value = "/LOGM100SEL02", method = RequestMethod.POST)
	public ModelAndView LOGM100SEL02(ModelAndView mav, HttpServletRequest request, HttpSession session) throws Exception {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		JsonUtil jsonUtils = new JsonUtil();
		Gson gson = new Gson();
		
		/* 로그 */
		String jsonStr = "";
		String resultType = "성공";
		String errorMsg = "";

		try {
			List<SYSM100VO> list;
			jsonStr = jsonUtils.readJsonBody(request);

			SYSM100VO vo = this.objectMapper.readValue(jsonStr, SYSM100VO.class);
			vo.setIsEnabledSystem("1");
			vo.setIsEnabledTenant("1");
			vo.setIsEnabled("1");
			
			LGIN000VO sessionVo = (LGIN000VO) session.getAttribute("user");
			if(!ComnFun.isEmptyObj(sessionVo)) {
				if(!"00".equals(sessionVo.getUsrGrd()) && !"SYS".equals(sessionVo.getTenantPrefix()))
				{
					vo.setTenantPrefix(sessionVo.getTenantPrefix());
					vo.setSystemIdx(sessionVo.getSystemIdx());

					jsonStr = ToStringBuilder.reflectionToString(vo);
					
					list = sysm100Service.SYSM100SEL02(vo);
				}
				else
				{
					jsonStr = ToStringBuilder.reflectionToString(vo);
					
					list = sysm100Service.SYSM100SEL01(vo);
				}
			} else return null;
			
		    resultMap.put("SYSM100Info", this.objectMapper.writeValueAsString(list));

		    mav.addAllObjects(resultMap);
			mav.setStatus(HttpStatus.OK);
			mav.setViewName("jsonView");
		} catch(Exception e) {
		    LOGGER.error("["+e.getClass()+"] Exception : " + e.getMessage());
		    resultType = "실패";
			errorMsg = e.getMessage();
		} finally {
			COMM100Service.userLogInsert(DATAFRMID, REQMAPPING + "/LOGM100SEL02", jsonStr, resultType, errorMsg, session);
		}

		mav.setViewName("jsonView");

        return mav;
	}
	
	/**
	 * @Method Name : LOGM100SEL03
	 * @작성일      	: 2024.02.13
	 * @작성자      	: dwson
	 * @변경이력    	:
	 * @Method 설명 	: restful 테넌트 조회
	 * @param       : ModelAndView
	 * @return      : ModelAndView HashMap
	 */
	@RequestMapping(value = "/LOGM100SEL03", method = RequestMethod.POST)
	public ModelAndView LOGM100SEL03(ModelAndView mav, HttpSession session, HttpServletRequest request) throws Exception {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		JsonUtil jsonUtils = new JsonUtil();

		/* 로그 */
		String jsonStr = "";
		String resultType = "성공";
		String errorMsg = "";

		try {
			jsonStr = jsonUtils.readJsonBody(request);
			
			SYSM200VO vo = this.objectMapper.readValue(jsonStr, SYSM200VO.class);
			vo.setIsEnabled("1");
			
			LGIN000VO sessionVo = (LGIN000VO) session.getAttribute("user");
			if(!ComnFun.isEmptyObj(sessionVo)) {
				if(!"00".equals(sessionVo.getUsrGrd()) && !"SYS".equals(sessionVo.getTenantPrefix()))
				{
					vo.setTenantPrefix(sessionVo.getTenantPrefix());
					vo.setSystemIdx(sessionVo.getSystemIdx());
					
					jsonStr = ToStringBuilder.reflectionToString(vo);
				}
			} else return null;
			
			jsonStr = ToStringBuilder.reflectionToString(vo);

			List<SYSM200VO> list = sysm200Service.SYSM200SEL01(vo);
			
		    resultMap.put("SYSM200Info", this.objectMapper.writeValueAsString(list));

		    mav.addAllObjects(resultMap);
			mav.setStatus(HttpStatus.OK);
			mav.setViewName("jsonView");
		} catch(Exception e) {
		    LOGGER.error("["+e.getClass()+"] Exception : " + e.getMessage());
		    resultType = "실패";
			errorMsg = e.getMessage();
		} finally {
			COMM100Service.userLogInsert(DATAFRMID, REQMAPPING + "/LOGM100SEL03", jsonStr, resultType, errorMsg, session);
		}

		mav.setViewName("jsonView");

        return mav;
	}
}