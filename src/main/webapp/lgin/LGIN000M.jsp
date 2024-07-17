<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"      uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring"    uri="http://www.springframework.org/tags"%>
<%
/***********************************************************************************************
* Program Name : 로그인
* Creator      : dwson
* Create Date  : 2024.01.24
* Description  : 로그인
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
<link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/vl/component.css"/>"/>
<link rel="stylesheet" type="text/css" href="<c:url value='/resources/css/vl/common.css?v=${v}'/>"/>
<link rel="stylesheet" type="text/css" href="<c:url value="/resources/css/vl/content.css?v=${v}"/>"/>

<script type="text/javascript" src="<c:url value="/resources/js/jquery/3.2.1/jquery.min.js"/>"></script>
<script type="text/javascript" src="<c:url value="/resources/js/vl/common.js?v=${v}"/>"></script>
<script type="text/javascript" src="<c:url value="/resources/js/biz/comm/utils.js?v=${v}"/>"></script>
<script type="text/javascript" src="<c:url value="/resources/js/biz/comm/bizComm.js?v=${v}"/>"></script>

<script type="text/javascript" src="<c:url value="/resources/libs/kendoGrid/js/kendo.all.min.js"/>"></script>
<script type="text/javascript" src="<c:url value="/resources/libs/kendoGrid/js/cultures/kendo.culture.ko.min.js"/>"></script>
<script type="text/javascript" src="<c:url value="/resources/libs/kendoGrid/js/messages/kendo.messages.ko-KR.js"/>"></script>
<script type="text/javascript" src="<c:url value="/resources/libs/kendoGrid/js/jszip.min.js"/>"></script>

<c:choose>
    <c:when test="${!empty param.title}">
        <title>${param.title}</title>
    </c:when>
    <c:otherwise>
        <title>비주얼레터링</title>
    </c:otherwise>
</c:choose>

<jsp:include page="/frme/GLOBAL.jsp"/>

<style type="text/css">
	.loading {
		display: inline-block;
		width: 30px;
		height: 30px;
		border: 3px solid rgba(255,255,255,.3);
		border-radius: 50%;
		border-top-color: #fff;
		animation: spin 1s ease-in-out infinite;
		-webkit-animation: spin 1s ease-in-out infinite;
	}
	@keyframes spin {
		to { -webkit-transform: rotate(360deg); }
	}
	@-webkit-keyframes spin {
		to { -webkit-transform: rotate(360deg); }
	}
	
	body  { overflow: auto; }
</style>
</head>

<body class="loginWrap"> 
	<section class="loginContainer">
		<h1></h1>
		<form id="LGIN000M" name="LGIN000M" method="post">
			<span style="display: block;font-size: 46px;color: #FFFFFF;font-weight: bold;width:  300px;height: 60px;padding-top: 10px;">EXONA LITE</span>
		<ul class="loginForm">
			<li>
				<span class="label"><i class="icoUtil_client"></i>고객사</span>
<!-- 				<input type="text" class="input" placeholder="입력하세요." id="tenantPrefix" name="tenantPrefix" maxlength="20" autoComplete="off" onkeyup="$(this).val(this.value.toUpperCase());"/> -->
				<input type="text" class="input" placeholder="입력하세요." id="tenantPrefix" name="tenantPrefix" maxlength="20" autoComplete="off"/>
				<input type="hidden" id="mlingCd" name="mlingCd" maxlength="2" readonly> 
			</li>
			<li>
				<span class="label"><i class="icoUtil_id"></i>아이디</span>
				<input type="text" class="input" placeholder="입력하세요." id="agentId" name="agentId" maxlength="20"  autoComplete="off" />
			</li>
			<li>
				<span class="label"><i class="icoUtil_pw"></i>비밀번호</span>
				<input type="password" class="input" placeholder="입력하세요."
				       id="password" name="password" maxlength="20"  autoComplete="off" onkeyup="if(window.event.keyCode==13){LGIN000M_fnLoginValidationCheck();}"/>
			</li>
			<li class="block">
				<button type="button" class="logBtn" onclick="LGIN000M_fnLoginValidationCheck();">
					<i class="icoUtil_login"></i>로그인
				</button>
			</li>
			<li class="block">
				<p class="check">
					<input type="checkbox" id="IdSave" onclick='fn_chkIdSave(e);'><!-- id 명 rename요함! -->
					<label for="IdSave">아이디 저장</label><!-- id 값과 for 값을 동일하게 작업요함~! -->
					<input type="hidden" id="IdSaveYn" value="Y" />
				</p>
			</li>
		</ul>
		</form>
	</section><!-- //  class="loginContainer"  끝 -->
<script type="text/javascript" src="<c:url value="/resources/js/biz/lgin/LGIN000M.js?v=${v}"/>"></script>
</body>
</html>