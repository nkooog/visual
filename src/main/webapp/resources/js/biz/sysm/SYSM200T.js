/*******************************************************************************
 * Program Name : SYSM200T.jsp Creator : dwson Create Date : 2024.02.05
 * Description : 테넌트 관리 SystemIdx ASC :
 * -----------------------------------------------------------------------------------------------
 * Date | Updater | Remark
 * -----------------------------------------------------------------------------------------------
 * 2024.02.05 dwson 최초생성
 ******************************************************************************/

var SYSM200_grid;
var SYSM200DataSource;
var SYSM200_gridData;
var SYSM200_dropDownData_SYSM100, SYSM200_dropDownData_isEnabled;

var saveType;

$(document).ready(function () {	
	
	$("#SYSM200T_title").text($(".k-tabstrip-items .k-state-active .k-link").eq(0).text());
	
	SYSM200_fnInitDropDownList();
	
	SYSM200_fnKeyup();
    
    SYSM200_fnInitGrid();

//    setTimeout(function () {
    	SYSM200_fnSearch();
//	}, 100);
    
    SYSM200_fnInitEditForm();
    
});

$(window).resize(function() {
	$("#SYSM200_editFormArea").data("kendoWindow").center();
});

function SYSM200_fnInitDropDownList() {
	let SYSM100_paramData = {
		sort: [
        	{
            	column: "SystemName",
            	direction: "ASC"
            }
        ],
		isEnabled: "1"
	};
	
	SYSM200_dropDownData_SYSM100 = $("#SYSM200_systemIdx").kendoDropDownList({
        dataTextField: "systemName",
        dataValueField: "systemIdx",
        dataSource: {
            transport: {
            	read: function (options) {
    				Utils.ajaxCall("/sysm/SYSM100SEL01", JSON.stringify(SYSM100_paramData), function(response) {
    					options.success(JSON.parse(response.SYSM100Info));
    				});
    			}
            },
		    schema: {
		        parse: function(response) {
		            response.unshift({ systemName: "전체", systemIdx: "" });
		            return response;
		        }
		    }
        }
    }).data("kendoDropDownList");
	
	var dataSource = new kendo.data.DataSource({
		data: [
			{ Value: "", Text: "전체"},
			{ Value: 1, Text: "사용"},
			{ Value: 0, Text: "미사용"}
		],
//		sort: { field: "Text", dir: "ASC" }
	});
	
	SYSM200_dropDownData_isEnabled = $("#SYSM200_isEnabled").kendoDropDownList({
		dataTextField: "Text",
		dataValueField: "Value",
		dataSource: dataSource
	}).data("kendoDropDownList");
}

