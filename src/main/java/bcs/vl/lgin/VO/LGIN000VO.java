package bcs.vl.lgin.VO;

import java.time.LocalDateTime;
import java.util.Date;
/***********************************************************************************************
* Program Name : 로그인 VO
* Creator      : dwson
* Create Date  : 2024.01.22
* Description  : 로그인
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.22     dwson            최초생성
************************************************************************************************/
public class LGIN000VO {

	private String tenantPrefix;
	private String tenantGroupId;
	private String agentId;
	private String name;
	private String password;
	private Date regdate;
	private String usrGrd;
	private String usrGrdNm;
	private String usrLvl;
	private Integer systemIdx;



	private String accessToken;
	private String expireDate;
	
	private String originTenantPrefix;
	private String originAgentId;
	private String originUsrGrd;
	private Integer originSystemIdx;



	public String getAccessToken() {
		return accessToken;
	}
	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}
	public String getExpireDate() {
		return expireDate;
	}
	public void setExpireDate(String expireDate) {
		this.expireDate = expireDate;
	}
	public String getTenantPrefix() {
		return tenantPrefix;
	}
	public void setTenantPrefix(String tenantPrefix) {
		this.tenantPrefix = tenantPrefix;
	}
	public String getTenantGroupId() {
		return tenantGroupId;
	}
	public void setTenantGroupId(String tenantGroupId) {
		this.tenantGroupId = tenantGroupId;
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
	public Date getRegdate() {
		return regdate;
	}
	public void setRegdate(Date regdate) {
		this.regdate = regdate;
	}
	public String getUsrGrd() {
		return usrGrd;
	}
	public void setUsrGrd(String usrGrd) {
		this.usrGrd = usrGrd;
	}
	public String getUsrGrdNm() {
		return usrGrdNm;
	}
	public void setUsrGrdNm(String usrGrdNm) {
		this.usrGrdNm = usrGrdNm;
	}
	public String getUsrLvl() {
		return usrLvl;
	}
	public void setUsrLvl(String usrLvl) {
		this.usrLvl = usrLvl;
	}

	public String getOriginTenantPrefix() {
		return originTenantPrefix;
	}
	public void setOriginTenantPrefix(String originTenantPrefix) {
		this.originTenantPrefix = originTenantPrefix;
	}
	public String getOriginAgentId() {
		return originAgentId;
	}
	public void setOriginAgentId(String originAgentId) {
		this.originAgentId = originAgentId;
	}
	public String getOriginUsrGrd() {
		return originUsrGrd;
	}
	public void setOriginUsrGrd(String originUsrGrd) {
		this.originUsrGrd = originUsrGrd;
	}


	public Integer getSystemIdx() {
		return systemIdx;
	}

	public void setSystemIdx(Integer systemIdx) {
		this.systemIdx = systemIdx;
	}

	public Integer getOriginSystemIdx() {
		return originSystemIdx;
	}

	public void setOriginSystemIdx(Integer originSystemIdx) {
		this.originSystemIdx = originSystemIdx;
	}
}