package bcs.vl.sample.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
/***********************************************************************************************
* Program Name : 샘플 Controller
* Creator      : dwson
* Create Date  : 2024.01.18
* Description  : 태넌트 정보관리
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.18	dwson			최초생성
************************************************************************************************/
@RestController
@RequestMapping("/sample/*")
public class SampleController {

	private static final Logger LOGGER = LoggerFactory.getLogger(SampleController.class);

	/**
	 * @Method Name : INHB300M
	 * @작성일 : 2023.09.01
	 * @작성자 : dwson
	 * @변경이력 :
	 * @Method 설명 : frme/INHB300M 웹 페이지 열기
	 * @param :
	 * @return : frme/INHB300M.jsp
	 */
	@RequestMapping("/main")
	public ModelAndView main(ModelAndView mav, HttpSession session, HttpServletRequest request) {
		LOGGER.info("INHB300M 페이지 열기");
		try {
			mav.addObject("TEMPLATE_BASE_info", "INHB300M");
			mav.setViewName("sample/main");
		} catch (Exception e) {
            LOGGER.error("[" + e.getClass() + "] Exception : " + e.getMessage());
        }
		return mav;
	}

}