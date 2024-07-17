<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"      uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring"    uri="http://www.springframework.org/tags"%>
<%
/***********************************************************************************************
* Program Name : 사용자정보조회 - FRME110P.jsp
* Creator      : dwson
* Create Date  : 2024.01.24
* Description  : 사용자정보조회
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.24     dwson            최초생성
************************************************************************************************/
%>
<jsp:include page="/frme/FRME_HEAD.jsp"/>

<style>
	.password-change:after {
		content: "비밀번호 변경";
	    position: fixed;
	    margin-left: 14px;
	    margin-top: 3px;
	    font-size: 11px;
	}
</style>

<header class="popHeader" style="background-color:#055685;">
    사용자 정보   <button class="popClose" title=<spring:message code="aicrm.popup.close"/> onclick="Utils.closeKendoWindow('${param.id}')"></button>
</header>

<section class="popContainer">
    <div class="myinfo_bx">
        
        <form method="post" id="frmUsrPic" enctype="multipart/form-data">       
        <div class="pht_bx">
            <div class="img_bx">
                <img src="../resources/images/contents/person.png" alt="디폴트" style="width: 150px; height:150px;border: 1px solid white; border-radius: 50%;">
            </div>
        </div>
        </form>

		<!-- 비밀번호변경 아이콘 -->
        <div class="k-tooltip-button" style="margin-left:65px;">
            <span class="k-icon k-i-lock cursor password-change" onclick="FRME120P();" style="top:5px; zoom:1.5;" title=""></span>
        </div>
        
       <ul class="info_list" id="FRME110P_userInfo">
        <!--
            <li class="name"></li>
            <li class="email"></li>
        -->    
        </ul>

    </div>

    <p class="btnArea_confirm">
        <button class="btnRefer_primary" onclick="FRME110P_fnLogout();">로그아웃</button>
        <button onClick="Utils.closeKendoWindow('${param.id}')">취소</button>
    </p>
</section>

<script>
$(".info_btn button").on("click",function () {          
    $(this).addClass('on');
});
</script>
<script type="text/javascript" src="<c:url value="/resources/js/biz/frme/FRME110P.js?v=${v}"/>"></script>
<script type="text/javascript" src="<c:url value="/resources/js/biz/frme/FRME120P.js?v=${v}"/>"></script>

</body>
</html>
<%-- <jsp:include page="/frme/FRME_BOTTOM.jsp"/> --%>