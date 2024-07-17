<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"      uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring"    uri="http://www.springframework.org/tags"%>
<%
 /***********************************************************************************************
  * Program Name : main 화면(main.jsp)
  * Creator      : jrlee
  * Create Date  : 2022.02.01
  * Description  : main
  * Modify Desc  : 
  * -----------------------------------------------------------------------------------------------
  * Date         | Updater        | Remark
  * -----------------------------------------------------------------------------------------------
  * 2022.02.01     jrlee            최초작성
  * 2022.02.04     jrlee            메인 프레임 연결
  ************************************************************************************************/
%>
<jsp:include page="/frme/FRME_HEAD.jsp"/>

<style type="text/css">
    body  { overflow: auto; }
</style>

<body class="themeDefault" onbeforeunload="Utils.closeAllPopup()">
<jsp:include page="/frme/FRME100M.jsp"/>

<%-- 로딩중 팝업 영역 --%>
<div class="modalWrap active">
	<div class="loader">
		<div class="loader_box">
			<div class="loader-13"></div>
			<p class="loader_tit">데이터 처리중입니다.</p>
			<p>잠시만 기다려 주시기 바랍니다.</p>
		</div>
		<button class="close-btn"></button>
	</div>
</div>




<script>
$(document).ready(function(){
	$('.close-btn').click(function(){
		$('.modalWrap').addClass('active');
	});
});
</script>

<jsp:include page="/frme/FRME_BOTTOM.jsp"/>
