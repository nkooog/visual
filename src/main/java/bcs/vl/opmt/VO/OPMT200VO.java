package bcs.vl.opmt.VO;

import java.util.List;
import java.util.Map;

/***********************************************************************************************
* Program Name : 비주얼레터링 관리 VO
* Creator      : dwson
* Create Date  : 2024.01.26
* Description  : 비주얼레터링 관리
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.26     dwson            최초생성
************************************************************************************************/
public class OPMT200VO {

	private String systemname;
	private String tenantPrefix;
	private String savePath;
	private String realFileName;
	private String imgPath;
	private String category;
	private String title;
	private String telnum;
	private String regdate;
	private int contentSeq;
	private String contentResult;
	private String fileyn;
	private String keyword;
	private Integer systemIdx;
	private String fileName;
	private long fileSize;
	private int imgWidth;
	private int imgHeight;
	private String mimeType;
	private String regId;
	private int systemId;
	private String visualType;
	private String guideContent;
	private String guideSort; 
	private String guideSize; 
	private String backgroudColor;
	private String backgroudFontColor;
	private String buttonColor;
	private String buttonFontColor; 
	private String bottomButtonUseyn;
	private int bottomButtonCnt;
	private String originAgentId; 
	private String originUsrGrd;
	private List<Map<String, Object>> buttonTitleList;
	private List<Map<String, Object>> buttonSizeList;
	private List<Map<String, Object>> buttonLinkList;
	private List<Map<String, Object>> buttonUseynList;
	private String buttonTitle;
	private String formButtonSize;
	private String buttonLink;
	private String buttonSize;
	private String useYn;
	private String sumButtonTitle;
	private String sumButtonLink;
	private String sumButtonType;
	private String sumButtonSize;
	private String sumButtonUseyn;
	private String saveType;
	private String action;
	private String ip;
	private String applyYn;
	private int ord;
	private String paramName;
	private String paramValue;
	private String serviceType;
	private String messageType;
	public String getSystemname() {
		return systemname;
	}
	public void setSystemname(String systemname) {
		this.systemname = systemname;
	}
	public String getTenantPrefix() {
		return tenantPrefix;
	}
	public void setTenantPrefix(String tenantPrefix) {
		this.tenantPrefix = tenantPrefix;
	}
	public String getSavePath() {
		return savePath;
	}
	public void setSavePath(String savePath) {
		this.savePath = savePath;
	}
	public String getRealFileName() {
		return realFileName;
	}
	public void setRealFileName(String realFileName) {
		this.realFileName = realFileName;
	}
	public String getImgPath() {
		return imgPath;
	}
	public void setImgPath(String imgPath) {
		this.imgPath = imgPath;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getTelnum() {
		return telnum;
	}
	public void setTelnum(String telnum) {
		this.telnum = telnum;
	}
	public String getRegdate() {
		return regdate;
	}
	public void setRegdate(String regdate) {
		this.regdate = regdate;
	}
	public int getContentSeq() {
		return contentSeq;
	}
	public void setContentSeq(int contentSeq) {
		this.contentSeq = contentSeq;
	}
	public String getContentResult() {
		return contentResult;
	}
	public void setContentResult(String contentResult) {
		this.contentResult = contentResult;
	}
	public String getFileyn() {
		return fileyn;
	}
	public void setFileyn(String fileyn) {
		this.fileyn = fileyn;
	}
	public String getKeyword() {
		return keyword;
	}
	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}
	public Integer getSystemIdx() {
		return systemIdx;
	}
	public void setSystemIdx(Integer systemIdx) {
		this.systemIdx = systemIdx;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public long getFileSize() {
		return fileSize;
	}
	public void setFileSize(long fileSize) {
		this.fileSize = fileSize;
	}
	public int getImgWidth() {
		return imgWidth;
	}
	public void setImgWidth(int imgWidth) {
		this.imgWidth = imgWidth;
	}
	public int getImgHeight() {
		return imgHeight;
	}
	public void setImgHeight(int imgHeight) {
		this.imgHeight = imgHeight;
	}
	public String getMimeType() {
		return mimeType;
	}
	public void setMimeType(String mimeType) {
		this.mimeType = mimeType;
	}
	public String getRegId() {
		return regId;
	}
	public void setRegId(String regId) {
		this.regId = regId;
	}
	public int getSystemId() {
		return systemId;
	}
	public void setSystemId(int systemId) {
		this.systemId = systemId;
	}
	public String getVisualType() {
		return visualType;
	}
	public void setVisualType(String visualType) {
		this.visualType = visualType;
	}
	public String getGuideContent() {
		return guideContent;
	}
	public void setGuideContent(String guideContent) {
		this.guideContent = guideContent;
	}
	public String getGuideSort() {
		return guideSort;
	}
	public void setGuideSort(String guideSort) {
		this.guideSort = guideSort;
	}
	public String getGuideSize() {
		return guideSize;
	}
	public void setGuideSize(String guideSize) {
		this.guideSize = guideSize;
	}
	public String getBackgroudColor() {
		return backgroudColor;
	}
	public void setBackgroudColor(String backgroudColor) {
		this.backgroudColor = backgroudColor;
	}
	public String getBackgroudFontColor() {
		return backgroudFontColor;
	}
	public void setBackgroudFontColor(String backgroudFontColor) {
		this.backgroudFontColor = backgroudFontColor;
	}
	public String getButtonColor() {
		return buttonColor;
	}
	public void setButtonColor(String buttonColor) {
		this.buttonColor = buttonColor;
	}
	public String getButtonFontColor() {
		return buttonFontColor;
	}
	public void setButtonFontColor(String buttonFontColor) {
		this.buttonFontColor = buttonFontColor;
	}
	public String getBottomButtonUseyn() {
		return bottomButtonUseyn;
	}
	public void setBottomButtonUseyn(String bottomButtonUseyn) {
		this.bottomButtonUseyn = bottomButtonUseyn;
	}
	public int getBottomButtonCnt() {
		return bottomButtonCnt;
	}
	public void setBottomButtonCnt(int bottomButtonCnt) {
		this.bottomButtonCnt = bottomButtonCnt;
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
	public List<Map<String, Object>> getButtonTitleList() {
		return buttonTitleList;
	}
	public void setButtonTitleList(List<Map<String, Object>> buttonTitleList) {
		this.buttonTitleList = buttonTitleList;
	}
	public List<Map<String, Object>> getButtonSizeList() {
		return buttonSizeList;
	}
	public void setButtonSizeList(List<Map<String, Object>> buttonSizeList) {
		this.buttonSizeList = buttonSizeList;
	}
	public List<Map<String, Object>> getButtonLinkList() {
		return buttonLinkList;
	}
	public void setButtonLinkList(List<Map<String, Object>> buttonLinkList) {
		this.buttonLinkList = buttonLinkList;
	}
	public List<Map<String, Object>> getButtonUseynList() {
		return buttonUseynList;
	}
	public void setButtonUseynList(List<Map<String, Object>> buttonUseynList) {
		this.buttonUseynList = buttonUseynList;
	}
	public List<Map<String, Object>> getFormButtonSizeList() {
		return buttonSizeList;
	}
	public void setFormButtonSizeList(List<Map<String, Object>> buttonSizeList) {
		this.buttonSizeList = buttonSizeList;
	}
	public String getButtonTitle() {
		return buttonTitle;
	}
	public void setButtonTitle(String buttonTitle) {
		this.buttonTitle = buttonTitle;
	}
	public String getFormButtonSize() {
		return formButtonSize;
	}
	public void setFormButtonSize(String formButtonSize) {
		this.formButtonSize = formButtonSize;
	}
	public String getButtonLink() {
		return buttonLink;
	}
	public void setButtonLink(String buttonLink) {
		this.buttonLink = buttonLink;
	}
	public String getButtonSize() {
		return buttonSize;
	}
	public void setButtonSize(String buttonSize) {
		this.buttonSize = buttonSize;
	}
	public String getUseYn() {
		return useYn;
	}
	public void setUseYn(String useYn) {
		this.useYn = useYn;
	}
	public String getSumButtonTitle() {
		return sumButtonTitle;
	}
	public void setSumButtonTitle(String sumButtonTitle) {
		this.sumButtonTitle = sumButtonTitle;
	}
	public String getSumButtonLink() {
		return sumButtonLink;
	}
	public void setSumButtonLink(String sumButtonLink) {
		this.sumButtonLink = sumButtonLink;
	}
	public String getSumButtonType() {
		return sumButtonType;
	}
	public void setSumButtonType(String sumButtonType) {
		this.sumButtonType = sumButtonType;
	}
	public String getSumButtonSize() {
		return sumButtonSize;
	}
	public void setSumButtonSize(String sumButtonSize) {
		this.sumButtonSize = sumButtonSize;
	}
	public String getSumButtonUseyn() {
		return sumButtonUseyn;
	}
	public void setSumButtonUseyn(String sumButtonUseyn) {
		this.sumButtonUseyn = sumButtonUseyn;
	}
	public String getSaveType() {
		return saveType;
	}
	public void setSaveType(String saveType) {
		this.saveType = saveType;
	}
	public String getAction() {
		return action;
	}
	public void setAction(String action) {
		this.action = action;
	}
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	public String getApplyYn() {
		return applyYn;
	}
	public void setApplyYn(String applyYn) {
		this.applyYn = applyYn;
	}
	public int getOrd() {
		return ord;
	}
	public void setOrd(int ord) {
		this.ord = ord;
	}
	public String getParamName() {
		return paramName;
	}
	public void setParamName(String paramName) {
		this.paramName = paramName;
	}
	public String getParamValue() {
		return paramValue;
	}
	public void setParamValue(String paramValue) {
		this.paramValue = paramValue;
	}
	public String getServiceType() {
		return serviceType;
	}
	public void setServiceType(String serviceType) {
		this.serviceType = serviceType;
	}
	public String getMessageType() {
		return messageType;
	}
	public void setMessageType(String messageType) {
		this.messageType = messageType;
	}
}