package bcs.vl.frme.VO;
/***********************************************************************************************
* Program Name : 사용자정보조회(사진, 출/퇴근 등록) VO
* Creator      : sukim
* Create Date  : 2022.05.09
* Description  : 사용자정보조회 - POP
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2022.05.09     sukim            최초생성
************************************************************************************************/
public class FRME110VO {
	private String tenantPrefix;
	private String dgindDd;
	private String agentId;
	private int seq;
	private String dgindDvCd;
	private String dgindTm;
	private String regDtm;
	private String regrId;
	private String regrOrgCd;
	private String lstCorcDtm; 
	private String lstCorprId;
	private String lstCorprOrgCd; 
	private String potoImgFileNm;
	private String potoImgIdxFileNm;  
	private String potoImgPsn; 
	private String commuteTime;
	private String attendance;
	private String leavetheoffice;
	private String mlingCd;
	private String extNoUseYn;
	
	public String getTenantPrefix() {
		return tenantPrefix;
	}
	public void setTenantPrefix(String tenantPrefix) {
		this.tenantPrefix = tenantPrefix;
	}
	public String getDgindDd() {
		return dgindDd;
	}
	public void setDgindDd(String dgindDd) {
		this.dgindDd = dgindDd;
	}
	public String getAgentId() {
		return agentId;
	}
	public void setAgentId(String agentId) {
		this.agentId = agentId;
	}
	public int getSeq() {
		return seq;
	}
	public void setSeq(int seq) {
		this.seq = seq;
	}
	public String getDgindDvCd() {
		return dgindDvCd;
	}
	public void setDgindDvCd(String dgindDvCd) {
		this.dgindDvCd = dgindDvCd;
	}
	public String getDgindTm() {
		return dgindTm;
	}
	public void setDgindTm(String dgindTm) {
		this.dgindTm = dgindTm;
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
	public String getRegrOrgCd() {
		return regrOrgCd;
	}
	public void setRegrOrgCd(String regrOrgCd) {
		this.regrOrgCd = regrOrgCd;
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
	public String getLstCorprOrgCd() {
		return lstCorprOrgCd;
	}
	public void setLstCorprOrgCd(String lstCorprOrgCd) {
		this.lstCorprOrgCd = lstCorprOrgCd;
	}
	public String getPotoImgFileNm() {
		return potoImgFileNm;
	}
	public void setPotoImgFileNm(String potoImgFileNm) {
		this.potoImgFileNm = potoImgFileNm;
	}
	public String getPotoImgIdxFileNm() {
		return potoImgIdxFileNm;
	}
	public void setPotoImgIdxFileNm(String potoImgIdxFileNm) {
		this.potoImgIdxFileNm = potoImgIdxFileNm;
	}
	public String getPotoImgPsn() {
		return potoImgPsn;
	}
	public void setPotoImgPsn(String potoImgPsn) {
		this.potoImgPsn = potoImgPsn;
	}
	public String getCommuteTime() {
		return commuteTime;
	}
	public void setCommuteTime(String commuteTime) {
		this.commuteTime = commuteTime;
	}
	public String getAttendance() {
		return attendance;
	}
	public void setAttendance(String attendance) {
		this.attendance = attendance;
	}
	public String getLeavetheoffice() {
		return leavetheoffice;
	}
	public void setLeavetheoffice(String leavetheoffice) {
		this.leavetheoffice = leavetheoffice;
	}
	public String getMlingCd() {
		return mlingCd;
	}
	public void setMlingCd(String mlingCd) {
		this.mlingCd = mlingCd;
	}
	public String getExtNoUseYn() {
		return extNoUseYn;
	}
	public void setExtNoUseYn(String extNoUseYn) {
		this.extNoUseYn = extNoUseYn;
	}
}
