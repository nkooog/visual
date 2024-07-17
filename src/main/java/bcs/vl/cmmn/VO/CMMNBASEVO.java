package bcs.vl.cmmn.VO;

import java.util.List;
import java.util.Map;

/***********************************************************************************************
* Program Name : 공통 검색 VO
* Creator      : dwson
* Create Date  : 2024.02.01
* Description  : 공통 검색
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.02.01    dwson           최초생성
************************************************************************************************/
public class CMMNBASEVO {
	// 검색
	private List<Map<String, String>> sort;
	private String searchType;
	private String keyword;
	private String startDate;
	private String endDate;
	
	// 저장
	private String regrId;
	private String regDtm;
	private String lstCorprId;
	private String lstCorcDtm;
	
	public List<Map<String, String>> getSort() {
		return sort;
	}
	public void setSort(List<Map<String, String>> sort) {
		this.sort = sort;
	}
	public String getSearchType() {
		return searchType;
	}
	public void setSearchType(String searchType) {
		this.searchType = searchType;
	}
	public String getKeyword() {
		return keyword;
	}
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public String getRegrId() {
		return regrId;
	}
	public void setRegrId(String regrId) {
		this.regrId = regrId;
	}
	public String getRegDtm() {
		return regDtm;
	}
	public void setRegDtm(String regDtm) {
		this.regDtm = regDtm;
	}
	public String getLstCorprId() {
		return lstCorprId;
	}
	public void setLstCorprId(String lstCorprId) {
		this.lstCorprId = lstCorprId;
	}
	public String getLstCorcDtm() {
		return lstCorcDtm;
	}
	public void setLstCorcDtm(String lstCorcDtm) {
		this.lstCorcDtm = lstCorcDtm;
	}
}
