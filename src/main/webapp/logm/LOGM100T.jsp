<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"      uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring"    uri="http://www.springframework.org/tags"%>
<%
/***********************************************************************************************
* Program Name : FRME100M.jsp
* Creator      : dwson
* Create Date  : 2024.02.21
* Description  : 사용자 로그
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.02.21     dwson            최초생성
************************************************************************************************/
%>

<header class="headerTit">
    <h2 id="LOGM100T_title"></h2>
<!--     <mark class="neceMark">표시는 필수항목</mark> -->
</header>

<!-- // class="popContainer" 시작 -->
<section id="LOGM100T" class="popContainer">
	<div>
		<!-- 검색영역 시작 -->
		<article class="SearchWrap subZoon">
			<ul class="option">
		        <li style="width:100%;">
					<span class="label_tit ma_left5">시스템</span>
					<input id="LOGM100_systemIdx" name="LOGM100_systemIdx" style="width:100%; padding-right:0;">
					
					<span class="label_tit ma_left5">테넌트</span>
					<input id="LOGM100_tenant" name="LOGM100_tenant" style="width:100%; padding-right:0;">
					
					<span class="label_tit ma_left5">액션</span>
					<input id="LOGM100_action" name="LOGM100_action" style="width:100%; padding-right:0;">

					<span class="label_tit ma_left5">콘텐츠명</span>
					<input type="search" class="k-input" id="LOGM100_keyword" name="LOGM100_keyword" autocomplete="off" placeholder="" style="width:100%; padding-right:0;">
				</li>
				
				<li style="width:100%;">
					<span class="label_tit ma_left5">기간</span>
					<jsp:include page="/cmmn/CMMN_SEARCH_DATE_NOBTN.jsp">
						<jsp:param name="startDateNm" value="LOGM100T_dateStart"/>
						<jsp:param name="endDateNm" value="LOGM100T_dateEnd"/>
						<jsp:param name="searchType" value="date"/>
						<jsp:param name="id" value="LOGM100T"/>
					</jsp:include>
				</li>
			</ul>
			<span class="btZoon">
				<button type="button" class="btnRefer_primary" onclick="LOGM100_fnSearch();">조회</button>
<!-- 				<button type="button" class="btnRefer_primary ma_left5" onclick="LOGM100_filterClearButton();">Clear</button> -->
			</span>
		</article>
		<!-- 검색영역 끝 -->
		
		<div class="divContent" style="width: 100%;">
			<h4 class="h4_tit">사용자 로그
				<span class="btZoon">
					<button class="btnRefer_success" id="LOGM100_btnExcel" data-auth-chk="Y" data-auth-type="XLXDOWN" data-auth-id="LOGM100T">엑셀 다운로드</button>
	            </span>
			</h4>
			<div id="grid_LOGM100" class="tableCnt_TR"></div><!-- id 명 rename 요함! -->
		</div>

	</div>
</section>
<!-- // class="popContainer" 끝 -->

<script type="text/javascript" src="<c:url value="/resources/js/biz/logm/LOGM100T.js?v=${v}"/>"></script>
