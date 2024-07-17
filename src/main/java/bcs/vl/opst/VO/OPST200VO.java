package bcs.vl.opst.VO;


import java.sql.Date;

import bcs.vl.cmmn.VO.CMMNBASEVO;

/***********************************************************************************************
* Program Name : 사용 통계 VO
* Creator      : dwson
* Create Date  : 2024.01.26
* Description  : 사용 통계
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.26     dwson            최초생성
************************************************************************************************/
public class OPST200VO extends CMMNBASEVO {

	private Date requestDate;
	private Integer systemIdx;
	private String systemName;
	private String tenantPrefix;
	private String tenantName;
	private String serviceType;
	private int requestCnt;
	private int successCnt;
	private int failCnt;
	private int smsCnt;
	private int popupCnt;
	
	public Date getRequestDate() {
		return requestDate;
	}
	public void setRequestDate(Date requestDate) {
		this.requestDate = requestDate;
	}
	public int getSystemIdx() {
		return systemIdx;
	}
	public void setSystemIdx(int systemIdx) {
		this.systemIdx = systemIdx;
	}
	public String getSystemName() {
		return systemName;
	}
	public void setSystemName(String systemName) {
		this.systemName = systemName;
	}
	public String getTenantPrefix() {
		return tenantPrefix;
	}
	public void setTenantPrefix(String tenantPrefix) {
		this.tenantPrefix = tenantPrefix;
	}
	public String getTenantName() {
		return tenantName;
	}
	public void setTenantName(String tenantName) {
		this.tenantName = tenantName;
	}
	public String getServiceType() {
		return serviceType;
	}
	public void setServiceType(String serviceType) {
		this.serviceType = serviceType;
	}
	public int getRequestCnt() {
		return requestCnt;
	}
	public void setRequestCnt(int requestCnt) {
		this.requestCnt = requestCnt;
	}
	public int getSuccessCnt() {
		return successCnt;
	}
	public void setSuccessCnt(int successCnt) {
		this.successCnt = successCnt;
	}
	public int getFailCnt() {
		return failCnt;
	}
	public void setFailCnt(int failCnt) {
		this.failCnt = failCnt;
	}
	public int getSmsCnt() {
		return smsCnt;
	}
	public void setSmsCnt(int smsCnt) {
		this.smsCnt = smsCnt;
	}
	public int getPopupCnt() {
		return popupCnt;
	}
	public void setPopupCnt(int popupCnt) {
		this.popupCnt = popupCnt;
	}
}