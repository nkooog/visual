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
	 * Description  : 콜 이력 및 녹취청취
	 * Modify Desc  :
	 * -----------------------------------------------------------------------------------------------
	 * Date         | Updater        | Remark
	 * -----------------------------------------------------------------------------------------------
	 * 2024.03.26     jypark            최초생성
	 ************************************************************************************************/
%>

<header class="headerTit">
	<h2 id="EXLT130T_title">콜 이력 및 녹취청취</h2>
	<!--     <mark class="neceMark">표시는 필수항목</mark> -->
</header>

<!-- // class="popContainer" 시작 -->
<section id="EXLT130T" class="popContainer">
	<div>
		<form name="sendForm">
			<article class="SearchWrap subZoon">
				<ul class="option">
					<li style="width:100%;">
						<span class="label_tit ma_left5">서비스 번호</span>
						<input type="search" class="k-input" id="EXLT130_keyword1" name="EXLT130_keyword1"  placeholder="" style="width:100%" />

						<span class="label_tit ma_left5">조회일자</span>
						<jsp:include page="/cmmn/CMMN_SEARCH_DATE_NOBTN.jsp">
							<jsp:param name="startDateNm" value="EXLT130T_dateStart"/>
							<jsp:param name="endDateNm" value="EXLT130T_dateEnd"/>
							<jsp:param name="searchType" value="date"/>
							<jsp:param name="id" value="EXLT130T"/>
						</jsp:include>

						<span class="label_tit ma_left5">고객번호</span>
						<input type="search" class="k-input" id="EXLT130_keyword2" name="EXLT130_keyword2" autocomplete="off" placeholder="" style="padding-right:0;"/>

						<span class="label_tit ma_left5">통화시간</span>
						<input type="search" class="k-input" id="EXLT130_keyword3" name="EXLT130_keyword3" autocomplete="off" placeholder="" style="padding-right:0;"/>

						<span class="label_tit ma_left5">메모</span>
						<input type="search" class="k-input" id="EXLT130_memo" name="EXLT130_memo"  placeholder="" style="width:100%" />

						<span class="label_tit ma_left5">서비스 번호 여부</span>
						<input type="checkbox" class="k-checkbox" id="EXLT130_use" name="EXLT130_use"  placeholder="" style="width:6%; margin-left:5px; margin-top:4px;"/>
					</li>
				</ul>
				<span class="btZoon">
					<button type="button" id="EXLT130_usrId" class="btnRefer_primary" onclick="EXLT130_fnSearch();">조회</button>
				</span>
			</article>
			<!-- 검색영역 끝 -->
		</form>
		<div class="divContent" style="width: 100%;">
			<div id="grid_EXLT130" class="tableCnt_TR"></div><!-- id 명 rename 요함! -->
		</div>
	</div>

	<div id="EXLT130T_modal" style="display: none;">
		<div class="audio-player" onclick="EXLT130_togglePlayPause()">
			<audio id="audioElement">
				<source src="" type="audio/mpeg">
				Your browser does not support the audio element.
			</audio>
			<div class="progress-bar">
				<div class="progress"></div>
			</div>
			<div class="time-info" id="timeInfo">0:00 / 0:00</div>
		</div>
	</div>

</section>
<!-- // class="popContainer" 끝 -->

<script type="text/javascript" src="<c:url value="/resources/js/biz/exlt/EXLT130T.js?v=${v}"/>"></script>
