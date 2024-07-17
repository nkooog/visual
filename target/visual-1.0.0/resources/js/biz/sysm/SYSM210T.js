1/***********************************************************************************************
 * Program Name : 태넌트 그룹 기본정보(SYSM210T.js)
 * Creator      : yhnam
 * Create Date  : 2024.02.05
 * Description  : 태넌트 그룹 기본정보
 * Modify Desc  : 
 * -----------------------------------------------------------------------------------------------
 * Date         | Updater        | Remark
 * -----------------------------------------------------------------------------------------------
 * 2024.02.05     yhnam            최초작성   
 ************************************************************************************************/
var SYSM210T_grdSYSM210T, SYSM210T1_grdSYSM210T, SYSM210T_userInfo, SYSM210T_selTenantId;

//공통코드
var SYSM210T_cmmCodeList, SYSM210T_mgntItemCdList;

$(document).ready(function () {

	$("#SYSM210T_title").text($(".k-tabstrip-items .k-state-active .k-link").eq(0).text());

	// 태넌트그룹목록정보 저장 
	$('#SYSM210T_btnSave').on('click', function () {
		SYSM210T_fnSavetenantGroup();
	});

	SYSM210T_fnSelectCombo();
});

function SYSM210T_fnSetInit()
{
	$("#SYSM210T_tenantGroupId_key").val("");
	$("#SYSM210T_tenantGroupId").val("");
	$("#SYSM210T_tenantGroupNm").val("");
	$("#SYSM210M_cobTenantgState").data("kendoComboBox").value("");
}

function SYSM210T_fnInfoOnSetting()
{
	$(".infoChg").off("propertychange keyup paste input").on("propertychange keyup paste input", function() {
		if(!$("#addBackground").length) SYSM210T_grdSYSM210T.select().attr('id', 'uptBackground');

		let index = $(".infoChg").index(this);
		let value = $(this).val();
		if(index == 2) return;
		else if(index == 4)
		{
			index = 2;
			value = $(this).data('kendoComboBox').text();
		}

		SYSM210T_grdSYSM210T.select().find(".k-text-left:eq("+index+")").text(value);
		SYSM210T_grdSYSM210T.select().find(".k-text-left:eq(4)").text(GLOBAL.session.user.originAgentId);
	});
	
	$("input[name='infoSelectChg']").off("change").on("change", function() {
		if(!$("#addBackground").length) SYSM210T_grdSYSM210T.select().attr('id', 'uptBackground');

		let index = $(".infoChg").index(this);
		let value = $(this).val();
		if(index == 2) return;
		else if(index == 4)
		{
			index = 2;
			value = $(this).data('kendoComboBox').text();
		}

		SYSM210T_grdSYSM210T.select().find(".k-text-left:eq("+index+")").text(value);
		SYSM210T_grdSYSM210T.select().find(".k-text-left:eq(4)").text(GLOBAL.session.user.originAgentId);
	});
}

//콤보값 조회
function SYSM210T_fnSelectCombo(){
	
	SYSM210T_mgntItemCdList = [
		{"CATEGORY":"USERAUTHORITY"},
		{"CATEGORY":"STATECODE"},
	];

	Utils.ajaxCall('/comm/COMM100SEL01',  JSON.stringify({ "codeList": SYSM210T_mgntItemCdList}), SYSM210T_fnsetCombo);
}

//콤보세팅
function SYSM210T_fnsetCombo(SYSM210T_data){

	let SYSM210T_jsonEncode = JSON.stringify(SYSM210T_data.codeList);
	let SYSM210T_object=JSON.parse(SYSM210T_jsonEncode);
	let SYSM210T_jsonDecode = JSON.parse(SYSM210T_object);

	SYSM210T_cmmCodeList = SYSM210T_jsonDecode;

	// 상태 코드
	Utils.setKendoComboBox(SYSM210T_cmmCodeList, "STATECODE", '#SYSM210M_cobTenantgState', "", "선택");
	
	SYSM210T_fnSetInit();

	SYSM210T_createGrid();
	SYSM210T1_createGrid();
} 

