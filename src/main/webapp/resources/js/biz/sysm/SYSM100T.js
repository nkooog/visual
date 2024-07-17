/*******************************************************************************
 * Program Name : SYSM100T.jsp Creator : dwson Create Date : 2024.01.26
 * Description : 시스템 관리 SystemIdx ASC :
 * -----------------------------------------------------------------------------------------------
 * Date | Updater | Remark
 * -----------------------------------------------------------------------------------------------
 * 2024.01.26 dwson 최초생성
 ******************************************************************************/

var SYSM100_grid;
var SYSM100DataSource;
var SYSM100_gridData;
var SYSM200_dropDownData_isEnabled;

$(document).ready(function () {
	
	$("#SYSM100T_title").text($(".k-tabstrip-items .k-state-active .k-link").eq(0).text());
	
	SYSM100_fnInitDropDownList();
	
	SYSM100_fnKeyup();
    
    SYSM100_fnInitGrid();

    SYSM100_fnSearch();
    
    SYSM100_fnInitEditForm();
    
});

$(window).resize(function() {
	$("#SYSM100_editFormArea").data("kendoWindow").center();
});

function SYSM100_fnInitDropDownList() {
	var dataSource = new kendo.data.DataSource({
		data: [
			{ Value: "", Text: "전체"},
			{ Value: 1, Text: "사용"},
			{ Value: 0, Text: "미사용"}
		],
//		sort: { field: "Text", dir: "ASC" }
	});
	
	SYSM100_dropDownData_isEnabled = $("#SYSM100_isEnabled").kendoDropDownList({
		dataTextField: "Text",
		dataValueField: "Value",
		dataSource: dataSource
	}).data("kendoDropDownList");
}

