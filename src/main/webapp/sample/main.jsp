<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<%
/***********************************************************************************************
* Program Name : 샘플페이지
* Creator      : dwson
* Create Date  : 2022.01.04
* Description  : 샘플페이지
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2022.01.04     sukim            최초생성
************************************************************************************************/
%>

<!-- Head -->
<!-- <header class="popHeader"> -->
<!--     사용자 관리 -->
<!--     <button class="popClose" title="환자찾기" onclick="window.close();"></button> -->
<!-- </header> -->

<!-- // class="popContainer" 시작 -->
<%-- <jsp:include page="/cmmn/CMMN_POPUP_PREFIX.jsp"/> --%>
<section id="sampleList" class="popContainer">
	<div>
<h1 style="font-size:30px; font-weight:bold;">메인페이지</h1>
		<!-- 검색영역 시작 -->
		<article class="SearchWrap subZoon">
			<ul class="option">
			    <li style="width: 70%;">
		            <span class="label_tit">수술일</span>
		            <jsp:include page="/cmmn/CMMN_SEARCH_DATE_NOBTN.jsp">
		                <jsp:param name="startDateNm" value="YJGB100T_StartDate"/>
		                <jsp:param name="endDateNm" value="YJGB100T_EndDate"/>
		                <jsp:param name="startRangeDay" value="-30"/>
		                <jsp:param name="endRangeDay" value="0"/>
		            </jsp:include>
		        </li>
			</ul>
			<span class="btZoon">
				<button type="button" class="btnRefer_primary" onclick="YJGB100_fnSearch();">조회</button>
			</span>
		</article>
		<!-- 검색영역 끝 -->

		<!-- Grid -->
		<div id="grid_sampleList" class="tableCnt_TR cnslSubGrid3"></div><!-- id 명 rename 요함! -->
		
		<!-- Btn -->
		<menu class="btnArea_wide" id="CNSL213T_btnDiv">
			<span class="btnArea_left">
				<button class="btnRefer_second" onclick="" id="transBtn">추가</button>
			</span>
			<span class="btnArea_right">
				<button class="btnRefer_primary" id="saveWaitBtn" onclick="">수정</button>
				<button class="btnRefer_second" id="saveRestBtn" onclick="">삭제</button>
				<button class="btnRefer_default" id="saveWorkBtn" onclick="">닫기</button>
			</span>
		</menu>

	</div>
</section>
<!-- // class="popContainer" 끝 -->

<!-- JS 및 명칭 호출 -->
<%-- <script type="text/javascript" src="<c:url value="/resources/js/biz/bizs/HYJG/YJGB100T.js?v=${v}"/>"></script> --%>
