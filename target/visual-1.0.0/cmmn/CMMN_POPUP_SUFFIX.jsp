<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"      uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring"    uri="http://www.springframework.org/tags"%>
<%
/***********************************************************************************************
 * Program Name : 팝업 공통 SUFIX(CMMN_POPUP_SUFFIX.jsp)
 * Creator      : jrlee
 * Create Date  : 2022.04.18
 * Description  : 팝업 공통 SUFFIX
 * Modify Desc  :
 * -----------------------------------------------------------------------------------------------
 * Date         | Updater        | Remark
 * -----------------------------------------------------------------------------------------------
 * 2022.04.18     jrlee            최초생성
 ************************************************************************************************/
%>
<script>
    //Popup - 버튼 권한
    if(Utils.getParent().MAINFRAME_SUB){
		Utils.getParent().MAINFRAME_SUB.btnAuthCheck(true,$("body [data-auth-chk=Y]"));
    }
</script>
</body>
</html>