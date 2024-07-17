1/***********************************************************************************************
 * Program Name : Visual Lettering 이력(EXLT110T.js)
 * Creator      : yhnam
 * Create Date  : 2024.03.21
 * Description  : Visual Lettering 이력
 * Modify Desc  : 
 * -----------------------------------------------------------------------------------------------
 * Date         | Updater        | Remark
 * -----------------------------------------------------------------------------------------------
 * 2024.03.21     yhnam            최초작성   
 ************************************************************************************************/
var EXLT110_userInfo;
var EXLT110T_grdEXLT110T;
var EXLT110T_cmmCodeList;

$(document).ready(function () {

	$("#EXLT110T_title").text($(".k-tabstrip-items .k-state-active .k-link").eq(0).text());
	
	EXLT110_userInfo = GLOBAL.session.user;
	
	// 서비스
	var items = [
		{ text: "전체", value: "" },
        { text: "V.L IN", 	value: "i" },
        { text: "V.L OUT", 	value: "o" },
    ];
	kendoDropDownList_init("EXLT110_select1", items);
	
	// 서비스 번호
	let data = {};
	data.Name = "LiteNumber";
	data.Method = "Get";
	data.Parameter = {};
	data.Parameter.System = EXLT110_userInfo.systemIdx;
	// data.Parameter.System = "Bona2";
	data.Parameter.Tenant = EXLT110_userInfo.tenantPrefix;
	// data.Parameter.Tenant = "DMO";
	Utils.ajaxCall('/exlt/EXLT130T-srvc-number', JSON.stringify(data), function(data){
		
		let dataSource = (Utils.isNotNull(data.ResultList)) ? data.ResultList : [];
		dataSource.unshift({NumberName: "전체", Number: ""});
		
		let kendoComboBox = $("#EXLT110_keyword1").kendoComboBox({
            dataSource: dataSource,
            dataTextField: "NumberName",
            dataValueField: "Number",
            clearButton: false,
            autoWidth: true,
        }).data("kendoComboBox");
	});
	// 서비스 번호

	EXLT110T_createGrid();

	$("#EXLT110_keyword2").on("keyup",function(key){
		if(key.keyCode == 13) {
			EXLT110_fnSearch();
		}
	});
});

function kendoDropDownList_init(id, items)
{
	var buttonGroup = $("#"+id).kendoDropDownList({
		dataTextField: "text",
		dataValueField: "value",
		dataSource: items
    }).data("kendoDropDownList");
	
	return buttonGroup;
}