function SYSM210T_createGrid(){

	$("#grdSYSM210T").kendoGrid({
		dataSource:{
			transport: {
				read : function (options) {

					var param = {
							
					};

					$.extend(param, options.data);

					Utils.ajaxCall("/sysm/SYSM210SEL01", JSON.stringify(param), function (result) {

						let list = JSON.parse(result.SYSM210VOInfo);
						SYSM210T_grdSYSM210T.dataSource.data(list);

					    SYSM210T_fnResultTenantList();
					});
				}
			},
			schema : {
				type: "json",
				model: {
					fields: {
						select : {nullable: true},
						tenantGroupId		: { field: "tenantGroupId", type: "string" },
						tenantGroupNm		: { field: "tenantGroupNm", type: "string" },
						tenantGroupState	: { field: "tenantGroupState", type: "string" },
						lstCorcDtm			: { field: "lstCorcDtm", type: "string" },
						lstCorprId			: { field: "lstCorprId", type: "string" },
					}
				}
			}
        },
		autoBind: false,
		sortable: true,
		selectable: 'multiple',
		noRecords: { template: "조회 결과가 없습니다."},
		scrollable: true,
		dataBound: SYSM210T_onDataBound,
		excel: {
	        fileName: "테넌트그룹관리_"+ Utils.getNowDateTime() +".xlsx",
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
	            title: "선택",
	            width: 40,
	            template: '<mark class="singleSelect k-icon k-i-radiobutton"></mark>',
	        },
			{
			    field: "tenantGroupId",
			    title: "테넌트 그룹ID", // 테넌트 그룹ID
			    width: 120,
			    attributes: {"class": "k-text-left"}
			},
			{
			    field: "tenantGroupNm",
			    title: "테넌트 그룹명", // 테넌트 그룹명
			    width: 120,
			    attributes: {"class": "k-text-left"}
			},{
			    field: "tenantGroupState",
			    title: "테넌트 그룹 상태", // 테넌트 그룹 상태
			    width: 120,
			    attributes: {"class": "k-text-left"},
				template: function (dataItem) {
	                return Utils.getComCdNm(SYSM210T_cmmCodeList, 'STATECODE', dataItem.tenantGroupState);
	            }
//			    template: function (dataItem) {
//			    	console.log(dataItem.tenantGroupState);
//		        	return '<span class="swithCheck"><input type="checkbox" ' + (dataItem.tenantGroupState == "100" ? 'checked' : '') + ' disabled/><label></label></span>';
//		        }
			},{
			    field: "lstCorcDtm",
			    title: "최종수정일자", // 최종수정일자
			    width: 120,
			    attributes: {"class": "k-text-left"}
			},{
			    field: "lstCorprId",
			    title: "최종수정자ID", // 최종수정자ID
			    width: 120,
			    attributes: {"class": "k-text-left"}
			}
		]
	});

	SYSM210T_grdSYSM210T = $("#grdSYSM210T").data("kendoGrid");

	//그리드 높이 조절
	let SYSM210T_screenHeight = $(window).height();
	$('#SYSM210T_divisonCol').css('height', SYSM210T_screenHeight-290);
	SYSM210T_grdSYSM210T.element.find('.k-grid-content').css('height',  $('#SYSM210T_divisonCol').height()-150);

	// grid reSize
	$(window).on({
		'resize': function() {
			SYSM210T_grdSYSM210T.element.find('.k-grid-content').css('height',  $('#SYSM210T_divisonCol').height()-150);
		},
	});
	
	SYSM210T_fnSearchTenantList();
}

