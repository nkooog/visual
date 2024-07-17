<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
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
     *  2022.07.01   mhlee      화면 ID 값 추가
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
<input onkeyup="CMMN_SEARCH_DATE['${param.startDateNm}'].inputDateFormat(this)" id="${param.endDateNm}"
       maxlength="10" name="${param.endDateNm}"/><!-- 종료일 -->
<c:choose>
    <c:when test="${param.searchType eq 'CMH'}">
        <menu class="formAlign">
            <button class="btnRefer_default" name="${param.startDateNm}_btn1" id="${param.startDateNm}_btn1" onclick="CMMN_SEARCH_DATE['${param.startDateNm}'].fnSetDate(-7)">W</button>
            <button class="btnRefer_default" name="${param.startDateNm}_btn2" id="${param.startDateNm}_btn2" onclick="CMMN_SEARCH_DATE['${param.startDateNm}'].fnSetMonth(-1)">M</button>
            <button class="btnRefer_default selected" name="${param.startDateNm}_btn3" id="${param.startDateNm}_btn3" onclick="CMMN_SEARCH_DATE['${param.startDateNm}'].fnSetMonth(-3)">3M</button>
            <button class="btnRefer_default" name="${param.startDateNm}_btn3" id="${param.startDateNm}_btn4" onclick="CMMN_SEARCH_DATE['${param.startDateNm}'].fnSetMonth(-6)">6M</button>
            <button class="btnRefer_default" name="${param.startDateNm}_btn4" id="${param.startDateNm}_btn5" onclick="CMMN_SEARCH_DATE['${param.startDateNm}'].fnSetMonth(-12)">Y</button>
            <button class="btnRefer_default" name="${param.startDateNm}_btn5" id="${param.startDateNm}_btn6" onclick="CMMN_SEARCH_DATE['${param.startDateNm}'].fnSetEnable()"><spring:message code="search.date.direct"/></button>
        </menu>
    </c:when>
    <c:when test="${param.searchType eq 'month'}">
        <menu class="formAlign">
            <button class="btnRefer_default" onclick="alert(<spring:message code="search.date.everlasting.alert"/>)"><spring:message code="search.date.everlasting"/></button>
            <button class="btnRefer_default" name="${param.startDateNm}_btn1" id="${param.startDateNm}_btn1"
                    onclick="CMMN_SEARCH_DATE['${param.startDateNm}'].fnSetMonth(-1)"><spring:message code="search.date.1month"/>
            </button>
            <button class="btnRefer_default" name="${param.startDateNm}_btn2" id="${param.startDateNm}_btn2"
                    onclick="CMMN_SEARCH_DATE['${param.startDateNm}'].fnSetMonth(-3)"><spring:message code="search.date.3months"/>
            </button>
            <button class="btnRefer_default" name="${param.startDateNm}_btn3" id="${param.startDateNm}_btn3"
                    onclick="CMMN_SEARCH_DATE['${param.startDateNm}'].fnSetMonth(-6)"><spring:message code="search.date.6months"/>
            </button>
            <button class="btnRefer_default" name="${param.startDateNm}_btn4" id="${param.startDateNm}_btn4"
                    onclick="CMMN_SEARCH_DATE['${param.startDateNm}'].fnSetMonth(-12)"><spring:message code="search.date.1year"/>
            </button>
            <button class="btnRefer_default selected" name="${param.startDateNm}_btn5" id="${param.startDateNm}_btn5"
                    onclick="CMMN_SEARCH_DATE['${param.startDateNm}'].fnSetEnable()"><spring:message code="search.date.direct"/>
            </button>
        </menu>
    </c:when>
    <c:otherwise>
        <menu class="formAlign">
            <button class="btnRefer_default" name="${param.startDateNm}_btn1" id="${param.startDateNm}_btn1"
                    onclick="CMMN_SEARCH_DATE['${param.startDateNm}'].fnSetDate(0)">D
            </button>
            <button class="btnRefer_default" name="${param.startDateNm}_btn2" id="${param.startDateNm}_btn2"
                    onclick="CMMN_SEARCH_DATE['${param.startDateNm}'].fnSetDate(-3)">D-3
            </button>
            <button class="btnRefer_default" name="${param.startDateNm}_btn3" id="${param.startDateNm}_btn3"
                    onclick="CMMN_SEARCH_DATE['${param.startDateNm}'].fnSetDate(-7)">W
            </button>
            <button class="btnRefer_default" name="${param.startDateNm}_btn4" id="${param.startDateNm}_btn4"
                    onclick="CMMN_SEARCH_DATE['${param.startDateNm}'].fnSetMonth(-1)">M
            </button>
            <button class="btnRefer_default selected" name="${param.startDateNm}_btn5" id="${param.startDateNm}_btn5"
                    onclick="CMMN_SEARCH_DATE['${param.startDateNm}'].fnSetEnable()"><spring:message
                    code="search.date.direct"/></button>
        </menu>
    </c:otherwise>
