package bcs.vl.opmt.web;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;

import bcs.vl.opmt.VO.OPMT200VO;
import bcs.vl.opmt.service.OPMT200Service;
import bcs.vl.util.json.JsonUtil;

/***********************************************************************************************
* Program Name : content Controller
* Creator      : yhnam
* Create Date  : 2024.02.06
* Description  : content
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.02.06     yhnam            최초생성
************************************************************************************************/
@RestController
@RequestMapping("/content/*")
public class OPMTContentController {
	
	@Resource(name = "OPMT200Service")
	private OPMT200Service opmt200Service;
	
	/**
     * @Method Name : OPMT201T
     * @작성일      : 2024.02.26
     * @작성자      : yhnam
     * @변경이력    : 
     * @Method 설명 : opmt/OPMT201T 웹 페이지 열기
	 * @param       :  
	 * @return      : opmt/OPMT201T.jsp 
     */	
	@RequestMapping("/OPMTContent201T")
	public ModelAndView OPMT201T(HttpServletRequest request) {

		ModelAndView mav = new ModelAndView("opmt/OPMTContent201T");
		
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		String contentSeq = request.getParameter("contentSeq");
		resultMap.put("contentSeq", contentSeq);
		mav.addAllObjects(resultMap);
		mav.addObject("test", contentSeq);

		return mav;
	}
	
	/**
	 * @Method Name : OPMT200SEL01
	 * @작성일      	: 2024.02.26
	 * @작성자      	: yhnam
	 * @변경이력    	:
	 * @Method 설명 	: 시스템 리스트 조회
	 * @param       : ModelAndView
	 * @return      : ModelAndView HashMap
	 */
	@RequestMapping(value = "/OPMT200SEL01", method = RequestMethod.POST)
	public ModelAndView OPMT200SEL01(ModelAndView mav, HttpServletRequest request, HttpSession session) throws Exception {
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

			OPMT200VO vo = gson.fromJson(jsonStr, OPMT200VO.class);
			List<OPMT200VO> list = opmt200Service.OPMT200SEL01(vo);
		    resultMap.put("OPMT200VOInfo", objectMapper.writeValueAsString(list));

		    if(vo.getContentSeq() > 0)
		    {
		    	vo.setUseYn("Y");
		    	OPMT200VO OPMT200VOButtonInfo = opmt200Service.OPMT200SEL04(vo);
		    	resultMap.put("OPMT200VOButtonInfo", objectMapper.writeValueAsString(OPMT200VOButtonInfo));
		    }

		    mav.addAllObjects(resultMap);
			mav.setStatus(HttpStatus.OK);
			mav.setViewName("jsonView");
		} catch(Exception e) {
		    resultType = "실패";
			errorMsg = e.getMessage();
		}

		mav.setViewName("jsonView");

        return mav;
	}
	
	/**
	 * @Method Name : OPMT201INS01
	 * @작성일      	: 2024.02.26
	 * @작성자      	: yhnam
	 * @변경이력    	:
	 * @Method 설명 	: 버튼 로그 등록
	 * @param       : ModelAndView
	 * @return      : ModelAndView HashMap
	 */
	@RequestMapping(value ="/OPMT201INS01", method = RequestMethod.POST)
	@ResponseBody    
	public ModelAndView OPMT201INS01(ModelAndView mav, HttpServletRequest request) throws Exception{
		HashMap<String, Object> resultMap = new HashMap<>();
		Gson gson = new Gson();
		JsonUtil jsonUtils = new JsonUtil();
		String jsonStr = "";

		try
		{
			jsonStr = jsonUtils.readJsonBody(request);

			OPMT200VO vo = gson.fromJson(jsonStr, OPMT200VO.class);
			vo.setIp(request.getRemoteAddr());
			
			opmt200Service.OPMT201INS01(vo);

			mav.addAllObjects(resultMap);
			mav.setStatus(HttpStatus.OK);

		} catch (Exception e) {
			resultMap.put("result", "error");
			resultMap.put("msg", "실패 했습니다.<br/>다시 한번 이용해 주세요.");
			resultMap.put("errorMsg", e.toString());
			mav.addAllObjects(resultMap);
		}
		mav.setViewName("jsonView");
		return mav;
	}
}