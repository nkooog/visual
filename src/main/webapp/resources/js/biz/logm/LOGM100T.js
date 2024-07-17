	/***********************************************************************************************
 * Program Name : LOGM100T.jsp
 * Creator         :  dwson
 * Create Date  : 2024.02.21
 * Description    : 사용자 로그
 * Modify Desc  :
 * -----------------------------------------------------------------------------------------------
 * Date         | Updater        | Remark
 * -----------------------------------------------------------------------------------------------
 * 2024.02.21     dwson         최초생성
 ************************************************************************************************/

var LOGM100_grid;
var LOGM100DataSource;
var LOGM100_gridData;
var LOGM100_dropDownData_SYSM100, LOGM100_dropDownData_isEnabled;


$(document).ready(function () {	
	
	$("#LOGM100T_title").text($(".k-tabstrip-items .k-state-active .k-link").eq(0).text());
	
	LOGM100_fnInitDropDownList();
	
	LOGM100_fnKeyup();
	LOGM100_TenantPrefixSrch({});
    LOGM100_fnInitGrid();

   	LOGM100_fnSearch();
});

function LOGM100_fnInitDropDownList() {
	let SYSM100_paramData = {
		sort: [
        	{
            	column: "SystemName",
            	direction: "ASC"
            }
        ],
	};
	
	LOGM100_dropDownData_SYSM100 = $("#LOGM100_systemIdx").kendoDropDownList({
        dataTextField: "systemName",
        dataValueField: "systemIdx",
        dataSource: {
            transport: {
            	read: function (options) {
    				Utils.ajaxSyncCall("/logm/LOGM100SEL02", JSON.stringify(SYSM100_paramData), function(response) {
    					options.success(JSON.parse(response.SYSM100Info));
						if(!LOGM100_userGrd()) {
							// LOGM100_dropDownData_SYSM100.enable(false);
							let SYSM200_paramData = {
								systemIdx: GLOBAL.session.user.systemIdx,
								sort: [
									{
										column: "TenantPrefix",
										direction: "ASC"
									}
								],
							};
							LOGM100_TenantPrefixSrch(SYSM200_paramData);
						}
						LOGM100_ProgressBar(false);
    				}, LOGM100_ProgressBar(true));
    			}
            },
		    schema: {
		        parse: function(response) {
					if(LOGM100_userGrd()) {
						response.unshift({ systemName: "전체", systemIdx: "" });
					}
		            return response;
		        }
		    }
        },
        change: function() {
        	LOGM100_dropDownData_SYSM200.enable(false);
            let value = this.value();

			let SYSM200_paramData = {
				systemIdx: value,
				sort: [
					{
						column: "TenantPrefix",
						direction: "ASC"
					}
				],
			};
			LOGM100_TenantPrefixSrch(SYSM200_paramData);

            LOGM100_dropDownData_SYSM200.select(0);
        }
    }).data("kendoDropDownList");
	
    LOGM100_dropDownData_SYSM200 = $("#LOGM100_tenant").kendoDropDownList({
        dataTextField: "prefixAndName",
        dataValueField: "tenantPrefix",
        dataSource: {
            schema: {
                parse: function(response) {
                    response.unshift({ prefixAndName: "전체", tenantPrefix: "" });
                    return response;
                }
            },
        }
    }).data("kendoDropDownList");
    LOGM100_dropDownData_SYSM200.enable(false);

	var action_dataSource = [
		{ text: "전체", value: "" },
		{ text: "등록", value: "등록" },
		{ text: "수정", value: "수정" },
	];

	LOGM100_kendoDropDownList_init(action_dataSource, 'LOGM100_action');

}

