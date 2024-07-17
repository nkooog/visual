package bcs.vl.opmt.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import bcs.vl.comm.VO.COMM100VO;
import bcs.vl.comm.service.COMM100Service;
import bcs.vl.lgin.VO.LGIN000VO;
import bcs.vl.opmt.VO.OPMT100VO;
import bcs.vl.opmt.service.OPMT100Service;
import bcs.vl.sysm.VO.SYSM100VO;
import bcs.vl.sysm.VO.SYSM200VO;
import bcs.vl.sysm.service.SYSM100Service;
import bcs.vl.sysm.service.SYSM200Service;
import bcs.vl.util.com.ComnFun;
import bcs.vl.util.crypto.SHA256Crypt;
import bcs.vl.util.json.JsonUtil;
/***********************************************************************************************
* Program Name : 사용자 관리 Controller
* Creator      : dwson
* Create Date  : 2024.02.06
* Description  : 사용자 관리
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.02.06     dwson            최초생성
************************************************************************************************/
@RestController
@RequestMapping("/opmt/*")
public class OPMT100Controller {
	
	@Resource(name = "OPMT100Service")
	private OPMT100Service opmt100Service;
	
	@Resource(name = "SYSM100Service")
	private SYSM100Service sysm100Service;
	
	@Resource(name = "SYSM200Service")
	private SYSM200Service sysm200Service;
	
	@Resource(name = "COMM100Service")
	private COMM100Service COMM100Service;
	
	private String DATAFRMID = "OPMT100T";
	private String REQMAPPING = "/opmt";

	private static final Logger LOGGER = LoggerFactory.getLogger(OPMT100Controller.class);

    /**
     * @Method Name : OPMT100T
     * @작성일      : 2024.02.06
     * @작성자      : dwson
     * @변경이력    : 
     * @Method 설명 : opmt/OPMT100T 웹 페이지 열기
	 * @param       :  
	 * @return      : opmt/OPMT100T.jsp 
     */	
	@RequestMapping("/OPMT100T")
	public ModelAndView OPMT100T(HttpSession session) {
		LOGGER.info("OPMT100T 페이지 열기");
		
		ModelAndView mav = new ModelAndView("opmt/OPMT100T");
			    
	    try {
	    	// 시스템 목록 조회
	        SYSM100VO sysm100VO = new SYSM100VO();
	        List<SYSM100VO> SYSM100List;
	        List<COMM100VO> commCodeList = null;
	        
	        sysm100VO.setIsEnabledSystem("1");
	        sysm100VO.setIsEnabledTenant("1");
	        sysm100VO.setIsEnabled("1");
	        sysm100VO.setSort(new ArrayList<Map<String,String>>() {{
	            add(new HashMap<String,String>() {{
	                put("column", "SystemName");
	                put("direction", "ASC");
	            }});
	        }});
			
			LGIN000VO sessionVo = (LGIN000VO) session.getAttribute("user");
			if(!ComnFun.isEmptyObj(sessionVo)) {
				if(!"00".equals(sessionVo.getUsrGrd()) && !"SYS".equals(sessionVo.getTenantPrefix()))
				{
					sysm100VO.setTenantPrefix(sessionVo.getTenantPrefix());
					
					SYSM100List = sysm100Service.SYSM100SEL02(sysm100VO);
				}
				else
				{
					SYSM100List = sysm100Service.SYSM100SEL01(sysm100VO);
					
					// 시스템관리자 등급 조회
			        Map<String, Object> param = new HashMap<String, Object>();
		            List<String> codeList = new ArrayList<String>();
		        	codeList.add("MANAGERLVL");
		            param.put("CATEGORYListMap", codeList);
			        commCodeList = COMM100Service.COMM100SEL01(param);
				}
			} else return null;

	        mav.addObject("SYSM100Info", SYSM100List);
	        mav.addObject("LVLCdInfo", commCodeList);
	    } catch(Exception e) {
	        LOGGER.error("["+e.getClass()+"] Exception : " + e.getMessage());
	    }
	    
	    return mav;
	}	

