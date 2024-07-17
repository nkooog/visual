package bcs.vl.config;

import org.apache.http.client.HttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.nio.charset.StandardCharsets;

@Configuration
public class BeanConfig {

	/**
	 * @Author : jypark
	 * @Date   : 2024. 3. 6
	 * @description : bean config init
	 */

	@Bean
	public ObjectMapper objMapper() {
		return new ObjectMapper();
	}

}
