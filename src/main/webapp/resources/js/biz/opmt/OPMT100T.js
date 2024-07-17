/*******************************************************************************
 * Program Name : OPMT100T.jsp Creator : dwson Create Date : 2024.02.05
 * Description : 테넌트 관리 SystemIdx ASC :
 * -----------------------------------------------------------------------------------------------
 * Date | Updater | Remark
 * -----------------------------------------------------------------------------------------------
 * 2024.02.05 dwson 최초생성
 ******************************************************************************/

var OPMT100T_comCdList;
var OPMT100_grid;
var OPMT100DataSource;
var OPMT100_gridData;
var OPMT100_dropDownData_SYSM100, OPMT100_dropDownData_isEnabled;
var OPMT100_userInfo = GLOBAL.session.user;

var saveType;

$(document).ready(function () {	
	
	$("#OPMT100T_title").text($(".k-tabstrip-items .k-state-active .k-link").eq(0).text());
	
	OPST100_fnInitComCd();
	
	OPST100_fnInitDropDownList();
	
	OPMT100_fnKeyup();
    
    OPMT100_fnInitGrid();

	OPMT100_fnSearch();
    
    OPMT100_fnInitEditForm();
});

$(window).resize(function() {
	$("#OPMT100_editFormArea").data("kendoWindow").center();
});

function OPST100_fnInitComCd() {
	let param = {"codeList": [{"CATEGORY": "MANAGERLVL"},{"CATEGORY": "USERAUTHORITY"}]};
	
	Utils.ajaxCall("/comm/COMM100SEL01", JSON.stringify(param), function (result) {
        OPMT100T_comCdList = JSON.parse(result.codeList);
        
        // editForm -> select option 내 반영
        let usrGrdList = OPMT100T_comCdList.filter(function (code) {
            return code.category == "USERAUTHORITY" && code.code >= GLOBAL.session.user.usrGrd
        });
        
        $.each(usrGrdList, function(index, item) {
    		$('#OPMT100_editForm [name="usrGrd"]').append($('<option>', {
                value: item.code,
                text: item.codeName
            }));
        });
    });
}

