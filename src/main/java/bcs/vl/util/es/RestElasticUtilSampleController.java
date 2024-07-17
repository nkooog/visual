package bcs.vl.util.es;


import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import bcs.vl.util.json.JsonUtil;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;


@RestController  //테스트시 주석해제
@RequestMapping("/elk/sample/*") //테스트시 주석해제
public class RestElasticUtilSampleController {

	//TODO: 배포전 수정 필요
	private static final Logger LOGGER = LoggerFactory.getLogger(RestElasticUtilSampleController.class);

	@Resource(name = "RestElasticUtil")
	RestElasticUtil restElastic;

	/**
	 * @Method Name : KMSTTEMP Page
	 * @작성일      : test
	 * @작성자      : djjung
	 * @변경이력    :
	 */
	@RequestMapping("/KMSTTEMP")
	public ModelAndView KMSTTEMP() {
		return new ModelAndView("kmst/KMSTTEMP");
	}

	@RequestMapping(value ="/TEST01", method = RequestMethod.POST) //테스트시 주석해제
	@ResponseBody  //테스트시 주석해제
	public ModelAndView TEST01(ModelAndView mav, HttpServletRequest req) {
		HashMap<String, Object> resultMap = new HashMap<>();
		try {
			JSONObject obj = JsonUtil.parseJSON(req);

			String pw =(String.valueOf(obj.get("pw")));

			if(pw.equals("kmsttemp")) {
				int count = Integer.parseInt(String.valueOf(obj.get("count")));
				switch (count) {
					case 0:
						resultMap.put("result", restElastic.GetCatHelath());
						break;
					case 1:
						resultMap.put("result", restElastic.GetCatIndices());
						break;
					case 2:
						resultMap.put("result", restElastic.GetCatNodes());
						break;
				}
			}
			mav.addAllObjects(resultMap);
			mav.setStatus(HttpStatus.OK);
			mav.setViewName("jsonView");
		} catch (Exception e) {
			LOGGER.error("[" + e.getClass() + "] Exception : " + e.getMessage());
		}
		return mav;
	}

	@RequestMapping(value ="/TEST02", method = RequestMethod.POST) //테스트시 주석해제
	@ResponseBody  //테스트시 주석해제
	public ModelAndView TEST02(ModelAndView mav, HttpServletRequest req) {
		HashMap<String, Object> resultMap = new HashMap<>();
		try {
			JSONObject obj = JsonUtil.parseJSON(req);

			String pw =(String.valueOf(obj.get("pw")));

			if(pw.equals("kmsttemp")){
				String tenantid =(String.valueOf(obj.get("tenantPrefix")));

				int count = Integer.parseInt(String.valueOf(obj.get("count")));
				switch (count){
					case 0: resultMap.put("result_kmst", restElastic.CreateIndex(tenantid,"KMST"));
						resultMap.put("result_cmmt", restElastic.CreateIndex(tenantid,"CMMT"));
						break;
					case 1: resultMap.put("result_kmst",restElastic.DeleteIndex(tenantid,"KMST"));
						resultMap.put("result_cmmt",restElastic.DeleteIndex(tenantid,"CMMT"));
						break;
				}
			}
			mav.addAllObjects(resultMap);
			mav.setStatus(HttpStatus.OK);
			mav.setViewName("jsonView");
		} catch (Exception e) {
			LOGGER.error("[" + e.getClass() + "] Exception : " + e.getMessage());
		}
		return mav;
	}
}
