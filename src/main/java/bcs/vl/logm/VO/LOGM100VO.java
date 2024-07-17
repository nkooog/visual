package bcs.vl.logm.VO;

import java.sql.Timestamp;

import bcs.vl.cmmn.VO.CMMNBASEVO;

/***********************************************************************************************
* Program Name : 사용자 로그 VO
* Creator      : dwson
* Create Date  : 2024.01.26
* Description  : 사용자 로그
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.26     dwson            최초생성
************************************************************************************************/
public class LOGM100VO extends CMMNBASEVO {

	private String action;
	private int contentSeq;
	private String userId;
	private String regDate;
	private String ip;
	private String tenant;
	private String tenantName;
	
	private Integer systemIdx;
	private String systemName;

	private String title;

	public void setTitle(String title) {
		this.title = title;
	}

	public String getTitle() {
		return title;
	}

	public String getAction() {
		return action;
	}
	public void setAction(String action) {
		this.action = action;
	}
	public int getContentSeq() {
		return contentSeq;
	}
	public void setContentSeq(int contentSeq) {
		this.contentSeq = contentSeq;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getRegDate() {
		return regDate;
	}
	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	public String getTenant() {
		return tenant;
	}
	public void setTenant(String tenant) {
		this.tenant = tenant;
	}
	public String getTenantName() {
		return tenantName;
	}
	public void setTenantName(String tenantName) {
		this.tenantName = tenantName;
	}
	public Integer getSystemIdx() {
		return systemIdx;
	}

	public void setSystemIdx(Integer systemIdx) {
		this.systemIdx = systemIdx;
	}

	public String getSystemName() {
		return systemName;
	}
	public void setSystemName(String systemName) {
		this.systemName = systemName;
	}
}