function SYSM100_fnInitGrid() {
	let grid_SYSM100_url = "/sysm/SYSM100SEL01";
	SYSM100DataSource ={
		transport: {
			read: function (SYSM100_jsonStr) {
				$("#grid_SYSM100 .k-grid-norecords").remove();
				Utils.ajaxCall(grid_SYSM100_url, SYSM100_jsonStr, SYSM100_fnResult, window.kendo.ui.progress($("#grid_SYSM100"), true));
			}
		}
		, schema: {
	        type: "json"
	    }
	};

	SYSM100_grid = $("#grid_SYSM100").kendoGrid({
		dataSource : SYSM100DataSource, 
		autoBind: false,
		sortable: true,
		resizable: true,
		selectable: true,
		scrollable: true,
		selectable: "row",
		height: 514,
		change: function(e) {
	        let selectedRows = this.select();
	        if (selectedRows.length > 0) {
	        	let dataItem = this.dataItem(selectedRows[0]);
	            SYSM100_fnOpenEditForm(dataItem);
	        }
	    },
		noRecords: { template: `<div class="nodataMsg"><p>해당 목록이 없습니다.</p></div>` },
		pageable: {
			refresh:false
			, pageSizes:[ 15, 20, 30, 50, 100 ]
			, buttonCount:10
			, pageSize : 15
		},
		dataBound: SYSM100_onDataBound,
	    excel: {
	        fileName: "SystemInfo_"+ Utils.getNowDateTime() +".xlsx",
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
			, { field: "systemIdx", title: "시스템 ID", type: "string", width: '5px' }
			, { field: "systemName", title: "시스템명", type: "string", width: '12px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
			, { field: "description", title: "비고", type: "string", width: '15px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
			, { field: "isEnabled", title: "상태", type: "int", width: '8px', attributes : { style : "text-align : center;" }, 
				template: function (dataItem) {
		        	return '<span class="swithCheck"><input type="checkbox" ' + (dataItem.isEnabled == "1" ? 'checked' : '') + ' disabled/><label></label></span>';
		      }
			}
		],
	});

    SYSM100_gridData = $("#grid_SYSM100").data("kendoGrid");
    
	// 엑셀 다운로드 이벤트
	$("#SYSM100_btnExcel").off().on("click", function() {
		SYSM100_fnDownloadExcel();
	});
}

function SYSM100_fnInitEditForm() {
	$("#SYSM100_editFormArea").kendoWindow({
        width: $(window).width() > 550 ? "500" : "250",
        title: "시스템관리",
        visible: false,
        actions: ["Close"],
        modal: true
    });

	// 유효성 검사
	$("#SYSM100_editForm").kendoValidator(function(e) {
	    if (!$(this).data("kendoValidator").validate()) {
	        e.preventDefault();
	    }
	});
	
	// 추가 버튼 이벤트
	$("#SYSM100_btnNew").off().on("click", function() {
		SYSM100_fnOpenEditForm();
	});
	
	// 저장(등록,수정) 버튼 이벤트
	$("#SYSM100_editForm_btnSave").off().on("click", function() {
		SYSM100_fnSaveEditForm();
	});
}

function SYSM100_fnOpenEditForm(item) {
	if(item) {
		// 수정
		$('#SYSM100_editForm [name="systemIdx"]').val(item.systemIdx);
		$('#SYSM100_editForm [name="systemName"]').val(item.systemName);
		$('#SYSM100_editForm [name="description"]').val(item.description);
		$('#SYSM100_editForm [name="isEnabled"]').val(item.isEnabled).trigger('change');
	}
	else {
		// 신규등록
		$('#SYSM100_editForm [name="systemIdx"]').val('0');
		$('#SYSM100_editForm [name="systemName"]').val('');
		$('#SYSM100_editForm [name="description"]').val('');
		$('#SYSM100_editForm [name="isEnabled"]').val('1').trigger('change');
	}

	$("#SYSM100_editForm").find('.k-form-error').hide();
	$("#SYSM100_editFormArea").data("kendoWindow").center().open();
}

function SYSM100_fnSaveEditForm(item) {
	
	let saveType, msg;
	
	if($('#SYSM100_editForm [name="systemIdx"]').val().trim() == '' || $('#SYSM100_editForm [name="systemIdx"]').val().trim() == '0') {
		saveType = "INS";
		msg = "등록";
	}
	else {
		saveType = 'UPT';
		msg = "수정";
	}
	
	let validator = $("#SYSM100_editForm").data("kendoValidator");
	
	$("#SYSM100_editForm input").each(function() {
        $(this).val($(this).val().trim());
    });
	
	if (validator.validate()) {
		Utils.confirm(msg+"하시겠습니까?", function () {			
	    	let formData = new FormData($("#SYSM100_editForm")[0]);
	    	Utils.ajaxCall("/sysm/SYSM100"+saveType+"01", JSON.stringify(Utils.formDataToJson(formData)), function(result) {
	    		if(result.result == 1) {
	    			$('#SYSM100_editFormArea').data('kendoWindow').close();
	    			SYSM100_fnSearch();
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
function SYSM100_fnSearch() {

	let SYSM100_data = {
		systemName: $("#SYSM100_systemName").val(),
		isEnabled: $("#SYSM100_isEnabled").val() || null
	};
	let SYSM100_jsonStr = JSON.stringify(SYSM100_data);

	SYSM100DataSource.transport.read(SYSM100_jsonStr);
}

// grid 조회 결과
function SYSM100_fnResult(data){

	window.kendo.ui.progress($("#grid_SYSM100"), false);

	SYSM100_gridData.dataSource.data([]);

	if(data.SYSM100Info != "[]")
	{
		let SYSM100_jsonEncode = JSON.stringify(data.SYSM100Info);
		let SYSM100_obj = JSON.parse(SYSM100_jsonEncode);
		let SYSM100_jsonDecode = JSON.parse(SYSM100_obj);

		SYSM100_gridData.dataSource.data(SYSM100_jsonDecode);
//		SYSM100_gridData.dataSource.options.schema.data = SYSM100_jsonDecode;
	}
}

function SYSM100_onDataBound(SYSM100_e)
{
	var rows = this.tbody.children();
	var totalRows = rows.length; // 그리드의 전체 행 개수

	// 페이지 당 시작 인덱스 계산
	var startIndex = (SYSM100_gridData.dataSource.page() - 1) * SYSM100_gridData.dataSource.pageSize() + 1;

	for (var i = 0; i < totalRows; i++) {
	    let row = $(rows[i]);
	    // 순서대로 번호 매기기
	    let index = i + startIndex; // 현재 페이지의 첫 번째 행에 대한 올바른 인덱스 계산
	    row.children().eq(0).text(index);
	}
}

// 엔터 검색
function SYSM100_fnKeyup()
{
	$('input[type="search"]').on("keyup", function (e) {
        if (e.keyCode == 13) {
            SYSM100_fnSearch();
        }
    });
}

//엑셀 다운로드
function SYSM100_fnDownloadExcel() {
    SYSM100_gridData.saveAsExcel();
}
