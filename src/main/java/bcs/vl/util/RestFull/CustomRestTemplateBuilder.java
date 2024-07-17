package bcs.vl.util.RestFull;

import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;


/***********************************************************************************************
 * Program Name : restTemplate 공통
 * Creator      : djjung
 * Create Date  : 2023.03.08
 * Description  : Rest Client 통신 시간 설정 한곳에서 조절
 * Modify Desc  :
 * -----------------------------------------------------------------------------------------------
 * Date         | Updater        | Remark
 * -----------------------------------------------------------------------------------------------
 * 2023.03.08     djjung            최초생성
 ************************************************************************************************/

public class CustomRestTemplateBuilder {

	private int connectTimeout = 1000*30;
	private int readTimeout = 1000*30;

	public void SetConnectTimeout(int connectTimeout) {
		this.connectTimeout = connectTimeout;
	}

	public void SetReadTimeout(int readTimeout) {
		this.readTimeout = readTimeout;
	}

	public RestTemplate build() {
		HttpComponentsClientHttpRequestFactory requestFactory = new HttpComponentsClientHttpRequestFactory();
		requestFactory.setConnectTimeout(connectTimeout);
		requestFactory.setReadTimeout(readTimeout);

		RestTemplate restTemplate = new RestTemplate(requestFactory);
		restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8));

		return restTemplate;
	}


}