	/**
	 * @Method Name : OPMT100SEL01
	 * @작성일      	: 2024.02.06
	 * @작성자      	: dwson
	 * @변경이력    	:
	 * @Method 설명 	: restful 사용자 조회
	 * @param       : ModelAndView
	 * @return      : ModelAndView HashMap
	 */
	@RequestMapping(value = "/OPMT100SEL01", method = RequestMethod.POST)
	public ModelAndView OPMT100SEL01(ModelAndView mav, HttpSession session, HttpServletRequest request) throws Exception {
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
			
			OPMT100VO vo = gson.fromJson(jsonStr, OPMT100VO.class);
			
			LGIN000VO sessionVo = (LGIN000VO) session.getAttribute("user");
			if(!ComnFun.isEmptyObj(sessionVo)) {
//				vo.setMyUsrGrd(sessionVo.getUsrGrd());
				if(!"00".equals(sessionVo.getUsrGrd()) && !"SYS".equals(sessionVo.getTenantPrefix())) {
					vo.setTenantPrefix(sessionVo.getTenantPrefix());
					vo.setSystemIdx(sessionVo.getSystemIdx());
					
					jsonStr = ToStringBuilder.reflectionToString(vo);
				}
			} else return null;

			List<OPMT100VO> list = opmt100Service.OPMT100SEL01(vo);
			
		    resultMap.put("OPMT100Info", objectMapper.writeValueAsString(list));

		    mav.addAllObjects(resultMap);
			mav.setStatus(HttpStatus.OK);
			mav.setViewName("jsonView");
		} catch(Exception e) {
		    LOGGER.error("["+e.getClass()+"] Exception : " + e.getMessage());
		    resultType = "실패";
			errorMsg = e.getMessage();
		} finally {
			COMM100Service.userLogInsert(DATAFRMID, REQMAPPING + "/OPMT100SEL01", jsonStr, resultType, errorMsg, session);
		}

		mav.setViewName("jsonView");