// 그리드 생성
function EXLT110T_createGrid()
{
	$("#grid_EXLT110").kendoGrid({
		dataSource:{
			transport: {
				read : function (options) {

					var body = {
						"Name": "LiteCallgateHistory",
					    "Method": "Get",
					    "Parameter": {
					        "System": EXLT110_userInfo.systemIdx,
					        // "System": "Bona2",
					        "Tenant": EXLT110_userInfo.tenantPrefix,
					        "StartTime": $("#EXLT110T_dateStart").val() + " 00:00:00",
					        "EndTime": $("#EXLT110T_dateEnd").val() + " 23:59:59",
//					        "CallDirection": $("#EXLT110_select1").data("kendoDropDownList").value(),
//					        "NumberId": $("#EXLT110_keyword1").data("kendoComboBox").value(),
//					        "RemoteNumber": $("#EXLT110_keyword2").val().replace(/-/g, '')
					    }
					};
					
					if(Utils.isNotNull($("#EXLT110_select1").data("kendoDropDownList").value())) body.Parameter.CallDirection = $("#EXLT110_select1").data("kendoDropDownList").value();
					if(Utils.isNotNull($("#EXLT110_keyword1").data("kendoComboBox").value())) body.Parameter.Number  = $("#EXLT110_keyword1").data("kendoComboBox").value();
					if(Utils.isNotNull($("#EXLT110_keyword2").val())) body.Parameter.RemoteNumber = $("#EXLT110_keyword2").val().replace(/-/g, '');

					Utils.ajaxCall("/exlt/EXLT110TAPI/", JSON.stringify(body), function (result) {
						EXLT110T_grdEXLT110T.dataSource.data([]);
						if(Utils.isNotNull(result.result))
						{
							var resultData = JSON.parse(result.result);
							if(Utils.isNotNull(resultData.ResultList))
							{
								EXLT110T_grdEXLT110T.dataSource.data(resultData.ResultList);
							}
						}
						EXLT110T_ProgressBar(false);
					}, function (result) {EXLT110T_grdEXLT110T.dataSource.data([]);EXLT110T_ProgressBar(true);});
				}
			},
			schema : {
				type: "json",
				model: {
					fields: {
						InviteTime		: { field: "InviteTime", 	type: "string" },
						ServiceName		: { field: "ServiceName", 	type: "string" },
						NumberName		: { field: "NumberName", 	type: "string" },
						RemoteNumber	: { field: "RemoteNumber", 	type: "string" },
						IsSuccess		: { field: "IsSuccess", 	type: "string" },
						action			: { field: "action", 		type: "string" },
					}
				}
			}
        },
		autoBind: false,
		sortable: true,
		noRecords: { template: `<div class="nodataMsg"><p>해당 목록이 없습니다.</p></div>` },
		pageable: {
			refresh:false
			, pageSizes:[ 25, 50, 100, 150, 200 ]
			, buttonCount:10
			, pageSize : 25
		},
		scrollable: true,
		dataBound: EXLT110T_onDataBound,
		columns: [
			{
			    field: "",
			    title: "No",
			    width: 30,
			    attributes: {"class": "k-text-center"}
			},
			{
			    field: "InviteTime",
			    title: "날짜",
			    width: 70,
			    attributes: {"class": "k-text-center"}
			},{
			    field: "ServiceName",
			    title: "서비스",
			    width: 70,
			    attributes: {"class": "k-text-center"},
			},{
			    field: "NumberName",
			    title: "서비스 번호",
			    width: 80,
			    attributes: {"class": "k-text-center"}
			},{
			    field: "RemoteNumber",
			    title: "요청 핸드폰",
			    width: 70,
			    attributes: {"class": "k-text-center"}
			},{
			    field: "IsSuccess",
			    title: "전송결과",
			    width: 50,
			    attributes: {"class": "k-text-center"},
			    template: function (dataItem) {
					return (dataItem.IsSuccess) ? "<span class='col_green'>성공</span>" : "<span class='col_red'>실패</span>";
				}
			},{
			    field: "InnerCodeName",
			    title: "실패사유",
			    width: 300,
			    attributes: {"class": "k-text-center"}
			}
		]
	});

	EXLT110T_grdEXLT110T = $("#grid_EXLT110").data("kendoGrid");

	//그리드 높이 조절
	let EXLT110T_screenHeight = $(window).height();
	EXLT110T_grdEXLT110T.element.find('.k-grid-content').css('height', EXLT110T_screenHeight - 450);

	// grid reSize
	$(window).on({
		'resize': function() {
			EXLT110T_grdEXLT110T.element.find('.k-grid-content').css('height', EXLT110T_screenHeight - 450);
		},
	});
	
	setTimeout(function() {
		EXLT110_fnSearch();
	}, 100);
}

// 그리드 조회
function EXLT110_fnSearch()
{
	let EXLT110T_data = { 

	};

	let EXLT110T_jsonStr = JSON.stringify(EXLT110T_data);

	EXLT110T_grdEXLT110T.dataSource.transport.read(EXLT110T_jsonStr);
}

function EXLT110T_onDataBound(EXLT110T_e)
{
	var rows = this.tbody.children();
	var totalRows = rows.length; // 그리드의 전체 행 개수

	// 페이지 당 시작 인덱스 계산
	var startIndex = (EXLT110T_grdEXLT110T.dataSource.page() - 1) * EXLT110T_grdEXLT110T.dataSource.pageSize() + 1;

	for (var i = 0; i < totalRows; i++) {
	    let row = $(rows[i]);
	    // 순서대로 번호 매기기
	    let index = i + startIndex; // 현재 페이지의 첫 번째 행에 대한 올바른 인덱스 계산
	    row.children().eq(0).text(index);
	}
}

EXLT110T_ProgressBar = (param) => window.kendo.ui.progress($("#grid_EXLT110"), param);