function SYSM200_fnInitGrid() {
	let grid_SYSM200_url = "/sysm/SYSM200SEL01";
	SYSM200DataSource ={
		transport: {
			read: function (SYSM200_jsonStr) {
				$("#grid_SYSM200 .k-grid-norecords").remove();
				Utils.ajaxCall(grid_SYSM200_url, SYSM200_jsonStr, SYSM200_fnResult, window.kendo.ui.progress($("#grid_SYSM200"), true));
			}
		}
		, schema: {
	        type: "json"
	    }
	};

	SYSM200_grid = $("#grid_SYSM200").kendoGrid({
		dataSource : SYSM200DataSource, 
		autoBind: false,
		sortable: true,
		resizable: true,
		selectable: true,
		scrollable: true,
		selectable: "row",
		change: function(e) {
	        let selectedRows = this.select();
	        if (selectedRows.length > 0) {
	        	let dataItem = this.dataItem(selectedRows[0]);
	            SYSM200_fnOpenEditForm(dataItem);
	        }
	    },
		noRecords: { template: `<div class="nodataMsg"><p>해당 목록이 없습니다.</p></div>` },
		pageable: {
			refresh:false
			, pageSizes:[ 25, 50, 75, 100, 200 ]
			, buttonCount:10
			, pageSize : 25
		},
		dataBound: SYSM200_onDataBound,
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
			  { title: "", type: "int", width: '5px' /* ,hidden: true */ }
			, { field: "systemIdx", title: "시스템 ID", type: "int", width: '5px' /* ,hidden: true */ }
			, { field: "systemName", title: "시스템", type: "string", width: '12px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
//			, { field: "tenantGroupId", title: "테넌트 그룹", type: "string", width: '12px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
			, { field: "tenantPrefix", title: "테넌트 ID", type: "string", width: '12px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
			, { field: "tenantName", title: "테넌트명", type: "string", width: '12px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
			, { field: "description", title: "비고", type: "string", width: '15px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
			, { field: "isEnabled", title: "상태", type: "int", width: '8px', attributes : { style : "text-align : center;" },
				template: function (dataItem) {
	        	return '<span class="swithCheck"><input type="checkbox" ' + (dataItem.isEnabled == "1" ? 'checked' : '') + ' disabled/><label></label></span>';
	          }
			}
		],
	});

    SYSM200_gridData = $("#grid_SYSM200").data("kendoGrid");
    
    let SYSM200_screenHeight = $(window).height();
	SYSM200_gridData.element.find('.k-grid-content').css('height',  SYSM200_screenHeight-500);
	$(window).on("resize", function () { SYSM200_gridData.element.find('.k-grid-content').css('height',  SYSM200_screenHeight-500);});
    
	// 엑셀 다운로드 이벤트
	$("#SYSM200_btnExcel").off().on("click", function() {
		SYSM200_fnDownloadExcel();
	});
}

function SYSM200_fnInitEditForm() {
	$("#SYSM200_editFormArea").kendoWindow({
        width: $(window).width() > 550 ? "500" : "250",
        title: "테넌트관리",
        visible: false,
        actions: ["Close"],
        modal: true
    });

	// 유효성 검사
	$("#SYSM200_editForm").kendoValidator(function(e) {
	    if (!$(this).data("kendoValidator").validate()) {
	        e.preventDefault();
	    }
	});
	
	// 추가 버튼 이벤트
	$("#SYSM200_btnNew").off().on("click", function() {
		SYSM200_fnOpenEditForm();
	});
	
	// 저장(등록,수정) 버튼 이벤트
	$("#SYSM200_editForm_btnSave").off().on("click", function() {
		SYSM200_fnSaveEditForm();
	});
	
	// TenantPrefix 대문자로 자동변환
//	$('#SYSM200_editForm [name="tenantPrefix"]').on('input', function() {
//	    $(this).val($(this).val().toUpperCase());
//	});
}

function SYSM200_fnOpenEditForm(item) {
	$('#SYSM200_editForm select').children('option').prop("disabled", false);
	if(item) {
		// 수정
		saveType = "UPT";
		$('#SYSM200_editForm [name="systemIdx"]').val(item.systemIdx).trigger('change').children('option').not(":selected").prop("disabled", true);
		$('#SYSM200_editForm [name="tenantGroupId"]').val(item.tenantGroupId).trigger('change');
		$('#SYSM200_editForm [name="tenantPrefix"]').val(item.tenantPrefix).prop('readonly', true);
		$('#SYSM200_editForm [name="tenantName"]').val(item.tenantName);
		$('#SYSM200_editForm [name="description"]').val(item.description);
		$('#SYSM200_editForm [name="isEnabled"]').val(item.isEnabled).trigger('change');
	}
	else {
		// 신규등록
		saveType = "INS";
		$('#SYSM200_editForm [name="systemIdx"]').val('').trigger('change');
		$('#SYSM200_editForm [name="tenantGroupId"]').val('').trigger('change');
		$('#SYSM200_editForm [name="tenantPrefix"]').val('').prop('readonly', false);
		$('#SYSM200_editForm [name="tenantName"]').val('');
		$('#SYSM200_editForm [name="description"]').val('');
		$('#SYSM200_editForm [name="isEnabled"]').val('1').trigger('change');
	}

	$("#SYSM200_editForm").find('.k-form-error').hide();
	$("#SYSM200_editFormArea").data("kendoWindow").center().open();
}

function SYSM200_fnSaveEditForm(item) {
	
	let msg;
	
	if(saveType == "INS") {
		msg = "등록";
	}
	else if(saveType == "UPT") {
		msg = "수정";
	}
	else {
		return false;
	}
	
	let validator = $("#SYSM200_editForm").data("kendoValidator");
	
	$("#SYSM200_editForm input").each(function() {
        $(this).val($(this).val().trim());
    });
	
	if (validator.validate()) {
		Utils.confirm(msg+"하시겠습니까?", function () {			
	    	let formData = new FormData($("#SYSM200_editForm")[0]);
	    	Utils.ajaxCall("/sysm/SYSM200"+saveType+"01", JSON.stringify(Utils.formDataToJson(formData)), function(result) {
	    		if(result.result > 0) {
	    			$('#SYSM200_editFormArea').data('kendoWindow').close();
	    			SYSM200_fnSearch();
	    			Utils.alert(msg+"되었습니다.");
	    		} else {
	    			Utils.alert(result.msg);
	    		}
	    	});
		});
	} else {
        Utils.alert("입력된 데이터가 유효하지 않습니다.");
    }
}

// grid 조회
function SYSM200_fnSearch() {

	let SYSM200_data = {
		systemIdx: $("#SYSM200_systemIdx").val() || null,
		keyword: $("#SYSM200_keyword").val(),
		isEnabled: $("#SYSM200_isEnabled").val() || null,
		sort: [
        	{
            	column: "SystemName",
            	direction: "ASC"
            },
            {
            	column: "TenantPrefix",
            	direction: "ASC"
            }
        ],
	};
	let SYSM200_jsonStr = JSON.stringify(SYSM200_data);

	SYSM200DataSource.transport.read(SYSM200_jsonStr);
}

// grid 조회 결과
function SYSM200_fnResult(data){

	window.kendo.ui.progress($("#grid_SYSM200"), false);
	
	SYSM200_gridData.dataSource.data([]);

	if(data.SYSM200Info != "[]")
	{
		let SYSM200_jsonEncode = JSON.stringify(data.SYSM200Info);
		let SYSM200_obj = JSON.parse(SYSM200_jsonEncode);
		let SYSM200_jsonDecode = JSON.parse(SYSM200_obj);

		SYSM200_gridData.dataSource.data(SYSM200_jsonDecode);
	}
}

function SYSM200_onDataBound(SYSM200_e)
{
	var rows = this.tbody.children();
	var totalRows = rows.length; // 그리드의 전체 행 개수

	// 페이지 당 시작 인덱스 계산
	var startIndex = (SYSM200_gridData.dataSource.page() - 1) * SYSM200_gridData.dataSource.pageSize() + 1;

	for (var i = 0; i < totalRows; i++) {
	    let row = $(rows[i]);
	    // 순서대로 번호 매기기
	    let index = i + startIndex; // 현재 페이지의 첫 번째 행에 대한 올바른 인덱스 계산
	    row.children().eq(0).text(index);
	}
}

// 엔터 검색
function SYSM200_fnKeyup()
{
	$('input[type="search"]').on("keyup", function (e) {
        if (e.keyCode == 13) {
            SYSM200_fnSearch();
        }
    });
}

//엑셀 다운로드
function SYSM200_fnDownloadExcel() {
    SYSM200_gridData.saveAsExcel();
}
