<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"      uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring"    uri="http://www.springframework.org/tags"%>
<%
/***********************************************************************************************
* Program Name : SYSM500T.jsp
* Creator      : yhnam
* Create Date  : 2024.02.08
* Description  : 사용자활동내역
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.02.08     yhnam            최초생성
************************************************************************************************/
%>

<div id="SYSM500T">
    <header class="headerTit">
        <h2 id="SYSM500T_title"></h2>
    </header>

    <article class="SearchWrap">

    </article>

    <h4 class="h4_tit">활동내역</h4>

    <div class="tableCnt_TR" id="grdSYSM500T"></div>

</div>

<script type="text/javascript" src="<c:url value="/resources/js/biz/sysm/SYSM500T.js?v=${v}"/>"></script>

<style>
	.SYSM500T_authX {
		background-color : #fcffa8 !important
	}
	
	.SYSM500T_error {
		background-color : #ffd9d9 !important
	}
</style>