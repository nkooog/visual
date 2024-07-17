<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"      uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring"    uri="http://www.springframework.org/tags"%>
<%
/***********************************************************************************************
* Program Name : FRME_BOTTOM
* Creator      : jrlee
* Create Date  : 2022.02.09
* Description  : Bottom Frame
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2022.02.09     jrlee            최초생성
************************************************************************************************/
%>
<footer class="fooerWrap">
<%--    <button type="button" id="FRME_BOTTOM_toggleMarquee" class="btMarquee k-icon k-i-volume-up" title="<spring:message code="FRME_BOTTOM.toggle.Marquee.title"/>"></button><!-- 클릭시 toggleClass="Stop" -->--%>
    <div id="FRME_BOTTOM_oprNoti" class="footerMarquee" data-path-id="SYSM500M">
<%--    <div id="FRME_BOTTOM_oprNoti" class="footerMarquee" onclick="FRME_BOTTOM_fnOpenDetail(this)" data-path-id="SYSM500M">--%>
        <%-- 알림 내용 영역 --%>
<!--         <div class="marquee" data-duration='5000' data-gap='10' data-duplicated='true'>비주얼레터링 관리자 사이트입니다.</div> -->
    </div>
    <script type="text/javascript">
        function FRME_BOTTOM_fnOpenDetail(obj) {
            let pathId = $(obj).data("path-id");
            let $menu = $(".sideL_wrap .nav_list li[data-path-id=" + pathId + "]");
//
            if ($menu.length > 0 && $menu.data("usr-grd-auth") == "Y") {
                MAINFRAME.openDataFrameById(pathId);
            } else {
                // TODO : 인수인계 : 알림상세에 관련된 내용 나오면 작업필요 (관리자 이외의 알림 내용 확인가능한 기능)
            }
        }
    </script>

</footer>

</body>
</html>