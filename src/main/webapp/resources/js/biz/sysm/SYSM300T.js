1/***********************************************************************************************
 * Program Name : 태넌트 그룹 기본정보(SYSM300T.js)
 * Creator      : yhnam
 * Create Date  : 2024.02.08
 * Description  : 사용자활동내역
 * Modify Desc  : 
 * -----------------------------------------------------------------------------------------------
 * Date         | Updater        | Remark
 * -----------------------------------------------------------------------------------------------
 * 2024.02.08     yhnam            최초작성   
 ************************************************************************************************/

var SYSM300T_grdSYSM300T;
var SYSM300T_cmmCodeList;
var SYSM300T_userInfo = GLOBAL.session.user;

$(document).ready(function () {

	$("#SYSM300T_title").text($(".k-tabstrip-items .k-state-active .k-link").eq(0).text());

	SYSM300T_fnSetInit();
});

// 초기 설정
function SYSM300T_fnSetInit()
{
	SYSM300T_fnSelectCombo();
	setTimeout(function() {
		SYSM300T_createGrid();
	}, 200);
}

//공통코드 조회
function SYSM300T_fnSelectCombo()
{
	kendoDropDown_init("SYSM300_systemIdx", "SYSM300_tenantPrefix", "SYSM300_visualType", "전체", "");
	
	setTimeout(function() {

		if(SYSM300T_userInfo.originUsrGrd == "00" && SYSM300T_userInfo.tenantPrefix == "SYS")
		{
			$("#SYSM300_tenantPrefix").data("kendoDropDownList").enable(false);
			$("#SYSM300_systemIdx").change(function() {

				var idx = $(this).val();
				if(Utils.isNull(idx)) idx = 0;
				var param = {
					systemIdx : idx
				};

				Utils.ajaxCall('/opmt/OPMT200SEL03',  JSON.stringify(param), function(OPMT200SEL03_data){
					let data = JSON.parse(OPMT200SEL03_data.OPMT200Info);

					data.unshift({ tenantName: "전체",  tenantPrefix: ""});
					let OPMT200_dropDownData_tenantPrefix = $("#SYSM300_tenantPrefix").kendoDropDownList({
						dataTextField: "tenantName",
						dataValueField: "tenantPrefix",
						dataSource: data
					}).data("kendoDropDownList");

					setTimeout(function() {
						$("#SYSM300_tenantPrefix").data("kendoDropDownList").select(0);
						$("#SYSM300_tenantPrefix").data("kendoDropDownList").enable(true);
					}, 100);
				});
			});
		}

	}, 200);
}

