package bcs.vl.frme.web;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import bcs.vl.frme.service.FRME110Service;
/***********************************************************************************************
* Program Name : 사용자정보조회 Controller
* Creator      : dwson
* Create Date  : 2024.01.24
* Description  : 사용자정보조회 프레임
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.24     dwson            최초생성
************************************************************************************************/
@RestController
@RequestMapping("/frme/*")
public class FRME110Controller {
	
	@Resource(name = "FRME110Service")
	private FRME110Service FRME110Service;

	private static final Logger LOGGER = LoggerFactory.getLogger(FRME110Controller.class);

	@RequestMapping("/FRME110P")
	public ModelAndView FRME110P(Model model) {
		LOGGER.info("FRME110P 페이지 열기");
		ModelAndView mav = new ModelAndView("frme/FRME110P");
		return mav;
	}
	
}
