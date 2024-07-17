package bcs.vl.sysm.VO;

import java.sql.Timestamp;

/***********************************************************************************************
* Program Name : 메뉴 관리 VO
* Creator      : yhnam
* Create Date  : 2024.01.26
* Description  : 메뉴 관리
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.26     yhnam            최초생성
************************************************************************************************/
public class SYSM400VO {

	private String id;
    private String tenantPrefix;
    private String menuId;
    private String menuNm;
    private String menuTypCd;
    private Integer prsMenuLvl;
    private String hgrkMenuId;
    private Timestamp regDtm;
    private String regrId;
    private Timestamp lstCorcDtm;
    private String lstCorprId;
    private Timestamp abolDtm;
    private String abolmnId;
    private String dataFrmId;
    private Integer srtSeqNo;
    private String iconTypClss;
    private String mapgVlu1;
    private String usrGrd;
    private String menuState;
    private String fnSearchYn;
    private String fnSaveYn;
    private String fnDeleteYn;
    private String fnExcelYn;
    private String fnUpdateYn;
    private Integer systemIdx;

    public Integer getSystemIdx() {
        return systemIdx;
    }

    public void setSystemIdx(Integer systemIdx) {
        this.systemIdx = systemIdx;
    }

    public String getFnUpdateYn() {
		return fnUpdateYn;
	}

	public void setFnUpdateYn(String fnUpdateYn) {
		this.fnUpdateYn = fnUpdateYn;
	}

	public String getId() {
        return id;
    }

	public void setId(String id) {
        this.id = id;
    }

    public String getTenantPrefix() {
        return tenantPrefix;
    }

    public void setTenantPrefix(String tenantPrefix) {
        this.tenantPrefix = tenantPrefix;
    }

    public String getMenuId() {
        return menuId;
    }

    public void setMenuId(String menuId) {
        this.menuId = menuId;
    }

    public String getMenuNm() {
        return menuNm;
    }

    public void setMenuNm(String menuNm) {
        this.menuNm = menuNm;
    }

    public String getMenuTypCd() {
        return menuTypCd;
    }

    public void setMenuTypCd(String menuTypCd) {
        this.menuTypCd = menuTypCd;
    }

    public Integer getPrsMenuLvl() {
        return prsMenuLvl;
    }

    public void setPrsMenuLvl(Integer prsMenuLvl) {
        this.prsMenuLvl = prsMenuLvl;
    }

    public String getHgrkMenuId() {
        return hgrkMenuId;
    }

    public void setHgrkMenuId(String hgrkMenuId) {
        this.hgrkMenuId = hgrkMenuId;
    }

    public Timestamp getRegDtm() {
        return regDtm;
    }

    public void setRegDtm(Timestamp regDtm) {
        this.regDtm = regDtm;
    }

    public String getRegrId() {
        return regrId;
    }

    public void setRegrId(String regrId) {
        this.regrId = regrId;
    }

    public Timestamp getLstCorcDtm() {
        return lstCorcDtm;
    }

    public void setLstCorcDtm(Timestamp lstCorcDtm) {
        this.lstCorcDtm = lstCorcDtm;
    }

    public String getLstCorprId() {
        return lstCorprId;
    }

    public void setLstCorprId(String lstCorprId) {
        this.lstCorprId = lstCorprId;
    }

    public Timestamp getAbolDtm() {
        return abolDtm;
    }

    public void setAbolDtm(Timestamp abolDtm) {
        this.abolDtm = abolDtm;
    }

    public String getAbolmnId() {
        return abolmnId;
    }

    public void setAbolmnId(String abolmnId) {
        this.abolmnId = abolmnId;
    }

    public String getDataFrmId() {
        return dataFrmId;
    }

    public void setDataFrmId(String dataFrmId) {
        this.dataFrmId = dataFrmId;
    }

    public Integer getSrtSeqNo() {
        return srtSeqNo;
    }

    public void setSrtSeqNo(Integer srtSeqNo) {
        this.srtSeqNo = srtSeqNo;
    }

    public String getIconTypClss() {
        return iconTypClss;
    }

    public void setIconTypClss(String iconTypClss) {
        this.iconTypClss = iconTypClss;
    }

    public String getMapgVlu1() {
        return mapgVlu1;
    }

    public void setMapgVlu1(String mapgVlu1) {
        this.mapgVlu1 = mapgVlu1;
    }

    public String getUsrGrd() {
		return usrGrd;
	}

	public void setUsrGrd(String usrGrd) {
		this.usrGrd = usrGrd;
	}
	
	 public String getMenuState() {
		return menuState;
	}

	public void setMenuState(String menuState) {
		this.menuState = menuState;
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
}