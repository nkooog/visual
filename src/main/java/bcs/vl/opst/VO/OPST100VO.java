package bcs.vl.opst.VO;

import java.sql.Timestamp;

import bcs.vl.cmmn.VO.CMMNBASEVO;

/***********************************************************************************************
* Program Name : 사용 이력 VO
* Creator      : dwson
* Create Date  : 2024.02.21
* Description  : 사용 이력
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.02.21     dwson            최초생성
************************************************************************************************/
public class OPST100VO extends CMMNBASEVO {

	private int idx;
	private Timestamp requestDate;
	private Integer systemIdx;
	private String systemName;
	private String systemIP;
	private String tenantPrefix;
	private String tenantName;
	private String agentId;
	private String serviceType;
	private String serviceTypeName;
	private String phoneNumber;
	private String resultCode;
	private String sendCode;
	private String contentsBody;
	private String requestMessage;
	private String responseMessage;
	
	public int getIdx() {
		return idx;
	}
	public void setIdx(int idx) {
		this.idx = idx;
	}
	public Timestamp getRequestDate() {
		return requestDate;
	}
	public void setRequestDate(Timestamp requestDate) {
		this.requestDate = requestDate;
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
	public String getSystemIP() {
		return systemIP;
	}
	public void setSystemIP(String systemIP) {
		this.systemIP = systemIP;
	}
	public String getTenantPrefix() {
		return tenantPrefix;
	}
	public void setTenantPrefix(String tenantPrefix) {
		this.tenantPrefix = tenantPrefix;
	}
	public String getTenantName() {
		return tenantName;
	}
	public void setTenantName(String tenantName) {
		this.tenantName = tenantName;
	}
	public String getAgentId() {
		return agentId;
	}
	public void setAgentId(String agentId) {
		this.agentId = agentId;
	}
	public String getServiceType() {
		return serviceType;
	}
	public void setServiceType(String serviceType) {
		this.serviceType = serviceType;
	}
	public String getServiceTypeName() {
		return serviceTypeName;
	}
	public void setServiceTypeName(String serviceTypeName) {
		this.serviceTypeName = serviceTypeName;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public String getResultCode() {
		return resultCode;
	}
	public void setResultCode(String resultCode) {
		this.resultCode = resultCode;
	}
	public String getSendCode() {
		return sendCode;
	}
	public void setSendCode(String sendCode) {
		this.sendCode = sendCode;
	}
	public String getContentsBody() {
		return contentsBody;
	}
	public void setContentsBody(String contentsBody) {
		this.contentsBody = contentsBody;
	}
	public String getRequestMessage() {
		return requestMessage;
	}
	public void setRequestMessage(String requestMessage) {
		this.requestMessage = requestMessage;
	}
	public String getResponseMessage() {
		return responseMessage;
	}
	public void setResponseMessage(String responseMessage) {
		this.responseMessage = responseMessage;
	}
}