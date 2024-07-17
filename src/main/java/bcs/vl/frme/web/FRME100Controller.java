package bcs.vl.frme.web;

import bcs.vl.frme.VO.FRME100VO;
import bcs.vl.frme.service.FRME100Service;
import bcs.vl.util.json.JsonUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
/***********************************************************************************************
* Program Name : 프레임 Main Controller
* Creator      : jrlee
* Create Date  : 2024.01.24
* Description  : 프레임 Main
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.24     dwson            최초생성
************************************************************************************************/
@RestController
@RequestMapping("/frme/*")
public class FRME100Controller {

	private static final Logger LOGGER = LoggerFactory.getLogger(FRME100Controller.class);

	@Resource(name = "FRME100Service")
	private FRME100Service frme100Service;

	/**
	 * @Method Name : FRME100M
	 * @작성일      : 2024.01.24
	 * @작성자      : dwson
	 * @변경이력    :
	 * @Method 설명 : frme/FRME100M 웹 페이지 열기
	 * @param       :
	 * @return      : frme/FRME100M.jsp
	 */
	@RequestMapping("/FRME100M")
	public ModelAndView FRME100M() {
		LOGGER.info("FRME100M 페이지 열기");
		return new ModelAndView("frme/FRME100M");
	}

	/**
	 * @Method Name : sessionCheck
	 * @작성일      : 2024.01.24
	 * @작성자      : dwson
	 * @변경이력    :
	 * @Method 설명 : 프레임 세션 체크
	 * @param       : ModelAndView
	 * @return      : ModelAndView HashMap
	 */
	@RequestMapping(value ="/sessionCheck", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView sessionCheck(ModelAndView mav, HttpServletRequest request, HttpSession session) {
		HashMap<String, Object> resultMap = new HashMap<>();

		try {
			if (session.getAttribute("user") == null || !request.isRequestedSessionIdValid()) {
				resultMap.put("result", 0);
			} else {
				resultMap.put("result", 1);
				resultMap.put("user", session.getAttribute("user"));
			}

			mav.addAllObjects(resultMap);
			mav.setStatus(HttpStatus.OK);
			mav.setViewName("jsonView");
		} catch (Exception e) {
			LOGGER.error("["+e.getClass()+"] Exception : " + e.getMessage());
		}

		return mav;
	}

	/**
	 * @Method Name : FRME100SEL01
	 * @작성일      : 2024.01.24
	 * @작성자      : dwson
	 * @변경이력    :
	 * @Method 설명 : 메뉴 전체조회
	 * @param       : ModelAndView
	 * @return      : ModelAndView HashMap
	 */
	@RequestMapping(value ="/FRME100SEL01", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView FRME100SEL01(ModelAndView mav, HttpServletRequest request, HttpSession session) {
		LOGGER.info("=== 메뉴 조회 ===");
		java.util.HashMap<String, Object> resultMap = new HashMap<>();
		ObjectMapper objectMapper = new ObjectMapper();

		try {
			String jsonStr = new JsonUtil().readJsonBody(request);
			resultMap.put("list", objectMapper.writeValueAsString(frme100Service.FRME100SEL01(new Gson().fromJson(jsonStr, FRME100VO.class))));
			resultMap.put("msg", "정상적으로 조회하였습니다.");

			mav.addAllObjects(resultMap);
			mav.setStatus(HttpStatus.OK);
			mav.setViewName("jsonView");
		} catch (Exception e) {
			LOGGER.error("["+e.getClass()+"] Exception : " + e.getMessage());
		}

		return mav;
	}

}
