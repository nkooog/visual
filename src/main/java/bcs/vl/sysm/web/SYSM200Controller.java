package bcs.vl.sysm.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import bcs.vl.comm.service.COMM100Service;
import bcs.vl.lgin.VO.LGIN000VO;
import bcs.vl.sysm.VO.SYSM100VO;
import bcs.vl.sysm.VO.SYSM200VO;
import bcs.vl.sysm.VO.SYSM210VO;
import bcs.vl.sysm.service.SYSM100Service;
import bcs.vl.sysm.service.SYSM200Service;
import bcs.vl.sysm.service.SYSM210Service;
import bcs.vl.util.com.ComnFun;
import bcs.vl.util.json.JsonUtil;
/***********************************************************************************************
* Program Name : 테넌트 관리 Main Controller
* Creator      : dwson
* Create Date  : 2024.02.05
* Description  : 테넌트 정보관리
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.02.05    dwson           최초생성
************************************************************************************************/
@RestController
@RequestMapping("/sysm/*")
public class SYSM200Controller {

	@Resource(name = "SYSM100Service")
	private SYSM100Service sysm100Service;
	
	@Resource(name = "SYSM200Service")
	private SYSM200Service sysm200Service;
	
	@Resource(name = "SYSM210Service")
	private SYSM210Service sysm210Service;
	
	@Resource(name = "COMM100Service")
	private COMM100Service COMM100Service;
	
	private String DATAFRMID = "SYSM200T";
	private String REQMAPPING = "/sysm";
	
	public String getDATAFRMID() {
		return DATAFRMID;
	}

	public String getREQMAPPING() {
		return REQMAPPING;
	}

	private static final Logger LOGGER = LoggerFactory.getLogger(SYSM200Controller.class);

	/**
	 * @Method Name : SYSM200T
	 * @작성일      : 2024.02.05
	 * @작성자      : dwson
	 * @변경이력    : 
	 * @Method 설명 : sysm/SYSM200T 웹 페이지 열기
	 * @param       :  
	 * @return      : sysm/SYSM200T.jsp 
	 */	
	@RequestMapping("/SYSM200T")
	public ModelAndView SYSM200T() {
		LOGGER.info("SYSM200T 페이지 열기");

	    ModelAndView mav = new ModelAndView("sysm/SYSM200T");
	    
	    try {
	    	// 시스템 목록 조회
	        SYSM100VO sysm100VO = new SYSM100VO();
	        sysm100VO.setSort(new ArrayList<Map<String,String>>() {{
	            add(new HashMap<String,String>() {{
	                put("column", "SystemName");
	                put("direction", "ASC");
	            }});
	        }});
	        List<SYSM100VO> SYSM100List = sysm100Service.SYSM100SEL01(sysm100VO);
	        
	        SYSM210VO sysm210VO = new SYSM210VO();
	        sysm210VO.setTenantGroupState("100");
	        List<SYSM210VO> SYSM210List = sysm210Service.SYSM210SEL01(sysm210VO);
	        
	        mav.addObject("SYSM100Info", SYSM100List);
	        mav.addObject("SYSM210Info", SYSM210List);
	    } catch(Exception e) {
	        LOGGER.error("["+e.getClass()+"] Exception : " + e.getMessage());
	    }
	    
	    return mav;
	}
	
	@RequestMapping(value = "/SYSM200SEL01", method = RequestMethod.POST)
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

			List<SYSM200VO> list = sysm200Service.SYSM200SEL01(gson.fromJson(jsonStr, SYSM200VO.class));
			
		    resultMap.put("SYSM200Info", objectMapper.writeValueAsString(list));

