package bcs.vl.opmt.web;

import java.awt.image.BufferedImage;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;

import bcs.vl.comm.VO.COMM120VO;
import bcs.vl.comm.service.COMM100Service;
import bcs.vl.lgin.VO.LGIN000VO;
import bcs.vl.opmt.VO.OPMT200VO;
import bcs.vl.opmt.service.OPMT200Service;
import bcs.vl.sysm.VO.SYSM100VO;
import bcs.vl.sysm.VO.SYSM200VO;
import bcs.vl.sysm.service.SYSM100Service;
import bcs.vl.sysm.service.SYSM200Service;
import bcs.vl.util.file.FileUtils;
import bcs.vl.util.json.JsonUtil;
import egovframework.rte.fdl.property.EgovPropertyService;
/***********************************************************************************************
* Program Name : 비주얼레터링 관리 Controller
* Creator      : yhnam
* Create Date  : 2024.02.26
* Description  : 비주얼레터링 관리
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.02.26     yhnam            최초생성
************************************************************************************************/
@RestController
@RequestMapping("/opmt/*")
public class OPMT200Controller {
	
	@Resource(name = "OPMT200Service")
	private OPMT200Service opmt200Service;
	
	@Resource(name = "SYSM100Service")
	private SYSM100Service sysm100Service;
	
	@Resource(name = "SYSM200Service")
	private SYSM200Service sysm200Service;
	
	@Resource( name = "propertiesService" )
	EgovPropertyService propertiesService;
	
	/* 로그 */
	@Resource(name = "COMM100Service")
	private COMM100Service COMM100Service;
	
	private String DATAFRMID = "OPMT200T";
	private String REQMAPPING = "/opmt";

	private static final Logger LOGGER = LoggerFactory.getLogger(OPMT200Controller.class);

    /**
     * @Method Name : OPMT200T
     * @작성일      : 2024.02.26
     * @작성자      : yhnam
     * @변경이력    : 
     * @Method 설명 : opmt/OPMT200T 웹 페이지 열기
	 * @param       :  
	 * @return      : opmt/OPMT200T.jsp 
     */	
	@RequestMapping("/OPMT200T")
	public ModelAndView OPMT200T() {
		return new ModelAndView("opmt/OPMT200T");
	}
	
	/**
     * @Method Name : OPMT201T
     * @작성일      : 2024.02.26
     * @작성자      : yhnam
     * @변경이력    : 
     * @Method 설명 : opmt/OPMT201T 웹 페이지 열기
	 * @param       :  
	 * @return      : opmt/OPMT201T.jsp 
     */	
	@RequestMapping("/OPMT201T")
	public ModelAndView OPMT201T(HttpServletRequest request) {

		ModelAndView mav = new ModelAndView("opmt/OPMT201T");
		
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		String contentSeq = request.getParameter("contentSeq");
		resultMap.put("contentSeq", contentSeq);
		mav.addAllObjects(resultMap);

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

			LGIN000VO sessionVo = (LGIN000VO) session.getAttribute("user");
			if(!"00".equals(sessionVo.getUsrGrd()) && !"SYS".equals(sessionVo.getTenantPrefix())) {
				vo.setTenantPrefix(sessionVo.getTenantPrefix());
				vo.setSystemIdx(sessionVo.getSystemIdx());
			}

			List<OPMT200VO> list = opmt200Service.OPMT200SEL01(vo);
		    resultMap.put("OPMT200VOInfo", objectMapper.writeValueAsString(list));

		    if(vo.getContentSeq() > 0)
		    {
//		    	vo.setUseYn("Y");
		    	OPMT200VO OPMT200VOButtonInfo = opmt200Service.OPMT200SEL04(vo);
		    	resultMap.put("OPMT200VOButtonInfo", objectMapper.writeValueAsString(OPMT200VOButtonInfo));
		    }

		    mav.addAllObjects(resultMap);
			mav.setStatus(HttpStatus.OK);
			mav.setViewName("jsonView");
		} catch(Exception e) {
		    LOGGER.error("["+e.getClass()+"] Exception : " + e.getMessage());
		    resultType = "실패";
			errorMsg = e.getMessage();
		} finally {
			COMM100Service.userLogInsert(DATAFRMID, REQMAPPING + "/OPMT200SEL01", jsonStr, resultType, errorMsg, session);
		}

