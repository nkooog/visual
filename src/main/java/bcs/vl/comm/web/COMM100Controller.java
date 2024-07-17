package bcs.vl.comm.web;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
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
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import bcs.vl.comm.VO.COMM100VO;
import bcs.vl.comm.service.COMM100Service;
import bcs.vl.sysm.VO.SYSM210VO;
import bcs.vl.util.json.JsonUtil;
import egovframework.rte.fdl.property.EgovPropertyService;
/***********************************************************************************************
* Program Name : 공통 서비스 Controller
* Creator      : sukim
* Create Date  : 2022.02.03
* Description  : 공통 서비스
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2022.02.03     sukim            최초생성
************************************************************************************************/
@RestController
@RequestMapping("/comm/*")
public class COMM100Controller {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(COMM100Controller.class);
	
	@Resource(name = "COMM100Service")
	private COMM100Service COMM100Service;	
	
	@Resource( name = "propertiesService" )
	EgovPropertyService propertiesService;
	
	@Autowired
	SessionLocaleResolver localeResolver;

	@Autowired
	MessageSource messageSource;
	
    /**
     * @Method Name : COMM100SEL01
     * @작성일      : 2022.02.08
     * @작성자      : sukim
     * @변경이력    : 
     * @Method 설명 : 공통코드 목록조회
     *                대분류코드리스트에 해당하는 공통코드 리스트 조회
	 * @param       : ModelAndView, HttpServletRequest Restful param(대분류코드리스트)
	 * @return      : ModelAndView HashMap
     */    
    @RequestMapping(value ="/COMM100SEL01", method = RequestMethod.POST)
    @ResponseBody    
    public ModelAndView COMM100SEL01(Locale locale, ModelAndView mav, HttpServletRequest request) {
    	try {
            JSONObject jsonObject = JsonUtil.parseJSON(request);
            JSONArray codeArray = (JSONArray) jsonObject.get("codeList");
	    	
            Map<String, Object> param = new HashMap<String, Object>();
            List<String> codeList = new ArrayList<String>();
            for(int i=0 ; i<codeArray.size() ; i++){
            	JSONObject tempObj = (JSONObject) codeArray.get(i);
            	codeList.add((String)tempObj.get("CATEGORY"));
            }
            param.put("CATEGORYListMap", codeList);
            
	        List<COMM100VO> commCodeList = COMM100Service.COMM100SEL01(param);
	        ObjectMapper mapper = new ObjectMapper();
			
			HashMap<String, Object> hashMap = new HashMap<String, Object>();
			hashMap.put("codeList"  , mapper.writeValueAsString(commCodeList));
			hashMap.put("result"    , "0"); //성공이면 0, 에러이면 1을 넣는다.
		    mav.addAllObjects(hashMap);
		    mav.setViewName("jsonView");
    	}catch(Exception e) {
    		LOGGER.error("["+e.getClass()+"] Exception : " + e.getMessage());
    	}
		return mav;	
    }  	

    /**
     * @Method Name : COMM100SEL02
     * @작성일      : 2022.03.03
     * @작성자      : sukim
     * @변경이력    : 
     * @Method 설명 : 공통 태넌트명 조회
	 * @param       : 태넌트ID
	 * @return      : ModelAndView HashMap
     */    
    @RequestMapping(value ="/COMM100SEL02", method = RequestMethod.POST)
    @ResponseBody    
    public ModelAndView COMM100SEL02(Locale locale, ModelAndView mav, HttpServletRequest request) {
    	try {
        	JSONObject jsonObject = JsonUtil.parseJSON(request);
            COMM100VO vo = new COMM100VO();
	    	vo.setTenantPrefix((String) jsonObject.get("tenantPrefix"));
	    	String rtnObjName = (String) jsonObject.get("objName"); //테넌트명을 세팅할 객체
		    String rtnObjLvl = (String) jsonObject.get("objLvl"); //테넌트 레벨을 세팅할 객체
	    	
	    	List<COMM100VO> tenantInfo = COMM100Service.COMM100SEL02(vo);
	        ObjectMapper mapper = new ObjectMapper();
			HashMap<String, Object> hashMap = new HashMap<String, Object>();
			hashMap.put("result"    , mapper.writeValueAsString(tenantInfo));
			hashMap.put("ObjName"   , rtnObjName);
		    hashMap.put("ObjLvl"    , rtnObjLvl);
			hashMap.put("msg"       , messageSource.getMessage("success.common.select", null, "success select", locale));
		    mav.addAllObjects(hashMap);
		    mav.setViewName("jsonView");
    	}catch(Exception e) {
    		LOGGER.error("["+e.getClass()+"] Exception : " + e.getMessage());
    	}
		return mav;	
    }     

