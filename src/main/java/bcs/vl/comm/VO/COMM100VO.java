package bcs.vl.comm.VO;
/***********************************************************************************************
* Program Name : 공통 서비스 VO
* Creator      : sukim
* Create Date  : 2022.02.03
* Description  : 공통 서비스
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2022.02.03     sukim            최초생성
* 2024.01.31     yhnam            
************************************************************************************************/
public class COMM100VO {
	private String mgntItemCd;
	private String comCd;
	private String mlingCd;
	private String comCdNm;
	private int    srtSeq;
	private String hgrkComCd; 
	private String subCdYn; 
	private String subMgntItemCd;
	private int    mapgVluCnt;
	private String mapgVluUnitCd;
	private String mapgVlu1;
	private String mapgVlu2;
	private String mapgVlu3;
	private String useDvYn;
	private String tenantPrefix; 
	private String tenantNm;
	private String fmnm;
	private String fmnmEng;
	private String orgLvlCd;
	private String orgCd;
	private String orgNm;
	private String orgPath;
	private String agentId;
	private String usrNm;
	
	private String code;
	private String codeName;
	private String category;
	private String useYn;
	
	private Integer systemIdx;
	private String systemName;
	private String tenantName;
	private int isEnabled;
	private String description;
	
	private String menuId;
	private String usrGrd;
	private String fnSearchYn;
	private String fnSaveYn;
	private String fnDeleteYn;
	private String fnExcelYn;
	private String dataFrmId;
	private String paramData;
	private String resultType;
	private String errorMsg;
	private String regrId;
	
	private String fnUpdateYn;
	
