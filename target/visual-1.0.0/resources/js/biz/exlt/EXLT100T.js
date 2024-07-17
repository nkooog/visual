1/***********************************************************************************************
 * Program Name : Visual Lettering 통계(EXLT100T.js)
 * Creator      : yhnam
 * Create Date  : 2024.03.29
 * Description  : Visual Lettering 통계
 * Modify Desc  : 
 * -----------------------------------------------------------------------------------------------
 * Date         | Updater        | Remark
 * -----------------------------------------------------------------------------------------------
 * 2024.03.29     yhnam            최초작성   
 ************************************************************************************************/
var EXLT100_userInfo;
var EXLT100T_grdEXLT100T;
var EXLT100T_cmmCodeList;

$(document).ready(function () {

	$("#EXLT100T_title").text($(".k-tabstrip-items .k-state-active .k-link").eq(0).text());
	
	EXLT100_userInfo = GLOBAL.session.user;
	
	// 서비스
	var items = [
		{ text: "전체", 	value: "" },
        { text: "V.L IN", 	value: "i" },
        { text: "V.L OUT", 	value: "o" },
    ];
	kendoDropDownList_init("EXLT100_select1", items);
	
	// 조회유형
	var items = [
        { text: "일", value: "Day" },
        { text: "월", value: "Month" },
    ];
	kendoDropDownList_init("EXLT100_select2", items, EXLT100_select2_fnChange);
	
	// 년도
	var nowDate = new Date();
	var nowYear = nowDate.getFullYear();
	var items = [];
	for(var i=0; i<10; i++)
	{
		var year = nowYear - i;
		items.push({text : year, value : year});
	}
	kendoDropDownList_init("EXLT100_select3", items, null);

	EXLT100T_createGrid();
});

function kendoDropDownList_init(id, items, fnChange)
{
	var buttonGroup = $("#"+id).kendoDropDownList({
		dataTextField: "text",
		dataValueField: "value",
		dataSource: items,
		change: function(e) {
			if (typeof fnChange === "function") {
				fnChange(this);
            }
		}
    }).data("kendoDropDownList");
	
	return buttonGroup;
}

function EXLT100_select2_fnChange(e)
{
	if(e.value() == "Month"){
//		var arr_EXLT100T_dateStart = $("#EXLT100T_dateStart").val().split("-");
//		startTime = arr_EXLT100T_dateStart[0] + "-" + arr_EXLT100T_dateStart[1] + "-01";
//		$("#EXLT100T_dateStart").data("kendoDatePicker").value(startTime);
//		$("#EXLT100T_dateEnd").data("kendoDatePicker").value("");
//		$("#EXLT100T_dateEnd").data("kendoDatePicker").enable(false);
		$(".EXLT100T_searchType1").css("display", "none");
		$(".EXLT100T_searchType2").css("display", "flex");
	} else {
//		$("#EXLT100T_dateEnd").data("kendoDatePicker").enable(true);
		$(".EXLT100T_searchType2").css("display", "none");
		$(".EXLT100T_searchType1").css("display", "flex");
	}
}