    /**
     * @Method Name : COMM100SEL03
     * @작성일      : 2022.04.12
     * @작성자      : sukim
     * @변경이력    : 
     * @Method 설명 : 공통 조직명, 조직경로 조회
	 * @param       : 태넌트ID, 조직코드
	 * @return      : ModelAndView HashMap
     */    
    @RequestMapping(value ="/COMM100SEL03", method = RequestMethod.POST)
    @ResponseBody    
    public ModelAndView COMM100SEL03(Locale locale, ModelAndView mav, HttpServletRequest request) {
    	try {
        	JSONObject jsonObject = JsonUtil.parseJSON(request);
            COMM100VO vo = new COMM100VO();
	    	vo.setTenantPrefix((String) jsonObject.get("tenantPrefix"));
	    	vo.setOrgCd((String) jsonObject.get("orgCd"));
	    	
	    	COMM100VO orgPath = COMM100Service.COMM100SEL03(vo);
	        ObjectMapper mapper = new ObjectMapper();
			HashMap<String, Object> hashMap = new HashMap<String, Object>();
			hashMap.put("result"    , mapper.writeValueAsString(orgPath));
			hashMap.put("msg"       , messageSource.getMessage("success.common.select", null, "success select", locale));
		    mav.addAllObjects(hashMap);
		    mav.setViewName("jsonView");
    	}catch(Exception e) {
    		LOGGER.error("["+e.getClass()+"] Exception : " + e.getMessage());
    	}
		return mav;	
    }
    
    /**
     * @Method Name : COMM100SEL04
     * @작성일      : 2022.04.12
     * @작성자      : sukim
     * @변경이력 : 
     * @Method 설명 : 리스트 형태 코드 조회
     * @param :
     * @return :
     */
   @RequestMapping(value ="/COMM100SEL04", method = RequestMethod.POST)
   @ResponseBody    
   public ModelAndView COMM100SEL04(ModelAndView mav, HttpServletRequest req) {
   	HashMap<String, Object> resultMap = new HashMap<>();
   	try {
   		
   		List<COMM100VO> list = COMM100Service.COMM100SEL04(new Gson().fromJson(new JsonUtil().readJsonBody(req), COMM100VO.class));
   		
   		resultMap.put("count", list.size());
			resultMap.put("list", new ObjectMapper().writeValueAsString(list));
			resultMap.put("msg", "정상적으로 조회하였습니다.");

			mav.addAllObjects(resultMap);
			mav.setStatus(HttpStatus.OK);
			mav.setViewName("jsonView");
   	}catch(Exception e) {
   		LOGGER.error("["+e.getClass()+"] Exception : " + e.getMessage());
   	}
		return mav;	
   }
   
   /**
    * @Method Name 	: COMM100SEL07
    * @작성일      	: 2024.02.06
    * @작성자      	: yhnam
    * @변경이력    	: 
    * @Method 설명	: 화면별 기능 권한
	* @param        : ModelAndView, HttpServletRequest Restful
	* @return       : ModelAndView HashMap
    */    
   @RequestMapping(value ="/COMM100SEL07", method = RequestMethod.POST)
   @ResponseBody    
   public ModelAndView COMM100SEL07(Locale locale, ModelAndView mav, HttpServletRequest request) {

	HashMap<String, Object> hashMap = new HashMap<String, Object>();

   	try {
   			COMM100VO vo = COMM100Service.COMM100SEL07(new Gson().fromJson(new JsonUtil().readJsonBody(request), COMM100VO.class));

			hashMap.put("fnAuth", vo);
		    mav.addAllObjects(hashMap);
		    mav.setViewName("jsonView");
   	}catch(Exception e) {
   		LOGGER.error("["+e.getClass()+"] Exception : " + e.getMessage());
   	}
		return mav;	
   }
}