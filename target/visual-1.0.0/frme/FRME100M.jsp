<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"      uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring"    uri="http://www.springframework.org/tags"%>
<%
/***********************************************************************************************
* Program Name : FRME100M.jsp
* Creator      : jrlee
* Create Date  : 2022.02.09
* Description  : 메인 프레임
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2022.02.09     jrlee            최초생성
************************************************************************************************/
%>

<%-- <jsp:include page="/frme/FRME_HEAD.jsp"/> --%>
<jsp:include page="/frme/FRME_TOP.jsp"/> 

<section class="mainContainer">
    <div class="ct_contents" id="ct_contents">
        <button type="button" class="navCloseAll icoCnt_allClose" onclick="closeAllTabs(true)" title="전체닫기"></button>
        <!--  ct_contents 영역 (Data Frame) -->
    </div> 

</section><!-- // mainContainer -->

<span id="notification" style="display:none;"></span>

<script type="text/javascript" src="<c:url value="/resources/js/biz/comm/tabMenu.js?v=${v}"/>"></script>
<script type="text/javascript" src="<c:url value="/resources/js/biz/frme/FRME100M.js?v=${v}"/>"></script>
<script>
    $(document).ready(function () {
        MAINFRAME.initMainFrame();
    });
</script>

<jsp:include page="/frme/FRME_BOTTOM.jsp"/>