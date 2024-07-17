package bcs.vl.sysm.web;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

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

import bcs.vl.comm.service.COMM100Service;
import bcs.vl.lgin.VO.LGIN000VO;
import bcs.vl.sysm.VO.SYSM210VO;
import bcs.vl.sysm.service.SYSM210Service;
import bcs.vl.util.json.JsonUtil;
/***********************************************************************************************
* Program Name : 태넌트 그룹 기본정보 Controller
* Creator      : yhnam
* Create Date  : 2024.02.05
* Description  : 태넌트 그룹 기본정보
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.02.05     yhnam           최초생성
************************************************************************************************/
@RestController
@RequestMapping("/sysm/*")
public class SYSM210Controller {

	@Resource(name = "SYSM210Service")
	private SYSM210Service SYSM210Service;
	
	/* 로그 */
	@Resource(name = "COMM100Service")
	private COMM100Service COMM100Service;
	
	private String DATAFRMID = "SYSM210T";
	private String REQMAPPING = "/sysm";

	private static final Logger LOGGER = LoggerFactory.getLogger(SYSM210Controller.class);

	/**
	 * @Method Name : SYSM210T
	 * @작성일      	: 2024.02.05
	 * @작성자      	: yhnam
	 * @변경이력    	: 
	 * @Method 설명 	: sysm/SYSM210T 웹 페이지 열기
	 * @param       :  
	 * @return      : sysm/SYSM210T.jsp 
	 */	
	@RequestMapping("/SYSM210T")
	public ModelAndView SYSM210T() {
		return new ModelAndView("sysm/SYSM210T");
	}
	
	/**
	 * @Method Name : SYSM210SEL01
	 * @작성일      	: 2024.02.05
	 * @작성자      	: yhnam
	 * @변경이력    	: 
	 * @Method 설명 	: 태넌트 그룹 목록조회
	 * @param       : HttpServletRequest Restful param
	 * @return      : ModelAndView HashMap
	 */    
	@RequestMapping(value ="/SYSM210SEL01", method = RequestMethod.POST)
	@ResponseBody    
	public ModelAndView SYSM210SEL01(ModelAndView mav, HttpServletRequest req, HttpSession session) throws Exception{

		HashMap<String, Object> hashMap = new HashMap<String, Object>();
		ObjectMapper mapper = new ObjectMapper();
		JsonUtil jsonUtils = new JsonUtil();
		Gson gson = new Gson();

		/* 로그 */
		String jsonStr = "";
		String resultType = "성공";
		String errorMsg = "";

		try {

			jsonStr = jsonUtils.readJsonBody(req);

			List<SYSM210VO> SYSM210VOInfo = SYSM210Service.SYSM210SEL01(gson.fromJson(jsonStr, SYSM210VO.class));
			String json = mapper.writeValueAsString(SYSM210VOInfo);

			hashMap.put("SYSM210VOInfo", json);
			hashMap.put("SYSM210VOListCount", SYSM210VOInfo.size());

			hashMap.put("msg", "정상적으로 조회하였습니다.");
			mav.setStatus(HttpStatus.OK);
			mav.addAllObjects(hashMap);
			mav.setViewName("jsonView");

		}catch(Exception e) {
			LOGGER.error("["+e.getClass()+"] Exception : " + e.getMessage());
			/* 로그 */
			resultType = "실패";
			errorMsg = e.getMessage();
		} finally {
			COMM100Service.userLogInsert(DATAFRMID, REQMAPPING + "/SYSM210SEL01", jsonStr, resultType, errorMsg, session);
		}

		return mav;	
	}
	
