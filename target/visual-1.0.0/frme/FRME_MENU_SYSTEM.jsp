<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"      uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring"    uri="http://www.springframework.org/tags"%>
<%
/***********************************************************************************************
* Program Name : FRME_MENU_SYSTEM
* Creator      : jrlee
* Create Date  : 2022.03.31
* Description  : System menu
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2022.03.31     jrlee            최초생성
************************************************************************************************/
%>
<div class="system_top">
    <h1>
        <span style="color: #FFFFFF; font-size: 22px; font-weight: bold;">EXONA LITE</span>
    </h1>

    <ul class="topUtil" id="FRME_MENU_SYSTEM">
<%--         <li onclick="FRME_MENU_SYSTEM_fnOpenMenu(this)" id="FRME_MENU_SYSTEM_envr" class="icoUtil_setup" title="<spring:message code="FRME_MENU_SYSTEM.top.menu.Preferences"/>"></li> --%>
        <li onclick="FRME_MENU_SYSTEM_fnOpenMenu(this)" id="FRME_MENU_SYSTEM_usr" class="icoUtil_myInfo" title="<spring:message code="FRME_MENU_SYSTEM.top.menu.User.information"/>"></li>
    </ul>
    <script>
        // $(".ic_top1").on("click",function () {
        //     $(this).removeClass('new');
        // });

        $('.topUtil').kendoTooltip({
              filter: "li",
            position: "bottom",
            show: function () {
                this.popup.wrapper.width('auto').addClass('textTooltip');
            },
        });

        function FRME_MENU_SYSTEM_fnOpenMenu(obj) {
            switch ($(obj).attr("id")) {
//                 case "FRME_MENU_SYSTEM_envr":
//                     Utils.openKendoWindow("/frme/FRME160P", 400, 500, "right", 0, 50, false);
//                     break;
                case "FRME_MENU_SYSTEM_usr":
//                     Utils.openKendoWindow("/frme/FRME110P", 380, 385, "right", 0, 50, false, {callbackKey: "FRME110P_fnSaveUsrDgindCallback"});
                    Utils.openKendoWindow("/frme/FRME110P", 380, 320, "right", 0, 50, false);
                    break;
            }
        }
    </script>
</div>