        return mav;
	}
	
	/**
	 * @Method Name : OPMT100INS01
	 * @작성일      : 2024.02.06
	 * @작성자      : dwson
	 * @변경이력    :
	 * @Method 설명 : 사용자 등록
	 * @param       : ModelAndView
	 * @return : ModelAndView HashMap
	 */
	@RequestMapping(value = "/OPMT100INS01", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView OPMT100INS01(ModelAndView mav, HttpServletRequest request, HttpSession session) throws Exception {
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
			OPMT100VO vo = gson.fromJson(jsonObject, new TypeToken<OPMT100VO>(){}.getType());
			
			LGIN000VO sessionVo = (LGIN000VO) session.getAttribute("user");
			if(!ComnFun.isEmptyObj(sessionVo)) {
				if(!"00".equals(sessionVo.getUsrGrd()) && !"SYS".equals(sessionVo.getTenantPrefix())) {
					vo.setTenantPrefix(sessionVo.getTenantPrefix());
					vo.setSystemIdx(sessionVo.getSystemIdx());
				}
				vo.setRegrId(sessionVo.getOriginAgentId());
				vo.setLstCorprId(sessionVo.getOriginAgentId());
				
				// 본인보다 높은 등급의 계정을 등록할 수 없도록
				if(Integer.parseInt(vo.getUsrGrd()) < Integer.parseInt(sessionVo.getUsrGrd())) {
					return null;
				}
				
			} else return null;

			if(opmt100Service.OPMT100SEL02(vo) == 0) {
				if(!"00".equals(vo.getUsrGrd()))
					vo.setUsrLvl(null);
				vo.setPassword(SHA256Crypt.encrypt(vo.getPassword()));
				int result = opmt100Service.OPMT100INS01(vo);
				if(result == 0) {
					resultMap.put("msg", "등록을 실패하였습니다.");
				}
				resultMap.put("result", result);
			} else resultMap.put("msg", "이미 존재하는 아이디입니다.");

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
			COMM100Service.userLogInsert(DATAFRMID, REQMAPPING + "/OPMT100INS01", jsonStr, resultType, errorMsg, session);
		}

		mav.addAllObjects(resultMap);
		mav.setStatus(HttpStatus.OK);
		mav.setViewName("jsonView");

		return mav;
	}
	
	/**
	 * @Method Name : OPMT100INS01
	 * @작성일      : 2024.02.06
	 * @작성자      : dwson
	 * @변경이력    :
	 * @Method 설명 : 사용자 수정
	 * @param       : ModelAndView
	 * @return : ModelAndView HashMap
	 */
	@RequestMapping(value = "/OPMT100UPT01", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView OPMT100UPT01(ModelAndView mav, HttpServletRequest request, HttpSession session) throws Exception {
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
			OPMT100VO vo = gson.fromJson(jsonObject, new TypeToken<OPMT100VO>(){}.getType());
			
			LGIN000VO sessionVo = (LGIN000VO) session.getAttribute("user");
			if(!ComnFun.isEmptyObj(sessionVo)) {
				if(!"00".equals(sessionVo.getUsrGrd()) && !"SYS".equals(sessionVo.getTenantPrefix())) {
					vo.setTenantPrefix(sessionVo.getTenantPrefix());
				}
				vo.setLstCorprId(sessionVo.getOriginAgentId());
				
				// 본인보다 높은 등급의 계정을 등록할 수 없도록
				if(Integer.parseInt(vo.getUsrGrd()) < Integer.parseInt(sessionVo.getUsrGrd())) {
					return null;
				}
				
				// 본인 계정정보 수정 불가
				if(sessionVo.getOriginTenantPrefix().equals(vo.getTenantPrefix()) && sessionVo.getOriginAgentId().equals(vo.getAgentId())) {
					return null;
				}
				
			} else return null;

			if(!"00".equals(vo.getUsrGrd()))
				vo.setUsrLvl(null);
			
			vo.setPassword(!ComnFun.isEmpty(vo.getPassword()) ? SHA256Crypt.encrypt(vo.getPassword()) : "");

			if(vo.getSystemIdx() == null){
				//SYS가 아니면 vo에 systemIdx가 넘어오지 않으니 유저 session에서 뽑아와야함.
				vo.setSystemIdx( sessionVo.getSystemIdx());
			}

			int result = opmt100Service.OPMT100UPT01(vo);
			if(result == 0) {
				resultMap.put("msg", "수정을 실패하였습니다.");
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
			COMM100Service.userLogInsert(DATAFRMID, REQMAPPING + "/OPMT100UPT01", jsonStr, resultType, errorMsg, session);
		}

		mav.addAllObjects(resultMap);
		mav.setStatus(HttpStatus.OK);
		mav.setViewName("jsonView");
		return mav;
	}
	
	/**
	 * @Method Name : OPMT100SEL03
	 * @작성일      	: 2024.02.06
	 * @작성자      	: dwson
	 * @변경이력    	:
	 * @Method 설명 	: restful 시스템 조회
	 * @param       : ModelAndView
	 * @return      : ModelAndView HashMap
	 */
	@RequestMapping(value = "/OPMT100SEL03", method = RequestMethod.POST)
	public ModelAndView OPMT100SEL03(ModelAndView mav, HttpServletRequest request, HttpSession session) throws Exception {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		ObjectMapper objectMapper = new ObjectMapper();
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
			
		    resultMap.put("SYSM100Info", objectMapper.writeValueAsString(list));

		    mav.addAllObjects(resultMap);
			mav.setStatus(HttpStatus.OK);
			mav.setViewName("jsonView");
		} catch(Exception e) {
		    LOGGER.error("["+e.getClass()+"] Exception : " + e.getMessage());
		    resultType = "실패";
			errorMsg = e.getMessage();
		} finally {
			COMM100Service.userLogInsert(DATAFRMID, REQMAPPING + "/OPMT100SEL03", jsonStr, resultType, errorMsg, session);
		}

		mav.setViewName("jsonView");

        return mav;
	}
	
	/**
	 * @Method Name : OPMT100SEL03
	 * @작성일      	: 2024.02.13
	 * @작성자      	: dwson
	 * @변경이력    	:
	 * @Method 설명 	: restful 테넌트 조회
	 * @param       : ModelAndView
	 * @return      : ModelAndView HashMap
	 */
	@RequestMapping(value = "/OPMT100SEL04", method = RequestMethod.POST)
	public ModelAndView SYSM200SEL01(ModelAndView mav, HttpSession session, HttpServletRequest request) throws Exception {
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
			
			SYSM200VO vo = gson.fromJson(jsonStr, SYSM200VO.class);
			//vo.setIsEnabled("1");

			LGIN000VO sessionVo = (LGIN000VO) session.getAttribute("user");
			if(!ComnFun.isEmptyObj(sessionVo)) {
				if(!"00".equals(sessionVo.getUsrGrd()) && !"SYS".equals(sessionVo.getTenantPrefix()))
				{
					vo.setTenantPrefix(sessionVo.getTenantPrefix());
					vo.setSystemIdx(sessionVo.getSystemIdx());
				}
			} else return null;
			
			jsonStr = ToStringBuilder.reflectionToString(vo);

			List<SYSM200VO> list = sysm200Service.SYSM200SEL01(vo);
			
		    resultMap.put("SYSM200Info", objectMapper.writeValueAsString(list));

		    mav.addAllObjects(resultMap);
			mav.setStatus(HttpStatus.OK);
			mav.setViewName("jsonView");
		} catch(Exception e) {
		    LOGGER.error("["+e.getClass()+"] Exception : " + e.getMessage());
		    resultType = "실패";
			errorMsg = e.getMessage();
		} finally {
			COMM100Service.userLogInsert(DATAFRMID, REQMAPPING + "/OPMT100SEL04", jsonStr, resultType, errorMsg, session);
		}

		mav.setViewName("jsonView");

        return mav;
	}
}