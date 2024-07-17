<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"      uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring"    uri="http://www.springframework.org/tags"%>
<%
/***********************************************************************************************
 * Program Name : 날짜 입력 공통 모듈(CMMN_INPUT_DATE.jsp)
 * Creator      : jrlee
 * Create Date  : 2022.06.23
 * Description  : 날짜 입력 공통 모듈
 * Modify Desc  :
 * -----------------------------------------------------------------------------------------------
 * Date         | Updater        | Remark
 * -----------------------------------------------------------------------------------------------
 * 2022.06.23     jrlee           최초생성
 * 2022.07.12     djjung          포멧 수정
 ************************************************************************************************/
%>


<input id="${param.startDateNm}" name="${param.startDateNm}" style="width: 134px;" />  ~  <input id="${param.endDateNm}" name="${param.endDateNm}" style="width: 134px;" />

<menu class="formAlign" style="margin-left:3px;">
	<c:choose>
	    <c:when test="${param.searchType eq 'month'}">
	        
	            <button class="btnRefer_default" name="${param.startDateNm}_btn0" id="${param.startDateNm}_btn0" onclick="CMMN_INPUT_DATE['${param.startDateNm}'].fnSetMaxDate();btn_clickEvent(this);"><span><spring:message code="search.date.everlasting"/></span></button>
	            <button class="btnRefer_default" name="${param.startDateNm}_btn1" id="${param.startDateNm}_btn1" onclick="CMMN_INPUT_DATE['${param.startDateNm}'].fnSetMonth(1);btn_clickEvent(this);"><span><spring:message code="search.date.1month"/></span></button>
	            <button class="btnRefer_default" name="${param.startDateNm}_btn2" id="${param.startDateNm}_btn2" onclick="CMMN_INPUT_DATE['${param.startDateNm}'].fnSetMonth(3);btn_clickEvent(this);"><span><spring:message code="search.date.3months"/></span></button>
	            <button class="btnRefer_default" name="${param.startDateNm}_btn3" id="${param.startDateNm}_btn3" onclick="CMMN_INPUT_DATE['${param.startDateNm}'].fnSetMonth(6);btn_clickEvent(this);"><span><spring:message code="search.date.6months"/></span></button>
	            <button class="btnRefer_default" name="${param.startDateNm}_btn4" id="${param.startDateNm}_btn4" onclick="CMMN_INPUT_DATE['${param.startDateNm}'].fnSetMonth(12);btn_clickEvent(this);"><span><spring:message code="search.date.1year"/></span></button>
	            <button class="btnRefer_default" name="${param.startDateNm}_btn5" id="${param.startDateNm}_btn5" onclick="CMMN_INPUT_DATE['${param.startDateNm}'].fnSetEnable();btn_clickEvent(this);"><span><spring:message code="search.date.direct"/></span></button>
	        
	    </c:when>
	    <c:otherwise>
	        
	            <button class="btnRefer_default" onclick="CMMN_INPUT_DATE['${param.startDateNm}'].fnSetDate(0)"><span>D</span></button>
	            <button class="btnRefer_default" onclick="CMMN_INPUT_DATE['${param.startDateNm}'].fnSetDate(3)"><span>D+3</span></button>
	            <button class="btnRefer_default" onclick="CMMN_INPUT_DATE['${param.startDateNm}'].fnSetDate(7)"><span>W</span></button>
	            <button class="btnRefer_default" onclick="CMMN_INPUT_DATE['${param.startDateNm}'].fnSetMonth(1)"><span>M</span></button>
	            <button class="btnRefer_default btnRefer_second" onclick="CMMN_INPUT_DATE['${param.startDateNm}'].fnSetEnable()"><span><spring:message code="search.date.direct"/></span></button>
	        
	    </c:otherwise>
	</c:choose>
