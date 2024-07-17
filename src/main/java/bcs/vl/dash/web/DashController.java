package bcs.vl.dash.web;

import java.util.HashMap;
import java.util.Locale;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import bcs.vl.annotation.ExonaAnnotation;
import bcs.vl.lgin.VO.LGIN000VO;
import bcs.vl.util.api.ExonaApiList;
import bcs.vl.util.api.RestUtil;
import bcs.vl.util.json.JsonUtil;
import bcs.vl.util.session.SessionUtil;
import egovframework.rte.fdl.property.EgovPropertyService;


/***********************************************************************************************
* Program Name : Dashboard 메인 Controller
* Creator      : nyh
* Create Date  : 2024.03.15
* Description  : 
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.03.15	nyh			최초생성
************************************************************************************************/
@RestController
@RequestMapping("/dash/*")
public class DashController {

	private static final Logger LOGGER = LoggerFactory.getLogger(DashController.class);
	
	@Resource(name = "RestUtil")
	RestUtil restutil;

	@Resource(name = "EXONApropertiesService")
	EgovPropertyService propertiesService;

	/**
	 * @Method Name : DASH100M
	 * @작성일 : 2023.03.15
	 * @작성자 : nyh
	 * @변경이력 :
	 * @Method 설명 : frme/DASH100M 웹 페이지 열기
	 * @param :
	 * @return : frme/DASH100M.jsp
	 */
	@RequestMapping("/DASH100M")
	public ModelAndView main(ModelAndView mav, HttpSession session, HttpServletRequest request, Locale locale) {
		LOGGER.info("DASH100M 페이지 열기");

		try {
			mav.addObject("TEMPLATE_BASE_info", "DASH100M");
			mav.setViewName("dash/DASH100M");

		} catch (Exception e) {
			e.printStackTrace();
            LOGGER.error("[" + e.getClass() + "] Exception : " + e.getMessage());
        }
		return mav;
	}
	
	/**
	 * @Method Name : DASH100M
	 * @작성일 : 2023.03.15
	 * @작성자 : nyh
	 * @변경이력 :
	 * @Method 설명 : frme/DASH100M 웹 페이지 열기
	 * @param :
	 * @return : frme/DASH100M.jsp
	 */
	@ExonaAnnotation
	@RequestMapping("/DASH100MjsonView")
	public ModelAndView jsonView(ModelAndView mav, HttpSession session, HttpServletRequest request) {
		LOGGER.info("DASH100M 페이지 열기");

		HashMap<String, Object> resultMap = new HashMap<>();

		try {
			// Rest 통신 호출
			String body = new JsonUtil().readJsonBody(request);
			String transMethod = "POST";
//			String name = ExonaApiList.LiteCallRecord.getname();
			String url = propertiesService.getString("Url").toString();
			String urlPaste = ExonaApiList.LiteCallGate.getUrlPaste();

			LGIN000VO loginVO = SessionUtil.getLoginUser();
//			String apiKey = loginVO.getAccessToken() != null ? loginVO.getAccessToken().toString() : null;
			String apiKey = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJQd1RKZUgxcnhNeHdHMVNHc1k0dyIsImlhdCI6MTcxMDk4NDY1MywiZXhwIjoxNzEwOTg4MjUzLCJTeXN0ZW0iOiJCb25hMiIsIlRlbmFudCI6IkRNTyJ9.ke8pfcH_U8bKRmUlsynFn-NNLwreDW1L1OVrxYdC1p0";

			String callServCd = propertiesService.getString("CallServCd") != null ? propertiesService.getString("CallServCd").toString() : null;
			JSONObject result = restutil.CallHttpUrlToJSONObject(transMethod, url, urlPaste, apiKey, callServCd, body);

			resultMap.put("result", result);
			mav.addAllObjects(resultMap);
			mav.setStatus(HttpStatus.OK);
			mav.setViewName("jsonView");

		} catch (Exception e) {
			e.printStackTrace();
            LOGGER.error("[" + e.getClass() + "] Exception : " + e.getMessage());
        }
		return mav;
	}

}