function SYSM210T1_createGrid(){

	$("#grdSYSM210T1").kendoGrid({
		dataSource:{
			transport: {
				read : function (options) {

					if(options.tenantGroupId)
					{
						var param = {
								tenantGroupId : options.tenantGroupId
						};

						Utils.ajaxCall("/sysm/SYSM210SEL02", JSON.stringify(param), function (result) {

							let list = JSON.parse(result.SYSM210VOInfo);
							SYSM210T1_grdSYSM210T.dataSource.data(list);
						});
					} else SYSM210T1_grdSYSM210T.dataSource.data("");
				}
			},
			schema : {
				type: "json",
				model: {
					fields: {
						tenantGroupId		: { field: "tenantGroupId", type: "string" },
						tenantPrefix		: { field: "tenantPrefix", type: "string" },
						lstCorcDtm			: { field: "lstCorcDtm", type: "string" },
						lstCorprId			: { field: "lstCorprId", type: "string" },
					}
				}
			}
        },
		autoBind: false,
		sortable: true,
		selectable: 'multiple',
		scrollable: true,
//		dataBound: SYSM210T_onDataBound,
		columns: [
			{
			    field: "tenantGroupId",
			    title: "테넌트 그룹ID", // 테넌트 그룹ID
			    width: 120,
			    attributes: {"class": "k-text-left"}
			},
			{
			    field: "tenantPrefix",
			    title: "테넌트ID", // 테넌트ID
			    width: 120,
			    attributes: {"class": "k-text-left"}
			}
			,{
			    field: "lstCorcDtm",
			    title: "최종수정일자", // 최종수정일자
			    width: 120,
			    attributes: {"class": "k-text-left"}
			}
			,{
			    field: "lstCorprId",
			    title: "최종수정자ID", // 최종수정자ID
			    width: 120,
			    attributes: {"class": "k-text-left"}
			}
		]
	});

	SYSM210T1_grdSYSM210T = $("#grdSYSM210T1").data("kendoGrid");

	//그리드 높이 조절
	let SYSM210T_screenHeight = $(window).height();
	$('#SYSM210T_divisonCol').css('height', SYSM210T_screenHeight-320);
	SYSM210T1_grdSYSM210T.element.find('.k-grid-content').css('height',  $('#SYSM210T_divisonCol').height()-260);

	// grid reSize
	$(window).on({
		'resize': function() {
			SYSM210T1_grdSYSM210T.element.find('.k-grid-content').css('height',  $('#SYSM210T_divisonCol').height()-260);
		},
	});
}

// 테넌트 그룹 row click
function SYSM210T_onDataBound(SYSM210T_e) {

	$("#grdSYSM210T").off("click").on('click','tbody tr[data-uid]',function (SYSM210T_e) {

		if($("#addBackground").index(this) == 0 || $("#uptBackground").index(this) == 0) return;
		else if($("#addBackground").length)
		{
			Utils.confirm("추가하신 정보를 저장하지 않으셨습니다.<br/>추가하신 정보를 정말로 저장 안하시겠습니까?", function () {SYSM210T_rowClick(SYSM210T_e); return;}
			, function () {SYSM210T_grdSYSM210T.clearSelection(); SYSM210T_grdSYSM210T.select($("#addBackground")); return;});
		}
		else if($("#uptBackground").length)
		{
			Utils.confirm("변경하신 정보를 저장하지 않으셨습니다.<br/>변경하신 정보를 정말로 저장 안하시겠습니까?", function () {SYSM210T_rowClick(SYSM210T_e); return;}
			, function () {SYSM210T_grdSYSM210T.clearSelection(); SYSM210T_grdSYSM210T.select($("#uptBackground")); return;});
		}
		else SYSM210T_rowClick(SYSM210T_e);
	})
}

function SYSM210T_rowClick(SYSM210T_e)
{
	const rowIndex = SYSM210T_e.currentTarget.rowIndex;
	SYSM210T_grdSYSM210T.clearSelection();
//	SYSM210T_grdSYSM210T.select(SYSM210T_e.currentTarget);
	SYSM210T_fnSetInit();

	let SYSM210T_cell = $(SYSM210T_e.currentTarget);
	let	SYSM210T_item = SYSM210T_grdSYSM210T.dataItem(SYSM210T_cell.closest("tr"));

	$("#SYSM210T_tenantGroupId_key").val(SYSM210T_item.tenantGroupId);
	$("#SYSM210T_tenantGroupId").val(SYSM210T_item.tenantGroupId);
	$("#SYSM210T_tenantGroupNm").val(SYSM210T_item.tenantGroupNm);
	$("#SYSM210M_cobTenantgState").data("kendoComboBox").value(SYSM210T_item.tenantGroupState);
	
	SYSM210T1_grdSYSM210T.dataSource.transport.read({tenantGroupId: SYSM210T_item.tenantGroupId});

	SYSM210T_grdSYSM210T.removeRow($("#addBackground"));
	SYSM210T_grdSYSM210T.refresh();

	SYSM210T_grdSYSM210T.select("tr:eq("+rowIndex+")");

	SYSM210T_fnInfoOnSetting();
}

