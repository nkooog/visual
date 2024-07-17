package bcs.vl.aop.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import bcs.vl.aop.exona.ExonaTokenValidAOP;

@Configuration
@EnableAspectJAutoProxy
public class AppConfig {

	/**
	 * @Author : jypark
	 * @Date   : 2024. 3. 8
	 * @description : Java AspectProxy 설정
	 */
	
	
	@Bean
	public ExonaTokenValidAOP exonaAop() {
		return new ExonaTokenValidAOP();
	}
	
	
}
