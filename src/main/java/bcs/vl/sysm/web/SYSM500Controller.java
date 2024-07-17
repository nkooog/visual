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
import com.google.gson.Gson;

import bcs.vl.comm.service.COMM100Service;
import bcs.vl.sysm.VO.SYSM500VO;
import bcs.vl.sysm.service.SYSM500Service;
import bcs.vl.util.json.JsonUtil;
/***********************************************************************************************
* Program Name : 사용자활동내역 Controller
* Creator      : yhnam
* Create Date  : 2024.02.08
* Description  : 사용자활동내역
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.02.08     yhnam            최초생성
************************************************************************************************/
@RestController
@RequestMapping("/sysm/*")
public class SYSM500Controller {
	
	@Resource(name = "SYSM500Service")
	private SYSM500Service SYSM500Service;
	
	@Resource(name = "COMM100Service")
	private COMM100Service COMM100Service;
	
	private String DATAFRMID = "SYSM500T";
	private String REQMAPPING = "/sysm";

	private static final Logger LOGGER = LoggerFactory.getLogger(SYSM500Controller.class);

    /**
     * @Method Name : SYSM500T
     * @작성일      	: 2024.02.08
     * @작성자     	: yhnam
     * @변경이력    	: 
     * @Method 설명 	: sysm/SYSM500T 웹 페이지 열기
	 * @param       :  
	 * @return      : sysm/SYSM500T.jsp 
     */	
	@RequestMapping("/SYSM500T")
	public ModelAndView SYSM500T() {
		return new ModelAndView("sysm/SYSM500T");
	}
	
	/**
	 * @Method Name : SYSM500SEL01
	 * @작성일      	: 2024.02.08
	 * @작성자      	: yhnam
	 * @변경이력    	: 
	 * @Method 설명 	: 사용자활동내역 목록조회
	 * @param       : HttpServletRequest Restful param
	 * @return      : ModelAndView HashMap
	 */    
	@RequestMapping(value ="/SYSM500SEL01", method = RequestMethod.POST)
	@ResponseBody    
	public ModelAndView SYSM500SEL01(ModelAndView mav, HttpServletRequest req, HttpSession session) throws Exception{

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

			List<SYSM500VO> SYSM500VOInfo = SYSM500Service.SYSM500SEL01(gson.fromJson(jsonStr, SYSM500VO.class));
			String json = mapper.writeValueAsString(SYSM500VOInfo);

			hashMap.put("SYSM500VOInfo", json);
			hashMap.put("SYSM500VOListCount", SYSM500VOInfo.size());

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
			COMM100Service.userLogInsert(DATAFRMID, REQMAPPING + "/SYSM500SEL01", jsonStr, resultType, errorMsg, session);
		}

		return mav;	
	}
}