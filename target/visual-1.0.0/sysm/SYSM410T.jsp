<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"      uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring"    uri="http://www.springframework.org/tags"%>
<%
/***********************************************************************************************
* Program Name : SYSM410T.jsp
* Creator      : yhnam
* Create Date  : 2024.01.31
* Description  : 테넌트 그룹별 메뉴권한관리
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.31     yhnam            최초생성
************************************************************************************************/
%>
<header class="headerTit">
    <h2 id="SYSM410T_title"></h2>
</header>

<section class="divisonCol">

	<div class="divContent" style="width: 20%;">
        <h4 class="h4_tit">테넌트 리스트</h4>

        <div class="tableCnt_TR" id="SYSM410T_grid2"><%-- 그리드 영역 --%></div>
    </div>
    
    <div class="divContent" style="width: 20%;">
        <h4 class="h4_tit">권한 그룹</h4>

        <div class="tableCnt_TR" id="SYSM410T_grid0"><%-- 그리드 영역 --%></div>
    </div>

    <div class="divContent" style="width: 60%;">
        <section class="divisonRow">
            <div class="divContent">
                <h4 class="h4_tit">메뉴 권한
                    <span class="btZoon">
                        <button type="button" class="btnRefer_default" onclick="SYSM410T_fnInitMenu()"><span>초기화</span></button> <%-- 초기화 --%>
                    </span>
                </h4>

                <div class="tableCnt_TR" id="SYSM410T_grid1"><%-- 그리드 영역 --%></div>

                <menu class="btnArea_right">
                    <button type="button" class="btnRefer_default" onclick="SYSM410T_fnSaveMenu()" data-auth-chk="Y" data-auth-type="SAVE" data-auth-id="SYSM410T" ><span>저장</button><%-- 저장 --%>
                </menu>
            </div>
        </section>
    </div>
</section>

<script type="text/javascript" src="<c:url value="/resources/js/biz/sysm/SYSM410T.js?v=${v}"/>"></script>