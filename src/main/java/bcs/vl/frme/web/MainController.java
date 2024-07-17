package bcs.vl.frme.web;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import egovframework.rte.fdl.property.EgovPropertyService;

/***********************************************************************************************
* Program Name : main 웹 페이지 열기 Controller
* Creator      : jrlee
* Create Date  : 2024.01.24
* Description  : main 웹 페이지 열기
* Modify Desc  : 
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.24     dwson           최초생성
************************************************************************************************/
@RestController
public class MainController {

    private static final Logger LOGGER = LoggerFactory.getLogger(MainController.class);

    @Resource( name = "propertiesService" )
    EgovPropertyService propertiesService;
    /**
     * @Method Name : main
     * @작성일      : 2024.01.24
     * @작성자      : dwson
     * @변경이력    :
     * @Method 설명 : main 웹 페이지 열기
     * @param       :
     * @return      : main.jsp
     */
    @RequestMapping("/main")
    public ModelAndView main(ModelAndView mav, HttpSession session) {
        try {
            session.setAttribute("v",propertiesService.getString("Version") + " " + String.valueOf(Math.random()*10000).replace(".", ""));
        } catch (Exception e) {
            LOGGER.error("[" + e.getClass() + "] Exception : " + e.getMessage());
        }

        mav.setViewName("main");

        return mav;
    }
}