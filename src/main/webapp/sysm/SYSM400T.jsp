<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"      uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring"    uri="http://www.springframework.org/tags"%>
<%
/***********************************************************************************************
* Program Name : SYSM400T.jsp
* Creator      : yhnam
* Create Date  : 2024.01.26
* Description  : 메뉴관리
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.26     yhnam            최초생성
************************************************************************************************/
%>

<header class="headerTit">
    <h2 id="SYSM400T_title"></h2>
<!--     <mark class="neceMark">표시는 필수항목</mark> -->
</header>

<section class="divisonAlong">
    <div class="divContent" style="width: 35%;">
        <h4 class="h4_tit">TopMenu
            <span class="btZoon">
                <button class="btnRefer_default icoType k-icon k-i-sort-asc-sm" title="위로" onclick="SYSM400T_fnMenuUpDown(0, -1)" data-auth-chk="Y" data-auth-type="SAVE" data-auth-id="SYSM400T"></button> <%-- 위로 --%>
				<button class="btnRefer_default icoType k-icon k-i-sort-desc-sm" title="아래로" onclick="SYSM400T_fnMenuUpDown(0, 1)" data-auth-chk="Y" data-auth-type="SAVE" data-auth-id="SYSM400T"></button> <%-- 아래로 --%>
				<button class="btnRefer_default icoType k-icon k-i-plus" title="추가" onclick="SYSM400T_fnAddMenu(0)" data-auth-chk="Y" data-auth-type="SAVE" data-auth-id="SYSM400T"></button> <%-- 추가 --%>
            </span>
        </h4>

        <div class="tableCnt_TR" id="SYSM400T_grid0"><%-- 그리드 영역 --%></div>

        <menu class="btnArea_right">
            <button type="button" class="btnRefer_default" onclick="SYSM400T_fnSaveMenu(0)" data-auth-chk="Y" data-auth-type="SAVE" data-auth-id="SYSM400T"><span>저장</span></button><%-- 저장 --%>
<%--             <button type="button" class="btnRefer_default" onclick="SYSM400T_fnDeleteMenu(0)" data-auth-chk="Y" data-auth-type="DELETE" data-auth-id="SYSM400T"><span>삭제</span></button>삭제 --%>
        </menu>
    </div>

    <div class="divContent" style="width: 65%;">
        <section class="divisonRow">
            <div class="divContent">
                <h4 class="h4_tit">MiddleMenu
                    <span class="btZoon">
                        <button class="btnRefer_default icoType k-icon k-i-sort-asc-sm" title="위로" onclick="SYSM400T_fnMenuUpDown(1, -1)" data-auth-chk="Y" data-auth-type="SAVE" data-auth-id="SYSM400T"></button> <%-- 위로 --%>
                        <button class="btnRefer_default icoType k-icon k-i-sort-desc-sm" title="아래로" onclick="SYSM400T_fnMenuUpDown(1, 1)" data-auth-chk="Y" data-auth-type="SAVE" data-auth-id="SYSM400T"></button> <%-- 아래로 --%>
                        <button class="btnRefer_default icoType k-icon k-i-plus" title="추가" onclick="SYSM400T_fnAddMenu(1)" data-auth-chk="Y" data-auth-type="SAVE" data-auth-id="SYSM400T"></button> <%-- 추가 --%>
                    </span>
                </h4>

                <div class="tableCnt_TR" id="SYSM400T_grid1"><%-- 그리드 영역 --%></div>

                <menu class="btnArea_right">
                    <button type="button" class="btnRefer_default" onclick="SYSM400T_fnSaveMenu(1)" data-auth-chk="Y" data-auth-type="SAVE" data-auth-id="SYSM400T" ><span>저장</span></button>
<!--                     <button type="button" class="btnRefer_default" onclick="SYSM400T_fnDeleteMenu(1)" data-auth-chk="Y" data-auth-type="DELETE" data-auth-id="SYSM400T"><span>삭제</span></button> -->
                </menu>
            </div>

            <div class="divContent">
                <h4 class="h4_tit">3Depth
                    <span class="btZoon">
                        <button class="btnRefer_default icoType k-icon k-i-sort-asc-sm" title="위로" onclick="SYSM400T_fnMenuUpDown(2, -1)" data-auth-chk="Y" data-auth-type="SAVE" data-auth-id="SYSM400T"></button> <%-- 위로 --%>
                        <button class="btnRefer_default icoType k-icon k-i-sort-desc-sm" title="아래로" onclick="SYSM400T_fnMenuUpDown(2, 1)" data-auth-chk="Y" data-auth-type="SAVE" data-auth-id="SYSM400T"></button> <%-- 아래로 --%>
                        <button class="btnRefer_default icoType k-icon k-i-plus" title="추가" onclick="SYSM400T_fnAddMenu(2)" data-auth-chk="Y" data-auth-type="SAVE" data-auth-id="SYSM400T"></button> <%-- 추가 --%>
                    </span>
                </h4>

                <div class="tableCnt_TR" id="SYSM400T_grid2"><%-- 그리드 영역 --%></div>

                <menu class="btnArea_right">
                    <button type="button" class="btnRefer_default" onclick="SYSM400T_fnSaveMenu(2)" data-auth-chk="Y" data-auth-type="SAVE" data-auth-id="SYSM400T"><span>저장</span></button>
<!--                     <button type="button" class="btnRefer_default" onclick="SYSM400T_fnDeleteMenu(2)" data-auth-chk="Y" data-auth-type="DELETE" data-auth-id="SYSM400T"><span>삭제</span></button> -->
                </menu>
            </div>
        </section>
    </div>
</section>

<script type="text/javascript" src="<c:url value="/resources/js/biz/sysm/SYSM400T.js?v=${v}"/>"></script>