function LOGM100_fnInitGrid() {
	let grid_LOGM100_url = "/logm/LOGM100SEL01";
	LOGM100DataSource ={
		transport: {
			read: function (LOGM100_jsonStr) {
				$("#grid_LOGM100 .k-grid-norecords").remove();
				Utils.ajaxCall(grid_LOGM100_url, LOGM100_jsonStr, LOGM100_fnResult, LOGM100_ProgressBar(true));
			}
		}
		, schema: {
	        type: "json"
	    }
	};

	LOGM100_grid = $("#grid_LOGM100").kendoGrid({
		dataSource : LOGM100DataSource, 
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
		dataBound: LOGM100_onDataBound,
	    excel: {
	        fileName: "사용자로그_"+ Utils.getNowDateTime() +".xlsx",
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
			, { field: "systemIdx", title: "시스템 ID", type: "string", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
			, { field: "systemName", title: "시스템명", type: "string", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
			, { field: "tenant", title: "테넌트 ID", type: "string", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
			, { field: "tenantName", title: "테넌트명", type: "string", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
			, { field: "userId", title: "사용자 ID", type: "string", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
			, { field: "action", title: "액션", type: "string", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
			, { field: "title", title: "콘텐츠명", type: "string", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
			, { field: "contentSeq", title: "CONTENT_SEQ", type: "string", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
			, { field: "regDate", title: "등록일시", type: "string", width: '10px' }
			, { field: "ip", title: "IP", hidden: true }
		],
	});

    LOGM100_gridData = $("#grid_LOGM100").data("kendoGrid");
    
	// 엑셀 다운로드 이벤트
	$("#LOGM100_btnExcel").off().on("click", function() {
		LOGM100_fnDownloadExcel();
	});
}

// grid 조회
function LOGM100_fnSearch() {

	let LOGM100_data = {
		systemIdx: $("#LOGM100_systemIdx").val(),
		tenant: LOGM100_dropDownData_SYSM200.selectedIndex == 0 ? null : $("#LOGM100_tenant").val(),
		action: $("#LOGM100_action").val(),
		startDate: $("#LOGM100T_dateStart").val(),
		endDate: $("#LOGM100T_dateEnd").val(),
		keyword: $("#LOGM100_keyword").val(),
	};
	let LOGM100_jsonStr = JSON.stringify(LOGM100_data);

	LOGM100DataSource.transport.read(LOGM100_jsonStr);
}

// grid 조회 결과
function LOGM100_fnResult(data){

	if(data.LOGM100Info != "[]"){
		let LOGM100_jsonEncode = JSON.stringify(data.LOGM100Info);
		let LOGM100_obj = JSON.parse(LOGM100_jsonEncode);
		let LOGM100_jsonDecode = JSON.parse(LOGM100_obj);

		LOGM100_gridData.dataSource.data(LOGM100_jsonDecode);
	}
	else{
		LOGM100_gridData.dataSource.data([]);
	}
	LOGM100_ProgressBar(false);
}

function LOGM100_onDataBound(LOGM100_e)
{
	var rows = this.tbody.children();
    var totalRows = rows.length; // 그리드의 전체 행 개수

    for (var i = 0; i < totalRows; i++) {
        let row = $(rows[i]);
        let reverseIndex = (LOGM100_gridData.dataSource.total() - i) - (LOGM100_gridData.dataSource.pageSize() * (LOGM100_gridData.dataSource.page() - 1));  // 역순 숫자
        row.children().eq(0).text(reverseIndex);
    }
}

// 엔터 검색
function LOGM100_fnKeyup()
{
	$('input[type="search"]').on("keyup", function (e) {
        if (e.keyCode == 13) {
            LOGM100_fnSearch();
        }
    });
}

//엑셀 다운로드
function LOGM100_fnDownloadExcel() {
    LOGM100_gridData.saveAsExcel();
}

LOGM100_userGrd = () => (GLOBAL.session.user.usrGrd == '00') ? true : false;

LOGM100_TenantPrefixSrch = (e) => {
	Utils.ajaxCall("/logm/LOGM100SEL03", JSON.stringify(e), function(response) {
		if(response && response.SYSM200Info && Array.isArray(JSON.parse(response.SYSM200Info))) {
			let newData = JSON.parse(response.SYSM200Info).map(function(item) {
				return { prefixAndName: item.prefixAndName, tenantPrefix: item.tenantPrefix };
			});

			if(LOGM100_userGrd()) {
				newData.unshift({ prefixAndName: "전체", tenantPrefix: "" });
				LOGM100_dropDownData_SYSM200.enable(true);
			}else{
				LOGM100_dropDownData_SYSM200.enable(false);
				LOGM100_dropDownData_SYSM100.enable(false);
			}

			LOGM100_dropDownData_SYSM200.setDataSource(newData);
			LOGM100_dropDownData_SYSM200.select(0);
		}
	});
}

LOGM100_kendoDropDownList_init = (e, iden) =>{

	let element = document.getElementById(iden);

	return buttonGroup = new kendo.ui.DropDownList(element, {
		dataTextField: "text",
		dataValueField: "value",
		dataSource: e,
		change: function(e) {
			// 선택이 변경될 때 실행할 함수
			console.log("Selected value: " + this.value());
		}
	});

}

LOGM100_ProgressBar = (param) => window.kendo.ui.progress($("#grid_LOGM100"), param);