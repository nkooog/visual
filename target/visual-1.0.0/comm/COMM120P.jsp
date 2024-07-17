<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"      uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring"    uri="http://www.springframework.org/tags"%>
<%
    /***********************************************************************************************
     * Program Name : 공통 카랜더 팝업 (COMM120P.jsp)
     * Creator      : 정대정
     * Create Date  : 2022.05.03
     * Description  : 달력 팝업
     * Modify Desc  :
     * -----------------------------------------------------------------------------------------------
     * Date         | Updater        | Remark
     * -----------------------------------------------------------------------------------------------
     * 2022.05.03     정대정           최초생성
     ************************************************************************************************/
%>
<jsp:include page="/frme/FRME_TOP.jsp"/> 

<header class="popHeader">
	캘린더
    <button class="popClose" title="팝업창 닫기" onclick="window.close();"></button>
</header>
<section class="popContainer">
    <article class="dashContainer_cnt">
        <div id="calendar" class="dashCalendarNote"> </div>
    </article>
</section>
<script>
    $(document).ready(function(){
        let cntycd = GLOBAL.session.user.cntyCd;  //국가코드 3글자
        let langcd = GLOBAL.session.user.mlingCd; //언어코드 2글자
        //1. culture : 언어코드(2자)-국가코드(대문자2자)로 변경
        kendo.culture("ko-KR");
        $("#calendar").kendoScheduler({
            views: [
                {
                    type: "month",
                    eventsPerDay: 2,
                    eventHeight: 5,
                    eventSpacing: 1,
                    selected: true,
                }
            ],
            height: 400,
        });
        let schedulerNote = $("#calendar").data("kendoScheduler");
        schedulerNote.element.find('.k-scheduler-refresh').detach();
    });
</script>

<jsp:include page="/frme/FRME_BOTTOM.jsp"/>
