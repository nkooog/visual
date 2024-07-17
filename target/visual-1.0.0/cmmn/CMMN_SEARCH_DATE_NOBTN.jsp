<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"      uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring"    uri="http://www.springframework.org/tags"%>
<%
/**
* @Class Name : CMMN_SEARCH_DATE.jsp
* @Description : 날짜검색
* @Modification Information
*  ----------------------------------------------------------
*   수정일                 수정자                   수정내용
*  ----------------------------------------------------------
*  2022.03.04   jrlee      최초 생성
*  2022.05.18   mhlee      신규 퍼블 적용
*  2022.06.24   djjung     Defualt Select "직접입력"으로 수정,
*                          각 화면에서 Trigger로 버튼 Select 호출하여 사용
 *                         ex) $('#KMST200M button[name=KMST200_dateStart_btn1]').click(); 
*  ----------------------------------------------------------
* author CRMLab실 jrlee
* since  2021.12.20
*
* Copyright (C) 2021~2022 by BroadC&S  All right reserved.
*/
%>
<input onkeyup="CMMN_SEARCH_DATE['${param.startDateNm}'].inputDateFormat(this)" id="${param.startDateNm}"
       maxlength="10" name="${param.startDateNm}"/> <!-- 시작일 -->
<span class="split">~</span>
<input onkeyup="CMMN_SEARCH_DATE['${param.endDateNm}'].inputDateFormat(this)" id="${param.endDateNm}"
       maxlength="10" name="${param.endDateNm}"/><!-- 종료일 -->
<style>
	.k-calendar-tr td .k-disabled {color: #bcbcbca3 !important;background-color: #ffffff !important}
/* 	.k-datepicker.k-input {width: 10% !important;} */
</style>
<script>
    $(document).ready(function () {
        const cultureSet = {
            ko : "ko-KR",
            en : "en-US",
        }
        const getCulture = cultureSet[GLOBAL.session.user.mlingCd];

        $(".formAlign button").click(function(){
            $(".formAlign button").removeClass('selected');
            $(this).addClass('selected');
        });

        $("#${param.startDateNm}").kendoDatePicker({
            value: new Date(),
            format: "yyyy-MM-dd",
            change: function (e) {
                $("#${param.endDateNm}").data("kendoDatePicker").min(e.sender.value());
                
                if(Utils.isNotNull(e.sender.value()) && Utils.isNotNull($("#${param.endDateNm}").data("kendoDatePicker").value()))
                {
	                if(e.sender.value() > $("#${param.endDateNm}").data("kendoDatePicker").value())
	                {
	                	$("#${param.endDateNm}").data("kendoDatePicker").value(e.sender.value());
	                	Utils.alert("날짜 형식이 잘못되어 시작날짜로 수정합니다.");
						return;
	                }
                }
            },
            culture: GLOBAL.session.user.mlingCd
        });

        setTimeout(function() {
	        $("#${param.endDateNm}").kendoDatePicker({
	            value: new Date(),
	            format: "yyyy-MM-dd",
	            change: function (e) {

	            },
	            min : $("#${param.startDateNm}").data("kendoDatePicker").value(),
	            month: {
					empty: '<span class="k-disabled">#= data.value #</span>'
	            },
	            culture: GLOBAL.session.user.mlingCd
	        });
        }, 100);
        
        CMMN_SERARCH_DATE_SHORT_GetRangeDay('${param.startRangeDay}', '${param.endRangeDay}');
    });
    
    function CMMN_SERARCH_DATE_SHORT_GetRangeDay(startRangeDay, endRangeDay) {
        
        var startDay = new Date();
        startDay.setDate(startDay.getDate() + Number(startRangeDay));
        startDay = startDay.toISOString().split('T')[0];
        
        var endDay = new Date();
        endDay.setDate(endDay.getDate() + Number(endRangeDay));
        endDay = endDay.toISOString().split('T')[0];
        
        $("#${param.startDateNm}").val(startDay);
        $("#${param.endDateNm}").val(endDay);
    }
</script>