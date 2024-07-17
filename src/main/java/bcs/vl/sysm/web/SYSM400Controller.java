package bcs.vl.sysm.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

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
import bcs.vl.sysm.VO.SYSM400VO;
import bcs.vl.sysm.service.SYSM400Service;
import bcs.vl.util.json.JsonUtil;
/***********************************************************************************************
* Program Name : 메뉴 관리 Controller
* Creator      : yhnam
* Create Date  : 2024.01.26
* Description  : 메뉴 관리
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.26     yhnam            최초생성
************************************************************************************************/
@RestController
@RequestMapping("/sysm/*")
public class SYSM400Controller {
	
	@Resource(name = "SYSM400Service")
	private SYSM400Service sysm400Service;
	
	@Resource(name = "COMM100Service")
	private COMM100Service COMM100Service;
	
	private String DATAFRMID = "SYSM400T";
	private String REQMAPPING = "/sysm";

	private static final Logger LOGGER = LoggerFactory.getLogger(SYSM400Controller.class);

    /**
     * @Method Name : SYSM400T
     * @작성일      	: 2024.01.26
     * @작성자     	: yhnam
     * @변경이력    	: 
     * @Method 설명 	: sysm/SYSM400T 웹 페이지 열기
	 * @param       :  
	 * @return      : sysm/SYSM400T.jsp 
     */	
	@RequestMapping("/SYSM400T")
	public ModelAndView SYSM400T() {
		return new ModelAndView("sysm/SYSM400T");
	}	

