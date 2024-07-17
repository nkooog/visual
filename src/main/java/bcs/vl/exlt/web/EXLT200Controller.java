package bcs.vl.exlt.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

/***********************************************************************************************
* Program Name : EXPM Lite 운영관리 Controller
* Creator      : nyh
* Create Date  : 2024.03.21
* Description  : EXPM Lite 운영관리
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.03.21     nyh            최초생성
************************************************************************************************/
@RestController
@RequestMapping("/exlt/*")
public class EXLT200Controller {

	private static final Logger LOGGER = LoggerFactory.getLogger(EXLT200Controller.class);

	/**
     * @Method Name : EXSH200T
     * @작성일      	: 2024.03.21
     * @작성자      	: nyh
     * @변경이력    	: 
     * @Method 설명 	: exsh/EXSH200T 웹 페이지 열기
	 * @param       :  
	 * @return      : exsh/EXSH200T.jsp 
     */	
	@RequestMapping("/EXSH200T")
	public ModelAndView SYSM100T() {
		LOGGER.debug(" EXSH200T ");
		return new ModelAndView("exsh/EXSH200T");
	}
}