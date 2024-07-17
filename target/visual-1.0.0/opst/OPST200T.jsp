<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"      uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring"    uri="http://www.springframework.org/tags"%>
<%
/***********************************************************************************************
* Program Name : OPST100T.jsp
* Creator      : dwson
* Create Date  : 2024.02.01
* Description  : 사용 통계
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.02.01     dwson            최초생성
************************************************************************************************/
%>

<header class="headerTit">
    <h2 id="OPST200T_title"></h2>
<!--     <mark class="neceMark">표시는 필수항목</mark> -->
</header>

<!-- // class="popContainer" 시작 -->
<section id="OPST200T" class="popContainer">
	<div>
		<!-- 검색영역 시작 -->
		<article class="SearchWrap subZoon">
			<ul class="option">
		        <li style="width:100%;">
					<span class="label_tit ma_left5">시스템</span>
					<input id="OPST200_systemIdx" name="OPST200_systemIdx"/>
					
					<span class="label_tit ma_left5">테넌트</span>
					<input id="OPST200_tenantPrefix" name="OPST200_tenantPrefix"/>
					
					<span class="label_tit ma_left5">서비스명</span>
					<input id="OPST200_serviceName" name="OPST200_serviceName"/>
				</li>
				
				<li style="width:100%;">
					<span class="label_tit ma_left5">기간</span>
					<jsp:include page="/cmmn/CMMN_SEARCH_DATE_NOBTN.jsp">
						<jsp:param name="startDateNm" value="OPST200T_dateStart"/>
						<jsp:param name="endDateNm" value="OPST200T_dateEnd"/>
						<jsp:param name="searchType" value="date"/>
						<jsp:param name="id" value="OPST200T"/>
					</jsp:include>
				</li>
			</ul>
			<span class="btZoon">
				<button type="button" class="btnRefer_primary" onclick="OPST200_fnSearch();">조회</button>
<!-- 				<button type="button" class="btnRefer_primary ma_left5" onclick="OPST200_filterClearButton();">Clear</button> -->
			</span>
		</article>
		<!-- 검색영역 끝 -->
		
		<div class="divContent" style="width: 100%;">
			<h4 class="h4_tit">사용 통계
				<span class="btZoon">
<!-- 					<button type="button" class="btnRefer_primary" onclick="OPST200_fnSearch();">조회</button> -->
	            </span>
			</h4>
			
			<div id="tab_OPST200_changeGrid" class="tabMainCnt ma_top10">
				<ul>
					<li class="k-state-active">일별</li>
					<li>월별</li>
				</ul>
				<div id="tab_daily">
					<div id="grid_OPST200_daily" class="tableCnt_TR"></div>
				</div>
				<div id="tab_monthly">
					<div id="grid_OPST200_monthly" class="tableCnt_TR"></div>
				</div>
			</div>
			<div id="grid_OPST200" class="tableCnt_TR"></div><!-- id 명 rename 요함! -->
		</div>
	</div>
</section>
<!-- // class="popContainer" 끝 -->

<script type="text/javascript" src="<c:url value="/resources/js/biz/opst/OPST200T.js?v=${v}"/>"></script>
