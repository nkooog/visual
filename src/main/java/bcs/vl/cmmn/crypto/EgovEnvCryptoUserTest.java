package bcs.vl.cmmn.crypto;

import egovframework.rte.fdl.cryptography.EgovEnvCryptoService;
import egovframework.rte.fdl.cryptography.impl.EgovEnvCryptoServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
 
public class EgovEnvCryptoUserTest {
 
	private static final Logger LOGGER = LoggerFactory.getLogger(EgovEnvCryptoUserTest.class);
 
	public static void main(String[] args) {
 
		String[] arrCryptoString = { 
		//"sukim",         //데이터베이스 접속 계정 설정
				"icadmin",         //데이터베이스 접속 계정 설정
		//"assa08!14@",   //데이터베이스 접속 패드워드 설정
		"!Bcsic123",   //데이터베이스 접속 패드워드 설정
		//"jdbc:postgresql://192.168.20.223:5432/edudb?characterEncoding=UTF-8",            //데이터베이스 접속 주소 설정(PMS)
		"jdbc:sqlserver://192.168.20.224;databaseName=Callgate;encrypt=false;",            //데이터베이스 접속 주소 설정(PMS)
		//"jdbc:log4jdbc:postgresql://192.168.20.223:5432/crmdb?characterEncoding=UTF-8",            //데이터베이스 접속 주소 설정(PMS - log4 SQL 추가)
		//"jdbc:postgresql://192.168.199.11:5432/crmdb?characterEncoding=UTF-8",            //데이터베이스 접속 주소 설정(DEV)
		//"jdbc:postgresql://192.168.199.101:5432/crmdb?characterEncoding=UTF-8",            //데이터베이스 접속 주소 설정(QA)
		"com.microsoft.sqlserver.jdbc.SQLServerDriver",  //데이터베이스 드라이버(운영계적용시)
		//"net.sf.log4jdbc.sql.jdbcapi.DriverSpy",  //데이터베이스 드라이버(log4j - sql 출력용, 운영적용시 제거)
//		"!@@broadcns123!"    //AES256 암호화키
              };
 
		LOGGER.info("------------------------------------------------------");		
		@SuppressWarnings("resource")
		ApplicationContext context = new ClassPathXmlApplicationContext(new String[]{"classpath:/egovframework/spring/context-crypto.xml"});
		EgovEnvCryptoService cryptoService = context.getBean(EgovEnvCryptoServiceImpl.class);
		LOGGER.info("------------------------------------------------------");
		
		/**
		 * <개발>
			192.168.20.224 (MS-SQL)
			DB :  Callgate
			ID:       icadmin
			PW:      !Bcsic123
		 */
 
		String label = "";
		try {
			for(int i=0; i < arrCryptoString.length; i++) {		
				if(i==0)label = "사용자 아이디";
				if(i==1)label = "사용자 비밀번호";
				if(i==2)label = "접속 주소";
				if(i==3)label = "데이터 베이스 드라이버";
				if(i==4)label = "AES256 암호화키";
				
				
				LOGGER.info(label+" 원본(orignal):" + arrCryptoString[i]);
				System.out.println(label+" 원본(orignal):" + arrCryptoString[i]);
				
				LOGGER.info(label+" 인코딩(encrypted):" + cryptoService.encrypt(arrCryptoString[i]));
				System.out.println(label+" 인코딩(encrypted):" + cryptoService.encrypt(arrCryptoString[i]));
				
				if(i==4) {
					LOGGER.info(label+" 인코딩(encrypted)+랜덤숫자(4자리) :" + cryptoService.encrypt(arrCryptoString[i]) + (int)(Math.random()*9000)); //AES256 암호화 key(32바이트)
					System.out.println(label+" 인코딩(encrypted)+랜덤숫자(4자리) :" + cryptoService.encrypt(arrCryptoString[i]) + (int)(Math.random()*9000));
				}
				LOGGER.info("------------------------------------------------------");
			}
		} catch (IllegalArgumentException e) {
			LOGGER.error("["+e.getClass()+"] IllegalArgumentException : " + e.getMessage());
		} catch (Exception e) {
			LOGGER.error("["+e.getClass()+"] Exception : " + e.getMessage());
		}
 
	}
 
}