	public String getSystemName() {
		return systemName;
	}
	public void setSystemName(String systemName) {
		this.systemName = systemName;
	}
	public String getFnUpdateYn() {
		return fnUpdateYn;
	}
	public void setFnUpdateYn(String fnUpdateYn) {
		this.fnUpdateYn = fnUpdateYn;
	}
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
	public String getRegrId() {
		return regrId;
	}
	public void setRegrId(String regrId) {
		this.regrId = regrId;
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
	public String getDataFrmId() {
		return dataFrmId;
	}
	public void setDataFrmId(String dataFrmId) {
		this.dataFrmId = dataFrmId;
	}
	public String getMenuId() {
		return menuId;
	}
	public void setMenuId(String menuId) {
		this.menuId = menuId;
	}
	public String getUsrGrd() {
		return usrGrd;
	}
	public void setUsrGrd(String usrGrd) {
		this.usrGrd = usrGrd;
	}
	public String getFnSearchYn() {
		return fnSearchYn;
	}
	public void setFnSearchYn(String fnSearchYn) {
		this.fnSearchYn = fnSearchYn;
	}
	public String getFnSaveYn() {
		return fnSaveYn;
	}
	public void setFnSaveYn(String fnSaveYn) {
		this.fnSaveYn = fnSaveYn;
	}
	public String getFnDeleteYn() {
		return fnDeleteYn;
	}
	public void setFnDeleteYn(String fnDeleteYn) {
		this.fnDeleteYn = fnDeleteYn;
	}
	public String getFnExcelYn() {
		return fnExcelYn;
	}
	public void setFnExcelYn(String fnExcelYn) {
		this.fnExcelYn = fnExcelYn;
	}
	public String getMgntItemCd() {
		return mgntItemCd;
	}
	public void setMgntItemCd(String mgntItemCd) {
		this.mgntItemCd = mgntItemCd;
	}
	public String getComCd() {
		return comCd;
	}
	public void setComCd(String comCd) {
		this.comCd = comCd;
	}
	public String getMlingCd() {
		return mlingCd;
	}
	public void setMlingCd(String mlingCd) {
		this.mlingCd = mlingCd;
	}
	public String getComCdNm() {
		return comCdNm;
	}
	public void setComCdNm(String comCdNm) {
		this.comCdNm = comCdNm;
	}
	public int getSrtSeq() {
		return srtSeq;
	}
	public void setSrtSeq(int srtSeq) {
		this.srtSeq = srtSeq;
	}
	public String getHgrkComCd() {
		return hgrkComCd;
	}
	public void setHgrkComCd(String hgrkComCd) {
		this.hgrkComCd = hgrkComCd;
	}
	public String getSubCdYn() {
		return subCdYn;
	}
	public void setSubCdYn(String subCdYn) {
		this.subCdYn = subCdYn;
	}
	public String getSubMgntItemCd() {
		return subMgntItemCd;
	}
	public void setSubMgntItemCd(String subMgntItemCd) {
		this.subMgntItemCd = subMgntItemCd;
	}
	public int getMapgVluCnt() {
		return mapgVluCnt;
	}
	public void setMapgVluCnt(int mapgVluCnt) {
		this.mapgVluCnt = mapgVluCnt;
	}
	public String getMapgVluUnitCd() {
		return mapgVluUnitCd;
	}
	public void setMapgVluUnitCd(String mapgVluUnitCd) {
		this.mapgVluUnitCd = mapgVluUnitCd;
	}
	public String getMapgVlu1() {
		return mapgVlu1;
	}
	public void setMapgVlu1(String mapgVlu1) {
		this.mapgVlu1 = mapgVlu1;
	}
	public String getMapgVlu2() {
		return mapgVlu2;
	}
	public void setMapgVlu2(String mapgVlu2) {
		this.mapgVlu2 = mapgVlu2;
	}
	public String getMapgVlu3() {
		return mapgVlu3;
	}
	public void setMapgVlu3(String mapgVlu3) {
		this.mapgVlu3 = mapgVlu3;
	}
	public String getUseDvYn() {
		return useDvYn;
	}
	public void setUseDvYn(String useDvYn) {
		this.useDvYn = useDvYn;
	}
	public String getTenantPrefix() {
		return tenantPrefix;
	}
	public void setTenantPrefix(String tenantPrefix) {
		this.tenantPrefix = tenantPrefix;
	}
	public String getTenantNm() {
		return tenantNm;
	}
	public void setTenantNm(String tenantNm) {
		this.tenantNm = tenantNm;
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
	public String getOrgCd() {
		return orgCd;
	}
	public void setOrgCd(String orgCd) {
		this.orgCd = orgCd;
	}
	public String getOrgNm() {
		return orgNm;
	}
	public void setOrgNm(String orgNm) {
		this.orgNm = orgNm;
	}
	public String getOrgPath() {
		return orgPath;
	}
	public void setOrgPath(String orgPath) {
		this.orgPath = orgPath;
	}
	public String getAgentId() {
		return agentId;
	}
	public void setAgentId(String agentId) {
		this.agentId = agentId;
	}
	public String getUsrNm() {
		return usrNm;
	}
	public void setUsrNm(String usrNm) {
		this.usrNm = usrNm;
	}

	public String getOrgLvlCd() {
		return orgLvlCd;
	}

	public void setOrgLvlCd(String orgLvlCd) {
		this.orgLvlCd = orgLvlCd;
	}
	
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getCodeName() {
		return codeName;
	}
	public void setCodeName(String codeName) {
		this.codeName = codeName;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getUseYn() {
		return useYn;
	}
	public void setUseYn(String useYn) {
		this.useYn = useYn;
	}

	public Integer getSystemIdx() {
		return systemIdx;
	}

	public void setSystemIdx(Integer systemIdx) {
		this.systemIdx = systemIdx;
	}

	public String getTenantName() {
		return tenantName;
	}
	public void setTenantName(String tenantName) {
		this.tenantName = tenantName;
	}
	public int getIsEnabled() {
		return isEnabled;
	}
	public void setIsEnabled(int isEnabled) {
		this.isEnabled = isEnabled;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
}
