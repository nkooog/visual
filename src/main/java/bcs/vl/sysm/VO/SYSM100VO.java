package bcs.vl.sysm.VO;

import bcs.vl.cmmn.VO.CMMNBASEVO;

/***********************************************************************************************
* Program Name : 시스템 관리 VO
* Creator      : dwson
* Create Date  : 2024.01.26
* Description  : 시스템 관리
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.26     dwson            최초생성
************************************************************************************************/
public class SYSM100VO extends CMMNBASEVO {

	private Integer systemIdx;
	private String systemName;
	private String description;
	private String isEnabled;
	
	private String tenantPrefix;
	
	private String isEnabledSystem;
	private String isEnabledTenant;

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
	public String getTenantPrefix() {
		return tenantPrefix;
	}
	public void setTenantPrefix(String tenantPrefix) {
		this.tenantPrefix = tenantPrefix;
	}
	public String getIsEnabledSystem() {
		return isEnabledSystem;
	}
	public void setIsEnabledSystem(String isEnabledSystem) {
		this.isEnabledSystem = isEnabledSystem;
	}
	public String getIsEnabledTenant() {
		return isEnabledTenant;
	}
	public void setIsEnabledTenant(String isEnabledTenant) {
		this.isEnabledTenant = isEnabledTenant;
	}
}