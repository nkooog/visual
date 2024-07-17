package bcs.vl.sysm.VO;

import java.util.Date;

/***********************************************************************************************
* Program Name : 태넌트 정보관리 팝업 VO
* Creator      : 김보영
* Create Date  : 2022.01.10
* Description  : 태넌트 정보관리
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2022.01.10    김보영           최초생성
************************************************************************************************/
public class SYSM201VO {

	private String tenantPrefix;
	private String dmnCd;

	private String spTypCd;

	private String tenantStCd;
	private String tenantStRsnCd;
	private String fmnm;
	private String fmnmEng;
	private String reprNm;
	private String reprNmEng;
	private String svcTypCd;
	private String usrAcCnt;
	private String emlSndGrpsAddr;
	private String mlingCd;
	private String orgLvlCd;
	private Date svcContDd;
	private Date svcBltnDd;
	private Date svcExpryDd;
	private Date svcTrmnDd;

	public String getTenantPrefix() {
		return tenantPrefix;
	}

	public void setTenantPrefix(String tenantPrefix) {
		this.tenantPrefix = tenantPrefix;
	}

	public String getDmnCd() {
		return dmnCd;
	}

	public void setDmnCd(String dmnCd) {
		this.dmnCd = dmnCd;
	}

	public String getSpTypCd() {
		return spTypCd;
	}

	public void setSpTypCd(String spTypCd) {
		this.spTypCd = spTypCd;
	}

	public String getTenantStCd() {
		return tenantStCd;
	}

	public void setTenantStCd(String tenantStCd) {
		this.tenantStCd = tenantStCd;
	}

	public String getTenantStRsnCd() {
		return tenantStRsnCd;
	}

	public void setTenantStRsnCd(String tenantStRsnCd) {
		this.tenantStRsnCd = tenantStRsnCd;
	}

	public String getFmnm() {
		return fmnm;
	}

	public void setFmnm(String fmnm) {
		this.fmnm = fmnm;
	}

	public String getFmnmEng() {
		return fmnmEng;
	}

	public void setFmnmEng(String fmnmEng) {
		this.fmnmEng = fmnmEng;
	}

	public String getReprNm() {
		return reprNm;
	}

	public void setReprNm(String reprNm) {
		this.reprNm = reprNm;
	}

	public String getReprNmEng() {
		return reprNmEng;
	}

	public void setReprNmEng(String reprNmEng) {
		this.reprNmEng = reprNmEng;
	}

	public String getSvcTypCd() {
		return svcTypCd;
	}

	public void setSvcTypCd(String svcTypCd) {
		this.svcTypCd = svcTypCd;
	}

	public String getUsrAcCnt() {
		return usrAcCnt;
	}

	public void setUsrAcCnt(String usrAcCnt) {
		this.usrAcCnt = usrAcCnt;
	}

	public String getEmlSndGrpsAddr() {
		return emlSndGrpsAddr;
	}

	public void setEmlSndGrpsAddr(String emlSndGrpsAddr) {
		this.emlSndGrpsAddr = emlSndGrpsAddr;
	}

	public String getMlingCd() {
		return mlingCd;
	}

	public void setMlingCd(String mlingCd) {
		this.mlingCd = mlingCd;
	}

	public String getOrgLvlCd() {
		return orgLvlCd;
	}

	public void setOrgLvlCd(String orgLvlCd) {
		this.orgLvlCd = orgLvlCd;
	}

	public Date getSvcContDd() {
		return svcContDd;
	}

	public void setSvcContDd(Date svcContDd) {
		this.svcContDd = svcContDd;
	}

	public Date getSvcBltnDd() {
		return svcBltnDd;
	}

	public void setSvcBltnDd(Date svcBltnDd) {
		this.svcBltnDd = svcBltnDd;
	}

	public Date getSvcExpryDd() {
		return svcExpryDd;
	}

	public void setSvcExpryDd(Date svcExpryDd) {
		this.svcExpryDd = svcExpryDd;
	}

	public Date getSvcTrmnDd() {
		return svcTrmnDd;
	}

	public void setSvcTrmnDd(Date svcTrmnDd) {
		this.svcTrmnDd = svcTrmnDd;
	}
}
