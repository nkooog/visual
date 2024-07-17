/***********************************************************************************************
 * Program Name : OPST100T.jsp
 * Creator         :  dwson
 * Create Date  : 2024.02.14
 * Description    : 사용 이력
 * Modify Desc  :
 * -----------------------------------------------------------------------------------------------
 * Date         | Updater        | Remark
 * -----------------------------------------------------------------------------------------------
 * 2024.02.14     dwson         최초생성
 ************************************************************************************************/

var OPST100_grid;
var OPST100DataSource;
var OPST100_gridData;
var OPST100_dropDownData_SYSM100, OPST100_dropDownData_SYSM200, OPST100T_comCdList;

var saveType;

$(document).ready(function () {

	$("#OPST100T_title").text($(".k-tabstrip-items .k-state-active .k-link").eq(0).text());

	OPST100_fnInitDropDownList();

	OPST100_fnKeyup();

	OPST100_fnInitGrid();

	OPST100_fnSearch();

});

function OPST100_fnInitDropDownList() {
	let SYSM100_paramData = {
		sort: [
			{
				column: "SystemName",
				direction: "ASC"
			}
		],
	};

	let param = {
		systemIdx: GLOBAL.session.user.systemIdx,
		sort: [
			{
				column: "TenantPrefix",
				direction: "ASC"
			}
		],
	};

	OPST100_dropDownData_SYSM100 = $("#OPST100_systemIdx").kendoDropDownList({
		dataTextField: "systemName",
		dataValueField: "systemIdx",
		dataSource: {
			transport: {
				read: function (options) {
					Utils.ajaxSyncCall("/opst/OPST100SEL02", JSON.stringify(SYSM100_paramData), function(response) {
						options.success(JSON.parse(response.SYSM100Info));
						if(!OPST100_userGrd()) {
							OPST100_TenantPrefixSrch(param);
						}

					});
				}
			},
			schema: {
				parse: function(response) {
					if(OPST100_userGrd()) {
						response.unshift({ systemName: "전체", systemIdx: "" });
					}
					return response;
				}
			}
		},
		change: function() {
			OPST100_dropDownData_SYSM200.enable(false);
			let value = this.value();
			if (value) {
				let SYSM200_paramData = {
					systemIdx: value,
					sort: [
						{
							column: "TenantPrefix",
							direction: "ASC"
						}
					],
				};
				OPST100_TenantPrefixSrch(SYSM200_paramData);
			} else {
				$("#OPST100_tenantPrefix").data("kendoDropDownList").setDataSource([{ prefixAndName: "전체", tenantPrefix: "" }]);
			}
			OPST100_dropDownData_SYSM200.select(0);
		}
	}).data("kendoDropDownList");

	OPST100_dropDownData_SYSM200 = $("#OPST100_tenantPrefix").kendoDropDownList({
		dataTextField: "prefixAndName",
		dataValueField: "tenantPrefix",
		dataSource: {
			schema: {
				parse: function (response) {
					response.unshift({prefixAndName: "전체", tenantPrefix: ""});
					return response;
				}
			},
		}
	}).data("kendoDropDownList");

	OPST100_dropDownData_SYSM200.enable(false);

	OPST100T_fnInitComCd("SERVICETYPE", "#OPST100_serviceType");

	let resultCode_dataSource = new kendo.data.DataSource({
		data: [
			{ Value: "", Text: "전체"},
		],
	});

	Utils.ajaxCall("/opst/OPST100SEL04", JSON.stringify(param), result = (response) =>{
		let data = [{text : '전체', value : ''}];
		response.forEach((e) => {
			data.push({text : e, value : e});
		});
		OPST100T_kendoDropDownList_init(data, 'OPST100_resultCode');
	});

	OPST100_dropDownData_resultCode = $("#OPST100_resultCode").kendoDropDownList({
		dataTextField: "Text",
		dataValueField: "Value",
		dataSource: resultCode_dataSource
	}).data("kendoDropDownList");

	let sendCode_dataSource = new kendo.data.DataSource({
		data: [
			{ Value: "", Text: "전체"},
		],
	});

	OPST100_dropDownData_sendCode = $("#OPST100_sendCode").kendoDropDownList({
		dataTextField: "Text",
		dataValueField: "Value",
		dataSource: sendCode_dataSource
	}).data("kendoDropDownList");
}

