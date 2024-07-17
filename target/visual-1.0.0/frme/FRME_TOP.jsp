<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"      uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring"    uri="http://www.springframework.org/tags"%>
<%
/***********************************************************************************************
* Program Name : FRME_TOP
* Creator      : jrlee
* Create Date  : 2022.02.09
* Description  : Top Frame
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2022.02.09     jrlee            최초생성
************************************************************************************************/
%>
<header class="header_wrap">
    <jsp:include page="/frme/FRME_MENU_SYSTEM.jsp"/>

    <div id="FRME_MENU_SYSTEM_FN" class="head_top ">
        <p class="taskTrans" id="FRME_MENU_SYSTEM_FN_BTN">
<%--             <button class="icoCnt_taskTrans" onclick="FRME_TOP_fnOpenPopFRME290P()"><spring:message code="FRME_TOP.change.work.button"/></button> --%>
            <button id="FRME_MENU_SYSTEM_FN_BTN_GV" class="icoCnt_workTrans" onclick="FRME_TOP_fnOpenPopChangeGV()">GV</button>
<!-- 			<span class="swithCheck four_words"><input type="checkbox" id="INHB300M_main" data-path-id="INHB300M" onclick="FRME_TOP_fnOpenCnsl(this)"><label title="고급보기"></label></span> -->

<!-- 			<select id="FRME_MENU_TENANT_FN_BOX_" style="margin-left: 10px;"></select> -->
		</p>
        <script>
			$(document).ready(function () {
// 				MAINFRAME.displayGVBtn();

				var user = GLOBAL.session.user;
				if(user.originUsrGrd != "00")
				{
// 					$("#FRME_MENU_TENANT_FN_BOX").show();
					$("#FRME_MENU_SYSTEM_FN_BTN_GV").remove();
// 					Utils.ajaxCall("/sysm/SYSM200SEL03", JSON.stringify({}), function (result) {
// 						var tenantList = JSON.parse(result.SYSM200VOInfo);
// 						var comboBox = Utils.setKendoComboBoxCustom(tenantList, "#FRME_MENU_TENANT_FN_BOX_", "fmnm", "tenantPrefix", user.tenantPrefix, "선택");
// 						comboBox.unbind("change");
// 						comboBox.unbind("change").bind("change", function (e) {

// 							var tempTenantPrefix = $("#FRME_MENU_TENANT_FN_BOX_").data("kendoComboBox").value();
// 							if(Utils.isNotNull(tempTenantPrefix))
// 							{
// 								Utils.confirm("테넌트 정보 변경시 모든 화면이 닫힙니다.<br>계속하시겠습니까?", function () { // 테넌트 정보를 변경하시겠습니까?
// 									user.tenantPrefix = tempTenantPrefix;
// 									Utils.ajaxCall("/comm/COMM110SEL03", JSON.stringify(user), function (result) {
// 										if(result.result == true){
// 											document.location.reload();
// 										}else{
// 											Utils.alert(result.msg);
// 										}
// 									});
// 								}, function() {
// 									$("#FRME_MENU_TENANT_FN_BOX_").data("kendoComboBox").value(user.tenantPrefix);
// 								});	
// 							}
// 						});
						
// // 						if(Utils.isNull(tenantList) || tenantList.length == 0) $("#FRME_MENU_TENANT_FN_BOX_").data("kendoComboBox").enable(false);
// 						$("#FRME_MENU_TENANT_FN_BOX_").data("kendoComboBox").enable(false);
// 					});
				} else {
					$("#FRME_MENU_SYSTEM_FN_BTN_GV").show();
					$("#FRME_MENU_TENANT_FN_BOX_").remove();
				}
            });

			function FRME_TOP_fnOpenPopChangeGV() {
                Utils.setCallbackFunction("FRME_TOP_fnChangeGVCallback", function () {
					MAINFRAME.updateSessionUser();
					{
                        closeAllTabs(false);
                        FRME_TOP_fnClearCnslSwitch()
					}

					{   // frame init
                        MAINFRAME.clearButtonMenuList();
						Utils.closeAllPopup();
						MAINFRAME.initMainFrame();
					}
					
                    //Utils.alert("<spring:message code="FRME_TOP.change.GV.alert"/>");
                    document.location.reload();
                });
                Utils.openKendoWindow("/comm/COMM110P", 425, 340, "left", 40, 90, false, {callbackKey: "FRME_TOP_fnChangeGVCallback"});
            }
        </script>
    </div><!-- //head_top -->
</header><!-- //header_wrap -->



<!-- left GNB -->
<nav class="sideL_wrap"><div class="imenu"><spring:message code="FRME_TOP.menu"/></div>
    <div class="nav">
        <ul class="nav_list"><%-- TopMenu 영역 --%></ul>
    </div>
    <button type="button" class="btn_menu_open" title="<spring:message code="FRME_TOP.menu.open"/>">
        <!-- <span class="k-icon k-i-more-vertical"></span>-->
        <!-- <span class="k-icon k-i-grid k-icon-32" style="margin-left:9px; margin-top:4px;"></span> 대메뉴아이콘01-->
        <!-- <span class="k-icon k-i-menu k-icon-32" style="margin-left:10px; margin-top:10px;"></span>대메뉴아이콘02-->
        <!--  <span class="k-icon k-i-group k-icon-32" style="margin-left:10px; margin-top:10px;"></span>대메뉴아이콘03-->
        <!-- <span class="k-icon k-i-table k-icon-32" style="margin-left:10px; margin-top:10px;"></span> 대메뉴아이콘04-->
        <span class="k-icon k-i-grid-layout k-icon-32" style="margin-left:10px; margin-top:2px;"></span>
    </button>
</nav>
<!-- //sideL_wrap -->