		mav.setViewName("jsonView");

        return mav;
	}
	
	/**
	 * @Method Name : OPMT200SEL02
	 * @작성일      	: 2024.02.26
	 * @작성자      	: yhnam
	 * @변경이력    	:
	 * @Method 설명 	: 시스템 리스트 조회
	 * @param       : ModelAndView
	 * @return      : ModelAndView HashMap
	 */
	@RequestMapping(value = "/OPMT200SEL02", method = RequestMethod.POST)
	public ModelAndView OPMT200SEL02(ModelAndView mav, HttpServletRequest request, HttpSession session) throws Exception {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		ObjectMapper objectMapper = new ObjectMapper();
		
		List<SYSM100VO> list;

		/* 로그 */
		String jsonStr = "";
		String resultType = "성공";
		String errorMsg = "";

		try {
			LGIN000VO sessionVo = (LGIN000VO) session.getAttribute("user");

			SYSM100VO vo = new SYSM100VO();
			vo.setIsEnabledSystem("1");
			vo.setIsEnabledTenant("1");
			vo.setIsEnabled("1");
			if(!"00".equals(sessionVo.getUsrGrd()) && !"SYS".equals(sessionVo.getTenantPrefix()))
			{
				vo.setTenantPrefix(sessionVo.getTenantPrefix());
				vo.setSystemIdx(sessionVo.getSystemIdx());

				jsonStr = ToStringBuilder.reflectionToString(vo);

				list = sysm100Service.SYSM100SEL02(vo);
			}
			else
			{
				jsonStr = ToStringBuilder.reflectionToString(vo);

				list = sysm100Service.SYSM100SEL01(vo);
			}

		    resultMap.put("OPMT200Info", objectMapper.writeValueAsString(list));

		    mav.addAllObjects(resultMap);
			mav.setStatus(HttpStatus.OK);
			mav.setViewName("jsonView");
		} catch(Exception e) {
		    LOGGER.error("["+e.getClass()+"] Exception : " + e.getMessage());
		    resultType = "실패";
			errorMsg = e.getMessage();
		} finally {
			COMM100Service.userLogInsert(DATAFRMID, REQMAPPING + "/OPMT200SEL02", jsonStr, resultType, errorMsg, session);
		}

		mav.setViewName("jsonView");

        return mav;
	}
	
	/**
	 * @Method Name : OPMT200SEL03
	 * @작성일      	: 2024.02.26
	 * @작성자      	: yhnam
	 * @변경이력    	:
	 * @Method 설명 	: 테넌트 리스트 조회
	 * @param       : ModelAndView
	 * @return      : ModelAndView HashMap
	 */
	@RequestMapping(value = "/OPMT200SEL03", method = RequestMethod.POST)
	public ModelAndView OPMT200SEL03(ModelAndView mav, HttpServletRequest request, HttpSession session) throws Exception {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		ObjectMapper objectMapper = new ObjectMapper();

		/* 로그 */
		String jsonStr = "";
		String resultType = "성공";
		String errorMsg = "";

		try {
			LGIN000VO sessionVo = (LGIN000VO) session.getAttribute("user");

			SYSM200VO vo = new SYSM200VO();
			vo.setIsEnabled("1");
			if(!"00".equals(sessionVo.getUsrGrd()) && !"SYS".equals(sessionVo.getTenantPrefix()))
			{
				vo.setSystemIdx(sessionVo.getSystemIdx());
				vo.setTenantPrefix(sessionVo.getTenantPrefix());
			} else {
				JsonUtil jsonUtils = new JsonUtil();
				Gson gson = new Gson();
				String pJsonStr = jsonUtils.readJsonBody(request);
				if(!pJsonStr.equals("{}"))
				{
					SYSM200VO pVo = gson.fromJson(pJsonStr, SYSM200VO.class);
					if(pVo != null && pVo.getSystemIdx() > 0) vo.setSystemIdx(pVo.getSystemIdx());	
				}
			}

			jsonStr = ToStringBuilder.reflectionToString(vo);

			List<SYSM200VO> list = sysm200Service.SYSM200SEL01(vo);

		    resultMap.put("OPMT200Info", objectMapper.writeValueAsString(list));

		    mav.addAllObjects(resultMap);
			mav.setStatus(HttpStatus.OK);
			mav.setViewName("jsonView");
		} catch(Exception e) {
		    LOGGER.error("["+e.getClass()+"] Exception : " + e.getMessage());
		    resultType = "실패";
			errorMsg = e.getMessage();
		} finally {
			COMM100Service.userLogInsert(DATAFRMID, REQMAPPING + "/OPMT200SEL03", jsonStr, resultType, errorMsg, session);
		}

		mav.setViewName("jsonView");

        return mav;
	}
	
	/**
	 * @Method Name : OPMT200ImgCheck
	 * @작성일      	: 2024.02.26
	 * @작성자      	: yhnam
	 * @변경이력    	:
	 * @Method 설명 	: 이미지 체크
	 * @param       : ModelAndView
	 * @return      : ModelAndView HashMap
	 */
	@RequestMapping(value ="/OPMT200ImgCheck", method = RequestMethod.POST)
	@ResponseBody    
	public ModelAndView OPMT200ImgCheck(Locale locale, ModelAndView mav, MultipartHttpServletRequest mpfRequest, HttpSession session) throws Exception{
		HashMap<String, Object> resultMap = new HashMap<>();
		
		/* 로그 */
		String jsonStr = "";
		String resultType = "성공";
		String errorMsg = "";

		try {
			MultipartFile file = mpfRequest.getFile("uploadimage");
			if("image/jpeg".equals(file.getContentType()) || "image/png".equals(file.getContentType()) || "image/gif".equals(file.getContentType()))
			{
				resultMap.put("result", "success");
			}else
			{
				resultMap.put("result", "fail");
				resultMap.put("msg", "파일 형식이 안맞습니다.");
			}

			mav.addAllObjects(resultMap);

		} catch (Exception e) {
			LOGGER.error("["+e.getClass()+"] Exception : " + e.getMessage());
			resultMap.put("result", "error");
			resultMap.put("msg", "다시 한번 이용해 주세요.");
			mav.addAllObjects(resultMap);
			
			resultType = "실패";
			errorMsg = e.getMessage();
		} finally {
			COMM100Service.userLogInsert(DATAFRMID, REQMAPPING + "/OPMT200ImgCheck", jsonStr, resultType, errorMsg, session);
		}
		
		mav.setViewName("jsonView");
		return mav;
	}
	
	/**
	 * @Method Name : OPMT200INS01
	 * @작성일      	: 2024.02.26
	 * @작성자      	: yhnam
	 * @변경이력    	:
	 * @Method 설명 	: 컨텐츠 등록
	 * @param       : ModelAndView
	 * @return      : ModelAndView HashMap
	 */
	@RequestMapping(value ="/OPMT200INS01", method = RequestMethod.POST)
	@ResponseBody    
	public ModelAndView OPMT200INS01(Locale locale, ModelAndView mav, MultipartHttpServletRequest mpfRequest, @RequestParam("OPMT200INS01_data") String jsonData, HttpServletRequest request, HttpSession session) throws Exception{
		HashMap<String, Object> resultMap = new HashMap<>();
		Gson gson = new Gson();

		try
		{
			LGIN000VO sessionVo = (LGIN000VO) session.getAttribute("user");

			JSONObject obj = JsonUtil.parseJSONString(jsonData);
			OPMT200VO vo = gson.fromJson(jsonData, OPMT200VO.class);

			boolean isCheck = false;

			vo.setRegId(sessionVo.getAgentId());
			String ip = request.getHeader("X-Forwarded-For");
			vo.setIp(ip);

			vo.setBottomButtonUseyn("N");
			vo.setBottomButtonCnt(0);
			if(vo.getFormButtonSizeList().size() > 0)
			{
				vo.setBottomButtonUseyn("Y");
				vo.setBottomButtonCnt(vo.getFormButtonSizeList().size());
			}
			
			if(!"00".equals(sessionVo.getUsrGrd()) && !"SYS".equals(sessionVo.getTenantPrefix())) {
				vo.setTenantPrefix(sessionVo.getTenantPrefix());
				vo.setSystemIdx(sessionVo.getSystemIdx());
			}

			// content insert
			if("SAVE".equals(obj.get("saveType")))
			{
				vo.setAction("등록");

				// content insert
				opmt200Service.OPMT200INS01(vo);

				// MessageBody insert
				// MessageBodyParameter insert
				// MessageHeader insert
				
				resultMap.put("msg", "등록 되었습니다.");

				isCheck = true;
			}
			else if(("UPDT".equals(obj.get("saveType")) && obj.get("contentSeq") != null && !"".equals(obj.get("contentSeq"))))
			{
				vo.setAction("수정");
				// update

				// content update
				opmt200Service.OPMT2000UPT01(vo);

				// MessageBody update
				// MessageBodyParameter update
				// MessageHeader update
				
				// button delete
				opmt200Service.OPMT200DEL03(vo);

				resultMap.put("msg", "수정 되었습니다.");

				isCheck = true;
			}
			else
			{
				resultMap.put("result", "fail");
				resultMap.put("msg", "다시 한번 이용해 주세요.");
				mav.addAllObjects(resultMap);
				mav.setViewName("jsonView");
				return mav;
			}
			
			// button insert
			if(vo.getFormButtonSizeList().size() > 0)
			{
				for(int i=0; i < vo.getFormButtonSizeList().size(); i++)
				{
					Map<String, Object> map1 = vo.getButtonTitleList().get(i);
					Map<String, Object> map2 = vo.getButtonLinkList().get(i);
					Map<String, Object> map3 = vo.getFormButtonSizeList().get(i);
					Map<String, Object> map4 = vo.getButtonUseynList().get(i);

					vo.setOrd(i+1);
					vo.setButtonTitle(map1.get("buttonTitle").toString());
					vo.setButtonLink(map2.get("buttonLink").toString());
					vo.setButtonSize(map3.get("buttonSize").toString());
					vo.setUseYn(map4.get("buttonUseyn").toString());

					opmt200Service.OPMT200INS03(vo);
				}
			}

			// 파일 업로드
			if(isCheck && "SAVE".equals(obj.get("saveType")) || ("UPDT".equals(obj.get("saveType")) && obj.get("contentSeq") != null && !"".equals(obj.get("contentSeq")) && mpfRequest.getFile("uploadimage") != null))
			{
				MultipartFile file = mpfRequest.getFile("uploadimage");
				BufferedImage bufferedImage = ImageIO.read(file.getInputStream());
				List<MultipartFile> fileList = mpfRequest.getFiles("uploadimage");
				
				String contentSeq = "";
				if("UPDT".equals(obj.get("saveType"))) contentSeq = obj.get("contentSeq").toString();
				else contentSeq = vo.getContentSeq() + "";

				String savePath = "";
				String realFileName = "";
				String fileName = "";
				String mimeType = file.getContentType();
				long fileSize = file.getSize();
			    int width = bufferedImage.getWidth();
			    int height = bufferedImage.getHeight();
				if("image/jpeg".equals(mimeType) || "image/png".equals(mimeType) || "image/gif".equals(mimeType))
				{
					if(fileList.size()>0) {
						List<COMM120VO> fileVoList = FileUtils.uploadPreJob2(propertiesService.getString(String.valueOf(obj.get("uploadPath"))), obj.get("tenantPrefix").toString() + "/" + obj.get("systemIdx").toString() + "/" + obj.get("category").toString() + "/", obj.get("tenantPrefix").toString() + "_" + contentSeq + "_" +obj.get("category").toString(), fileList);

						savePath = fileVoList.get(0).getApndFilePsn();
						realFileName = fileVoList.get(0).getApndFileIdxNm();
						fileName = fileVoList.get(0).getApndFileNm();

						vo.setSavePath(savePath);
						vo.setFileName(fileName);
						vo.setFileSize(fileSize);
						vo.setMimeType(mimeType);
						vo.setImgWidth(width);
						vo.setImgHeight(height);

						// VISUALLETTERINGFILE insert
						if("SAVE".equals(obj.get("saveType")))
						{
							vo.setRealFileName(realFileName);
							opmt200Service.OPMT200INS02(vo);
						}
						else
						{
							// VISUALLETTERINGFILE update
							opmt200Service.OPMT2000UPT02(vo);
						}
					}
				}
				else
				{
					resultMap.put("result", "fail");
					resultMap.put("msg", "파일 형식이 안맞습니다.");
				}
			}

			opmt200Service.OPMT200INSLog(vo);

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
	
	/**
	 * @Method Name : OPMT200INS04
	 * @작성일      	: 2024.02.26
	 * @작성자      	: yhnam
	 * @변경이력    	:
	 * @Method 설명 	: 적용 등록
	 * @param       : ModelAndView
	 * @return      : ModelAndView HashMap
	 */
	@RequestMapping(value ="/OPMT200INS04", method = RequestMethod.POST)
	@ResponseBody    
	public ModelAndView OPMT200INS04(ModelAndView mav, HttpServletRequest request, HttpSession session) throws Exception{
		HashMap<String, Object> resultMap = new HashMap<>();
		Gson gson = new Gson();
		JsonUtil jsonUtils = new JsonUtil();

		/* 로그 */
		String jsonStr = "";
		String resultType = "성공";
		String errorMsg = "";

		try
		{
			jsonStr = jsonUtils.readJsonBody(request);

			OPMT200VO vo = gson.fromJson(jsonStr, OPMT200VO.class);

			if(vo.getContentSeq() > 0)
			{
				LGIN000VO sessionVo = (LGIN000VO) session.getAttribute("user");
				
				if(!"00".equals(sessionVo.getUsrGrd()) && !"SYS".equals(sessionVo.getTenantPrefix())) {
					vo.setTenantPrefix(sessionVo.getTenantPrefix());
					vo.setSystemIdx(sessionVo.getSystemIdx());
				}

				List<OPMT200VO> list = opmt200Service.OPMT200SEL01(vo);

				if(list != null && list.size() > 0)
				{
					OPMT200VO info = list.get(0);
					if(info != null && info.getSystemIdx() != null && !"".equals(info.getSystemIdx()) && info.getTenantPrefix() != null && !"".equals(info.getTenantPrefix()))
					{
						info.setRegId(sessionVo.getAgentId());

						info.setParamName("EpilogueCustomUrl");
						if("p".equals(info.getCategory())) info.setParamName("PrologueCustomUrl");

						// MessageBodyParameter delete
						opmt200Service.OPMT200DEL04(info);

						String[] serviceType = new String[]{"I", "O"};
						for(int i=0; i<serviceType.length; i++)
						{
							info.setServiceType(serviceType[i]);
							info.setMessageType("IP1000Q");

							info.setParamValue(propertiesService.getString("VL_CONTENT_URL") + "/visual/content/OPMTContent201T?contentSeq="+info.getContentSeq());

							// MessageBodyParameter insert
							opmt200Service.OPMT200INS04(info);
						}

						// TB_CONTENT update
						info.setApplyYn("N");
						info.setContentSeq(0);
						opmt200Service.OPMT200UPT04(info);

						info.setApplyYn("Y");
						info.setContentSeq(vo.getContentSeq());
						opmt200Service.OPMT200UPT04(info);
						
						// 로그
						vo.setAction("적용");
						vo.setTenantPrefix(info.getTenantPrefix());
						vo.setRegId(sessionVo.getAgentId());
						String ip = request.getHeader("X-Forwarded-For");
						vo.setIp(ip);
						opmt200Service.OPMT200INSLog(vo);
					}
					
					mav.addAllObjects(resultMap);
					mav.setStatus(HttpStatus.OK);
				}
			}

		} catch (Exception e) {
			resultType = "실패";
			errorMsg = e.getMessage();
			resultMap.put("result", "error");
			resultMap.put("msg", "실패 했습니다.<br/>다시 한번 이용해 주세요.");
			resultMap.put("errorMsg", e.toString());
			mav.addAllObjects(resultMap);
		} finally {
			COMM100Service.userLogInsert(DATAFRMID, REQMAPPING + "/OPMT200SEL03", jsonStr, resultType, errorMsg, session);
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