function OPST100_fnInitGrid() {
	let grid_OPST100_url = "/opst/OPST100SEL01";
	OPST100DataSource ={
		transport: {
			read: function (OPST100_jsonStr) {
				$("#grid_OPST100 .k-grid-norecords").remove();
				Utils.ajaxCall(grid_OPST100_url, OPST100_jsonStr, OPST100_fnResult, OPST100T_ProgressBar(true));
			}
		}
		, schema: {
			type: "json"
		}
	};

	OPST100_grid = $("#grid_OPST100").kendoGrid({
		dataSource : OPST100DataSource,
		autoBind: false,
		sortable: true,
		resizable: true,
		selectable: true,
		scrollable: true,
		selectable: "row",
		height: 514,
		noRecords: { template: `<div class="nodataMsg"><p>해당 목록이 없습니다.</p></div>` },
		pageable: {
			refresh:false
			, pageSizes:[ 15, 20, 30, 50, 100 ]
			, buttonCount:10
			, pageSize : 15
		},
		dataBound: OPST100_onDataBound,
		excel: {
			fileName: "TenantInfo_"+ Utils.getNowDateTime() +".xlsx",
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
			{ title: "", type: "int", width: '5px' }
			, { field: "idx", title: "seq", hidden: true }
			, { field: "systemIP", title: "시스템 호출 IP", hidden: true }
			, { field: "systemIdx", title: "시스템 ID", type: "string", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
			, { field: "systemName", title: "시스템명", type: "string", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
			, { field: "tenantPrefix", title: "테넌트 ID", type: "string", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
			, { field: "tenantName", title: "테넌트명", type: "string", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
			, { field: "requestDate", title: "등록일시", type: "date", width: '10px', template: '#=requestDate == null ? "-" : kendo.toString(new Date(requestDate), "yyyy-MM-dd HH:mm:ss")#' }
			, { field: "serviceType", title: "서비스타입", type: "string", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
			, { field: "serviceTypeName", title: "서비스명", type: "string", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
			, { field: "agentId", title: "사용자 ID", type: "string", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
			, { field: "phoneNumber", title: "요청한 번호", type: "string", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
			, { field: "resultCode", title: "전송결과", type: "string", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
			, { field: "sendCode", title: "처리 방식", type: "string", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
			, { field: "contentsBody", title: "복호화된 내용", hidden: true }
			, { field: "requestMessage", title: "요청 전문", hidden: true }
			, { field: "responseMessage", title: "응답 전문", hidden: true }
		],
	});

	OPST100_gridData = $("#grid_OPST100").data("kendoGrid");

	// 엑셀 다운로드 이벤트
	$("#OPST100_btnExcel").off().on("click", function() {
		OPST100_fnDownloadExcel();
	});
}

// grid 조회
function OPST100_fnSearch() {

	let OPST100_data = {
		systemIdx: $("#OPST100_systemIdx").val(),
		tenantPrefix: $("#OPST100_tenantPrefix").val(),
		serviceType: $("#OPST100_serviceType").val(),
		resultCode: $("#OPST100_resultCode").val(),
		sendCode: $("#OPST100_sendCode").val(),
		startDate: $("#OPST100T_dateStart").val(),
		endDate: $("#OPST100T_dateEnd").val(),
		keyword: $("#OPST100_keyword").val(),
	};
	let OPST100_jsonStr = JSON.stringify(OPST100_data);

	OPST100DataSource.transport.read(OPST100_jsonStr);
}

// grid 조회 결과
function OPST100_fnResult(data){

	if(data.OPST100Info !== undefined && data.OPST100Info != "[]"){
		let OPST100_jsonEncode = JSON.stringify(data.OPST100Info);
		let OPST100_obj = JSON.parse(OPST100_jsonEncode);
		let OPST100_jsonDecode = JSON.parse(OPST100_obj);

		OPST100_gridData.dataSource.data(OPST100_jsonDecode);
	}
	else{
		OPST100_gridData.dataSource.data([]);
	}
	OPST100T_ProgressBar(false);
}

function OPST100_onDataBound(OPST100_e)
{
	var rows = this.tbody.children();
	var totalRows = rows.length; // 그리드의 전체 행 개수

	for (var i = 0; i < totalRows; i++) {
		let row = $(rows[i]);
		let reverseIndex = (OPST100_gridData.dataSource.total() - i) - (OPST100_gridData.dataSource.pageSize() * (OPST100_gridData.dataSource.page() - 1));  // 역순 숫자
		row.children().eq(0).text(reverseIndex);
	}
}

// 엔터 검색
function OPST100_fnKeyup()
{
	$('input[type="search"]').on("keyup", function (e) {
		if (e.keyCode == 13) {
			OPST100_fnSearch();
		}
	});
}

//엑셀 다운로드
function OPST100_fnDownloadExcel() {
	OPST100_gridData.saveAsExcel();
}


OPST100_userGrd = () => (GLOBAL.session.user.usrGrd == '00') ? true : false;

OPST100_TenantPrefixSrch = (e) => {
	Utils.ajaxCall("/opst/OPST100SEL03", JSON.stringify(e), function(response) {
		if(response && response.SYSM200Info && Array.isArray(JSON.parse(response.SYSM200Info))) {
			let newData = JSON.parse(response.SYSM200Info).map(function(item) {
				return { prefixAndName: item.prefixAndName, tenantPrefix: item.tenantPrefix };
			});

			if(OPST100_userGrd()) {
				newData.unshift({ prefixAndName: "전체", tenantPrefix: "" });
				OPST100_dropDownData_SYSM200.enable(true);
			}else{
				OPST100_dropDownData_SYSM200.enable(false);
				OPST100_dropDownData_SYSM100.enable(false);
			}

			OPST100_dropDownData_SYSM200.setDataSource(newData);
			OPST100_dropDownData_SYSM200.select(0);
		}
	});
}

OPST100T_fnInitComCd = (category, iden) =>{
	let param = {"codeList": [{"CATEGORY": category}]};
	Utils.ajaxCall("/comm/COMM100SEL01", JSON.stringify(param), function (result) {
		OPST100T_comCdList = JSON.parse(result.codeList);
		Utils.setKendoComboBoxCustom(OPST100T_comCdList, iden, "code", "code_name", null, "선택");
	});
}

OPST100T_kendoDropDownList_init = (items, iden) =>{

	let element = document.getElementById(iden);

	return buttonGroup = new kendo.ui.DropDownList(element, {
		dataTextField: "text",
		dataValueField: "value",
		dataSource: items,
		change: function(e) {
			// 선택이 변경될 때 실행할 함수
			// OPST100_fnSearch();
		}
	});

}

OPST100T_ProgressBar = (param) => window.kendo.ui.progress($("#grid_OPST100"), param);