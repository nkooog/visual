package bcs.vl.sysm.VO;

import java.sql.Timestamp;

/***********************************************************************************************
* Program Name : 사용자활동내역 VO
* Creator      : yhnam
* Create Date  : 2024.02.08
* Description  : 사용자활동내역
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.02.08     yhnam           최초생성
************************************************************************************************/
public class SYSM500VO {

	private String tenantPrefix;
	private String dataFrmId;
	private String url;
	private String paramData;
	private String resultType;
	private String errorMsg;
	private String regDtm;
	private String regrId;
	private String authCheck;
	private String originTenantPrefix;
	private String originRegrId;

	public String getOriginTenantPrefix() {
		return originTenantPrefix;
	}
	public void setOriginTenantPrefix(String originTenantPrefix) {
		this.originTenantPrefix = originTenantPrefix;
	}
	public String getOriginRegrId() {
		return originRegrId;
	}
	public void setOriginRegrId(String originRegrId) {
		this.originRegrId = originRegrId;
	}
	public String getTenantPrefix() {
		return tenantPrefix;
	}
	public void setTenantPrefix(String tenantPrefix) {
		this.tenantPrefix = tenantPrefix;
	}
	public String getDataFrmId() {
		return dataFrmId;
	}
	public void setDataFrmId(String dataFrmId) {
		this.dataFrmId = dataFrmId;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getParamData() {
		return paramData;
	}
	public void setParamData(String paramData) {
		this.paramData = paramData;
	}
	public String getResultType() {
		return resultType;
	}
	public void setResultType(String resultType) {
		this.resultType = resultType;
	}
	public String getErrorMsg() {
		return errorMsg;
	}
	public void setErrorMsg(String errorMsg) {
		this.errorMsg = errorMsg;
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
	public String getAuthCheck() {
		return authCheck;
	}
	public void setAuthCheck(String authCheck) {
		this.authCheck = authCheck;
	}
}
