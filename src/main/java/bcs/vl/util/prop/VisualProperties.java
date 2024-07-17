package bcs.vl.util.prop;

import org.apache.log4j.Logger;
import org.springframework.core.io.ClassPathResource;

import java.io.*;
import java.util.Properties;


public class VisualProperties {

	private static final Logger logger = Logger.getLogger(VisualProperties.class);

	/**
	 * 인자로 주어진 문자열을 Key값으로 하는 프로퍼티 값을 반환한다(Globals.java 전용)
	 * @param keyName String
	 * @return String
	 */
	public static String getProperty(String keyName){
		String value="99";
		ClassPathResource resource = new ClassPathResource("/egovframework/egovProps/globals_"+ System.getProperty("spring.profiles.active") +".properties");
		try{
			Properties props = new Properties();
			props.load(new BufferedReader(new InputStreamReader(resource.getInputStream())));
			value = props.getProperty(keyName).trim();
//			logger.debug("prop :" + value);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return value;
	}
}
