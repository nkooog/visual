<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"      uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring"    uri="http://www.springframework.org/tags"%>
<%
/***********************************************************************************************
 * Program Name : 자동완성 공통 (CMMN_SEARCH_AUTO_COMPLETE.jsp)
 * Creator      : jrlee
 * Create Date  : 2022.06.14
 * Description  : 자동완성 공통
 * Modify Desc  :
 * -----------------------------------------------------------------------------------------------
 * Date         | Updater        | Remark
 * -----------------------------------------------------------------------------------------------
 * 2022.06.14     jrlee            최초생성
 ************************************************************************************************/
%>

<c:choose>
    <c:when test="${param.callType eq 'KMST300M'}">
        <input type="search" class="k-input" id="${param.CMMN_SEARCH_AUTO_COMPLETE_ID}" name="${param.CMMN_SEARCH_AUTO_COMPLETE_ID}" placeholder="검색하세요."/>
        <button class="k-icon k-i-arrow-60-down" title="추가" onclick="CMMN_SEARCH_AUTO_COMPLETE['${param.CMMN_SEARCH_AUTO_COMPLETE_ID}'].fnKeywordopup(this);"></button>
    </c:when>
    <c:otherwise>
        <input type="search" class="k-input ma_left5" id="${param.CMMN_SEARCH_AUTO_COMPLETE_ID}" name="${param.CMMN_SEARCH_AUTO_COMPLETE_ID}" placeholder="검색하세요."/>
        <button class="btnRefer_default icoType k-icon k-i-plus ma_left5" title="추가" onclick="CMMN_SEARCH_AUTO_COMPLETE['${param.CMMN_SEARCH_AUTO_COMPLETE_ID}'].fnKeywordopup(this);"></button>
    </c:otherwise>
</c:choose>

<script>
    CMMN_SEARCH_AUTO_COMPLETE["${param.CMMN_SEARCH_AUTO_COMPLETE_ID}"] = {};

    $(document).ready(function () {
        $('#${param.CMMN_SEARCH_AUTO_COMPLETE_ID}').kendoAutoComplete({
            dataSource: {
                transport: {
                    read: function (options) {
                        Utils.ajaxCall('/cmmt/CMMT200SEL03', JSON.stringify(GLOBAL.session.user), function (result) {
                            CMMN_SEARCH_AUTO_COMPLETE["${param.CMMN_SEARCH_AUTO_COMPLETE_ID}"].instance.dataSource.data(JSON.parse(result.CMMT200VOInfo));
                            // options.success(JSON.parse(result.CMMT200VOInfo))
                        });
                    }
                }
            },
            placeholder: "입력하세요.",
            height: 200,
            dataTextField: "scwd",
            open: function () {
                this.popup.element.addClass('autoComplete');
            },
            footerTemplate:
                ' 자동완성<span class="swithCheck"><input type="checkbox" onclick="CMMN_SEARCH_AUTO_COMPLETE[\'${param.CMMN_SEARCH_AUTO_COMPLETE_ID}\'].fnUpdateAuto(this)"' +
                '#if(GLOBAL.session.user.autoPfcnUseYn == "Y"){# checked #}#/><label></label></span>',
        });

        CMMN_SEARCH_AUTO_COMPLETE["${param.CMMN_SEARCH_AUTO_COMPLETE_ID}"] = {
            instance: $("#${param.CMMN_SEARCH_AUTO_COMPLETE_ID}").data("kendoAutoComplete"),
            fnUpdateAuto: function (obj) {
				Utils.ajaxCall('/cmmt/CMMT200UPT03', JSON.stringify({
                    tenantPrefix: GLOBAL.session.user.tenantPrefix,
                    agentId: GLOBAL.session.user.agentId,
                    lstCorprOrgCd: GLOBAL.session.user.orgCd,
                    lstCorprId: GLOBAL.session.user.agentId,
                    autoPfcnUseYn: $(obj).prop('checked') ? 'Y' : 'N'
                }), function () {
                    MAINFRAME.updateSessionUser();
                });
            },
            fnKeywordopup: function (obj) {
                Utils.setCallbackFunction("${param.CMMN_SEARCH_AUTO_COMPLETE_ID}_fnKeywordCallback", function (item) {
					$('#${param.CMMN_SEARCH_AUTO_COMPLETE_ID}').val(item.scwd);
                });

				if("${param.callType}" === "KMST300M"){
					console.log(popuplocation);
					if(popuplocation==="pop"){
						Utils.openKendoWindow("/kmst/KMST310P", 800, 400, "left", "calc(50% - 400px)", 100, false, {callbackKey: "${param.CMMN_SEARCH_AUTO_COMPLETE_ID}_fnKeywordCallback"});
                    }else{
						let top = $(obj).offset().top + $(obj).parent().height();
						Utils.openKendoWindow("/kmst/KMST310P",450, 400, "right", 60, top, false, {callbackKey: "${param.CMMN_SEARCH_AUTO_COMPLETE_ID}_fnKeywordCallback"});
                    }

                }else{
					<%--Utils.openPop(GLOBAL.contextPath + "/cmmt/CMMT222P", "CMMT222P", 810, 535, {callbackKey: "${param.CMMN_SEARCH_AUTO_COMPLETE_ID}_fnKeywordCallback"});--%>
					Utils.openKendoWindow("/cmmt/CMMT222P", 810, 535, "center", 0, 0, false, {callbackKey: "${param.CMMN_SEARCH_AUTO_COMPLETE_ID}_fnKeywordCallback"});
                }

            }
        }
    });
</script>