// 그리드 생성
function SYSM300T_createGrid()
{
	$("#grdSYSM300T").kendoGrid({
		dataSource:{
			transport: {
				read : function (options) {
					var systemIdx = "";
					if(SYSM300T_userInfo.tenantPrefix != "SYS" && $("#SYSM300_systemIdx").data("kendoDropDownList").value() == "")
						systemIdx = SYSM300T_userInfo.systemIdx;
					else
						systemIdx = $("#SYSM300_systemIdx").data("kendoDropDownList").value() == "" ? null : $("#SYSM300_systemIdx").data("kendoDropDownList").value();
					
					var tenantPrefix = "";
					if(SYSM300T_userInfo.tenantPrefix != "SYS" && $("#SYSM300_tenantPrefix").data("kendoDropDownList").value() == "") tenantPrefix = SYSM300T_userInfo.tenantPrefix;
					else tenantPrefix = $("#SYSM300_tenantPrefix").data("kendoDropDownList").value();

					let SYSM300T_data = { 
						systemIdx: systemIdx
						, tenantPrefix : tenantPrefix
						, category : $("#SYSM300_visualType").data("kendoDropDownList").value()
						, keyword : $("#SYSM300_keyword").val()
					};

					Utils.ajaxCall("/sysm/SYSM300SEL01", JSON.stringify(SYSM300T_data), function (result) {
						let list = JSON.parse(result.SYSM300VOInfo);
						SYSM300T_grdSYSM300T.dataSource.data(list);
						
						window.kendo.ui.progress($("#grdSYSM300T"), false);
					});
				}
			},
			schema : {
				type: "json",
				model: {
					fields: {
						systemIdx		: { field: "systemIdx", 	type: "string" },
						systemName		: { field: "systemName", 	type: "string" },
						tenantPrefix	: { field: "tenantPrefix", 	type: "string" },
						tenantName		: { field: "tenantName", 	type: "string" },
						category		: { field: "category", 		type: "string" },
						messageType		: { field: "messageType", 	type: "string" },
						paramName		: { field: "paramName", 	type: "string" },
						paramValue		: { field: "paramValue", 	type: "string" },
						userId			: { field: "userId", 		type: "string" },
						regDate			: { field: "regDate", 		type: "string" },
						updateId		: { field: "updateId", 		type: "string" },
						updateDate		: { field: "updateDate", 	type: "string" },
					}
				}
			}
        },
		autoBind: false,
		sortable: true,
		noRecords: { template: `<div class="nodataMsg"><p>해당 목록이 없습니다.</p></div>` },
		pageable: {
			refresh:false
			, pageSizes:[ 25, 20, 30, 50, 100 ]
			, buttonCount:10
			, pageSize : 25
		},
		scrollable: true,
		dataBound: SYSM300T_onDataBound,
		excel: {
	        fileName: "URL설정_"+ Utils.getNowDateTime() +".xlsx",
	        filterable: true, // 필터링된 데이터만 내보내기
	        allPages: true // 모든 페이지 데이터 내보내기 (페이징된 경우)
	    },
	    excelExport: function(e) {
	        let sheet = e.workbook.sheets[0];
	        for (let rowIndex = 1; rowIndex < sheet.rows.length; rowIndex++) {
	        	let row = sheet.rows[rowIndex];
	            for (let cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
	            	let cell = row.cells[cellIndex];
	            	let cellContentLength = cell.value ? cell.value.toString().length : 0;
	                sheet.columns[cellIndex].autoWidth = true; // 자동 너비 설정
	            }
	        }
	    },
		columns: [
			{
			    field: "systemIdx",
			    title: "SystemIdx",
			    width: 35,
			    attributes: {"class": "k-text-center"}
			},{
			    field: "systemName",
			    title: "시스템명",
			    width: 40,
			    attributes: {"class": "k-text-center"}
			},{
			    field: "tenantPrefix",
			    title: "Tenant",
			    width: 40,
			    attributes: {"class": "k-text-center"},
			},{
			    field: "tenantName",
			    title: "테넌트명",
			    width: 50,
			    attributes: {"class": "k-text-left"}
			},{
			    field: "category",
			    title: "ServiceType",
			    width: 35,
			    attributes: {"class": "k-text-center"}
			},{
			    field: "messageType",
			    title: "MessageType",
			    width: 50,
			    attributes: {"class": "k-text-center"}
			},{
			    field: "paramName",
			    title: "ParamName",
			    width: 70,
			    attributes: {"class": "k-text-center"}
			},{
			    field: "paramValue",
			    title: "ParamValue",
			    width: 150,
			    attributes: {"class": "k-text-center"}
			},{
			    field: "regDate",
			    title: "등록일시",
			    width: 40,
			    attributes: {"class": "k-text-center"},
			},{
			    field: "userId",
			    title: "등록자",
			    width: 50,
			    attributes: {"class": "k-text-center"}
			},{
			    field: "updateDate",
			    title: "수정일자",
			    width: 40,
			    attributes: {"class": "k-text-center"}
			},{
			    field: "updateId",
			    title: "수정자",
			    width: 50,
			    attributes: {"class": "k-text-center"}
			}
		]
	});

	SYSM300T_grdSYSM300T = $("#grdSYSM300T").data("kendoGrid");

	//그리드 높이 조절
	let SYSM300T_screenHeight = $(window).height();
	SYSM300T_grdSYSM300T.element.find('.k-grid-content').css('height', SYSM300T_screenHeight - 425);

	// grid reSize
	$(window).on({
		'resize': function() {
			SYSM300T_grdSYSM300T.element.find('.k-grid-content').css('height', SYSM300T_screenHeight - 425);
		},
	});
	
	SYSM300T_fnSearch();
}

