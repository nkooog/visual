/***********************************************************************************************
 * Program Name : OPST200T.jsp
 * Creator         :  dwson
 * Create Date  : 2024.01.26
 * Description    : 사용 통계
 * Modify Desc  :
 * -----------------------------------------------------------------------------------------------
 * Date         | Updater        | Remark
 * -----------------------------------------------------------------------------------------------
 * 2024.01.26     dwson         최초생성
 ************************************************************************************************/

var OPST200_dropDownData_SYSM100, OPST200_dropDownData_SYSM200;
var OPST200_grid_daily, OPST200_gridData_daily, OPST200_grid_monthly, OPST200_gridData_monthly;
var selectedTab = "daily";

$(document).ready(function() {
	OPST200_fnInitDropDownList();
	
	OPST200_fnInitTab();
	
	OPST200_fnInitGrid();
	
	OPST200_fnSearch();
});

function OPST200_fnInitDropDownList() {

	$("#OPST200T_title").text($(".k-tabstrip-items .k-state-active .k-link").eq(0).text());
	
	// 시스템 리스트
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

    OPST200_dropDownData_SYSM100 = $("#OPST200_systemIdx").kendoDropDownList({
        dataTextField: "systemName",
        dataValueField: "systemIdx",
        dataSource: {
            transport: {
            	read: function (options) {
    				Utils.ajaxCall("/opst/OPST200SEL02", JSON.stringify(SYSM100_paramData), function(response) {
    					options.success(JSON.parse(response.SYSM100Info));
						if(!OPST200T_userGrd()) {
							OPST200T_TenantPrefixSrch(param);
							OPST200_dropDownData_SYSM100.enable(false);
						}
    				});
    			}
            },
		    schema: {
		        parse: function(response) {
					if(OPST200T_userGrd()) {
						response.unshift({ systemName: "전체", systemIdx: "" });
					}
					return response;
		        }
		    }
        },
        change: function() {
        	OPST200_dropDownData_SYSM200.enable(false);
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
                }
				OPST200T_TenantPrefixSrch(SYSM200_paramData);
            } else {
                $("#OPST200_tenantPrefix").data("kendoDropDownList").setDataSource([{ prefixAndName: "전체", tenantPrefix: "" }]);
            }
            OPST200_dropDownData_SYSM200.select(0);
        }
    }).data("kendoDropDownList");
    
    // 테넌트 리스트
    let SYSM200_paramData = {
		sort: [
        	{
            	column: "TenantPrefix",
            	direction: "ASC"
            }
        ],
	};
    OPST200_dropDownData_SYSM200 = $("#OPST200_tenantPrefix").kendoDropDownList({
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
    OPST200_dropDownData_SYSM200.enable(false);

    // 서비스타입 리스트
    $("#OPST200_serviceName").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
		  { value: "", text: "전체"}
		, { value: "I", text: "I"}
		, { value: "O", text: "O"}
		, { value: "P", text: "P"}
		],
    });
}

function OPST200_fnInitTab() {
	// TabStrip 초기화
    $("#tab_OPST200_changeGrid").kendoTabStrip({
        select: function(e) {
            var index = $(e.item).index();
            if (index === 0) {
            	selectedTab = "daily";
            } else {
            	selectedTab = "monthly";
            }
            OPST200_fnSearch();
        }
    });
}

