package bcs.vl.frme.web;

import java.util.HashMap;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

import bcs.vl.lgin.VO.LGIN000VO;
import bcs.vl.lgin.service.LGIN000Service;
import bcs.vl.util.crypto.AES256Crypt;
import bcs.vl.util.crypto.SHA256Crypt;
import bcs.vl.util.json.JsonUtil;
import egovframework.rte.fdl.property.EgovPropertyService;

/***********************************************************************************************
* Program Name : 비밀번호변경 Controller
* Creator      : dwson
* Create Date  : 2024.01.24
* Description  : 비밀번호변경 - POP
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.24     dwson            최초생성
************************************************************************************************/
@RestController
@RequestMapping("/frme/*")
public class FRME120Controller {
	@Resource(name = "LGIN000Service")
	private LGIN000Service lgin000Service;
	
	@Resource( name = "propertiesService" )
	EgovPropertyService propertiesService;
	
	@Autowired
	SessionLocaleResolver localeResolver;
	
	@Autowired
	MessageSource messageSource;

	private static final Logger LOGGER = LoggerFactory.getLogger(FRME100Controller.class);
	
	/**
	 * @Method Name		: FRME120P
	 * @작성일      	: 2024.01.24
	 * @작성자      	: sukim
	 * @변경이력    	:
	 * @Method 설명 	: frme/FRME120P 웹 페이지 열기
	 * @param           :
	 * @return          : frme/FRME120P.jsp
	 */
	@RequestMapping("/FRME120P")
	public ModelAndView FRME120P(Model model) {
		LOGGER.info("FRME120P 페이지 열기");
		ModelAndView mav = new ModelAndView("frme/FRME120P");
		return mav;
	}		
	
	/**
	 * @Method Name		: FRME120UPT01
	 * @작성일      	: 2024.01.24
	 * @작성자      	: bykim
	 * @변경이력    	:
	 * @Method 설명 	: 비밀번호 변경
	 * @param           :
	 */
	@RequestMapping(value ="/FRME120UPT01", method = RequestMethod.POST)
	@ResponseBody    
	public ModelAndView FRME120SEL01(ModelAndView mav, HttpServletRequest req){
		try {
			JSONObject obj = JsonUtil.parseJSON(req);

			LGIN000VO vo = new LGIN000VO();		
			
			vo.setTenantPrefix( String.valueOf(obj.get("tenantPrefix")) );
	    	vo.setAgentId( String.valueOf(obj.get("agentId")) );
	    	vo.setSystemIdx( Integer.valueOf(String.valueOf(obj.get("systemIdx"))) ) ;
	    	
	    	LGIN000VO userInfo = lgin000Service.LGIN000SEL07(vo);

			String passwd  = String.valueOf(obj.get("curPwd"));
			String queryPW =userInfo.getPassword();
			
			String decPassWd = SHA256Crypt.encrypt(passwd);
			
			int checkRslt = 0;
			
			if(decPassWd.equals(queryPW)) {
				vo.setPassword(SHA256Crypt.encrypt(String.valueOf(obj.get("newPwd"))));
				checkRslt = lgin000Service.LGIN000UPT05(vo);
			}
			
			HashMap<String, Object> LGIN000hashMap = new HashMap<String, Object>();
	    	LGIN000hashMap.put("result", checkRslt );
		    mav.addAllObjects(LGIN000hashMap);
		    mav.setStatus(HttpStatus.OK);
		    mav.setViewName("jsonView");   		
		}catch(Exception e) {
			LOGGER.error("["+e.getClass()+"] Exception : " + e.getMessage());
		}
		return mav;	
	}
}
