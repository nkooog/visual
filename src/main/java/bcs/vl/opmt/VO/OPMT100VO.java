package bcs.vl.opmt.VO;

import java.sql.Timestamp;

import bcs.vl.cmmn.VO.CMMNBASEVO;

/***********************************************************************************************
* Program Name : 사용자 관리 VO
* Creator      : dwson
* Create Date  : 2024.02.06
* Description  : 사용자 관리
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.02.06     dwson            최초생성
************************************************************************************************/
public class OPMT100VO extends CMMNBASEVO {

	private String tenantPrefix;
	private String agentId;
	private String name;
	private String password;
	private Timestamp regDate;
	private String regUsr;
	private Timestamp modDate;
	private String modUsr;
	private String useYn;
	private String usrGrd;
	private String myUsrGrd;
	private String usrLvl;
	
	private Integer systemIdx;
	private String systemName;
	
	public String getTenantPrefix() {
		return tenantPrefix;
	}
	public void setTenantPrefix(String tenantPrefix) {
		this.tenantPrefix = tenantPrefix;
	}
	public String getAgentId() {
		return agentId;
	}
	public void setAgentId(String agentId) {
		this.agentId = agentId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Timestamp getRegDate() {
		return regDate;
	}
	public void setRegDate(Timestamp regDate) {
		this.regDate = regDate;
	}
	public String getRegUsr() {
		return regUsr;
	}
	public void setRegUsr(String regUsr) {
		this.regUsr = regUsr;
	}
	public Timestamp getModDate() {
		return modDate;
	}
	public void setModDate(Timestamp modDate) {
		this.modDate = modDate;
	}
	public String getModUsr() {
		return modUsr;
	}
	public void setModUsr(String modUsr) {
		this.modUsr = modUsr;
	}
	public String getUseYn() {
		return useYn;
	}
	public void setUseYn(String useYn) {
		this.useYn = useYn;
	}
	public String getUsrGrd() {
		return usrGrd;
	}
	public void setUsrGrd(String usrGrd) {
		this.usrGrd = usrGrd;
	}
	public String getMyUsrGrd() {
		return myUsrGrd;
	}
	public void setMyUsrGrd(String myUsrGrd) {
		this.myUsrGrd = myUsrGrd;
	}
	public String getUsrLvl() {
		return usrLvl;
	}
	public void setUsrLvl(String usrLvl) {
		this.usrLvl = usrLvl;
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