function OPST200_fnInitGrid() {
	let grid_OPST200_url = "/opst/OPST200SEL01";
	
	let grid_OPST200_options = {
		autoBind: false,
		sortable: true,
		resizable: true,
		selectable: true,
		scrollable: true,
		selectable: "row",
		height: 574,
		noRecords: { template: `<div class="nodataMsg"><p>해당 목록이 없습니다.</p></div>` },
		pageable: {
			refresh:false
			, pageSizes:[ 15, 20, 30, 50, 100 ]
			, buttonCount:10
			, pageSize : 15
		},
		toolbar: [
	        { template: '<button type="button" id="exportExcel_daily" class="k-grid-excel k-button k-button-icontext vl-exportExcel" data-auth-chk="Y" data-auth-type="XLXDOWN" data-auth-id="OPST200T"><span class="k-icon k-i-excel"></span>엑셀 다운로드</button>' }
	    ],
	    excel: {
	        // fileName: "Statistics_"+ Utils.getNowDateTime() +".xlsx",
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
	    }
	};
	
	OPST200DataSource_daily = {
		transport: {
			read: function (OPST200_jsonStr) {
				$("#grid_OPST200_daily .k-grid-norecords").remove();
				Utils.ajaxCall(grid_OPST200_url, OPST200_jsonStr, OPST200_fnResult, OPST200T_ProgressBar(true));
			}
		}
		, schema: {
	        type: "json"
	    }
	};
	
	OPST200DataSource_monthly = {
		transport: {
			read: function (OPST200_jsonStr) {
				$("#grid_OPST200_monthly .k-grid-norecords").remove();
				Utils.ajaxCall(grid_OPST200_url, OPST200_jsonStr, OPST200_fnResult, OPST200T_ProgressBar(true));
			}
		}
		, schema: {
	        type: "json"
	    }
	};
	
	let OPST200Columns_daily = [
	  	  { field: "requestDate", title: "요청일자", type: "date", width: '5px', template: '#=requestDate == null ? "-" : kendo.toString(new Date(requestDate), "yyyy-MM-dd")#' }
		, { field: "systemIdx", title: "System", type: "int", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
		, { field: "systemName", title: "시스템명", type: "int", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
		, { field: "tenantPrefix", title: "Tenant", type: "string", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
		, { field: "tenantName", title: "테넌트명", type: "string", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
		, { field: "serviceType", title: "서비스 유형", type: "string", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
		, { field: "requestCnt", title: "요청 수", type: "int", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
		, { field: "successCnt", title: "성공 수", type: "int", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
		, { field: "failCnt", title: "실패 수", type: "int", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
		, { field: "smsCnt", title: "SMS 처리 수", type: "int", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
		, { field: "popupCnt", title: "팝업 처리 수", type: "int", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
	];
	
	let OPST200Columns_monthly = [
	  	  { field: "requestDate", title: "요청 월", type: "date", width: '5px', template: '#=requestDate == null ? "-" : kendo.toString(new Date(requestDate), "yyyy-MM")#' }
	  	, { field: "systemIdx", title: "System", type: "int", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
		, { field: "systemName", title: "시스템명", type: "int", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
		, { field: "tenantPrefix", title: "Tenant", type: "string", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
		, { field: "tenantName", title: "테넌트명", type: "string", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
		, { field: "serviceType", title: "서비스 유형", type: "string", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
		, { field: "requestCnt", title: "요청 수", type: "int", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
		, { field: "successCnt", title: "성공 수", type: "int", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
		, { field: "failCnt", title: "실패 수", type: "int", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
		, { field: "smsCnt", title: "SMS 처리 수", type: "int", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
		, { field: "popupCnt", title: "팝업 처리 수", type: "int", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
	];
	
	OPST200_grid_daily = $("#grid_OPST200_daily").kendoGrid(grid_OPST200_options);
	OPST200_grid_monthly = $("#grid_OPST200_monthly").kendoGrid(grid_OPST200_options);
	
	OPST200_grid_daily.dataSource = OPST200DataSource_daily;
	OPST200_grid_monthly.dataSource = OPST200DataSource_monthly;

    OPST200_gridData_daily = $("#grid_OPST200_daily").data("kendoGrid");
    OPST200_gridData_monthly = $("#grid_OPST200_monthly").data("kendoGrid");
    
    OPST200_gridData_daily.setOptions({
    	columns: OPST200Columns_daily,
    	excel: { fileName: "Statistics_daily_"+ Utils.getNowDateTime() +".xlsx" }
    });
	OPST200_gridData_monthly.setOptions({
		columns: OPST200Columns_monthly,
		excel: { fileName: "Statistics_monthly_"+ Utils.getNowDateTime() +".xlsx" }
	});
}

//grid 조회
function OPST200_fnSearch() {

	let OPST200_data = {
		systemIdx: $("#OPST200_systemIdx").val() * 1,
		tenantPrefix: OPST200_dropDownData_SYSM200.selectedIndex == 0 ? null : $("#OPST200_tenantPrefix").val(),
		startDate: $("#OPST200T_dateStart").val(),
		endDate: $("#OPST200T_dateEnd").val(),
		serviceType: document.getElementById("OPST200_serviceName").value
	};

	if(selectedTab == "daily") {

		OPST200_data.searchType = "DY";
		let OPST200_jsonStr = JSON.stringify(OPST200_data);
		
		OPST200DataSource_daily.transport.read(OPST200_jsonStr);
	}else{

		OPST200_data.searchType = "MN";
		let OPST200_jsonStr = JSON.stringify(OPST200_data);

		OPST200DataSource_monthly.transport.read(OPST200_jsonStr);
	}
}

// grid 조회 결과
function OPST200_fnResult(data){
	
	if(selectedTab == "daily") {

		if(data.OPST200Info != "[]"){
			let OPST200_jsonEncode = JSON.stringify(data.OPST200Info);
			let OPST200_obj = JSON.parse(OPST200_jsonEncode);
			let OPST200_jsonDecode = JSON.parse(OPST200_obj);

			OPST200_gridData_daily.dataSource.data(OPST200_jsonDecode);
		}
		else{
			OPST200_gridData_daily.dataSource.data([]);
		}
	}else if(selectedTab == "monthly") {
		

		if(data.OPST200Info != "[]"){
			let OPST200_jsonEncode = JSON.stringify(data.OPST200Info);
			let OPST200_obj = JSON.parse(OPST200_jsonEncode);
			let OPST200_jsonDecode = JSON.parse(OPST200_obj);

			OPST200_gridData_monthly.dataSource.data(OPST200_jsonDecode);
		}else{
			OPST200_gridData_monthly.dataSource.data([]);
		}
	}
	OPST200T_ProgressBar(false);
}

//엑셀 다운로드
function OPST200_fnDownloadExcel() {
    OPST200_gridData_daily.saveAsExcel();
}

OPST200T_ProgressBar = (param) => window.kendo.ui.progress($("#grid_OPST200_daily"), param);

OPST200T_userGrd = () => (GLOBAL.session.user.usrGrd == '00') ? true : false;

OPST200T_TenantPrefixSrch = (e) => {
	Utils.ajaxCall("/opst/OPST200SEL03", JSON.stringify(e), function(response) {
		console.log(response);
		if(response && response.SYSM200Info && Array.isArray(JSON.parse(response.SYSM200Info))) {
			let newData = JSON.parse(response.SYSM200Info).map(function(item) {
				return { prefixAndName: item.prefixAndName, tenantPrefix: item.tenantPrefix };
			});

			if(OPST200T_userGrd()) {
				newData.unshift({ prefixAndName: "전체", tenantPrefix: "" });
				OPST200_dropDownData_SYSM200.enable(true);
			}else{
				OPST200_dropDownData_SYSM200.enable(false);
			}
			OPST200_dropDownData_SYSM200.setDataSource(newData);
			OPST200_dropDownData_SYSM200.select(0);
		}
	});
}