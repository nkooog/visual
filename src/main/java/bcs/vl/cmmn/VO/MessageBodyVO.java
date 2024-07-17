package bcs.vl.cmmn.VO;


public class MessageBodyVO {

	private Integer systemIdx;
	private String tenantprefix;
	private String servicetype;
	private String messagetype;
	private String paramname;
	private String paramvalue;

	public Integer getSystemIdx() {
		return systemIdx;
	}

	public void setSystemIdx(Integer systemIdx) {
		this.systemIdx = systemIdx;
	}

	public void setTenantprefix(String tenantprefix) {
		this.tenantprefix = tenantprefix;
	}

	public void setServicetype(String servicetype) {
		this.servicetype = servicetype;
	}

	public void setMessagetype(String messagetype) {
		this.messagetype = messagetype;
	}

	public void setParamname(String paramname) {
		this.paramname = paramname;
	}

	public void setParamvalue(String paramvalue) {
		this.paramvalue = paramvalue;
	}

	public String getTenantprefix() {
		return tenantprefix;
	}

	public String getServicetype() {
		return servicetype;
	}

	public String getMessagetype() {
		return messagetype;
	}

	public String getParamname() {
		return paramname;
	}

	public String getParamvalue() {
		return paramvalue;
	}
}
