package bcs.vl.util.api;

public enum ExonaApiList {

	Authentication   			("/Authentication", 			"Create",	"/auth")	// 토큰 발행
	, LiteCallgateStatistics   	("/LiteCallgateStatistics", 	"Get",		"/api")		// Visual Lettering 통계
	, LiteCallGate   			("/LiteCallGate", 				"Get",		"/api")		// Visual Lettering 이력
	, LiteCallRecord   			("/LiteCallRecord", 			"Get",		"/file")	// 콜 이력 및 녹취 -> 청취 파일 다운로드
	, LiteCallGet   			("/LiteCall", 					"Get",		"/api")		// 콜 이력 및 녹취 -> 이력 가져오기
	, LiteCallUpdate   			("/LiteCall", 					"Update",	"/api")		// 콜 이력 및 녹취 -> 메모 부분만 수정 가능
	;

	private final String name;
	private final String method;
	private final String urlPaste;

	ExonaApiList(String name, String method, String urlPaste){
		this.name=name;
		this.method=method;
		this.urlPaste=urlPaste;
	}

	public String getName() {return name;}

	public String getMethod(){return method;}
	
	public String getUrlPaste(){return urlPaste;}
}
