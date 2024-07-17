<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"      uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring"    uri="http://www.springframework.org/tags"%>
<%
/***********************************************************************************************
* Program Name : GLOBAL.jsp
* Creator      : jrlee
* Create Date  : 2022.02.22
* Description  : GLOBAL
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2022.02.22     jrlee            최초생성
************************************************************************************************/

/**
 * session 정보
 *
 * tenantPrefix      : 테넌트ID
 * agentId           : 사용자ID
 * name              : 사용자명
 */
 
// TODO : 실서버 반영시 GLOBAL.debug -> false 로 변경하시기 바랍니다.

%>
<script type="text/javascript">
    const GLOBAL = {
        debug: true,
        contextPath: "${pageContext.request.contextPath}",
        session: {
            user: {
                tenantPrefix: "${user.tenantPrefix}",
                tenantGroupId: "${user.tenantGroupId}",
                agentId: "${user.agentId}",
                name: "${user.name}",
                usrGrd: "${user.usrGrd}",
                usrGrdNm: "${user.usrGrdNm}",
                usrLvl: "${user.usrLvl}",
                systemIdx: "${user.systemIdx}",
                originTenantPrefix: "${user.originTenantPrefix}",
                originAgentId: "${user.originAgentId}",
                originUsrGrd: "${user.originUsrGrd}",
				mlingCd: encodeURIComponent("ko-KR"),
            },
        },
        fn: {
            setSessionUser: function (_user) {
                let keys = Object.keys(GLOBAL.session.user);

                for (let i = 0; i < keys.length; i++) {
                    if ($.trim(GLOBAL.session.user[keys[i]]) != $.trim(_user[keys[i]])) {
                        GLOBAL.session.user[keys[i]] = $.trim(_user[keys[i]]);
                    }
                }

                // iframe popup update
                for (let i = 0; i < $('iframe').length; i++) {
                    if (!$.isEmptyObject($('iframe')[i].contentWindow.GLOBAL))
                        $('iframe')[i].contentWindow.GLOBAL.fn.setSessionUser(_user);
                }

                // window popup update
                for (let i = 0; i < arrWin.length; i++) {
                    if (!$.isEmptyObject(arrWin[i].GLOBAL))
                        arrWin[i].GLOBAL.fn.setSessionUser(_user);
                }
                // console.info("================== [GLOBAL.session.user 정보가 갱신되었습니다.] ==================");
            },
        }
    }

    window.GLOBAL = GLOBAL;
    Object.freeze(GLOBAL);

    if (!GLOBAL.debug) {
        if (!window.console) window.console = {};
        let methods = ["log", "debug", "warn", "info"];

        for (let i = 0; i < methods.length; i++) {
            console[methods[i]] = function () {};
        }
    }
</script>