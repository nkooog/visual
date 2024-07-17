package bcs.vl.comm.web;

import java.util.HashMap;
import java.util.List;
import java.util.Locale;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springmodules.validation.commons.DefaultBeanValidator;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;

import bcs.vl.comm.VO.COMM110VO;
import bcs.vl.comm.service.COMM110Service;
import bcs.vl.lgin.VO.LGIN000VO;
import bcs.vl.lgin.service.LGIN000Service;
import bcs.vl.util.com.ComnFun;
import bcs.vl.util.crypto.AES256Crypt;
import bcs.vl.util.json.JsonUtil;

/***********************************************************************************************
 * Program Name : GV(전역변수) Controller
 * Creator      : dwson
 * Create Date  : 2024.01.26
 * Description  : 전역변수(테넌트 및 사용자) 변경
 * Modify Desc  :
 * -----------------------------------------------------------------------------------------------
 * Date         | Updater        | Remark
 * -----------------------------------------------------------------------------------------------
 * 2024.01.26     dwson           최초생성
 ************************************************************************************************/

@RestController
@RequestMapping("/comm/*")
public class COMM110Controller {
	private static final Logger LOGGER = LoggerFactory.getLogger(COMM110Controller.class);

	@Resource(name = "COMM110Service")
	private COMM110Service comm110Service;

	@Resource(name = "beanValidator")
	protected DefaultBeanValidator beanValidator;

	@Resource(name = "LGIN000Service")
	private LGIN000Service lgin000Service;
	
	private COMM110VO voSetting150 (HttpServletRequest req) throws Exception{
		return new Gson().fromJson(new JsonUtil().readJsonBody(req), COMM110VO.class);
	}
	
	@Autowired
	MessageSource messageSource;

	/**
	 * @Method Name : COMM110P
	 * @작성일      : 2024.01.26
	 * @작성자      : dwson
	 * @변경이력    :
	 * @Method 설명 : comm/COMM110P 웹 페이지 열기
	 * @param       :
	 * @return      : comm/COMM110P.jsp
	 */
	@RequestMapping("/COMM110P")
	public ModelAndView COMM110P() {
		return new ModelAndView("comm/COMM110P");
	}