// 테넌트그룹 그리드 조회
function SYSM210T_fnSearchTenantList(){

	let SYSM210T_data = { 

	};

	let SYSM210T_jsonStr = JSON.stringify(SYSM210T_data);

	SYSM210T_grdSYSM210T.dataSource.transport.read(SYSM210T_jsonStr);
}

// 테넌트 그리드 조회
function SYSM210T1_fnSearchTenantList(){

	let SYSM210T_data = { 

	};

	let SYSM210T_jsonStr = JSON.stringify(SYSM210T_data);

	SYSM210T1_grdSYSM210T.dataSource.transport.read(SYSM210T_jsonStr);
}

// 테넌트 목록 조회결과
function SYSM210T_fnResultTenantList(SYSM210T_data){

	SYSM210T1_grdSYSM210T.clearSelection();
	SYSM210T1_grdSYSM210T.dataSource.transport.read({});
}

// 테넌트그룹 추가 체크
function SYSM210T_fnAddtenantGroupCheck()
{
	if($("#addBackground").length)
	{
		Utils.confirm("추가하신 정보를 저장하지 않으셨습니다.<br/>추가하신 정보를 정말로 저장 안하시겠습니까?", function () { SYSM210T_grdSYSM210T.removeRow($(SYSM210T_grdSYSM210T.select()).closest('tr')[0]); SYSM210T_fnAddtenantGroup();}, function () {return;});
	}
	else if($("#uptBackground").length)
	{
		Utils.confirm("변경하신 정보를 저장하지 않으셨습니다.<br/>변경하신 정보를 정말로 저장 안하시겠습니까?", function () { SYSM210T_fnAddtenantGroup();}, function () {return;});
	} else SYSM210T_fnAddtenantGroup();
}

// 테넌트그룹 추가
function SYSM210T_fnAddtenantGroup()
{
	SYSM210T_fnSetInit();
	SYSM210T1_grdSYSM210T.dataSource.transport.read({});

    let row = {
    	tenantGroupId: "",
    	tenantGroupNm: "",
    	tenantGroupState: "100",
    	regrId: GLOBAL.session.user.originAgentId,
    	lstCorprId: GLOBAL.session.user.originAgentId,
    };

//    SYSM210T_grdSYSM210T.refresh();
    SYSM210T_grdSYSM210T.clearSelection();
    SYSM210T_grdSYSM210T.dataSource.add(row);
    SYSM210T_grdSYSM210T.select("tr:last");
    SYSM210T_grdSYSM210T.select().attr('id', 'addBackground');
    
    $("#SYSM210M_cobTenantgState").data("kendoComboBox").value("100");
    
    $("#SYSM210T_tenantGroupId").focus();
    
    SYSM210T_fnInfoOnSetting();
}

// 테넌트그룹 저장
function SYSM210T_fnSavetenantGroup()
{
	if(SYSM210T_grdSYSM210T.select().length == 0)
	{
		Utils.alert("선택된 데이터가 없습니다. 데이터를 선택하세요.");
        return;
	}
	
	if(!$("#SYSM210T_tenantGroupId").val() || !$("#SYSM210T_tenantGroupNm").val() || !$("#SYSM210M_cobTenantgState").data("kendoComboBox").value())
	{
		Utils.alert("필수값이 누락되었습니다.");
		return;
	}

	var param = {
		tenantGroupIdKey : $("#SYSM210T_tenantGroupId_key").val(),
		tenantGroupId : $.trim($("#SYSM210T_tenantGroupId").val()),
		tenantGroupNm : $("#SYSM210T_tenantGroupNm").val(),
		tenantGroupState : $("#SYSM210M_cobTenantgState").data("kendoComboBox").value(),
		regrId: GLOBAL.session.user.originAgentId,
    	lstCorprId: GLOBAL.session.user.originAgentId,
	};

	Utils.confirm("현재 선택된 정보만 저장 됩니다.<br>저장 하시겠습니까?", function() {
        Utils.ajaxCall("/sysm/SYSM210SAV01", JSON.stringify(param), function (result) {
        	if(result.resultCode == "success")
        	{
	        	Utils.alert(result.msg, function () {
	        		SYSM210T_fnSetInit();
	            	SYSM210T_fnSearchTenantList();
	            });
        	} else {
        		Utils.alert(result.msg);
                return;
        	}
        });
    });
}

function SYSM210T_fnContentExcel()
{
	SYSM210T_grdSYSM210T.saveAsExcel();
}
