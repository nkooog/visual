<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"      uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring"    uri="http://www.springframework.org/tags"%>
<%
/***********************************************************************************************
* Program Name : COMM110P.jsp
* Creator      : dwson
* Create Date  : 2024.01.26
* Description  : 전역변수 (테넌트)변경 팝업
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.26     dwson            최초생성
************************************************************************************************/
%>
<jsp:include page="/frme/FRME_HEAD.jsp"/>

<header class="popHeader">
	전역변수
	<button class="popClose" title="팝업창 닫기" onclick="COMM110P_fnClose()"></button>
</header>

<section class="popContainer">
	<div class="tableCnt_Row">
		<table >
			<colgroup>
				<col style="width: 35%;">
				<col style="width: 30%;">
				<col style="width: 40%;">
			</colgroup>
			<thead >
				<tr>
					<th>전역변수명</th>
					<th colspan="2" >전역변수값</th>
				</tr>
			</thead>
			<tobdy>
				<tr>
					<td>사용자등급</td>
					<td colspan="2"><select id='COMM110P_usrGrdComboBox'/></td>
				</tr>
				<tr id="tenantComboBoxArea">
					<td>테넌트</td>
					<td colspan="2"><select id='COMM110P_tenantComboBox'/> </td>
				</tr>
<!-- 				<tr> -->
<!-- 					<td>사용자</td> -->
<!-- 					<td id="COMM110P_agentId"> <select id='COMM110P_agentIdComboBox'/> </td> -->
<!-- 					<td id="COMM110P_usrNm">  </td> -->
<!-- 				</tr> -->
				<tr>
<!-- 					<td>테넌트/테넌트그룹</td> -->
					<td>테넌트/시스템Idx</td>
					<td id="COMM110P_tenant"></td>
<!-- 					<td id="COMM110P_tenant_group"></td> -->
					<!-- 20240531 SystemIdx 추가 -->
					<td id="COMM110P_systemIdx"></td>
				</tr>
				<tr>
					<td>사용자등급명</td>
					<td id="COMM110P_usrGrdNm" colspan="2"></td>
<!-- 					<td id="COMM110P_usrGrd"></td> -->
				</tr>
			</tobdy>
		</table>
	</div>

	<menu class="btnArea_right">
		<button type="button" class="btnRefer_default" onclick="COMM110P_fnConfirm()"><span>변경</button> <%-- 변경 --%>
		<button type="button" class="btnRefer_default" onClick="COMM110P_fnClose()"><span>취소</span></button> <%-- 취소 --%>
	</menu>
</section>