</menu>
<script>
    CMMN_INPUT_DATE["${param.startDateNm}"] = {};

    $(document).ready(function () {
        $(".formAlign button").click(function(){
            $(".formAlign button").removeClass('selected');
            $(this).addClass('selected');
        });

        $("#${param.startDateNm}").kendoDatePicker({
            format: "yyyy-MM-dd",
            change: function (e) {
                $("#${param.endDateNm}").data("kendoDatePicker").min(e.sender.value());
            }
        });

        $("#${param.endDateNm}").kendoDatePicker({
            format: "yyyy-MM-dd",
			max: new Date(9999, 12, 31, 23, 59, 59),
            change: function (e) {
                $("#${param.startDateNm}").data("kendoDatePicker").max(e.sender.value());
            }
        });

        CMMN_INPUT_DATE["${param.startDateNm}"] = {
            startDateDp: $("#${param.startDateNm}").data("kendoDatePicker"),
            endDateDp: $("#${param.endDateNm}").data("kendoDatePicker"),
            initMaxDate: $("#${param.startDateNm}").data("kendoDatePicker").max(),
            initMinDate: $("#${param.endDateNm}").data("kendoDatePicker").min(),
            fnSetEnable: function () {
                CMMN_INPUT_DATE["${param.startDateNm}"].startDateDp.max(CMMN_INPUT_DATE["${param.startDateNm}"].initMaxDate);
                CMMN_INPUT_DATE["${param.startDateNm}"].endDateDp.min(CMMN_INPUT_DATE["${param.startDateNm}"].initMinDate);

                CMMN_INPUT_DATE["${param.startDateNm}"].startDateDp.enable();
                CMMN_INPUT_DATE["${param.startDateNm}"].endDateDp.enable();

                CMMN_INPUT_DATE["${param.startDateNm}"].startDateDp.value("");
                CMMN_INPUT_DATE["${param.startDateNm}"].endDateDp.value("");
				$("${param.permanentUse}").val("N");
            },
            fnSetDate: function (range) {
                CMMN_INPUT_DATE["${param.startDateNm}"].startDateDp.max(CMMN_INPUT_DATE["${param.startDateNm}"].initMaxDate);
                CMMN_INPUT_DATE["${param.startDateNm}"].endDateDp.min(CMMN_INPUT_DATE["${param.startDateNm}"].initMinDate);

                CMMN_INPUT_DATE["${param.startDateNm}"].startDateDp.readonly();
                CMMN_INPUT_DATE["${param.startDateNm}"].endDateDp.readonly();

                let today = new Date();
                let toDate = new Date();

                toDate.setDate(toDate.getDate() + Number(range));

                CMMN_INPUT_DATE["${param.startDateNm}"].startDateDp.value(today);
                CMMN_INPUT_DATE["${param.startDateNm}"].startDateDp.trigger("change");

                CMMN_INPUT_DATE["${param.startDateNm}"].endDateDp.value(toDate);
                CMMN_INPUT_DATE["${param.startDateNm}"].endDateDp.trigger("change");
            },
            fnSetMonth: function (range) {
                CMMN_INPUT_DATE["${param.startDateNm}"].startDateDp.max(CMMN_INPUT_DATE["${param.startDateNm}"].initMaxDate);
                CMMN_INPUT_DATE["${param.startDateNm}"].endDateDp.min(CMMN_INPUT_DATE["${param.startDateNm}"].initMinDate);

                CMMN_INPUT_DATE["${param.startDateNm}"].startDateDp.readonly();
                CMMN_INPUT_DATE["${param.startDateNm}"].endDateDp.readonly();

                let today = new Date();
                let toDate = new Date(today.getFullYear(), today.getMonth() + Number(range), today.getDate());

                CMMN_INPUT_DATE["${param.startDateNm}"].startDateDp.value(today);
                CMMN_INPUT_DATE["${param.startDateNm}"].startDateDp.trigger("change");

                CMMN_INPUT_DATE["${param.startDateNm}"].endDateDp.value(toDate);
                CMMN_INPUT_DATE["${param.startDateNm}"].endDateDp.trigger("change");
				$("${param.permanentUse}").val("N");
            },
            fnSetMaxDate:function (){
				CMMN_INPUT_DATE["${param.startDateNm}"].startDateDp.max(CMMN_INPUT_DATE["${param.startDateNm}"].initMaxDate);
				CMMN_INPUT_DATE["${param.startDateNm}"].endDateDp.min(CMMN_INPUT_DATE["${param.startDateNm}"].initMinDate);

				CMMN_INPUT_DATE["${param.startDateNm}"].startDateDp.readonly();
				CMMN_INPUT_DATE["${param.startDateNm}"].endDateDp.readonly();

				let today = new Date();
				let toDate = new Date(9999, 11, 31);

				CMMN_INPUT_DATE["${param.startDateNm}"].startDateDp.value(today);
				CMMN_INPUT_DATE["${param.startDateNm}"].startDateDp.trigger("change");

				CMMN_INPUT_DATE["${param.startDateNm}"].endDateDp.value(toDate);
				CMMN_INPUT_DATE["${param.startDateNm}"].endDateDp.trigger("change");
				$("${param.permanentUse}").val("Y");
            }
        }
    });

	function btn_clickEvent(obj) {
		for (const x of $(obj)[0].parentElement.children) {
			x.classList.remove("btnRefer_second");
		}
		$(obj).addClass("btnRefer_second");
	}
</script>