package bcs.vl.util.xlsx;
 
import java.io.IOException;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletResponse;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.VerticalAlignment;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.streaming.SXSSFSheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
/***********************************************************************************************
* Program Name : apache.poi 유틸(ExcelUtil.java)
* Creator      : sukim
* Create Date  : 2021.12.20
* Description  : ExcelUtil
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2021.12.20     sukim            최초생성
************************************************************************************************/
public class ExcelUtil {

    private int rowNum = 0;
    
    //HttpServletResponse 경우
    public void createExcelToResponse(List<Map<String, Object>> datas, String filename, 
    		String[] header, HttpServletResponse response) throws IOException {

      	//HSSF : EXCEL 2007 이전 버전(.xls) - 65535 라인까지 사용가능
      	//XSSF : EXCEL 2007 이후 버전(2007포함 .xlsx - 65535 라인 이상 사용가능
      	//SXSSF : XSSF의 Streaming Version으로 메모리를 적게 사용 - 65535 라인 이상 사용가능   
    	
    	Workbook workbook = new SXSSFWorkbook(); // 성능 개선 버전
        //Sheet sheet = workbook.createSheet(filename);
    	SXSSFSheet sheet = (SXSSFSheet) workbook.createSheet(filename);
        sheet.setRandomAccessWindowSize(100);

        rowNum = 0;
        
        createExcel(sheet, header, datas, workbook);
        
        // 컨텐츠 타입과 파일명 지정
        response.setContentType("application/vnd.ms-excel");
        String outputFileName = new String(filename.getBytes("KSC5601"), "8859_1");
        response.setHeader("Content-Disposition", String.format("attachment;filename=%s.xlsx", outputFileName));

        workbook.write(response.getOutputStream());
        workbook.close();
    }

    //엑셀 생성
    private void createExcel(Sheet sheet, String[] header, List<Map<String, Object>> datas,Workbook workbook) {
    	
    	Row row = null;
    	Cell cell = null;
    	
    	//공통 스타일
    	CellStyle cellStyle =workbook.createCellStyle();
    	cellStyle.setBorderTop(BorderStyle.THIN);
    	cellStyle.setBorderLeft(BorderStyle.THIN);
    	cellStyle.setBorderRight(BorderStyle.THIN);
    	cellStyle.setBorderBottom(BorderStyle.THIN);
    	
    	//정렬
    	//cellStyle.setAlignment(HorizontalAlignment.CENTER);
    	cellStyle.setVerticalAlignment(VerticalAlignment.CENTER);
    	
    	//폰트
    	Font fontOfGothic = workbook.createFont();
    	fontOfGothic.setFontName("고딕");
    	cellStyle.setFont(fontOfGothic);
    	
    	//헤더 스타일
    	CellStyle headerStyle =workbook.createCellStyle();
    	headerStyle.cloneStyleFrom(cellStyle);
    	headerStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
    	headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
    	
        //Header row 생성
        row = sheet.createRow(rowNum++);
        
        //Header
        for (int i=0; i < header.length; i++) {
        	cell = row.createCell(i);        	
        	cell.setCellStyle(headerStyle);     				//Header cell에 스타일 삽입
        	cell.setCellValue(header[i]);       				//Header cell에 데이터 삽입
        	sheet.setColumnWidth(i, (sheet.getColumnWidth(i))+1024 ); //칼럼 사이즈 +1024 만큼 늘림
        }
    	 
        //Body
        for (Map<String, Object> data : datas) {
            row = sheet.createRow(rowNum++);
            int cellNum = 0;
            for (String key : data.keySet()) {
                //cell 생성
                cell = row.createCell(cellNum++);
                cell.setCellStyle(cellStyle);  //cell에 스타일 삽입
                cell.setCellValue(data.get(key) != null ? data.get(key).toString() : ""); //cell에 데이터 삽입
            }
        }
    }
}