<script>
	let COMM110P_userObject = GLOBAL.session.user;
	let COMM110P_tenantList, COMM110P_grdList,COMM110P_agentIdList;
	let COMM110P_Combo = new Array(2);
	
	let COMM110P_userObject_temp;

	$("th,td").css('height','30px');
	$("th,td").css('padding','0.2em 0.6em');

	
	$(document).ready(function () {

		Utils.ajaxCall("/sysm/SYSM200SEL03", JSON.stringify({}), function (result) {
			COMM110P_tenantList = JSON.parse(result.SYSM200VOInfo);

			Utils.ajaxSyncCall("/comm/COMM110SEL01", JSON.stringify({}), function (result) {
				 var list = result.list;
                 let codeist = list.filter(function (code) {
                	 if(COMM110P_userObject.originTenantPrefix != "SYS" && COMM110P_userObject.originUsrGrd != "00") return code.usrGrd != "00" && (COMM110P_userObject.originUsrGrd*1) <= (code.usrGrd*1);
                	 else return true;
                 });
				COMM110P_grdList = codeist;
			});

			//콤보 생성
			let tenantPrefix = (COMM110P_userObject.tenantPrefix != 'SYS') ? COMM110P_userObject.tenantPrefix : "";

			// 20240531 SystemIdx 추가
			let fmnm = "";
			COMM110P_tenantList.forEach(function(item, i) {
				if(item.tenantPrefix == tenantPrefix && item.systemIdx == COMM110P_userObject.systemIdx) fmnm = item.fmnm;
			});

// 			let usrGrd = (COMM110P_userObject.usrGrd != '00') ? COMM110P_userObject.usrGrd : "";
			COMM110P_Combo[0] = Utils.setKendoComboBoxCustom(COMM110P_tenantList, "#COMM110P_tenantComboBox", "fmnm", "fmnm", fmnm, "선택");
			COMM110P_Combo[1] = Utils.setKendoComboBoxCustom(COMM110P_grdList, "#COMM110P_usrGrdComboBox", "usrGrdNm", "usrGrd", COMM110P_userObject.usrGrd, "선택");
			
			// 20240531 SystemIdx 추가
			setTimeout(function() {
				if(Utils.isNotNull($("#COMM110P_tenantComboBox").val()) && COMM110P_userObject.tenantPrefix != 'SYS')
				{
					if(Utils.isNotNull(fmnm)) $("#COMM110P_tenantComboBox").data("kendoComboBox").text(fmnm);
				}
			}, 100);
			
			if(COMM110P_userObject.usrGrd == "00") $("#tenantComboBoxArea").hide();
			else $("#tenantComboBoxArea").show();

			//Combobox Select list height change --> 100px
			COMM110P_Combo.map(x => x.setOptions({height:100}));

			//Combobox_teant change event
			COMM110P_Combo[0].bind("change", function (e) {
				if(Utils.isNotNull($("#COMM110P_tenantComboBox").val()))
				{
					let obj = Utils.getObjectFromList(COMM110P_tenantList, "fmnm", $("#COMM110P_tenantComboBox").val());
					COMM110P_userObject.tenantPrefix = "";
					COMM110P_userObject.tenantGroupId = "";
					// 20240531 SystemIdx 추가
					COMM110P_userObject.systemIdx = "";
// 					$("#COMM110P_tenant_group").text("");
					$("#COMM110P_systemIdx").text("");
					$("#COMM110P_tenant").text("");
					if(obj)
					{
						COMM110P_userObject.tenantPrefix = obj.tenantPrefix;
						COMM110P_userObject.tenantGroupId = obj.tenantGroupId;
						// 20240531 SystemIdx 추가
						let temp_systemIdx = $("#COMM110P_tenantComboBox").data("kendoComboBox").text().split("【")[1].split("】")[0];
						COMM110P_userObject.systemIdx = temp_systemIdx;
					}

					COMM110P_fnSearch(COMM110P_userObject,0);
				}
			});

			//Combobox_user Group change event
			COMM110P_Combo[1].bind("change", function (e) {
				let obj = Utils.getObjectFromList(COMM110P_grdList, "usrGrd", $("#COMM110P_usrGrdComboBox").val());
				COMM110P_userObject.usrGrd = "";
				COMM110P_userObject.usrGrdNm = "";
				$("#COMM110P_usrGrdNm").text("");
				if(obj){

					COMM110P_userObject.usrGrd = obj.usrGrd;
					COMM110P_userObject.usrGrdNm = obj.usrGrdNm;
	
					if(obj.usrGrd == "00")
					{
						$("#COMM110P_tenantComboBox").data("kendoComboBox").value("");
// 						$("#COMM110P_tenant_group").text("");
						// 20240531 SystemIdx 추가
						$("#COMM110P_systemIdx").text("");
						$("#COMM110P_tenant").text("");
						COMM110P_userObject.tenantPrefix = "SYS";
						$("#tenantComboBoxArea").hide();
					} else $("#tenantComboBoxArea").show();
				}
				COMM110P_fnSearch(COMM110P_userObject,1);
			});

			COMM110P_fnSearch(COMM110P_userObject , -1);
		});
	});

	function COMM110P_fnSearch(_userObject,type) {
		let userObject = _userObject;
		
		console.log(userObject);

		if(type < 0 && userObject.tenantPrefix != 'SYS')
		{
// 			if(userObject.tenantGroupId) $("#COMM110P_tenant_group").text(userObject.tenantGroupId);
			// 20240531 SystemIdx 추가
			if(userObject.systemIdx) $("#COMM110P_systemIdx").text(userObject.systemIdx);
			if(userObject.tenantPrefix) $("#COMM110P_tenant").text(userObject.tenantPrefix);
			if(userObject.usrGrdNm) $("#COMM110P_usrGrdNm").text(userObject.usrGrdNm);
// 			if(userObject.usrGrd) $("#COMM110P_usrGrd").text(userObject.usrGrd);
		} else {
// 			if(userObject.tenantGroupId && type == 0) $("#COMM110P_tenant_group").text(userObject.tenantGroupId);
			// 20240531 SystemIdx 추가
			if(userObject.systemIdx && type == 0) $("#COMM110P_systemIdx").text(userObject.systemIdx);
			if(userObject.tenantPrefix && type == 0) $("#COMM110P_tenant").text(userObject.tenantPrefix);
			if(userObject.usrGrdNm && type == 1) $("#COMM110P_usrGrdNm").text(userObject.usrGrdNm);
// 			if(userObject.usrGrd && type == 1) $("#COMM110P_usrGrd").text(userObject.usrGrd);
		}
	}

	function COMM110P_fnConfirm() {
	 	for(let x of COMM110P_Combo){

			if(COMM110P_Combo[1].value() != "00" && Utils.isNull(x.value())){
				Utils.alert("필수 항목이 선택되지 않았습니다.");
				return;
			}
		}

		Utils.confirm("테넌트 정보 변경시 모든 화면이 닫힙니다.<br>계속하시겠습니까?", function () { // 테넌트 정보를 변경하시겠습니까?
			Utils.ajaxCall("/comm/COMM110SEL03", JSON.stringify(COMM110P_userObject), function (result) {
				if(result.result == true){
					Utils.getPopupCallback("${param.callbackKey}")();
					COMM110P_fnClose();
				}else{
					Utils.alert(result.msg);
				}
			});
		});
	}

	function COMM110P_fnClose() {
		Utils.closeKendoWindow('${param.id}');
	}
</script>
