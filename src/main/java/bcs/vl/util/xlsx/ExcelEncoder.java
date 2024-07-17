package bcs.vl.util.xlsx;

import java.io.IOException;
import java.net.URLEncoder;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
/***********************************************************************************************
* Program Name : apache.poi 유틸(ExcelEncoder.java)
* Creator      : sukim
* Create Date  : 2021.12.20
* Description  : ExcelUtil
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2021.12.20     sukim            최초생성
************************************************************************************************/
public class ExcelEncoder {
	
  	public static void setDisposition(String filename, HttpServletRequest request,
  			HttpServletResponse response) throws Exception {
		    String browser = getBrowser(request);
		    String dispositionPrefix = "attachment; filename=";
		    String encodedFilename = null;
		 
		    if (browser.equals("MSIE")) {
		        encodedFilename = URLEncoder.encode(filename, "UTF-8").replaceAll("\\+", "%20");
		    } else if (browser.equals("Firefox")) {
		        encodedFilename = "\""
		        + new String(filename.getBytes("UTF-8"), "8859_1") + "\"";
		    } else if (browser.equals("Opera")) {
		        encodedFilename = "\""
		        + new String(filename.getBytes("UTF-8"), "8859_1") + "\"";
		    } else if (browser.equals("Chrome")) {
		        StringBuffer sb = new StringBuffer();
		        for (int i = 0; i < filename.length(); i++) {
		        char c = filename.charAt(i);
		        if (c > '~') {
		            sb.append(URLEncoder.encode("" + c, "UTF-8"));
		        } else {
		            sb.append(c);
		        }
		    }
		    encodedFilename = sb.toString();
		    } else {
		        throw new IOException("Not supported browser");
		    }
		 
		    response.setHeader("Content-Disposition", dispositionPrefix
		    + encodedFilename);
		 
		    if ("Opera".equals(browser)) {
		        response.setContentType("application/octet-stream;charset=UTF-8");
		    }	
  	}
  	
  	public static String getBrowser(HttpServletRequest request) {
        String header = request.getHeader("User-Agent");
        if (header.indexOf("MSIE") > -1) {
             return "MSIE";
        } else if (header.indexOf("Chrome") > -1) {
             return "Chrome";
        } else if (header.indexOf("Opera") > -1) {
             return "Opera";
        } else if (header.indexOf("Firefox") > -1) {
             return "Firefox";
        } else if (header.indexOf("Mozilla") > -1) {
             if (header.indexOf("Firefox") > -1) {
                  return "Firefox";
             }else{
                  return "MSIE";
             }
        }
        return "MSIE";
   }  
}