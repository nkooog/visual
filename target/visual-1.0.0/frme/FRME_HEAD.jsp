<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"      uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring"    uri="http://www.springframework.org/tags"%>
<%
/***********************************************************************************************
* Program Name : FRME_HEAD
* Creator      : dwson
* Create Date  : 2024.01.24
* Description  : HEAD 화면
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.24     dwson            최초생성
************************************************************************************************/
%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<!-- <meta http-equiv="X-UA-Compatible" content="IE=edge" /> -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="format-detection" content="telephone=no">

<link rel="shortcut icon" href="<c:url value='/resources/images/favicon/favicon.ico'/>"/>
<link rel="icon" type="image/png" href="<c:url value='/resources/images/favicon/favicon.png'/>"/>
<link rel="apple-touch-icon" href="<c:url value='/resources/images/favicon/favicon.png'/>"/>

<link rel="stylesheet" type="text/css" href="<c:url value="/resources/libs/kendoGrid/styles/kendo.common-material.min.css"/>"/>
<link rel="stylesheet" type="text/css" href="<c:url value="/resources/libs/kendoGrid/styles/kendo.material.min.css"/>"/>
<link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/vl/jquery.bxslider.min.css"/>"/>
<link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/vl/begin.part.css"/>"/>
<link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/vl/component.css"/>"/>
<link rel="stylesheet" type="text/css" href="<c:url value='/resources/css/vl/common.css?v=${v}'/>"/>
<link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/vl/content.css?v=${v}"/>"/>
<link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/vl/fullcalendar.css?v=${v}"/>"/>
<link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/vl/vl.style.css"/>"/>
<script type="text/javascript" src="<c:url value="/resources/js/jquery/3.2.1/jquery.min.js"/>"></script>
<script type="text/javascript" src="<c:url value="/resources/js/vl/common.js?v=${v}"/>"></script>
<script type="text/javascript" src="<c:url value="/resources/js/biz/comm/utils.js?v=${v}"/>"></script>
<script type="text/javascript" src="<c:url value="/resources/js/biz/comm/bizComm.js?v=${v}"/>"></script>

<script type="text/javascript" src="<c:url value="/resources/libs/kendoGrid/js/kendo.all.min.js"/>"></script>
<script type="text/javascript" src="<c:url value="/resources/libs/kendoGrid/js/cultures/kendo.culture.ko.min.js"/>"></script>
<script type="text/javascript" src="<c:url value="/resources/libs/kendoGrid/js/messages/kendo.messages.ko-KR.js"/>"></script>
<script type="text/javascript" src="<c:url value="/resources/libs/kendoGrid/js/jszip.min.js"/>"></script>
<script type="text/javascript" src="<c:url value="/resources/js/vl/jquery.marquee.min.js"/>"></script>

<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.2/dist/vue.js"></script>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>

<c:choose>
    <c:when test="${!empty param.title}">
        <title>${param.title}</title>
    </c:when>
    <c:otherwise>
        <title><spring:message code="HEAD.title"/></title>
    </c:otherwise>
</c:choose>

<jsp:include page="/frme/GLOBAL.jsp"/>

<script>
    var HEAD_langMap = new HashMap();
    HEAD_langMap.put("alert.title", '<spring:message code="alert.title"/>');
    HEAD_langMap.put("alert.message.OK", '<spring:message code="alert.message.OK"/>');
    HEAD_langMap.put("alert.message.cancle", '<spring:message code="alert.message.cancle"/>');
    HEAD_langMap.put("combo.select", '<spring:message code="combo.select"/>');
    HEAD_langMap.put("combo.all", '<spring:message code="combo.all"/>');

    var MAINFRAME_langMap = new HashMap();
    MAINFRAME_langMap.put("errors.session.expired", '<spring:message code="errors.session.expired"/>');
    MAINFRAME_langMap.put("FRME100M.tab.confirm.close", '<spring:message code="FRME100M.tab.confirm.close"/>');
    MAINFRAME_langMap.put("FRME100M.tab.confirm.close.all", '<spring:message code="FRME100M.tab.confirm.close.all"/>');
    MAINFRAME_langMap.put("FRME100M.menu.alert.noDataframe", '<spring:message code="FRME100M.menu.alert.noDataframe"/>');
    MAINFRAME_langMap.put("FRME100M.menu.alert.noPermission", '<spring:message code="FRME100M.menu.alert.noPermission"/>');
    MAINFRAME_langMap.put("error.tenantPrefix", '<spring:message code="error.tenantPrefix"/>');

    MAINFRAME_langMap.put("FRME100M.getBasicInfo.default", '<spring:message code="FRME100M.getBasicInfo.default"/>');
    MAINFRAME_langMap.put("FRME_TOP.multiple.open.main", '<spring:message code="FRME_TOP.multiple.open.main"/>');
    MAINFRAME_langMap.put("FRME_TOP.close.main", '<spring:message code="FRME_TOP.close.main"/>');
</script>

<style type="text/css">
	body  { overflow: auto; }
</style>

<script>
    GLOBAL.fn.setSessionUser(Utils.getParent().GLOBAL.session.user);    // 메인창 세션 상속

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
</head>

<body class="themeDefault">