package bcs.vl.util.session;

import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

import bcs.vl.lgin.VO.LGIN000VO;

public class SessionUtil {

	/**
	 * 로그인 정보 조회
	 * @return
	 */
	public static LGIN000VO getLoginUser() {

		RequestAttributes req = RequestContextHolder.getRequestAttributes();
		if (req == null) return null;
		if (req.getAttribute("user", RequestAttributes.SCOPE_SESSION) == null) return null;

		return (LGIN000VO) req.getAttribute("user", RequestAttributes.SCOPE_SESSION);
	}
	
}
