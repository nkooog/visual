import egovframework.rte.fdl.cryptography.EgovEnvCryptoService;
import egovframework.rte.fdl.cryptography.impl.EgovEnvCryptoServiceImpl;
import org.json.simple.JSONObject;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class egovTest {


	@Test
	public void test() throws Exception{
		ApplicationContext context = new ClassPathXmlApplicationContext(new String[]{"classpath:/egovframework/spring/context-crypto.xml"});
		EgovEnvCryptoService cryptoService = context.getBean(EgovEnvCryptoServiceImpl.class);

		System.out.println(cryptoService.decrypt("h3yjEXSvtwQidJNp%2FMt4C17LPRSMmfExlKpdY3s3vbUyvZoEpYA9NeJ%2BpTkxFRMZrXo9VLkK9uHA7zd5a7kJ%2B78n7B%2Filyim3sbMFwRSeZE%3D"));
		System.out.println(cryptoService.decrypt("h3yjEXSvtwQidJNp%2FMt4C8eEeFGBQqoNR9%2BaPs3UXHOK38Fq1JlLy0etXqc1kEss4RajtgWi0sNL4JBPFN0%2BCkHVFPCtXUDVrPz6pTt4EGU%3D"));


	}

	@Test
	public void split() {
		String text = "push 11";
		String[] split = text.split("\\d+"); // \\d+ 문자추출
//		String[] split = text.split("\\D+"); 숫자추출
		System.out.println(split[0]);    // 주의!
	}

	@Test
	public void 테스트() {
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("Name", "Authentication");
		jsonObject.put("Method", "Get");

		JSONObject parameter = new JSONObject();
		parameter.put("ClientID", "ClientID");
		parameter.put("ClientSecret", "ClientSecret");

		jsonObject.put("Parameter", parameter);

		System.out.println(jsonObject.toJSONString());

	}
}
