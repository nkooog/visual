<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"      uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring"    uri="http://www.springframework.org/tags"%>
<%
/***********************************************************************************************
 * Program Name : 로딩 및 레이어 화면 공통 (CMMN_LOADING_LAYER.jsp)
 * Creator      : mhlee
 * Create Date  : 2022.11.23
 * Description  : 로딩 화면 및 화면 클릭 방지 레이어
 * Modify Desc  :
 * -----------------------------------------------------------------------------------------------
 * Date         | Updater        | Remark
 * -----------------------------------------------------------------------------------------------
 * 2022.11.23     mhlee            최초생성
 ************************************************************************************************/
%>
<c:choose>
    <c:when test="${param.type eq 'loading'}">
        <div id="${param.Id}" class="modal_bg${param.target}" style="display: none">
            <div class="loading"></div>
        <div class="loading-text">Loading</div>
        </div>
    </c:when>
    <c:when test="${param.type eq 'layer'}">
        <div id="${param.Id}" class="modal_bg${param.target}" ${param.where eq 'tab' ? 'style="display: none; top:30px; height: auto; background: none;"' : 'style="display: none;"'}></div>
    </c:when>

</c:choose>

<script>
    $(document).ready(function () {
        const $selector = $('#${param.Id} .dots');
        if($selector.css("display") === "none"){
            $selector.css('animation-play-state', 'paused');
        } else {
            $selector.css('animation-play-state', 'running');
        }
    })
</script>