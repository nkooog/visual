<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"      uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring"    uri="http://www.springframework.org/tags"%>
<%
/***********************************************************************************************
* Program Name : EXLT140.jsp
* Creator      : jypark
* Create Date  : 2024.03.26
* Description  : Visual Lettering 전송 이력
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.03.26     jypark            최초생성
************************************************************************************************/
%>

<header class="headerTit">
    <h2 id="EXLT120T_title">콜 통계</h2>
<!--     <mark class="neceMark">표시는 필수항목</mark> -->
</header>

<!-- // class="popContainer" 시작 -->
<section id="EXLT120T" class="popContainer">
	<div>
		<form name="sendForm">
			<!-- 검색영역 시작 -->
			<article class="SearchWrap subZoon">
				<ul class="option">
					<li style="width:100%;">
						<span class="label_tit ma_left5">서비스 번호</span>
						<input type="search" class="k-input" id="EXLT120_keyword1" name="EXLT120_keyword1"  placeholder="" style="width:100%" />
						
						<span class="label_tit ma_left5">조회유형</span>
						<div id="EXLT120_select" name="EXLT120_select"></div>

						<div id="EXLT120_calendar" style="width: 100%;display: flex;">
							<span class="label_tit ma_left5">조회일자</span>
							<jsp:include page="/cmmn/CMMN_SEARCH_DATE_NOBTN.jsp">
								<jsp:param name="startDateNm" value="EXLT120T_dateStart"/>
								<jsp:param name="endDateNm" value="EXLT120T_dateEnd"/>
								<jsp:param name="searchType" value="date"/>
								<jsp:param name="id" value="EXLT120T"/>
							</jsp:include>
						</div>

						<div id="EXLT120T_yearArea" style="width: 100%;display: none;">
							<span class="label_tit ma_left5">년도</span>
							<div id="EXLT120T_year"></div>
						</div>

					</li>
				</ul>
				<span class="btZoon">
					<button type="button" id="EXLT120_usrId" class="btnRefer_primary" onclick="EXLT120_fnSearch();">조회</button>
				</span>
			</article>
			<!-- 검색영역 끝 -->
		</form>
		<div class="divContent" style="width: 100%;">
			<div id="grid_EXLT120" class="tableCnt_TR"></div><!-- id 명 rename 요함! -->
		</div>
	</div>
</section>
<!-- // class="popContainer" 끝 -->

<script type="text/javascript" src="<c:url value="/resources/js/biz/exlt/EXLT120T.js?v=${v}"/>"></script>
