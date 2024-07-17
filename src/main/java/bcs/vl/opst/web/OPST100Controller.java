package bcs.vl.opst.web;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.xml.ws.Response;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;

import bcs.vl.comm.service.COMM100Service;
import bcs.vl.lgin.VO.LGIN000VO;
import bcs.vl.opst.VO.OPST100VO;
import bcs.vl.opst.service.OPST100Service;
import bcs.vl.sysm.VO.SYSM100VO;
import bcs.vl.sysm.VO.SYSM200VO;
import bcs.vl.sysm.service.SYSM100Service;
import bcs.vl.sysm.service.SYSM200Service;
import bcs.vl.util.com.ComnFun;
import bcs.vl.util.json.JsonUtil;
/***********************************************************************************************
* Program Name : 사용 이력 Controller
* Creator      : dwson
* Create Date  : 2024.02.14
* Description  : 사용 이력
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.02.14     dwson            최초생성
************************************************************************************************/
@RestController
@RequestMapping("/opst/*")
public class OPST100Controller {
	
	@Resource(name = "OPST100Service")
	private OPST100Service opst100Service;
	
	@Resource(name = "SYSM100Service")
	private SYSM100Service sysm100Service;
	
	@Resource(name = "SYSM200Service")
	private SYSM200Service sysm200Service;
	
	@Resource(name = "COMM100Service")
	private COMM100Service COMM100Service;
	
	private String DATAFRMID = "OPST100T";
	private String REQMAPPING = "/opst";

	private static final Logger LOGGER = LoggerFactory.getLogger(OPST100Controller.class);

	private ObjectMapper objectMapper;

	public OPST100Controller(ObjectMapper objectMapper) {
		this.objectMapper = objectMapper;
	}

	/**
     * @Method Name : OPST100T
     * @작성일      : 2024.02.14
     * @작성자      : dwson
     * @변경이력    : 
     * @Method 설명 : opst/OPST100T 웹 페이지 열기
	 * @param       :  
	 * @return      : opst/OPST100T.jsp 
     */	
	@RequestMapping("/OPST100T")
	public ModelAndView OPST100T() {
		return new ModelAndView("opst/OPST100T");
	}	

	@RequestMapping(value = "/OPST100SEL01", method = RequestMethod.POST)
	public ModelAndView OPST100SEL01(ModelAndView mav, HttpServletRequest request, HttpSession session) throws Exception {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();

		JsonUtil jsonUtils = new JsonUtil();

		/* 로그 */
		String jsonStr = "";
		String resultType = "성공";
		String errorMsg = "";

		try {
			jsonStr = jsonUtils.readJsonBody(request);

			OPST100VO vo = this.objectMapper.readValue(jsonStr, OPST100VO.class);
			
			LGIN000VO sessionVo = (LGIN000VO) session.getAttribute("user");
			if(!ComnFun.isEmptyObj(sessionVo)) {
				if(!"00".equals(sessionVo.getUsrGrd()) && !"SYS".equals(sessionVo.getTenantPrefix())) {
					vo.setTenantPrefix(sessionVo.getTenantPrefix());
					vo.setSystemIdx(sessionVo.getSystemIdx());
					
					jsonStr = ToStringBuilder.reflectionToString(vo);
				}
			} else return null;

			List<OPST100VO> list = opst100Service.OPST100SEL01(vo);
			
		    resultMap.put("OPST100Info", this.objectMapper.writeValueAsString(list));

		    mav.addAllObjects(resultMap);
			mav.setStatus(HttpStatus.OK);
			mav.setViewName("jsonView");
		} catch(Exception e) {
		    LOGGER.error("["+e.getClass()+"] Exception : " + e.getMessage());
		    resultType = "실패";
			errorMsg = e.getMessage();
		} finally {
			COMM100Service.userLogInsert(DATAFRMID, REQMAPPING + "/OPST100SEL01", jsonStr, resultType, errorMsg, session);
		}

		mav.setViewName("jsonView");

        return mav;
	}
	
	/**
	 * @Method Name : OPST100SEL02
	 * @작성일      	: 2024.02.06
	 * @작성자      	: dwson
	 * @변경이력    	:
	 * @Method 설명 	: restful 시스템 조회
	 * @param       : ModelAndView
	 * @return      : ModelAndView HashMap
	 */
	@RequestMapping(value = "/OPST100SEL02", method = RequestMethod.POST)
	public ModelAndView OPST100SEL02(ModelAndView mav, HttpServletRequest request, HttpSession session) throws Exception {
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
			
			SYSM100VO vo = gson.fromJson(jsonStr, SYSM100VO.class);
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
			COMM100Service.userLogInsert(DATAFRMID, REQMAPPING + "/OPST100SEL02", jsonStr, resultType, errorMsg, session);
		}

		mav.setViewName("jsonView");

        return mav;
	}
	
	/**
	 * @Method Name : OPST100SEL03
	 * @작성일      	: 2024.02.13
	 * @작성자      	: dwson
	 * @변경이력    	:
	 * @Method 설명 	: restful 테넌트 조회
	 * @param       : ModelAndView
	 * @return      : ModelAndView HashMap
	 */
	@RequestMapping(value = "/OPST100SEL03", method = RequestMethod.POST)
	public ModelAndView OPST100SEL03(ModelAndView mav, HttpSession session, HttpServletRequest request) throws Exception {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		JsonUtil jsonUtils = new JsonUtil();
		Gson gson = new Gson();
		
		/* 로그 */
		String jsonStr = "";
		String resultType = "성공";
		String errorMsg = "";

		try {
			jsonStr = jsonUtils.readJsonBody(request);
			
			SYSM200VO vo = gson.fromJson(jsonStr, SYSM200VO.class);
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
			COMM100Service.userLogInsert(DATAFRMID, REQMAPPING + "/OPST100SEL03", jsonStr, resultType, errorMsg, session);
		}

		mav.setViewName("jsonView");

        return mav;
	}

	@PostMapping("/OPST100SEL04")
	public ResponseEntity<?> OPST100SEL04() throws Exception {
		List<?> list = opst100Service.OPST100SEL04();
		String json = this.objectMapper.writeValueAsString(list);
		return ResponseEntity.ok(json);
	}

}