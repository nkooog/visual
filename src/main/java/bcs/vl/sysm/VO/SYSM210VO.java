package bcs.vl.sysm.VO;


/***********************************************************************************************
* Program Name : 태넌트 그룹 기본정보 VO
* Creator      : yhnam
* Create Date  : 2024.02.05
* Description  : 태넌트 그룹 기본정보
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.02.05     yhnam           최초생성
************************************************************************************************/
public class SYSM210VO {

	private String tenantGroupIdKey;
	private String tenantGroupId;
	private String tenantGroupNm;
	private String tenantGroupState;
	private String regDtm;
    private String regrId;
    private String lstCorcDtm;
    private String lstCorprId;
    private String TenantPrefix;
    private int count;
    private Integer systemIdx;

	public Integer getSystemIdx() {
		return systemIdx;
	}

	public void setSystemIdx(Integer systemIdx) {
		this.systemIdx = systemIdx;
	}
	public String getTenantGroupIdKey() {
		return tenantGroupIdKey;
	}
	public void setTenantGroupIdKey(String tenantGroupIdKey) {
		this.tenantGroupIdKey = tenantGroupIdKey;
	}
	public String getTenantGroupNm() {
		return tenantGroupNm;
	}
	public void setTenantGroupNm(String tenantGroupNm) {
		this.tenantGroupNm = tenantGroupNm;
	}
	public String getTenantGroupState() {
		return tenantGroupState;
	}
	public void setTenantGroupState(String tenantGroupState) {
		this.tenantGroupState = tenantGroupState;
	}
	public String getRegDtm() {
		return regDtm;
	}
	public void setRegDtm(String regDtm) {
		this.regDtm = regDtm;
	}
	public String getRegrId() {
		return regrId;
	}
	public void setRegrId(String regrId) {
		this.regrId = regrId;
	}
	public String getLstCorcDtm() {
		return lstCorcDtm;
	}
	public void setLstCorcDtm(String lstCorcDtm) {
		this.lstCorcDtm = lstCorcDtm;
	}
	public String getLstCorprId() {
		return lstCorprId;
	}
	public void setLstCorprId(String lstCorprId) {
		this.lstCorprId = lstCorprId;
	}
	public String getTenantPrefix() {
		return TenantPrefix;
	}
	public void setTenantPrefix(String tenantPrefix) {
		TenantPrefix = tenantPrefix;
	}
	public String getTenantGroupId() {
		return tenantGroupId;
	}
	public void setTenantGroupId(String tenantGroupId) {
		this.tenantGroupId = tenantGroupId;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
}
