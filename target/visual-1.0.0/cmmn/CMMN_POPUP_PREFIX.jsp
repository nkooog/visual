<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"      uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring"    uri="http://www.springframework.org/tags"%>
<%
/***********************************************************************************************
 * Program Name : 팝업 공통 PREFIX(CMMN_POPUP_PREFIX.jsp)
 * Creator      : jrlee
 * Create Date  : 2022.04.18
 * Description  : 팝업 공통 PREFIX
 * Modify Desc  :
 * -----------------------------------------------------------------------------------------------
 * Date         | Updater        | Remark
 * -----------------------------------------------------------------------------------------------
 * 2022.04.18     jrlee            최초생성
 ************************************************************************************************/
%>
<!DOCTYPE html>
<html lang="ko">
<head>
    <jsp:include page="/frme/FRME_HEAD.jsp"/>
    <script>
        GLOBAL.fn.setSessionUser(Utils.getParent().GLOBAL.session.user);    // 메인창 세션 상속
        GLOBAL.fn.setBascVlu(Utils.getParent().GLOBAL.bascVlu.list);        // 메인창 기준값 상속

        Utils.ajaxCall("/frme/sessionCheck", null, function (sessionCheck) {
            if (!sessionCheck.result) {
                var parentTarget = Utils.getParent();

                Utils.alert("<spring:message code="errors.session.expired"/>", function () {
                    parentTarget.Utils.closeAllPopup();
                    parentTarget.location.href = GLOBAL.contextPath + "/lgin/login";
                });
            }
        });
    </script>

    <style type="text/css">
        body  { overflow: auto; }
    </style> 
</head>
<body class="${empty usrEnvr.sknCdNm ? 'themeDefault' : usrEnvr.sknCdNm}">