		    mav.addAllObjects(resultMap);
			mav.setStatus(HttpStatus.OK);
			mav.setViewName("jsonView");
		} catch(Exception e) {
		    LOGGER.error("["+e.getClass()+"] Exception : " + e.getMessage());
		    resultType = "실패";
			errorMsg = e.getMessage();
		} finally {
			COMM100Service.userLogInsert(DATAFRMID, REQMAPPING + "/SYSM200SEL01", jsonStr, resultType, errorMsg, session);
		}

		mav.setViewName("jsonView");

        return mav;
	}
	
	/**
	 * @Method Name : SYSM200INS01
	 * @작성일      : 2024.01.31
	 * @작성자      : dwson
	 * @변경이력    :
	 * @Method 설명 : 테넌트 등록
	 * @param       : ModelAndView
	 * @return : ModelAndView HashMap
	 */
	@RequestMapping(value = "/SYSM200INS01", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView SYSM200INS01(ModelAndView mav, HttpServletRequest request, HttpSession session) throws Exception {
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
			SYSM200VO vo = gson.fromJson(jsonObject, new TypeToken<SYSM200VO>(){}.getType());
			
			LGIN000VO sessionVo = (LGIN000VO) session.getAttribute("user");
			if(!ComnFun.isEmptyObj(sessionVo)) {
				vo.setRegrId(sessionVo.getOriginAgentId());
				vo.setLstCorprId(sessionVo.getOriginAgentId());
			} else return null;

			if(sysm200Service.SYSM200SEL02(vo) == 0) {
				int result = sysm200Service.SYSM200INS01(vo);

				sysm200Service.SYSM200INS06(vo);

				if(result == 0) {
					resultMap.put("msg", "등록을 실패하였습니다.");
				}
				resultMap.put("result", result);
			} else resultMap.put("msg", "이미 존재하는 TenantPrefix 입니다.");

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
			COMM100Service.userLogInsert(DATAFRMID, REQMAPPING + "/SYSM200INS01", jsonStr, resultType, errorMsg, session);
		}

		mav.addAllObjects(resultMap);
		mav.setStatus(HttpStatus.OK);
		mav.setViewName("jsonView");

		return mav;
	}
	
	/**
	 * @Method Name : SYSM200INS01
	 * @작성일      : 2024.01.31
	 * @작성자      : dwson
	 * @변경이력    :
	 * @Method 설명 : 테넌트 수정
	 * @param       : ModelAndView
	 * @return : ModelAndView HashMap
	 */
	@RequestMapping(value = "/SYSM200UPT01", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView SYSM200UPT01(ModelAndView mav, HttpServletRequest request, HttpSession session) throws Exception {
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
			SYSM200VO vo = gson.fromJson(jsonObject, new TypeToken<SYSM200VO>(){}.getType());
			
			LGIN000VO sessionVo = (LGIN000VO) session.getAttribute("user");
			if(!ComnFun.isEmptyObj(sessionVo)) {
				vo.setRegrId(sessionVo.getOriginAgentId());
				vo.setLstCorprId(sessionVo.getOriginAgentId());
			} else return null;

			int result = sysm200Service.SYSM200UPT01(vo);
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
			COMM100Service.userLogInsert(DATAFRMID, REQMAPPING + "/SYSM200UPT01", jsonStr, resultType, errorMsg, session);
		}

		mav.addAllObjects(resultMap);
		mav.setStatus(HttpStatus.OK);
		mav.setViewName("jsonView");
		return mav;
	}
	
	/**
	 * @Method Name : SYSM200SEL03
	 * @작성일      : 2022.01.10
	 * @작성자      : bykim
	 * @변경이력    : 
	 * @Method 설명 : 태넌트그룹별 목록조회
	 * @param       : HttpServletRequest Restful param
	 * @return      : ModelAndView HashMap
	 */    
	@RequestMapping(value ="/SYSM200SEL03", method = RequestMethod.POST)
	@ResponseBody    
	public ModelAndView SYSM200SEL03(ModelAndView mav, HttpServletRequest req, HttpSession session){
//		JsonUtil jsonUtils = new JsonUtil();
//		Gson gson = new Gson();
//		String jsonStr = "";

		try {
			
//			boolean check = true;
//			jsonStr = jsonUtils.readJsonBody(req);
//			JsonObject jsonObject = gson.fromJson(jsonStr, JsonObject.class);
//			SYSM200VO sysmVo = gson.fromJson(jsonObject, new TypeToken<SYSM200VO>(){}.getType());
//			if(sysmVo.getTenantPrefix() != null && !"".equals(sysmVo.getTenantPrefix()) && "SYS".equals(sysmVo.getTenantPrefix())) check = false;

			LGIN000VO sessionVo = (LGIN000VO) session.getAttribute("user");

			SYSM200VO vo = new SYSM200VO();
			String tenantPrefix = sessionVo.getTenantPrefix();
//			if(tenantPrefix != null && !"SYS".equals(tenantPrefix) && check) vo.setTenantPrefix(String.valueOf(sessionVo.getTenantPrefix()));
			if(tenantPrefix != null && !"SYS".equals(tenantPrefix))
			{
				if("00".equals(sessionVo.getOriginUsrGrd())) vo.setUsrGrd(sessionVo.getOriginUsrGrd());

				vo.setTenantPrefix(String.valueOf(sessionVo.getTenantPrefix()));
			}

			List<SYSM200VO> SYSM200VOInfo = sysm200Service.SYSM200SEL03(vo);

			ObjectMapper mapper = new ObjectMapper();
			String json = mapper.writeValueAsString(SYSM200VOInfo);

			HashMap<String, Object> hashMap = new HashMap<String, Object>();
			hashMap.put("SYSM200VOInfo", json);
			hashMap.put("SYSM200VOListCount", SYSM200VOInfo.size());

			hashMap.put("msg", "정상적으로 조회하였습니다.");
			mav.setStatus(HttpStatus.OK);
			mav.addAllObjects(hashMap);
			mav.setViewName("jsonView");

		}catch(Exception e) {
			LOGGER.error("["+e.getClass()+"] Exception : " + e.getMessage());
		}

		return mav;	
	}
}