// 그리드 생성
function EXLT100T_createGrid()
{
	$("#grid_EXLT100").kendoGrid({
		dataSource:{
			transport: {
				read : function (options) {

					var startTime = "";
					var endTime = "";
					if($("#EXLT100_select2").data("kendoDropDownList").value() == "Month")
					{
//						var arr_EXLT100T_dateStart = $("#EXLT100T_dateStart").val().split("-");
//						startTime = arr_EXLT100T_dateStart[0] + "-" + arr_EXLT100T_dateStart[1] + "-01 00:00:00";
						
						var year = $("#EXLT100_select3").val();
						startTime = year + "-01-01 00:00:00";
						endTime = year + "-12-01 00:00:00";

					} else {
						startTime = $("#EXLT100T_dateStart").val() + " 00:00:00";
						endTime = $("#EXLT100T_dateEnd").val() + " 00:00:00";
					}

					var body = {
						"Name": "LiteCallgateStatistics",
					    "Method": "Get",
					    "Parameter": {
					    	"System": EXLT100_userInfo.systemIdx,
					    	// "System": "Bona2",
			    	//         "Tenant": "DMO",
			    	        "Tenant": EXLT100_userInfo.tenantPrefix,
//			    			"CallDirection" : $("#EXLT100_select1").data("kendoDropDownList").value(),
			    	       	"Type": $("#EXLT100_select2").data("kendoDropDownList").value(),
			    	       	"StartTime": startTime,
			    	        "EndTime": endTime
					    }
					};
					
					if(Utils.isNotNull($("#EXLT100_select1").data("kendoDropDownList").value())) body.Parameter.CallDirection = $("#EXLT100_select1").data("kendoDropDownList").value();

					let param = {
						body: body
					};

//					$.extend(param, options.data);

					Utils.ajaxCall("/exlt/EXLT100TAPI/", JSON.stringify(body), function (result) {

						EXLT100T_grdEXLT100T.dataSource.data([]);
						if(Utils.isNotNull(result.result))
						{
							var resultData = JSON.parse(result.result);
							if(Utils.isNotNull(resultData.ResultList))
							{
								EXLT100T_grdEXLT100T.dataSource.data(resultData.ResultList);
							}
						}
						EXLT100T_ProgressBar(false);
					}, function (result) {console.log(result); EXLT100T_ProgressBar(true);});
				}
			},
			schema : {
				type: "json",
				model: {
					fields: {
						StatDate		: { field: "StatDateFormat",type: "string" },
						ServiceName		: { field: "ServiceName", 	type: "string" },
						SendTry			: { field: "SendTry", 		type: "number" },
						SendSuccess		: { field: "SendSuccess", 	type: "number" },
						SendFail		: { field: "SendFail", 		type: "number" },
//						a				: { field: "a", 			type: "number" },
//						b				: { field: "b", 			type: "number" },
					}
				}
			}
			, aggregate: [
				{ field: "SendTry",		aggregate: "sum" },
				{ field: "SendSuccess", aggregate: "sum" },
				{ field: "SendFail", 	aggregate: "sum" },
//				{ field: "a", 			aggregate: "sum" },
//				{ field: "b", 			aggregate: "sum" },
            ]
        },
		autoBind: false,
		sortable: true,
		noRecords: { template: `<div class="nodataMsg"><p>해당 목록이 없습니다.</p></div>` },
		scrollable: true,
		dataBound: EXLT100T_onDataBound,
		columns: [
			{
			    field: "",
			    title: "No",
			    width: 30,
			    attributes: {"class": "k-text-center"}
			},
			{
			    field: "StatDateFormat",
			    title: "날짜",
			    width: 50,
			    attributes: {"class": "k-text-center"},
			    template: function (dataItem) {
					return ($("#EXLT100_select2").data("kendoDropDownList").value() == "Month") ? dataItem.StatDateFormat : dataItem.StatDateFormat;
				}
				, footerTemplate : "계"
			},{
			    field: "ServiceName",
			    title: "서비스",
			    width: 70,
			    attributes: {"class": "k-text-center"},
			},{
			    field: "SendTry",
			    title: "요청건",
			    width: 100,
			    attributes: {"class": "k-text-center"}
				, footerTemplate : "#= kendo.toString(sum, \"n0\") #"
			},{
			    field: "SendSuccess",
			    title: "성공건",
			    width: 100,
			    attributes: {"class": "k-text-center"}
				, footerTemplate : "#= kendo.toString(sum, \"n0\") #"
			},{
			    field: "SendFail",
			    title: "실패건",
			    width: 100,
			    attributes: {"class": "k-text-center"}
				, footerTemplate : "#= kendo.toString(sum, \"n0\") #"
			}
//			,{
//			    field: "a",
//			    title: "메시지 처리 건",
//			    width: 50,
//			    attributes: {"class": "k-text-center"}
//				, footerTemplate : "#= kendo.toString(sum, \"n0\") #"
//			},{
//			    field: "b",
//			    title: "웹팝업 건",
//			    width: 50,
//			    attributes: {"class": "k-text-center"}
//				, footerTemplate : "#= kendo.toString(sum, \"n0\") #"
//			}
		],
	});

	EXLT100T_grdEXLT100T = $("#grid_EXLT100").data("kendoGrid");

	//그리드 높이 조절
	let EXLT100T_screenHeight = $(window).height();
	EXLT100T_grdEXLT100T.element.find('.k-grid-content').css('height', EXLT100T_screenHeight - 450);

	// grid reSize
	$(window).on({
		'resize': function() {
			EXLT100T_grdEXLT100T.element.find('.k-grid-content').css('height', EXLT100T_screenHeight - 450);
		},
	});
	
	setTimeout(function() {
		EXLT100_fnSearch();
	}, 100);
}

// 그리드 조회
function EXLT100_fnSearch()
{
	let EXLT100T_data = { 

	};

	let EXLT100T_jsonStr = JSON.stringify(EXLT100T_data);

	EXLT100T_grdEXLT100T.dataSource.transport.read(EXLT100T_jsonStr);
}

function EXLT100T_onDataBound(EXLT100T_e)
{
	var rows = this.tbody.children();
	var totalRows = rows.length; // 그리드의 전체 행 개수

	// 페이지 당 시작 인덱스 계산
//	var startIndex = (EXLT100T_grdEXLT100T.dataSource.page() - 1) * EXLT100T_grdEXLT100T.dataSource.pageSize() + 1;

	for (var i = 0; i < totalRows; i++) {
	    let row = $(rows[i]);
	    // 순서대로 번호 매기기
//	    let index = i + startIndex; // 현재 페이지의 첫 번째 행에 대한 올바른 인덱스 계산
	    row.children().eq(0).text(i+1);
	}
}

EXLT100T_ProgressBar = (param) => window.kendo.ui.progress($("#grid_EXLT100"), param);