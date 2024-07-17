package bcs.vl.util.xlsx;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.PrintWriter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.util.FileCopyUtils;
/***********************************************************************************************
* Program Name : apache.poi 유틸(ExcelDownload.java)
* Creator      : sukim
* Create Date  : 2021.12.20
* Description  : ExcelUtil
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2021.12.20     sukim            최초생성
************************************************************************************************/
public class ExcelDownload {
	
	public static void downLoadFile(HttpServletRequest request, HttpServletResponse response, String path, 
			String realFileNm, String titleFileNm) throws Exception {  	 
		
		File uFile = new File(path,realFileNm);
		int fSize = (int) uFile.length();
		if (fSize > 0) {
			String mimetype = "application/x-msdownload";
	 
			response.setContentType(mimetype);
			ExcelEncoder.setDisposition(titleFileNm, request, response);
			response.setContentLength(fSize);
			   
			BufferedInputStream in = null;
			BufferedOutputStream out = null;
	   
			try {
				in = new BufferedInputStream(new FileInputStream(uFile));
				out = new BufferedOutputStream(response.getOutputStream());
				FileCopyUtils.copy(in, out);
				out.flush();
			} catch (Exception ex) {
			} finally {
				if (in != null) in.close();
				if (out != null) out.close();
			}
		} else {
			response.setContentType("application/x-msdownload");
			PrintWriter printwriter = response.getWriter();
			printwriter.println("<html>");
			printwriter.println("<br><br><br><h2>Could not get file name:<br>" + titleFileNm + "</h2>");
			printwriter.println("<br><br><br><center><h3><a href='javascript: history.go(-1)'>Back</a></h3></center>");
			printwriter.println("<br><br><br>&copy; webAccess");
			printwriter.println("</html>");
			printwriter.flush();
			printwriter.close();
		}
	}
}