package bcs.vl.comm.VO;

/***********************************************************************************************
* Program Name : 공통 파일처리 VO
* Creator      : sukim
* Create Date  : 2022.05.17
* Description  : 공통 서비스
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2022.05.17     sukim            최초생성
************************************************************************************************/
public class COMM120VO {
	/* 공통항목 */
	private String tenantPrefix;        //테넌트ID
	private int    apndFileSeq;     //첨부파일순번
	private String apndFileNm;      //첨부파일명     
	private String apndFileIdxNm;   //첨부파일인덱스명
	private String apndFilePsn;     //첨부파일위치   
	private String regrId;          //등록자ID 
	private String regrOrgCd;       //등록자조직코드

	public String getTenantPrefix() {
		return tenantPrefix;
	}

	public void setTenantPrefix(String tenantPrefix) {
		this.tenantPrefix = tenantPrefix;
	}

	public int getApndFileSeq() {
		return apndFileSeq;
	}

	public void setApndFileSeq(int apndFileSeq) {
		this.apndFileSeq = apndFileSeq;
	}

	public String getApndFileNm() {
		return apndFileNm;
	}

	public void setApndFileNm(String apndFileNm) {
		this.apndFileNm = apndFileNm;
	}

	public String getApndFileIdxNm() {
		return apndFileIdxNm;
	}

	public void setApndFileIdxNm(String apndFileIdxNm) {
		this.apndFileIdxNm = apndFileIdxNm;
	}

	public String getApndFilePsn() {
		return apndFilePsn;
	}

	public void setApndFilePsn(String apndFilePsn) {
		this.apndFilePsn = apndFilePsn;
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
}