function OPST100_fnInitDropDownList() {
	let SYSM100_paramData = {
		sort: [
        	{
            	column: "SystemName",
            	direction: "ASC"
            }
        ]
	};
	
	OPMT100_dropDownData_SYSM100 = $("#OPMT100_systemIdx").kendoDropDownList({
        dataTextField: "systemName",
        dataValueField: "systemIdx",
        dataSource: {
            transport: {
            	read: function (options) {
    				Utils.ajaxCall("/opmt/OPMT100SEL03", JSON.stringify(SYSM100_paramData), function(response) {
    					options.success(JSON.parse(response.SYSM100Info));

    					if(OPMT100_userInfo.usrGrd != "00" && OPMT100_userInfo.tenantPrefix != "SYS")
    					{
	    					setTimeout(function() {
	    						$("#OPMT100_systemIdx").data("kendoDropDownList").select(1);
	    						$("#OPMT100_systemIdx").data("kendoDropDownList").enable(false);
	    						
	    						let SYSM200_paramData = {
    			                    "systemIdx": OPMT100_userInfo.systemIdx,
    			                    "sort": [
    				                    {
    				                    	"column": "TenantPrefix",
    				                    	"direction": "ASC"
    				                    }
    			                    ]
    			                };
    			                Utils.ajaxCall("/opmt/OPMT100SEL04", JSON.stringify(SYSM200_paramData), function(response) {
    			                    if(response && response.SYSM200Info && Array.isArray(JSON.parse(response.SYSM200Info))) {
    			                        let newData = JSON.parse(response.SYSM200Info).map(function(item) {
    			                            return { prefixAndName: item.prefixAndName, tenantPrefix: item.tenantPrefix };
    			                        });

//    			                        newData.unshift({ prefixAndName: "전체", tenantPrefix: "" });
    			                        OPMT100_dropDownData_SYSM200.setDataSource(newData);
    			                        OPMT100_dropDownData_SYSM200.select(0);
    			                        OPMT100_dropDownData_SYSM200.enable(false);
    			                    } 
    			                });
	    					}, 100);
    					}
    				});
    			}
            },
		    schema: {
		        parse: function(response) {
		            response.unshift({ systemName: "전체", systemIdx: "" });
		            return response;
		        }
		    }
        },
        change: function() {
        	OPMT100_dropDownData_SYSM200.enable(false);
            let value = this.value();
            if (value) {
                let SYSM200_paramData = {
                    "systemIdx": value,
                    "sort": [
	                    {
	                    	"column": "TenantPrefix",
	                    	"direction": "ASC"
	                    }
                    ]
                };
                Utils.ajaxCall("/opmt/OPMT100SEL04", JSON.stringify(SYSM200_paramData), function(response) {
                    if(response && response.SYSM200Info && Array.isArray(JSON.parse(response.SYSM200Info))) {
                        let newData = JSON.parse(response.SYSM200Info).map(function(item) {
                            return { prefixAndName: item.prefixAndName, tenantPrefix: item.tenantPrefix };
                        });

                        newData.unshift({ prefixAndName: "전체", tenantPrefix: "" });
                        OPMT100_dropDownData_SYSM200.setDataSource(newData);
                        OPMT100_dropDownData_SYSM200.enable(true);
                    } 
                });
            } else {
                $("#OPMT100_tenantPrefix").data("kendoDropDownList").setDataSource([{ prefixAndName: "전체", tenantPrefix: "" }]);
            }
            OPMT100_dropDownData_SYSM200.select(0);
        }
    }).data("kendoDropDownList");
	
    OPMT100_dropDownData_SYSM200 = $("#OPMT100_tenantPrefix").kendoDropDownList({
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
    OPMT100_dropDownData_SYSM200.enable(false);
	
	var dataSource = new kendo.data.DataSource({
		data: [
			{ Value: "", Text: "전체"},
			{ Value: 1, Text: "사용"},
			{ Value: 0, Text: "미사용"}
		],
//		sort: { field: "Text", dir: "ASC" }
});
	
	OPMT100_dropDownData_isEnabled = $("#OPMT100_useYn").kendoDropDownList({
		dataTextField: "Text",
		dataValueField: "Value",
		dataSource: dataSource
	}).data("kendoDropDownList");
}

function OPMT100_fnInitGrid() {
	let grid_OPMT100_url = "/opmt/OPMT100SEL01";
	OPMT100DataSource ={
		transport: {
			read: function (OPMT100_jsonStr) {
				$("#grid_OPMT100 .k-grid-norecords").remove();
				Utils.ajaxCall(grid_OPMT100_url, OPMT100_jsonStr, OPMT100_fnResult, window.kendo.ui.progress($("#grid_OPMT100"), true));
			}
		}
		, schema: {
	        type: "json"
	    }
	};

	OPMT100_grid = $("#grid_OPMT100").kendoGrid({
		dataSource : OPMT100DataSource, 
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
	            OPMT100_fnOpenEditForm(dataItem);
	        }
	    },
		noRecords: { template: `<div class="nodataMsg"><p>해당 목록이 없습니다.</p></div>` },
		pageable: {
			refresh:false
			, pageSizes:[ 15, 20, 30, 50, 100 ]
			, buttonCount:10
			, pageSize : 15
		},
		dataBound: OPMT100_onDataBound,
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
			, { field: "agentId", title: "사용자ID", type: "string", width: '10px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
			, { field: "name", title: "사용자명", type: "string", width: '10px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
			, { field: "usrGrd", title: "권한", type: "string", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" }
				, template: function (dataItem) {
	                return Utils.getComCdNm(OPMT100T_comCdList, 'USERAUTHORITY', dataItem.usrGrd);
	            }
			  }
//			, { field: "usrLvl", title: "권한레벨", type: "string", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" }
//				, template: function (dataItem) {
//	                return Utils.getComCdNm(OPMT100T_comCdList, 'MANAGERLVL', dataItem.usrLvl);
//	            }
//			  }
			, { field: "systemName", title: "시스템", type: "string", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
			, { field: "tenantPrefix", title: "테넌트", type: "string", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
			, { field: "useYn", title: "상태", type: "int", width: '5px', attributes : { style : "text-align : center;" }, 
				template: function (dataItem) {
		        	return '<span class="swithCheck"><input type="checkbox" ' + (dataItem.useYn == "1" ? 'checked' : '') + ' disabled/><label></label></span>';
		        }
			  }
			, { field: "regDate", title: "등록일시", type: "date", width: '10px', template: '#=regDate == null ? "-" : kendo.toString(new Date(regDate), "yyyy-MM-dd HH:mm:ss")#' }
			, { field: "regUsr", title: "등록자", type: "string", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
			, { field: "modDate", title: "수정일시", type: "date", width: '10px', template: '#=modDate == null ? "-" : kendo.toString(new Date(modDate), "yyyy-MM-dd HH:mm:ss")#' }
			, { field: "modUsr", title: "수정자", type: "string", width: '5px', attributes : { style : "text-align : center;", class: "tdTooltip" } }
		],
	});

    OPMT100_gridData = $("#grid_OPMT100").data("kendoGrid");
    
	// 엑셀 다운로드 이벤트
	$("#OPMT100_btnExcel").off().on("click", function() {
		OPMT100_fnDownloadExcel();
	});
}

function OPMT100_fnInitEditForm() {
	$("#OPMT100_editFormArea").kendoWindow({
        width: $(window).width() > 550 ? "500" : "250",
        title: "사용자관리",
        visible: false,
        actions: ["Close"],
        modal: true
    });

	// 유효성 검사
	$("#OPMT100_editForm").kendoValidator(function(e) {
	    if (!$(this).data("kendoValidator").validate()) {
	        e.preventDefault();
	    }
	});
	
	// 추가 버튼 이벤트
	$("#OPMT100_btnNew").off().on("click", function() {
		OPMT100_fnOpenEditForm();
	});
	
	// 저장(등록,수정) 버튼 이벤트
	$("#OPMT100_editForm_btnSave").off().on("click", function() {
		OPMT100_fnSaveEditForm();
	});
	
	// 시스템 select change 이벤트
	$('#OPMT100_editForm [name="systemIdx"]').on('change', function() {
		$('#OPMT100_editForm [name="tenantPrefix"] option:not(:first)').remove();
	    if(this.value) {
	    	window.kendo.ui.progress($("#OPMT100_editForm"), true);
	    	let SYSM200_paramData = {
	    		systemIdx: this.value,
	    		sort: [
	            	{
	                	column: "TenantPrefix",
	                	direction: "ASC"
	                }
	            ]
	    	};
	    	Utils.ajaxCall("/opmt/OPMT100SEL04", JSON.stringify(SYSM200_paramData), function(response) {
	            if(response && response.SYSM200Info) {
	                JSON.parse(response.SYSM200Info).forEach(function(item) {
	                    $('#OPMT100_editForm [name="tenantPrefix"]').append($('<option>').val(item.tenantPrefix).text(item.prefixAndName));
	                });
	            }
	            window.kendo.ui.progress($("#OPMT100_editForm"), false);
	        });
	    }
	});
	
	// 권한 change 이벤트
	$('#OPMT100_editForm [name="usrGrd"]').on('change', function() {
	    if(this.value && this.value == "00") {
	    	$('#OPMT100_editForm [name="usrLvl"]').parent('label').show();
	    } else {
	    	$('#OPMT100_editForm [name="usrLvl"]').parent('label').hide();
	    }
	});
	
	// 시스템관리자가 아닌 경우
	if(GLOBAL.session.user.usrGrd != "00" && GLOBAL.session.user.tenantPrefix != "SYS") {
		$('#OPMT100_editForm [name="usrGrd"] option[value="00"]').remove();
		$('#OPMT100_editForm [name="usrLvl"]').parent('label').remove();
		
		$('#OPMT100_editForm [name="systemIdx"]').parent('label').remove();
		$('#OPMT100_editForm [name="tenantPrefix"]').parent('label').remove();
	}
	
	$('#OPMT100_editForm #btnNewPassword').on('click', function() {
		$('#OPMT100_editForm #btnNewPassword').hide();
		$('#OPMT100_editForm [name="password"]').show().prop('required', true).prev().show().parent().prop('required', true);
	});
}

function OPMT100_fnOpenEditForm(item) {	
	window.kendo.ui.progress($("#grid_OPMT100"), true);
	$('#OPMT100_editForm #OPMT100_editForm_btnSave').show();
	$('#OPMT100_editForm input, #OPMT100_editForm select').prop("disabled", false);
	$('#OPMT100_editForm select').children('option').prop("disabled", false);
	if(item) {
		if(!item.systemIdx) {
			Utils.alert("시스템 또는 테넌트가 유효하지 않습니다.");
			window.kendo.ui.progress($("#grid_OPMT100"), false);
			return;
		}
		// 수정
		saveType = "UPT";
		$('#OPMT100_editForm [name="password"]').val('').hide().prop('required', false).prev().hide().parent();
		$('#OPMT100_editForm #btnNewPassword').show();
		
		$('#OPMT100_editForm [name="agentId"]').val(item.agentId).prop('readonly', true);
		$('#OPMT100_editForm [name="name"]').val(item.name);
		$('#OPMT100_editForm [name="usrGrd"]').val(item.usrGrd).trigger('change');
		$('#OPMT100_editForm [name="systemIdx"]').val(item.systemIdx).trigger('change').prop('disabled', true);
		setTimeout(function(){ $('#OPMT100_editForm [name="tenantPrefix"]').val(item.tenantPrefix).trigger('change').prop('disabled', true) }, 1000);
		$('#OPMT100_editForm [name="useYn"]').val(item.useYn).trigger('change');
		
		if(GLOBAL.session.user.tenantPrefix == item.tenantPrefix && GLOBAL.session.user.agentId == item.agentId) {
			$('#OPMT100_editForm #btnNewPassword, #OPMT100_editForm #OPMT100_editForm_btnSave').hide();
			$('#OPMT100_editForm input, #OPMT100_editForm select').prop("disabled", true);
		}
	}
	else {
		// 신규등록
		saveType = "INS";
		$('#OPMT100_editForm #btnNewPassword').hide();
		$('#OPMT100_editForm [name="password"]').val('').show().prop('required', true).prev().show().parent().prop('required', true);
		
		$('#OPMT100_editForm [name="agentId"]').val('').prop('readonly', false);
		$('#OPMT100_editForm [name="name"]').val('');
		$('#OPMT100_editForm [name="usrGrd"]').val('').trigger('change');
		$('#OPMT100_editForm [name="systemIdx"]').val('').trigger('change').prop('disabled', false);
		$('#OPMT100_editForm [name="tenantPrefix"]').val('').trigger('change').prop('disabled', false);
		$('#OPMT100_editForm [name="useYn"]').val('1').trigger('change');
	}

	$("#OPMT100_editForm").find('.k-form-error').hide();
	
	setTimeout(function(){ window.kendo.ui.progress($("#grid_OPMT100"), false); $("#OPMT100_editFormArea").data("kendoWindow").center().open(); }, saveType == "UPT" ? 500 : 10);
}

function OPMT100_fnSaveEditForm(item) {
	
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
	
	let validator = $("#OPMT100_editForm").data("kendoValidator");
	
	$("#OPMT100_editForm input").each(function() {
        $(this).val($(this).val().trim());
    });
	
	if (validator.validate()) {
		Utils.confirm(msg+"하시겠습니까?", function () {			
			$('#OPMT100_editForm [name="tenantPrefix"]').prop('disabled', false);
			
			// 20240531 SystemIdx 추가
			$('#OPMT100_editForm [name="systemIdx"]').prop('disabled', false);
			
	    	let formData = new FormData($("#OPMT100_editForm")[0]);
	    	Utils.ajaxCall("/opmt/OPMT100"+saveType+"01", JSON.stringify(Utils.formDataToJson(formData)), function(result) {
	    		if(result.result == 1) {
	    			$('#OPMT100_editFormArea').data('kendoWindow').close();
	    			OPMT100_fnSearch();
	    			Utils.alert(msg+"되었습니다.");
	    		} else {
	    			$('#OPMT100_editForm [name="tenantPrefix"]').prop('disabled', true);
	    			
	    			// 20240531 SystemIdx 추가
	    			$('#OPMT100_editForm [name="systemIdx"]').prop('disabled', true);
	    			
	    			Utils.alert(result.msg);
	    		}
	    	});
		});
	} else {
        Utils.alert("입력된 데이터가 유효하지 않습니다.");
    }
}

// grid 조회
function OPMT100_fnSearch() {

	let OPMT100_data = {
		systemIdx: $("#OPMT100_systemIdx").val() || null,
		tenantPrefix: OPMT100_dropDownData_SYSM200.selectedIndex == 0 ? null : $("#OPMT100_tenantPrefix").val(),
		keyword: $("#OPMT100_keyword").val(),
		useYn: $("#OPMT100_useYn").val() || null
	};
	let OPMT100_jsonStr = JSON.stringify(OPMT100_data);

	OPMT100DataSource.transport.read(OPMT100_jsonStr);
}

// grid 조회 결과
function OPMT100_fnResult(data){

	window.kendo.ui.progress($("#grid_OPMT100"), false);

	if(data.OPMT100Info != "[]")
	{
		let OPMT100_jsonEncode = JSON.stringify(data.OPMT100Info);
		let OPMT100_obj = JSON.parse(OPMT100_jsonEncode);
		let OPMT100_jsonDecode = JSON.parse(OPMT100_obj);

		OPMT100_gridData.dataSource.data(OPMT100_jsonDecode);
	}
	else 
	{
		OPMT100_gridData.dataSource.data([]);
	    return;
	}
}

function OPMT100_onDataBound(OPMT100_e)
{
	var rows = this.tbody.children();
	var totalRows = rows.length; // 그리드의 전체 행 개수

	// 페이지 당 시작 인덱스 계산
	var startIndex = (OPMT100_gridData.dataSource.page() - 1) * OPMT100_gridData.dataSource.pageSize() + 1;

	for (var i = 0; i < totalRows; i++) {
	    let row = $(rows[i]);
	    // 순서대로 번호 매기기
	    let index = i + startIndex; // 현재 페이지의 첫 번째 행에 대한 올바른 인덱스 계산
	    row.children().eq(0).text(index);
	}
}

// 엔터 검색
function OPMT100_fnKeyup()
{
	$('input[type="search"]').on("keyup", function (e) {
        if (e.keyCode == 13) {
            OPMT100_fnSearch();
        }
    });
}

//엑셀 다운로드
function OPMT100_fnDownloadExcel() {
    OPMT100_gridData.saveAsExcel();
}
