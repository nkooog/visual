<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"      uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring"    uri="http://www.springframework.org/tags"%>
<%
/***********************************************************************************************
* Program Name : EXLT140.jsp
* Creator      : nyh
* Create Date  : 2024.04.03
* Description  : 콜 모니터링
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.04.03     nyh            최초생성
************************************************************************************************/
%>

<header class="headerTit">
    <h2 id="EXLT140T_title"></h2>
<!--     <mark class="neceMark">표시는 필수항목</mark> -->
</header>

<!-- // class="popContainer" 시작 -->
<section id="EXLT140T" class="popContainer">
	<div>
		<form name="sendForm">
			<!-- 검색영역 시작 -->
<!-- 			<article class="SearchWrap subZoon"> -->
<!-- 				<ul class="option"> -->
<!-- 					<li style="width:100%;"> -->
<!-- 						<span class="label_tit ma_left5">서비스 번호</span> -->
<!-- 						<input type="search" class="k-input EXLT140_input" id="EXLT140_keyword2" name="EXLT140_keyword2" autocomplete="off" placeholder="" style="padding-right:0;"/> -->
						
<!-- 						<span class="label_tit ma_left5">고객번호</span> -->
<!-- 						<input type="search" class="k-input EXLT140_input" id="EXLT140_keyword3" name="EXLT140_keyword3" autocomplete="off" placeholder="" style="padding-right:0;"/> -->
						
<!-- 						<span class="label_tit ma_left5">통화시간</span> -->
<!-- 						<input type="search" class="k-input EXLT140_input" id="EXLT140_keyword4" name="EXLT140_keyword4" autocomplete="off" placeholder="" style="padding-right:0;"/> -->
<!-- 					</li> -->
<!-- 				</ul> -->
<!-- 				<span class="btZoon"> -->
<!-- 					<button type="button" id="EXLT140_usrId" class="btnRefer_primary" onclick="EXLT140_fnSearch();">조회</button> -->
<!-- 				</span> -->
<!-- 			</article> -->
			<!-- 검색영역 끝 -->
		</form>
		<div class="divContent" style="width: 100%;">
			<div id="grid_EXLT140" class="tableCnt_TR"></div><!-- id 명 rename 요함! -->
		</div>
	</div>
</section>
<!-- // class="popContainer" 끝 -->

<script type="text/javascript" src="<c:url value="/resources/js/biz/exlt/EXLT140T.js?v=${v}"/>"></script>