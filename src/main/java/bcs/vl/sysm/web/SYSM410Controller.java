package bcs.vl.sysm.web;

import java.util.ArrayList;
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
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import bcs.vl.comm.service.COMM100Service;
import bcs.vl.sysm.VO.SYSM410VO;
import bcs.vl.sysm.service.SYSM410Service;
import bcs.vl.util.json.JsonUtil;
/***********************************************************************************************
* Program Name : 테넌트 그룹별 메뉴권한관리 Controller
* Creator      : yhnam
* Create Date  : 2024.01.31
* Description  : 테넌트 그룹별 메뉴권한관리
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.31     yhnam            최초생성
************************************************************************************************/
@RestController
@RequestMapping("/sysm/*")
public class SYSM410Controller {
	
	@Resource(name = "SYSM410Service")
	private SYSM410Service sysm410Service;
	
	@Resource(name = "COMM100Service")
	private COMM100Service COMM100Service;
	
	private String DATAFRMID = "SYSM410T";
	private String REQMAPPING = "/sysm";

	private static final Logger LOGGER = LoggerFactory.getLogger(SYSM410Controller.class);

    /**
     * @Method Name : SYSM410T
     * @작성일      : 2024.01.31
     * @작성자      : yhnam
     * @변경이력    : 
     * @Method 설명 : sysm/SYSM410T 웹 페이지 열기
	 * @param       :  
	 * @return      : sysm/SYSM410T.jsp 
     */	
	@RequestMapping("/SYSM410T")
	public ModelAndView SYSM410T() {
		return new ModelAndView("sysm/SYSM410T");
	}	

	/**
	 * @Method Name : SYSM410SEL01
	 * @작성일      	: 2024.01.31
	 * @작성자      	: yhnam
	 * @변경이력    	:
	 * @Method 설명 	: restful 등급별 메뉴 조회
	 * @param       : ModelAndView
	 * @return      : ModelAndView HashMap
	 */
	@RequestMapping(value = "/SYSM410SEL01", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView SYSM410SEL01(ModelAndView mav, HttpServletRequest request, HttpSession session) throws Exception{
		HashMap<String, Object> resultMap = new HashMap<>();
		JsonUtil jsonUtils = new JsonUtil();
		Gson gson = new Gson();

		String jsonStr = "";
		String resultType = "성공";
		String errorMsg = "";
		
		try {
			jsonStr = jsonUtils.readJsonBody(request);

			List<SYSM410VO> list = sysm410Service.SYSM410SEL01(gson.fromJson(jsonStr, SYSM410VO.class));
			List<SYSM410VO> totalList = sysm410Service.SYSM410SEL02(gson.fromJson(jsonStr, SYSM410VO.class));

			resultMap.put("list", new ObjectMapper().writeValueAsString(list));
			resultMap.put("totalList", new ObjectMapper().writeValueAsString(totalList));
			resultMap.put("msg", "정상적으로 조회하였습니다.");

			mav.addAllObjects(resultMap);
			mav.setStatus(HttpStatus.OK);
			mav.setViewName("jsonView");
		} catch (Exception e) {
			LOGGER.error("[" + e.getClass() + "] Exception : " + e.getMessage());
			resultType = "실패";
			errorMsg = e.getMessage();
		} finally {
			COMM100Service.userLogInsert(DATAFRMID, REQMAPPING + "/SYSM410SEL01", jsonStr, resultType, errorMsg, session);
		}

		return mav;
	}
	
	/**
	 * @Method Name : SYSM410INS01
	 * @작성일      	: 2024.02.01
	 * @작성자     	: yhnam
	 * @변경이력    	:
	 * @Method 설명 	: restful 메뉴 추가
	 * @param       : ModelAndView
	 * @return 		: ModelAndView HashMap
	 */
	@RequestMapping(value = "/SYSM410INS01", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView SYSM410INS01(ModelAndView mav, HttpServletRequest request, HttpSession session) throws Exception{
		HashMap<String, Object> resultMap = new HashMap<>();
		Gson gson = new Gson();
		
		String jsonStr = "";
		String resultType = "성공";
		String errorMsg = "";

		try {
			jsonStr = new JsonUtil().readJsonBody(request);
			JsonObject jsonObject = gson.fromJson(jsonStr, JsonObject.class);
			JsonArray jsonArray = jsonObject.getAsJsonArray("list");

			sysm410Service.SYSM410DEL01(gson.fromJson(jsonStr, SYSM410VO.class));
			Integer rtn = sysm410Service.SYSM410INS01(gson.fromJson(jsonArray, new TypeToken<ArrayList<SYSM410VO>>(){}.getType()));
			if (rtn > 0) {
				resultMap.put("msg", "정상적으로 저장되었습니다.");
			}

			mav.addAllObjects(resultMap);
			mav.setStatus(HttpStatus.OK);
			mav.setViewName("jsonView");
		} catch (Exception e) {
			LOGGER.error("[" + e.getClass() + "] Exception : " + e.getMessage());
			resultType = "실패";
			errorMsg = e.getMessage();
		} finally {
			COMM100Service.userLogInsert(DATAFRMID, REQMAPPING + "/SYSM410INS01", jsonStr, resultType, errorMsg, session);
		}
		
		return mav;
	}
}