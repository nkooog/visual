<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"      uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring"    uri="http://www.springframework.org/tags"%>
<%
/***********************************************************************************************
* Program Name : SYSM300T.jsp
* Creator      : yhnam
* Create Date  : 2024.02.08
* Description  : URL설정
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.02.08     yhnam            최초생성
************************************************************************************************/
%>

<div id="SYSM300T">
    <header class="headerTit">
        <h2 id="SYSM300T_title"></h2>
    </header>

    <!-- 검색영역 시작 -->
	<article class="SearchWrap subZoon">
		<ul class="option">
	        <li style="width:100%;">
	        	<span class="label_tit ma_left5">시스템</span>
				<input id="SYSM300_systemIdx" name="SYSM300_systemIdx"/>
				
				<span class="label_tit ma_left5">테넌트</span>
				<input id="SYSM300_tenantPrefix" name="SYSM300_tenantPrefix"/>
				
				<span class="label_tit ma_left5">서비스타입</span>
				<input id="SYSM300_visualType" name="SYSM300_visualType"/>
				
				<span class="label_tit ma_left5">검색</span>
				<input type="search" class="k-input" id="SYSM300_keyword" name="SYSM300_keyword" autocomplete="off" placeholder="" style="padding-right:0;" onkeyup="if(window.event.keyCode==13){SYSM300T_fnSearch();}">
			</li>
		</ul>
		<span class="btZoon">
			<button type="button" class="btnRefer_primary" onclick="SYSM300T_fnSearch();">조회</button>
		</span>
	</article>
	<!-- 검색영역 끝 -->

    <div class="divContent" style="width: 100%;">
		<h4 class="h4_tit">URL설정 목록
			<span class="btZoon">
<%-- 				<button class="btnRefer_second" title="추가" onclick="SYSM300T_fnContentAdd();" data-auth-chk="Y" data-auth-type="INSERT" data-auth-id="SYSM300T">추가</button> 추가 --%>
				<button class="btnRefer_success" title="엑셀" onclick="SYSM300T_fnContentExcel();" data-auth-chk="Y" data-auth-type="XLXDOWN" data-auth-id="SYSM300T" id="SYSM300_btnExcel">엑셀 다운로드</button>
            </span>
		</h4>
		<div class="tableCnt_TR" id="grdSYSM300T"></div>
	</div>

</div>

<script type="text/javascript" src="<c:url value="/resources/js/biz/sysm/SYSM300T.js?v=${v}"/>"></script>