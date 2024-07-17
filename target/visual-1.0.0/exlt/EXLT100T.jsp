<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"      uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring"    uri="http://www.springframework.org/tags"%>
<%
/***********************************************************************************************
* Program Name : EXLT100.jsp
* Creator      : nyh
* Create Date  : 2024.03.29
* Description  : Visual Lettering 통계
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.03.29     nyh            최초생성
************************************************************************************************/
%>

<header class="headerTit">
    <h2 id="EXLT100T_title"></h2>
<!--     <mark class="neceMark">표시는 필수항목</mark> -->
</header>

<!-- // class="popContainer" 시작 -->
<section id="EXLT100T" class="popContainer">
	<div>
		<form name="sendForm">
			<!-- 검색영역 시작 -->
			<article class="SearchWrap subZoon">
				<ul class="option">
					<li style="width:100%;">
						<span class="label_tit ma_left5">서비스</span>
						<div id="EXLT100_select1" name="EXLT100_select1"></div>
						
						<span class="label_tit ma_left5">조회유형</span>
						<div id="EXLT100_select2" name="EXLT100_select2"></div>
						
						<div class="EXLT100T_searchType1" style="width: 100%;display: flex;">
							<span class="label_tit ma_left5">조회일자</span>
							<jsp:include page="/cmmn/CMMN_SEARCH_DATE_NOBTN.jsp">
								<jsp:param name="startDateNm" value="EXLT100T_dateStart"/>
								<jsp:param name="endDateNm" value="EXLT100T_dateEnd"/>
								<jsp:param name="searchType" value="date"/>
								<jsp:param name="id" value="EXLT100T"/>
							</jsp:include>
						</div>
						
						<div class="EXLT100T_searchType2" style="width: 100%;display: none;">
							<span class="label_tit ma_left5">년도</span>
							<div id="EXLT100_select3"></div>
						</div>
					</li>
				</ul>
				<span class="btZoon">
					<button type="button" id="EXLT100_usrId" class="btnRefer_primary" onclick="EXLT100_fnSearch();">조회</button>
				</span>
			</article>
			<!-- 검색영역 끝 -->
		</form>
		<div class="divContent" style="width: 100%;">
			<div id="grid_EXLT100" class="tableCnt_TR"></div><!-- id 명 rename 요함! -->
		</div>
	</div>
</section>
<!-- // class="popContainer" 끝 -->

<script type="text/javascript" src="<c:url value="/resources/js/biz/exlt/EXLT100T.js?v=${v}"/>"></script>
