package bcs.vl.sysm.VO;

import bcs.vl.cmmn.VO.CMMNBASEVO;

/***********************************************************************************************
* Program Name : 테넌트 관리 VO
* Creator      : dwson
* Create Date  : 2024.02.05
* Description  : 테넌트 관리
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.02.05    dwson           최초생성
************************************************************************************************/
public class SYSM200VO extends CMMNBASEVO {
	
	private Integer systemIdx;
	private String systemName;
	private String tenantPrefix;
	private String tenantName;
	private String prefixAndName;
	private String description;
	private String isEnabled;
	
	private String tenantGroupId;
	private String tenantGroupNm;
	
	private String fmnm;
	
	private String usrGrd;

	public String getUsrGrd() {
		return usrGrd;
	}

	public void setUsrGrd(String usrGrd) {
		this.usrGrd = usrGrd;
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

	public String getPrefixAndName() {
		return prefixAndName;
	}

	public void setPrefixAndName(String prefixAndName) {
		this.prefixAndName = prefixAndName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getIsEnabled() {
		return isEnabled;
	}

	public void setIsEnabled(String isEnabled) {
		this.isEnabled = isEnabled;
	}

	public String getTenantGroupId() {
		return tenantGroupId;
	}

	public void setTenantGroupId(String tenantGroupId) {
		this.tenantGroupId = tenantGroupId;
	}

	public String getTenantGroupNm() {
		return tenantGroupNm;
	}

	public void setTenantGroupNm(String tenantGroupNm) {
		this.tenantGroupNm = tenantGroupNm;
	}

	public String getFmnm() {
		return fmnm;
	}

	public void setFmnm(String fmnm) {
		this.fmnm = fmnm;
	}
}