// 그리드 조회
function SYSM300T_fnSearch()
{
	window.kendo.ui.progress($("#grdSYSM300T"), true);

	let SYSM300T_data = { 

	};

	let SYSM300T_jsonStr = JSON.stringify(SYSM300T_data);

	SYSM300T_grdSYSM300T.dataSource.transport.read(SYSM300T_jsonStr);
}

function SYSM300T_onDataBound(SYSM300T_e)
{

}

function kendoDropDown_init(systemId, tenantPrefixId, visualTypeId, firstName, firstVaule)
{
	// 시스템 콤보 박스
	Utils.ajaxCall('/opmt/OPMT200SEL02',  JSON.stringify({}), function(OPMT200SEL02_data){
		let data = JSON.parse(OPMT200SEL02_data.OPMT200Info);

		var systemIdx = "";
		if(SYSM300T_userInfo.tenantPrefix != "SYS" && data.length > 0) systemIdx = data[0].systemIdx;
		
		if(SYSM300T_userInfo.tenantPrefix == "SYS") data.unshift({ systemName: firstName,  systemIdx: firstVaule});
		let OPMT200_dropDownData_systemIdx = $("#"+systemId).kendoDropDownList({
			dataTextField: "systemName",
			dataValueField: "systemIdx",
			dataSource: data
		}).data("kendoDropDownList");
		
		$("#"+systemId).data("kendoDropDownList").value(systemIdx);
		
		// OPMT200_dropDownData_visualType change event
		OPMT200_dropDownData_systemIdx.bind("change", function (e) {
			let value_systemIdx = $("#"+systemId).data("kendoDropDownList").value();
		});
	});
	// 시스템 콤보 박스
	
	// 테넌트 콤보 박스
	Utils.ajaxCall('/opmt/OPMT200SEL03',  JSON.stringify({}), function(OPMT200SEL03_data){
		let data = JSON.parse(OPMT200SEL03_data.OPMT200Info);

		var tenantPrefix = "";
		if(SYSM300T_userInfo.tenantPrefix != "SYS" && data.length > 0) tenantPrefix = data[0].tenantPrefix;

		if(SYSM300T_userInfo.tenantPrefix == "SYS") data.unshift({ tenantName: firstName,  tenantPrefix: firstVaule});
		let OPMT200_dropDownData_tenantPrefix = $("#"+tenantPrefixId).kendoDropDownList({
			dataTextField: "tenantName",
			dataValueField: "tenantPrefix",
			dataSource: data
		}).data("kendoDropDownList");
		
		$("#"+tenantPrefixId).data("kendoDropDownList").value(tenantPrefix);
		
		// OPMT200_dropDownData_visualType change event
		OPMT200_dropDownData_tenantPrefix.bind("change", function (e) {
			let value_tenantPrefix = $("#"+tenantPrefixId).data("kendoDropDownList").value();
		});
	});
	// 테넌트 콤보 박스
	
	// 카테고리 콤보 박스
	let visualType_dataSource = new kendo.data.DataSource({
		data: [
			{ Value: firstVaule, Text: firstName},
			{ Value: "p", Text: "프롤로그"},
			{ Value: "e", Text: "에필로그"},
		],
	});
	   
	let OPMT200_dropDownData_visualType = $("#"+visualTypeId).kendoDropDownList({
		dataTextField: "Text",
		dataValueField: "Value",
		dataSource: visualType_dataSource
	}).data("kendoDropDownList");
	
	// OPMT200_dropDownData_visualType change event
	OPMT200_dropDownData_visualType.bind("change", function (e) {
		let value_visualType = $("#"+visualTypeId).data("kendoDropDownList").value();
	});
	// 카테고리 콤보 박스	
	
	if(SYSM300T_userInfo.originUsrGrd != "00")
	{
		setTimeout(function() {
			$("#SYSM300_systemIdx").data("kendoDropDownList").enable(false);
			$("#SYSM300_tenantPrefix").data("kendoDropDownList").enable(false);
		}, 200);
	}
}

function SYSM300T_fnContentExcel()
{
	SYSM300T_grdSYSM300T.saveAsExcel();
}