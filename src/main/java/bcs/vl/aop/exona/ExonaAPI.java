package bcs.vl.aop.exona;

import bcs.vl.util.prop.VisualProperties;

public enum ExonaAPI {
	
	// 토큰 관리용 API URL
	//AUTH("https://tst.exona.kr:18080/v1/auth");
	
	AUTH( VisualProperties.getProperty("Globals.exona.url") + "/auth" ),
	WEBSOCKET_URL( VisualProperties.getProperty("Globals.exona.webSocket.url"));

	private String url;
	
	
	private ExonaAPI(String url) {
		this.url = url;
	}

	public String getUrl() {
		return url;
	}

}
