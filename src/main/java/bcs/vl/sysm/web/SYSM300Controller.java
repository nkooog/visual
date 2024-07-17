package bcs.vl.sysm.web;

import java.util.HashMap;
import java.util.List;
import java.util.Locale;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

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
import bcs.vl.sysm.VO.SYSM300VO;
import bcs.vl.sysm.service.SYSM300Service;
import bcs.vl.util.json.JsonUtil;
/***********************************************************************************************
* Program Name : URL 설정 조회 Controller
* Creator      : dwson
* Create Date  : 2024.01.26
* Description  : URL 설정 조회
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.26     dwson            최초생성
************************************************************************************************/
@RestController
@RequestMapping("/sysm/*")
public class SYSM300Controller {
	
	@Resource(name = "SYSM300Service")
	private SYSM300Service sysm300Service;
	
	/* 로그 */
	@Resource(name = "COMM100Service")
	private COMM100Service COMM100Service;
	
	private String DATAFRMID = "SYSM300T";
	private String REQMAPPING = "/sysm";

	private static final Logger LOGGER = LoggerFactory.getLogger(SYSM300Controller.class);

    /**
     * @Method Name : SYSM300T
     * @작성일      : 2024.01.26
     * @작성자      : dwson
     * @변경이력    : 
     * @Method 설명 : sysm/SYSM300T 웹 페이지 열기
	 * @param       :  
	 * @return      : sysm/SYSM300T.jsp 
     */	
	@RequestMapping("/SYSM300T")
	public ModelAndView SYSM300T() {
		return new ModelAndView("sysm/SYSM300T");
	}	

	/**
	 * @Method Name : SYSM300SEL01
	 * @작성일      	: 2024.02.26
	 * @작성자      	: yhnam
	 * @변경이력    	:
	 * @Method 설명 	: URL 설정 조회
	 * @param       : ModelAndView
	 * @return      : ModelAndView HashMap
	 */
	@RequestMapping(value = "/SYSM300SEL01", method = RequestMethod.POST)
	public ModelAndView SYSM300SEL01(ModelAndView mav, HttpSession session, HttpServletRequest request, Locale locale) throws Exception{
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

			SYSM300VO vo = gson.fromJson(jsonStr, SYSM300VO.class);
			List<SYSM300VO> list = sysm300Service.SYSM300SEL01(vo);
		    resultMap.put("SYSM300VOInfo", objectMapper.writeValueAsString(list));

		    mav.addAllObjects(resultMap);
			mav.setStatus(HttpStatus.OK);
			mav.setViewName("jsonView");
		} catch(Exception e) {
		    LOGGER.error("["+e.getClass()+"] Exception : " + e.getMessage());
		    resultType = "실패";
			errorMsg = e.getMessage();
		} finally {
			COMM100Service.userLogInsert(DATAFRMID, REQMAPPING + "/SYSM300SEL01", jsonStr, resultType, errorMsg, session);
		}

		mav.setViewName("jsonView");

        return mav;
	}
}