	/**
	 * @Method Name : SYSM210SEL02
	 * @작성일      	: 2024.02.05
	 * @작성자      	: yhnam
	 * @변경이력    	: 
	 * @Method 설명 	: 태넌트 목록조회
	 * @param       : HttpServletRequest Restful param
	 * @return      : ModelAndView HashMap
	 */    
	@RequestMapping(value ="/SYSM210SEL02", method = RequestMethod.POST)
	@ResponseBody    
	public ModelAndView SYSM210SEL02(ModelAndView mav, HttpServletRequest req, HttpSession session) throws Exception{

		HashMap<String, Object> hashMap = new HashMap<String, Object>();
		ObjectMapper mapper = new ObjectMapper();
		JsonUtil jsonUtils = new JsonUtil();
		Gson gson = new Gson();
		
		String jsonStr = "";
		String resultType = "성공";
		String errorMsg = "";

		try {

			jsonStr = jsonUtils.readJsonBody(req);

			List<SYSM210VO> SYSM210VOInfo = SYSM210Service.SYSM210SEL02(gson.fromJson(jsonStr, SYSM210VO.class));
			String json = mapper.writeValueAsString(SYSM210VOInfo);

			hashMap.put("SYSM210VOInfo", json);
			hashMap.put("SYSM210VOListCount", SYSM210VOInfo.size());

			hashMap.put("msg", "정상적으로 조회하였습니다.");
			mav.setStatus(HttpStatus.OK);
			mav.addAllObjects(hashMap);
			mav.setViewName("jsonView");

		}catch(Exception e) {
			LOGGER.error("["+e.getClass()+"] Exception : " + e.getMessage());
			resultType = "실패";
			errorMsg = e.getMessage();
		}finally {
			COMM100Service.userLogInsert(DATAFRMID, REQMAPPING + "/SYSM210SEL02", jsonStr, resultType, errorMsg, session);
		}

		return mav;	
	}
	
	/**
	 * @Method Name : SYSM210SAV01
	 * @작성일      	: 2024.02.05
	 * @작성자      	: yhnam
	 * @변경이력    	:
	 * @Method 설명 	: restful 메뉴 추가
	 * @param       : ModelAndView
	 * @return : ModelAndView HashMap
	 */
	@RequestMapping(value = "/SYSM210SAV01", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView SYSM210SAV01(ModelAndView mav, HttpServletRequest request, HttpSession session) throws Exception{
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		JsonUtil jsonUtils = new JsonUtil();
		Gson gson = new Gson();
		
		String jsonStr = "";
		String resultType = "성공";
		String errorMsg = "";

		try {
			jsonStr = jsonUtils.readJsonBody(request);
			JsonObject jsonObject = gson.fromJson(jsonStr, JsonObject.class);
			SYSM210VO SYSM210VO = gson.fromJson(jsonObject, new TypeToken<SYSM210VO>(){}.getType());

			resultMap.put("resultCode", "fail");
			resultMap.put("msg", "저장 실패하였습니다.");
			SYSM210VO checkVo = SYSM210Service.SYSM210SEL03(SYSM210VO);
			if(SYSM210VO.getTenantGroupIdKey().equals(SYSM210VO.getTenantGroupId()) || checkVo.getCount() == 0)
			{
				Integer rtn = 0;
				if(!"".equals(SYSM210VO.getTenantGroupIdKey()) && SYSM210VO.getTenantGroupIdKey() != null) {
					rtn = SYSM210Service.SYSM210UPT01(SYSM210VO);
					if (rtn > 0) SYSM210Service.SYSM210UPT02(SYSM210VO);
				}
				else SYSM210Service.SYSM210INS01(SYSM210VO);

				resultMap.put("resultCode", "success");
				resultMap.put("msg", "정상적으로 저장되었습니다.");
			} else resultMap.put("msg", "테넌트 그룹ID가 중복됩니다. 다시 입력하세요.");

			mav.addAllObjects(resultMap);
			mav.setStatus(HttpStatus.OK);
			mav.setViewName("jsonView");
		} catch (Exception e) {
			LOGGER.error("[" + e.getClass() + "] Exception : " + e.getMessage());
			resultType = "실패";
			errorMsg = e.getMessage();
		}finally {
			COMM100Service.userLogInsert(DATAFRMID, REQMAPPING + "/SYSM210SAV01", jsonStr, resultType, errorMsg, session);
		}

		return mav;
	}
}