	/**
	 * @Method Name : SYSM400SEL01
	 * @작성일      	: 2024.01.26
	 * @작성자      	: yhnam
	 * @변경이력    	:
	 * @Method 설명 	: 메뉴 전체조회
	 * @param       : ModelAndView
	 * @return      : ModelAndView HashMap
	 */
	@RequestMapping(value = "/SYSM400SEL01", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView SYSM250SEL01(ModelAndView mav, HttpServletRequest request, HttpSession session) throws Exception{
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		ObjectMapper objectMapper = new ObjectMapper();
		JsonUtil jsonUtils = new JsonUtil();
		Gson gson = new Gson();

		String jsonStr = "";
		String resultType = "성공";
		String errorMsg = "";
		
		try {
			jsonStr = jsonUtils.readJsonBody(request);

			List<SYSM400VO> list = sysm400Service.SYSM400SEL01(gson.fromJson(jsonStr, SYSM400VO.class));

			resultMap.put("count", list.size());
			resultMap.put("list", objectMapper.writeValueAsString(list));
			resultMap.put("msg", "정상적으로 조회하였습니다.");

			mav.addAllObjects(resultMap);
			mav.setStatus(HttpStatus.OK);
			mav.setViewName("jsonView");
		} catch (Exception e) {
			LOGGER.error("[" + e.getClass() + "] Exception : " + e.getMessage());
			resultType = "실패";
			errorMsg = e.getMessage();
		}finally {
			COMM100Service.userLogInsert(DATAFRMID, REQMAPPING + "/SYSM400SEL01", jsonStr, resultType, errorMsg, session);
		}

		return mav;
	}
	
	/**
	 * @Method Name : SYSM400INS01
	 * @작성일      	: 2024.01.29
	 * @작성자      	: yhnam
	 * @변경이력    	:
	 * @Method 설명 	: restful 메뉴 추가
	 * @param       : ModelAndView
	 * @return : ModelAndView HashMap
	 */
	@RequestMapping(value = "/SYSM400INS01", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView SYSM400INS01(ModelAndView mav, HttpServletRequest request, HttpSession session) throws Exception{
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		JsonUtil jsonUtils = new JsonUtil();
		Gson gson = new Gson();

		String jsonStr = "";
		String resultType = "성공";
		String errorMsg = "";
		
		try {
			jsonStr = jsonUtils.readJsonBody(request);
			JsonObject jsonObject = gson.fromJson(jsonStr, JsonObject.class);
			JsonArray jsonArray = jsonObject.getAsJsonArray("list");

			Integer rtn = sysm400Service.SYSM400INS01(gson.fromJson(jsonArray, new TypeToken<ArrayList<SYSM400VO>>(){}.getType()));
			if (rtn > 0) {
				rtn = sysm400Service.SYSM400INS02(gson.fromJson(jsonArray, new TypeToken<ArrayList<SYSM400VO>>(){}.getType()));
				if (rtn > 0) resultMap.put("msg", "정상적으로 추가되었습니다.");
			}

			mav.addAllObjects(resultMap);
			mav.setStatus(HttpStatus.OK);
			mav.setViewName("jsonView");
		} catch (Exception e) {
			LOGGER.error("[" + e.getClass() + "] Exception : " + e.getMessage());
			resultType = "실패";
			errorMsg = e.getMessage();
		}finally {
			COMM100Service.userLogInsert(DATAFRMID, REQMAPPING + "/SYSM400INS01", jsonStr, resultType, errorMsg, session);
		}
		
		return mav;
	}
	
	/**
	 * @Method Name : SYSM400UPT01
	 * @작성일      	: 2024.01.29
	 * @작성자      	: yhnam
	 * @변경이력    	:
	 * @Method 설명 	: restful 메뉴 변경
	 * @param       :  ModelAndView
	 * @return      : ModelAndView HashMap
	 */
	@RequestMapping(value = "/SYSM400UPT01", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView SYSM400UPT01(ModelAndView mav, HttpServletRequest request, HttpSession session) throws Exception{
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		JsonUtil jsonUtils = new JsonUtil();
		Gson gson = new Gson();
		
		String jsonStr = "";
		String resultType = "성공";
		String errorMsg = "";

		try {
			jsonStr = jsonUtils.readJsonBody(request);
			JsonObject jsonObject = gson.fromJson(jsonStr, JsonObject.class);
			JsonArray jsonArray = jsonObject.getAsJsonArray("list");

			List<SYSM400VO> list = gson.fromJson(jsonArray, new TypeToken<ArrayList<SYSM400VO>>(){}.getType());
			Integer rtn1 = sysm400Service.SYSM400UPT01(list);
			if (rtn1 > 0) {
				Integer rtn2 = sysm400Service.SYSM400UPT02(list.stream().filter(x -> !x.getMenuId().equals(x.getId())).collect(Collectors.toList()));
				Integer rtn3 = sysm400Service.SYSM400UPT03(list.stream().filter(x -> !x.getMenuId().equals(x.getId())).collect(Collectors.toList()));
				
				// 1차, 2차 일 경우 하위 메뉴 사용안함으로 변경
				if(list.stream().filter(x -> x.getPrsMenuLvl() < 3 && !x.getMenuState().equals("100")).collect(Collectors.toList()).size() > 0)
				{
					Integer rtn4 = sysm400Service.SYSM400UPT04(list.stream().filter(x -> x.getPrsMenuLvl() < 3 && !x.getMenuState().equals("100")).collect(Collectors.toList()));
				}
			}

			resultMap.put("msg", "정상적으로 변경되었습니다.");

			mav.addAllObjects(resultMap);
			mav.setStatus(HttpStatus.OK);
			mav.setViewName("jsonView");
		} catch (Exception e) {
			LOGGER.error("[" + e.getClass() + "] Exception : " + e.getMessage());
			resultType = "실패";
			errorMsg = e.getMessage();
		}finally {
			COMM100Service.userLogInsert(DATAFRMID, REQMAPPING + "/SYSM400UPT01", jsonStr, resultType, errorMsg, session);
		}
		
		return mav;
	}
	
	/**
	 * @Method Name : SYSM400SEL02
	 * @작성일      	: 2024.01.29
	 * @작성자      	: yhnam
	 * @변경이력    	:
	 * @Method 설명 	: restful MiddleMenu, 3depth 조회
	 * @param       :  ModelAndView
	 * @return      : ModelAndView HashMap
	 */
	@RequestMapping(value = "/SYSM400SEL02", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView SYSM400SEL02(ModelAndView mav, HttpServletRequest request, HttpSession session) throws Exception{
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		ObjectMapper objectMapper = new ObjectMapper();
		JsonUtil jsonUtils = new JsonUtil();
		Gson gson = new Gson();

		String jsonStr = "";
		String resultType = "성공";
		String errorMsg = "";
		
		try {
			jsonStr = jsonUtils.readJsonBody(request);
			SYSM400VO sysm400VO = gson.fromJson(jsonStr, SYSM400VO.class);

			List<SYSM400VO> list = sysm400Service.SYSM400SEL02(sysm400VO);

			resultMap.put("count", list.size());
			resultMap.put("list", objectMapper.writeValueAsString(list));
			resultMap.put("totalList", objectMapper.writeValueAsString(sysm400Service.SYSM400SEL01(sysm400VO)));
			resultMap.put("msg", "정상적으로 조회하였습니다.");

			mav.addAllObjects(resultMap);
			mav.setStatus(HttpStatus.OK);
			mav.setViewName("jsonView");
		} catch (Exception e) {
			LOGGER.error("[" + e.getClass() + "] Exception : " + e.getMessage());
			resultType = "실패";
			errorMsg = e.getMessage();
		}finally {
			COMM100Service.userLogInsert(DATAFRMID, REQMAPPING + "/SYSM400SEL02", jsonStr, resultType, errorMsg, session);
		}
		
		return mav;
	}
	
	/**
	 * @Method Name : SYSM400DEL01
	 * @작성일      	: 2024.01.29
	 * @작성자      	: yhnam
	 * @변경이력    	:
	 * @Method 설명 	: restful 메뉴 삭제
	 * @param       :  ModelAndView
	 * @return      : ModelAndView HashMap
	 */
	@RequestMapping(value = "/SYSM400DEL01", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView SYSM400DEL01(ModelAndView mav, HttpServletRequest request, HttpSession session) throws Exception{
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		JsonUtil jsonUtils = new JsonUtil();
		Gson gson = new Gson();

		String jsonStr = "";
		String resultType = "성공";
		String errorMsg = "";
		
		try {
			jsonStr = jsonUtils.readJsonBody(request);
			JsonObject jsonObject = gson.fromJson(jsonStr, JsonObject.class);
			JsonArray jsonArray = jsonObject.getAsJsonArray("list");

			Integer rtn = sysm400Service.SYSM400DEL01(gson.fromJson(jsonArray, new TypeToken<ArrayList<SYSM400VO>>(){}.getType()));
			if (rtn > 0) {
				resultMap.put("msg", "정상적으로 삭제되었습니다.");
			}

			mav.addAllObjects(resultMap);
			mav.setStatus(HttpStatus.OK);
			mav.setViewName("jsonView");
		} catch (Exception e) {
			LOGGER.error("[" + e.getClass() + "] Exception : " + e.getMessage());
			resultType = "실패";
			errorMsg = e.getMessage();
		}finally {
			COMM100Service.userLogInsert(DATAFRMID, REQMAPPING + "/SYSM400DEL01", jsonStr, resultType, errorMsg, session);
		}
		
		return mav;
	}
	
	/**
	 * @Method Name : SYSM400SEL03
	 * @작성일      	: 2024.01.29
	 * @작성자      	: yhnam
	 * @변경이력    	:
	 * @Method 설명 : restful MenuId 체크
	 * @param       :  ModelAndView
	 * @return      : ModelAndView HashMap
	 */
	@RequestMapping(value = "/SYSM400SEL03", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView SYSM400SEL03(ModelAndView mav, HttpServletRequest request, HttpSession session) throws Exception{
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		ObjectMapper objectMapper = new ObjectMapper();
		JsonUtil jsonUtils = new JsonUtil();
		Gson gson = new Gson();
		
		String jsonStr = "";
		String resultType = "성공";
		String errorMsg = "";

		try {
			jsonStr = jsonUtils.readJsonBody(request);
			List<SYSM400VO> list = sysm400Service.SYSM400SEL03(gson.fromJson(jsonStr, SYSM400VO.class));

			resultMap.put("count", list.size());
			resultMap.put("list", objectMapper.writeValueAsString(list));
			resultMap.put("msg", "정상적으로 조회하였습니다.");

			mav.addAllObjects(resultMap);
			mav.setStatus(HttpStatus.OK);
			mav.setViewName("jsonView");
		} catch (Exception e) {
			LOGGER.error("[" + e.getClass() + "] Exception : " + e.getMessage());
			resultType = "실패";
			errorMsg = e.getMessage();
		}finally {
			COMM100Service.userLogInsert(DATAFRMID, REQMAPPING + "/SYSM400SEL03", jsonStr, resultType, errorMsg, session);
		}
		
		return mav;
	}
}