</c:choose>
<script>
    var CMMN_langMap = new HashMap();
    CMMN_langMap.put("search.date.type.errors", '<spring:message code="search.date.type.errors"/>');


    CMMN_SEARCH_DATE["${param.startDateNm}"] = {};
    $(document).ready(function () {
        const cultureSet = {
            ko : "ko-KR",
            en : "en-US",
        }
        const getCulture = cultureSet[GLOBAL.session.user.mlingCd];

        $("#${param.id} .formAlign button").click(function () {
            $("#${param.id} .formAlign button").removeClass('selected');
            $(this).addClass('selected');
        });
        <%--$("#${param.startDateNm}, #${param.endDateNm}").on('input', function () {--%>
        <%--    this.value = this.value.replace(/[^0-9\-]/g, '').replace(/(\..*)\./g, '$1');--%>
        <%--    const regExp_date = /(^(19|20)\d{2})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;--%>
        <%--    const len = this.value.length;--%>
        <%--    if (len === 4) this.value += "-";--%>
        <%--    if (len === 7) this.value += "-";--%>
        <%--    if (len === 10) {--%>
        <%--        if (!regExp_date.test(this.value)) {--%>
        <%--            this.value = kendo.toString(new Date(), "yyyy-MM-dd");--%>
        <%--            CMMN_SEARCH_DATE["${param.startDateNm}"].fnSetEnable();--%>
        <%--            CMMN_SEARCH_DATE["${param.startDateNm}"].startDateDp.trigger("change");--%>
        <%--        }--%>
        <%--    }--%>
        <%--});--%>
        $("#${param.startDateNm}, #${param.endDateNm}").on('focus', function () {
            $(this).removeClass("inputError");
        })

        $("#${param.startDateNm}, #${param.endDateNm}").on('change', function (e) {
                const regExp_date = /(^(19|20)\d{2})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
                let fromDate = CMMN_SEARCH_DATE["${param.startDateNm}"].startDateDp
                let toDate = CMMN_SEARCH_DATE["${param.startDateNm}"].endDateDp
                if (Utils.isNull(this.value)) { return; }
                if (!regExp_date.test(this.value)) {
                    this.value = "";
                    e.target.classList.add("inputError");
                    Utils.alert(CMMN_langMap.get("search.date.type.errors"),
                        () => { return e.target.focus(); });
                } else {
                    if (fromDate.value() > toDate.value()) {
                        CMMN_SEARCH_DATE["${param.startDateNm}"].fnSetEnable();
                        this.name === "${param.endDateNm}" ?
                            fromDate.value(toDate.value()) :
                            toDate.value(fromDate.value());
                    }
                }
            }
        )


        $("#${param.startDateNm}").kendoDatePicker({
            value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            format: "yyyy-MM-dd",
            change: function (e) {
                $("#${param.endDateNm}").data("kendoDatePicker").min(e.sender.value());
            },
            culture: getCulture
        });

        $("#${param.endDateNm}").kendoDatePicker({
            value: new Date(),
            format: "yyyy-MM-dd",
            change: function (e) {
                $("#${param.startDateNm}").data("kendoDatePicker").max(e.sender.value());
            },
            culture: getCulture,
        });

        CMMN_SEARCH_DATE["${param.startDateNm}"] = {
            startDateDp: $("#${param.startDateNm}").data("kendoDatePicker"),
            endDateDp: $("#${param.endDateNm}").data("kendoDatePicker"),
            initMaxDate: $("#${param.startDateNm}").data("kendoDatePicker").max(),
            initMinDate: $("#${param.endDateNm}").data("kendoDatePicker").min(),
            fnSetEnable: function () {
                CMMN_SEARCH_DATE["${param.startDateNm}"].startDateDp.max(CMMN_SEARCH_DATE["${param.startDateNm}"].initMaxDate);
                CMMN_SEARCH_DATE["${param.startDateNm}"].endDateDp.min(CMMN_SEARCH_DATE["${param.startDateNm}"].initMinDate);

                CMMN_SEARCH_DATE["${param.startDateNm}"].startDateDp.enable();
                CMMN_SEARCH_DATE["${param.startDateNm}"].endDateDp.enable();

            },
            fnSetDate: function (range) {
                CMMN_SEARCH_DATE["${param.startDateNm}"].startDateDp.max(CMMN_SEARCH_DATE["${param.startDateNm}"].initMaxDate);
                CMMN_SEARCH_DATE["${param.startDateNm}"].endDateDp.min(CMMN_SEARCH_DATE["${param.startDateNm}"].initMinDate);


                CMMN_SEARCH_DATE["${param.startDateNm}"].startDateDp.readonly();
                CMMN_SEARCH_DATE["${param.startDateNm}"].endDateDp.readonly();


                var today = new Date();
                var fromDate = new Date();

                fromDate.setDate(fromDate.getDate() + Number(range));

                CMMN_SEARCH_DATE["${param.startDateNm}"].startDateDp.value(fromDate);
                CMMN_SEARCH_DATE["${param.startDateNm}"].startDateDp.trigger("change");

                CMMN_SEARCH_DATE["${param.startDateNm}"].endDateDp.value(today);
                CMMN_SEARCH_DATE["${param.startDateNm}"].endDateDp.trigger("change");
            },
            fnSetMonth: function (range) {
                CMMN_SEARCH_DATE["${param.startDateNm}"].startDateDp.max(CMMN_SEARCH_DATE["${param.startDateNm}"].initMaxDate);
                CMMN_SEARCH_DATE["${param.startDateNm}"].endDateDp.min(CMMN_SEARCH_DATE["${param.startDateNm}"].initMinDate);

                CMMN_SEARCH_DATE["${param.startDateNm}"].startDateDp.readonly();
                CMMN_SEARCH_DATE["${param.startDateNm}"].endDateDp.readonly();

                var today = new Date();
                var fromDate = new Date(today.getFullYear(), today.getMonth() + Number(range), today.getDate());

                CMMN_SEARCH_DATE["${param.startDateNm}"].startDateDp.value(fromDate);
                CMMN_SEARCH_DATE["${param.startDateNm}"].startDateDp.trigger("change");

                CMMN_SEARCH_DATE["${param.startDateNm}"].endDateDp.value(today);
                CMMN_SEARCH_DATE["${param.startDateNm}"].endDateDp.trigger("change");
            },
            inputDateFormat: function (obj) {
                let fistIndex = 5
                let lastIndex = 7
                let number = obj.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');
                let str = "";
                if (number.length < fistIndex) {
                    str = number;
                } else if (number.length < lastIndex) {
                    str = ''.concat(
                        number.substring(0, fistIndex - 1),
                        "-",
                        number.substr(fistIndex - 1));
                } else {
                    str = ''.concat(
                        number.substring(0, fistIndex - 1),
                        "-",
                        number.substring(fistIndex - 1, lastIndex - 1),
                        "-",
                        number.substr(lastIndex - 1));
                }
                obj.value = str;
            },
        }
    });
</script>