	/**
	 * @Method Name : COMM110SEL01
	 * @작성일      : 2024.01.26
	 * @작성자      : dwson
	 * @변경이력    :
	 * @Method 설명 : 테넌트 조회
	 */
	@RequestMapping(value ="/COMM110SEL01", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView COMM110SEL01(ModelAndView mav, HttpServletRequest req){
		HashMap<String, Object> resultMap = new HashMap<>();
		try {
			COMM110VO vo = new ObjectMapper().readValue(new JsonUtil().readJsonBody(req),COMM110VO.class);
			List<COMM110VO> list = comm110Service.COMM110SEL01(vo);

			resultMap.put("list",list);
			mav.addAllObjects(resultMap);
			mav.setStatus(HttpStatus.OK);
			mav.setViewName("jsonView");

		}catch (Exception e){
			LOGGER.error("[" + e.getClass() + "] Exception : " + e.getMessage());
			e.printStackTrace();
		}
		return mav;
	}

	/**
	 * @Method Name : COMM110SEL02
	 * @작성일      : 2024.01.26
	 * @작성자      : dwson
	 * @변경이력    :
	 * @Method 설명 : 테넌트 소속 사용자 조회
	 */
	@RequestMapping(value ="/COMM110SEL02", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView COMM110SEL02(ModelAndView mav, HttpServletRequest req){
		HashMap<String, Object> resultMap = new HashMap<>();
		try {
			COMM110VO vo = new ObjectMapper().readValue(new JsonUtil().readJsonBody(req),COMM110VO.class);
			List<COMM110VO> list = comm110Service.COMM110SEL02(vo);

			resultMap.put("list",list);
			mav.addAllObjects(resultMap);
			mav.setStatus(HttpStatus.OK);
			mav.setViewName("jsonView");

		}catch (Exception e){
			LOGGER.error("[" + e.getClass() + "] Exception : " + e.getMessage());
			e.printStackTrace();
		}
		return mav;
	}

	/**
	 * @Method Name : COMM110SEL03
	 * @작성일      : 2024.01.26
	 * @작성자      : dwson
	 * @변경이력    :
	 * @Method 설명 : 세션 설정
	 */
	@RequestMapping(value ="/COMM110SEL03", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView COMM110SEL03(ModelAndView mav, HttpServletRequest req, HttpSession session){
		HashMap<String, Object> resultMap = new HashMap<>();
		try {
			LGIN000VO vo = new ObjectMapper().readValue(new JsonUtil().readJsonBody(req),LGIN000VO.class);

			int intCheck = 0;
			if(vo.getUsrGrd().equals("00") || vo.getTenantPrefix().equals("SYS"))
			{
				// 20240531 SystemIdx 추가
				if(!vo.getOriginUsrGrd().equals(vo.getUsrGrd()) || !vo.getOriginTenantPrefix().equals(vo.getTenantPrefix()) || !(vo.getOriginSystemIdx() == vo.getSystemIdx())) intCheck = 2;
				else intCheck = 1;
			}

			if(intCheck != 1)
			{
				String tenantPrefix = vo.getTenantPrefix();
				// 20240531 SystemIdx 추가
				int systemIdx = ("SYS".equals(tenantPrefix)) ? 1 : vo.getSystemIdx();

				LGIN000VO sessionVO = null;
				
				// 테넌트에 사용자 정보가 없어도 로그인한 정보로 유지하여 테넌트만 변경(원하지 않을 시 주석 품)
//				if(intCheck == 0) sessionVO = lgin000Service.LGIN000SEL02(vo);
//				else if(intCheck == 2)
//				{
//					if(vo.getOriginAgentId() != null && !"".equals(vo.getOriginAgentId()))
//					{
//						vo.setTenantPrefix(vo.getOriginTenantPrefix());
//						vo.setAgentId(vo.getOriginAgentId());
//						sessionVO = lgin000Service.LGIN000SEL07(vo);
//					}
//				}
				//

				// 테넌트에 사용자 정보가 없어도 로그인한 정보로 유지하여 테넌트만 변경(원하지 않을 시 주석 처리)
				if(vo.getOriginAgentId() != null && !"".equals(vo.getOriginAgentId()))
				{
					vo.setTenantPrefix(vo.getOriginTenantPrefix());
					vo.setAgentId(vo.getOriginAgentId());
					// 20240531 SystemIdx 추가
					vo.setSystemIdx(vo.getOriginSystemIdx());
					sessionVO = lgin000Service.LGIN000SEL07(vo);
				}
				//

				if(sessionVO != null){

					// 테넌트에 사용자 정보가 없어도 로그인한 정보로 유지하여 테넌트만 변경(원하지 않을 시 주석 처리)
					sessionVO.setTenantPrefix(tenantPrefix);
					sessionVO.setTenantGroupId(vo.getTenantGroupId());
					sessionVO.setUsrGrd(vo.getUsrGrd());
					// 20240531 SystemIdx 추가
					sessionVO.setSystemIdx(systemIdx);
					//
					
					sessionVO.setOriginTenantPrefix(vo.getOriginTenantPrefix());
					sessionVO.setOriginUsrGrd(vo.getOriginUsrGrd());
					sessionVO.setOriginAgentId(vo.getOriginAgentId());
					// 20240531 SystemIdx 추가
					sessionVO.setOriginSystemIdx(vo.getOriginSystemIdx());

					session.setAttribute("user", sessionVO);
					resultMap.put("msg", "정상적으로 변경되었습니다.");
					resultMap.put("result", true);
				}else{
					resultMap.put("msg", "만료된 사용자입니다.");
					resultMap.put("result", false);
				}
			}else{
				resultMap.put("msg", "권한이 제한된 아이디 입니다.");
				resultMap.put("result", false);
			}

			mav.addAllObjects(resultMap);
			mav.setStatus(HttpStatus.OK);
			mav.setViewName("jsonView");

		}catch (Exception e){
			LOGGER.error("[" + e.getClass() + "] Exception : " + e.getMessage());
			e.printStackTrace();
		}

		return mav;
	}

	/**
	 * @Method Name : COMM110SEL04
	 * @작성일      : 2024.01.26
	 * @작성자      : djjung
	 * @변경이력    :
	 * @Method 설명 : 세션 설정
	 */
	@RequestMapping(value ="/COMM110SEL04", method = RequestMethod.POST)
	@ResponseBody
	public ModelAndView COMM110SEL04(Locale locale, ModelAndView mav, HttpServletRequest request){
		HashMap<String, Object> hashMap = new HashMap<>();
		try {
			List<COMM110VO> cdList = comm110Service.COMM110SEL04(voSetting150(request));
			hashMap.put("cdList", cdList);
			hashMap.put("msg", messageSource.getMessage("success.common.select", null, "success.common.select", locale));
			mav.addAllObjects(hashMap);
			mav.setViewName("jsonView");
		}catch (Exception e){
			LOGGER.error("[" + e.getClass() + "] Exception : " + e.getMessage());
			e.printStackTrace();
		}
		return mav;
	}
}

