package bcs.vl.cmmn.interceptor;

import bcs.vl.lgin.VO.LGIN000VO;
import bcs.vl.util.string.StringUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class Interceptor implements HandlerInterceptor {
	
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    	
    	Logger LOGGER = LoggerFactory.getLogger(this.getClass());
    	HttpSession session = request.getSession();

    	try {
    		
    		String currUri 		= request.getRequestURI();
    		boolean isPass		= false;
			/* Interceptor를 적용하지 않을 path를 설정 한다. */
    		String[] passtUri	= new String[] {
    				"/resources/",
    				"/lgin/",
    				"/if/",
    				"/bizs/INHU/",
    				"/SoftPhone/",
//    				"/content/",
//    			    "/photo/",
//    			    "/dashphoto/",
//    			    "/cmmtphoto/",
//    			    "/cmmtphotoimg/",
//    			    "/cmmtphotocnts/",
//    			    "/cmmtphotocntstmp/",
//    			    "/kmstphoto/",
//    			    "/kmstphotoimg/",
//    			    "/kmstphotocnts/",
//    			    "/kmstphotocntstmp/",
//    			    "/rsvphotodeas/",
//    			    "/rsvphotodocter/",
//    			    "/form/",
//    			    "/dashimg/",
//    			    "/mmsimg/"
    		};
    		
    		for(int i=0; i<passtUri.length; i++) {
    			if(currUri.indexOf(passtUri[i]) >= 0) {
    				isPass = true;
    				break;
    			}
    		}
    		
    		//파일 업로드 시작점 확인
    		if("ncrm".equals(request.getHeader("ajaxhost"))) {
    			isPass = true;
    		}
    		
    		if(!isPass) {
    			
    			LGIN000VO sessionVo = (LGIN000VO) session.getAttribute("user");
    			
    			if("".equals(StringUtil.nullToBlank(sessionVo))) {
    				response.sendRedirect(request.getContextPath()+"/lgin/LGIN000M");
    				return false;
    			} else {
    				
    				String agentId = StringUtil.nullToBlank(sessionVo.getAgentId());
    				
    				if("".equals(agentId)) {
    					response.sendRedirect(request.getContextPath()+"/lgin/LGIN000M");
    					return false;
        			}
    			}
    		} else {
    			LOGGER.debug("###### interceptor currUri : " + currUri);
    		}
        	
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}

        // 요청 처리 전에 실행되는 로직을 구현합니다.
        return true; // true를 반환하면 요청이 계속 진행됩니다.
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
    	// 요청 처리 후에 실행되는 로직을 구현합니다.      
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        // 요청 처리 완료 후에 실행되는 로직을 구현합니다.
    }
}