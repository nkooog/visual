<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"      uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring"    uri="http://www.springframework.org/tags"%>
<%
/***********************************************************************************************
* Program Name : OPST100T.jsp
* Creator      : dwson
* Create Date  : 2024.02.14
* Description  : 사용 이력
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.02.14     dwson            최초생성
************************************************************************************************/
%>

<header class="headerTit">
    <h2 id="OPST100T_title"></h2>
<!--     <mark class="neceMark">표시는 필수항목</mark> -->
</header>

<!-- // class="popContainer" 시작 -->
<section id="OPST100T" class="popContainer">
	<div>
		<!-- 검색영역 시작 -->
		<article class="SearchWrap subZoon">
			<ul class="option">
				<li style="width:100%;">
					<span class="label_tit ma_left5">시스템</span>
					<input type="search" class="k-input" id="OPST100_systemIdx" name="OPST100_systemIdx" placeholder="" style="width:100%; padding-right:0;">

					<span class="label_tit ma_left5">테넌트</span>
					<input type="search" class="k-input" id="OPST100_tenantPrefix" name="OPST100_tenantPrefix" placeholder="" style="width:100%; padding-right:0;" >

					<span class="label_tit ma_left5">서비스명</span>
					<input type="search" class="k-input" id="OPST100_serviceType" name="OPST100_serviceType" placeholder="" style="width:100%; padding-right:0;">

					<span class="label_tit ma_left5">전송결과</span>
					<input type="search" class="k-input" id="OPST100_resultCode" name="OPST100_resultCode" placeholder="" style="width:100%; padding-right:0;">
				</li>
				<li style="width:100%;">
					<span class="label_tit ma_left5">기간</span>
					<jsp:include page="/cmmn/CMMN_SEARCH_DATE_NOBTN.jsp">
						<jsp:param name="startDateNm" value="OPST100T_dateStart"/>
						<jsp:param name="endDateNm" value="OPST100T_dateEnd"/>
						<jsp:param name="searchType" value="date"/>
						<jsp:param name="id" value="OPST100T"/>
					</jsp:include>

<%--					<span class="label_tit ma_left5">처리방식</span>--%>
<%--					<input type="search" class="k-input" id="OPST100_sendCode" name="OPST100_sendCode" placeholder="" style="width:100%; padding-right:0;">--%>

					<span class="label_tit ma_left5">검색어</span>
					<input type="search" class="k-input" id="OPST100_keyword" name="OPST100_keyword" placeholder="" style="width:100%; padding-right:0;">
				</li>
			</ul>
			<span class="btZoon">
				<button type="button" class="btnRefer_primary" onclick="OPST100_fnSearch();">조회</button>
<!-- 				<button type="button" class="btnRefer_primary ma_left5" onclick="OPST100_filterClearButton();">Clear</button> -->
			</span>
		</article>
		<!-- 검색영역 끝 -->
		
		<div class="divContent" style="width: 100%;">
			<h4 class="h4_tit">사용 이력
				<span class="btZoon">
					<button class="btnRefer_success" id="OPST100_btnExcel" data-auth-chk="Y" data-auth-type="XLXDOWN" data-auth-id="OPST100T">엑셀 다운로드</button>
	            </span>
			</h4>
			<div id="grid_OPST100" class="tableCnt_TR"></div><!-- id 명 rename 요함! -->
		</div>

	</div>
</section>
<!-- // class="popContainer" 끝 -->

<script type="text/javascript" src="<c:url value="/resources/js/biz/opst/OPST100T.js?v=${v}"/>"></script>
