package bcs.vl.lgin.web;

import java.net.URL;
import java.util.HashMap;
import java.util.Locale;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import bcs.vl.util.prop.VisualProperties;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

import bcs.vl.lgin.VO.LGIN000VO;
import bcs.vl.lgin.service.LGIN000Service;
import bcs.vl.util.crypto.SHA256Crypt;
import bcs.vl.util.json.JsonUtil;
/***********************************************************************************************
* Program Name : 로그인 Controller
* Creator      : dwson
* Create Date  : 2024.01.24
* Description  : 로그인
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.24     dwson            최초생성
*********************************************** *************************************************/
@RestController
@RequestMapping("/lgin/*")
public class LGIN000Controller {
	
	@Resource(name = "LGIN000Service")
	private LGIN000Service lgin000Service;

	@Autowired
	SessionLocaleResolver localeResolver;

	@Autowired
	MessageSource messageSource;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(LGIN000Controller.class);

    /**
     * @Method Name : login
     * @작성일      : 2022.04.05
     * @작성자      : sukim
     * @변경이력    : 
     * @Method 설명 : lgin/login 전단계 연결 웹 페이지 열기
	 * @param       :  
	 * @return      : lgin/login.jsp 
     */	
	@RequestMapping("/login")
	public ModelAndView login(HttpServletRequest request) {
		ModelAndView view = new ModelAndView();

		String systemIdx = request.getParameter("systemIdx");
//		if(systemIdx == null){
//			systemIdx = "1";
//		}
		view.setViewName("lgin/login");
		view.addObject("systemIdx", systemIdx);

		return view;
	}

    /**
     * @Method Name : LGIN000M
     * @작성일      : 2022.01.25
     * @작성자      : sukim
     * @변경이력    : 
     * @Method 설명 : lgin/LGIN000M 웹 페이지 열기
	 * @param       :  
	 * @return      : lgin/LGIN000M.jsp 
     */	
	@RequestMapping("/LGIN000M")
	public ModelAndView LGIN000M() throws Exception{
		return new ModelAndView("lgin/LGIN000M");
	}	

	@RequestMapping(value = "/LGIN000SEL01", method = RequestMethod.POST)
	public ModelAndView LGIN000SEL01(ModelAndView mav, HttpSession session, HttpServletRequest request, Locale locale){
		if(session.getAttribute("user") != null) {
			session.invalidate();
		}
		try {
			boolean status = false;
			String message ="";
			JSONObject jsonObject = JsonUtil.parseJSON(request);

			Integer param = getSystemIdx(jsonObject);

			if(param == null) {
				URL url = new URL(request.getRequestURL().toString());

				StringBuffer buffer = new StringBuffer();
				buffer.append(url.getHost());
				buffer.append(":");
				buffer.append(url.getPort());

				param = lgin000Service.LGIN000SEL08(buffer.toString());
				
				// 매핑된 데이터가 없을경우 4번으로 고정
				param = (param == null) ? 4 : param;
				if("SYS".toLowerCase().equals(jsonObject.get("tenantPrefix").toString().toLowerCase())) param = 1;
			}
			System.out.println(param);
			LGIN000VO reqVO = new LGIN000VO();
			reqVO.setTenantPrefix((String) jsonObject.get("tenantPrefix"));
			reqVO.setAgentId   ((String) jsonObject.get("agentId"));
			reqVO.setSystemIdx(param);

			//사용자 유무 판단
			int checkCnt = lgin000Service.LGIN000SEL01(reqVO);
			
			if(checkCnt > 0) { //사용자 있음
				LGIN000VO userInfo = lgin000Service.LGIN000SEL07(reqVO);
				String decPassWd = SHA256Crypt.encrypt((String) jsonObject.get("password"));
				String queryPW = userInfo.getPassword();

				if(decPassWd.equals(queryPW)) { //비밀번호 일치
					
					//세션 설정
					userInfo.setPassword(null);
					userInfo.setOriginTenantPrefix(userInfo.getTenantPrefix());
					userInfo.setOriginAgentId(userInfo.getAgentId());
					userInfo.setOriginUsrGrd(userInfo.getUsrGrd());
					// 20240531 SystemIdx 추가
					userInfo.setOriginSystemIdx(userInfo.getSystemIdx());
					session.setAttribute("user", userInfo);

					// 로그인 OK
					status  = true;
					message = userInfo.getName() + "님 환영합니다 :>";

				}else {//비밀번호 불일치
					message = "비밀번호가 일치하지 않습니다.";
				}
			}else { //로그인 실패(사용자ID 없음)
				message = "존재하지 않는 아이디입니다.";
			}

			HashMap<String, Object> resultMap = new HashMap<String, Object>();
			resultMap.put("result", status);
			resultMap.put("msg"   , message);
			mav.addAllObjects(resultMap);
		}catch(Exception e) {
			e.printStackTrace();
			if(session !=null) session.invalidate();
			HashMap<String, Object> resultMap = new HashMap<String, Object>();
			resultMap.put("msg"   , "관리자에게 문의해 주세요.");
			mav.addAllObjects(resultMap);
			LOGGER.error("["+e.getClass()+"] Exception : " + e.getMessage());
		}

		mav.setViewName("jsonView");
		return mav;
	}    
	
	/**
     * @Method Name : 로그아웃(logout)
     * @작성일      : 2024.01.24
     * @작성자      : dwson
     * @변경이력    : 
     * @Method 설명 : 로그아웃
	 * @param       : 
	 * @return      : ModelAndView HashMap
     */    
	@RequestMapping(value = "/logout", method = RequestMethod.POST)
	public ModelAndView LGIN000INS02(Locale locale, ModelAndView mav, HttpSession session, HttpServletRequest request){
    	try {
        	if(session.getAttribute("user") != null) {
        		session.removeAttribute("user");
        	}
        	
	    	HashMap<String, Object> LGIN000INS02_hashMap = new HashMap<String, Object>();
	    	LGIN000INS02_hashMap.put("result", "0");
	    	LGIN000INS02_hashMap.put("msg"   , "로그아웃 되었습니다.");  
		    mav.addAllObjects(LGIN000INS02_hashMap);
		    mav.setStatus(HttpStatus.OK);
		    mav.setViewName("jsonView"); 

    	}catch(Exception e) {
    		LOGGER.error("["+e.getClass()+"] Exception : " + e.getMessage());
    	}
    	return mav;
	}

	public Integer getSystemIdx(JSONObject obj) {
		return obj.get("systemIdx") != null && !"".equals(obj.get("systemIdx")) ? Integer.valueOf(String.valueOf(obj.get("systemIdx"))) : null;
	}
}