/***********************************************************************************************
 * Program Name : EXLT120T.jsp
 * Creator         :  yhnam
 * Create Date  : 2024.03.26
 * Description    : 콜 이력 및 녹취청취
 * Modify Desc  :
 * -----------------------------------------------------------------------------------------------
 * Date         | Updater        | Remark
 * -----------------------------------------------------------------------------------------------
 * 2024.03.26     jypark         최초생성

 ************************************************************************************************/

// session
var EXLT120_userInfo;

// grid
var EXLT120_gridData;
var EXLT120_popParam = {};
var record = 0;

// 조회유형
var items = [
	{ text: "시간", value: "Hour" },
	{ text: "일", value: "Day" },
	{ text: "월", value: "Month" },
];

$(document).ready(function () {

	EXLT120_userInfo = GLOBAL.session.user;

	$("#grid_EXLT120").kendoGrid({
		dataSource: {
			transport: {
				read : function (options) {

					let multiselect = $("#EXLT120_keyword1").getKendoMultiSelect();
					let numberId = [];
					let body = {};

					if(typeof multiselect != 'undefined') {
						numberId = multiselect.value();
					}

					body.Name = "LiteCallStatistics";
					body.Method = "Get";
					body.Parameter = {};
					body.Parameter.System = EXLT120_userInfo.systemIdx;
					// body.Parameter.System = "Bona2";
					body.Parameter.Type = document.getElementById("EXLT120_select").value;
					body.Parameter.Category = "Number";
					body.Parameter.Tenant = EXLT120_userInfo.tenantPrefix;
					// body.Parameter.Tenant = "DMO";
					body.Parameter.StartTime = document.querySelector('input[name=EXLT120T_dateStart]').value + " 00:00:00";
					body.Parameter.EndTime = document.querySelector('input[name=EXLT120T_dateEnd]').value   + " 23:59:59";
					body.Parameter.Number = numberId;

					if(typeof $("#EXLT120_select").data("kendoDropDownList") != 'undefined'
						&& $("#EXLT120_select").data("kendoDropDownList").value() == 'Month') {
						let year = $("#EXLT120T_year").data("kendoDropDownList").value();
						body.Parameter.StartTime = year + "-01-01 00:00:00";
						body.Parameter.EndTime = year   + "-12-31 23:59:59";
					}

					Utils.ajaxCall('/exlt/EXLT120TAPI', JSON.stringify(body), function (data) {

						let response = JSON.parse(data.result.body);

						if (data.modelAndView.status == "OK" && response.ResultCode == "0000") {
							if(response.ResultList != null) {
								EXLT120_gridData.dataSource.data(response.ResultList);
							}
						} else {
							EXLT120_gridData.dataSource.data([]);
						}
						EXLT120T_ProgressBar(false);
						EXLT120_gridData.dataSource.page(1);
					}, EXLT120T_ProgressBar(true), null , function(result) {
						console.log(result.status);
						if(result.status > 500) {
							Utils.alert("Server Exception", ()=> {return EXLT120_gridData.dataSource.data([]);});
						}else if(result.status < 500 ) {
							Utils.alert("Client Exception", ()=> {return EXLT120_gridData.dataSource.data([]);});
						}
					});
				}
			},
			schema : {
				type: "json",
				model: {
					fields: {
						No				: { field: "No", 			type: "number" },
						StatDate		: { field: "StatDateFormat",type: "string" },
						StatDate		: { field: "NumberName", 	type: "string" },
						Total			: { field: "Total", 		type: "number" },
						Inbound			: { field: "Inbound", 		type: "number" },
						InboundEnd		: { field: "InboundEnd", 	type: "number" },
						InboundCancel	: { field: "InboundCancel", type: "number" },
						InboundSecond	: { field: "InboundSecond",	type: "number" },
						Outbound		: { field: "Outbound",		type: "number" },
						OutboundEnd		: { field: "OutboundEnd",	type: "number" },
						OutboundSecond	: { field: "OutboundSecond",type: "number" },
					}
				}
			}
			,aggregate: [
					{ field: "Total", 			aggregate: "sum" }
				,	{ field: "Inbound", 		aggregate: "sum" }
				,	{ field: "InboundEnd", 		aggregate: "sum" }
				,	{ field: "InboundCancel",	aggregate: "sum" }
				,	{ field: "InboundSecond", 	aggregate: "sum" }
				,	{ field: "Outbound", 		aggregate: "sum" }
				,	{ field: "OutboundEnd", 	aggregate: "sum" }
				,	{ field: "OutboundSecond", 	aggregate: "sum" }
			]
		},
		noRecords: {
			template: `<div class="nodataMsg"><p>해당 목록이 없습니다.</p></div>`
		},
		autoBind: false,
		sortable: true,
		scrollable: true,
		pageable: {
			refresh:false
			, pageSizes:[ 25, 50, 100, 200,  500]
			, buttonCount:10
			, pageSize : 25
		},
		change: function(e) {
//			console.log(this.select());
		},
		dataBound: EXLT120_onDataBound,
		columns: [
			  { width: 2,  title: 'No', template: "#= ++record #", attributes: {"class": "k-text-center"}}
			, { width: 9, field:"StatDateFormat", title: '날짜',		attributes: {"class": "k-text-center"} }
			, { width: 9, field:"NumberName",     title: '서비스 번호',attributes: {"class": "k-text-center"} }
			, { width: 10, field:"Total", 		  title: '총 건수',   footerTemplate : "#= kendo.toString(sum, \"n0\") #"}
			, { width: 10, field:"Inbound", 	  title: '총 인입',	footerTemplate : "#= kendo.toString(sum, \"n0\") #"}
			, { width: 10, field:"InboundEnd",    title: '인 통화건',	footerTemplate : "#= kendo.toString(sum, \"n0\") #"}
			, { width: 10, field:"InboundCancel", title: '인 포기건',	footerTemplate : "#= kendo.toString(sum, \"n0\") #"}
			, { width: 10, field:"InboundSecond", title: '인 통화시간', footerTemplate : "#= kendo.toString(sum, \"n0\") #"}
			, { width: 10, field:"Outbound", 	  title: '아웃 건',	footerTemplate : "#= kendo.toString(sum, \"n0\") #"}
			, { width: 10, field:"OutboundEnd",   title: '아웃 통화건',	footerTemplate : "#= kendo.toString(sum, \"n0\") #"}
			, { width: 10, field:"OutboundSecond",title: '아웃 통화시간', footerTemplate : "#= kendo.toString(sum, \"n0\") #"}
		],
		dataBinding: function() {
			record = (this.dataSource.page() -1) * this.dataSource.pageSize();
		}
	});

	EXLT120_gridData = $("#grid_EXLT120").data("kendoGrid");
	EXLT120_gridData.tbody.on('dblclick', EXLT120_fnDblclick);
	
	//그리드 높이 조절
	let EXLT120_screenHeight = $(window).height();
	EXLT120_gridData.element.find('.k-grid-content').css('height', EXLT120_screenHeight - 450);

	// grid reSize
	$(window).on({
		'resize': function() {
			EXLT120_gridData.element.find('.k-grid-content').css('height', EXLT120_screenHeight - 450);
		},
	});

	// 서비스번호 API 조회
	EXLT120_getServiceNumber();

	EXLT120_kendoDropDownList_init("EXLT120_select", items);

	EXLT120_fnSearch();

	// 검색 입력창 엔터처리
	document.querySelector("form[name='sendForm']").addEventListener('keypress', EXLT120_handleEnterKeyPress);

});

//==============================
//					기타 화면 기능 start
//==============================

//검색 입력창 엔터처리 핸들러
function EXLT120_handleEnterKeyPress(e) {
	if (e.keyCode === 13) {
		EXLT120_fnSearch();
	}
}

// grid row 더블클릭
function EXLT120_fnDblclick() {
	console.log(11);
}

// grid ToolTip
function EXLT120_fnToolTip()
{
	$("#grid_EXLT140").kendoTooltip({
		filter: ".tdTooltip",
		autoHide:true,
		//showOn: "mouseenter",
		show: function(e){
			if(this.content.text().length>0){
				this.content.parent().css("visibility", "visible");
			}else{
				this.content.parent().css("visibility", "hidden");
			}
		},
		hide: function(e){
			this.content.parent().css('visibility', 'hidden');
		},
		content: function(e){
			let dataItem = EXLT120_gridData.dataItem(e.target.closest("tr"));
			if(e.target.closest("td").index()==0){
				return dataItem.tenantId;
			}
		}
	}).data("kendoTooltip");
}
//==============================
//					기타 화면 기능 end
//==============================

//==============================
//					grid 조회부분 start
//==============================
// grid 조회
function EXLT120_fnSearch() {
	EXLT120_gridData.dataSource.transport.read();
}

function EXLT120_onDataBound(e){
	e.sender._data.forEach( e => {
		console.log(e.Total);			// 총건수
	});
}
//==============================
//					grid 조회부분 end
//==============================

function EXLT120_getServiceNumber() {
	let data = {};
	data.Name = "LiteNumber";
	data.Method = "Get";
	data.Parameter = {};
	data.Parameter.System = EXLT120_userInfo.systemIdx;
	// data.Parameter.System = "Bona2";
	// data.Parameter.Tenant = "DMO";
	data.Parameter.Tenant = EXLT120_userInfo.tenantPrefix;

	Utils.ajaxCall('/exlt/EXLT130T-srvc-number', JSON.stringify(data), function(data){
		let dataSource = (Utils.isNotNull(data.ResultList)) ? data.ResultList : [];
		Utils.setKendoMultiSelectCustom(dataSource, '#EXLT120_keyword1', 'NumberName','Number', true,'');
	});

}

function EXLT120_kendoDropDownList_init(iden, items) {

	let element = document.getElementById(iden);

	return buttonGroup = new kendo.ui.DropDownList(element, {
		dataTextField: "text",
		dataValueField: "value",
		dataSource: items,
		change: function(e) {
			// 선택이 변경될 때 실행할 함수
			console.log("Selected value: " + this.value());
			EXLT120T_select2_fnChange(this);
		}
	});

}

EXLT120T_select2_fnChange = (e) => {
	let data = e.value();

	if(data == "Month"){
		EXLT120T_getYear();
		document.getElementById("EXLT120_calendar").style.display="none";
		document.getElementById("EXLT120T_yearArea").style.display="flex";
	}else if(data == "Hour" || data == "Day"){
		document.getElementById("EXLT120T_yearArea").style.display="none";
		document.getElementById("EXLT120_calendar").style.display="flex";
	}
}

EXLT120T_getDateFormat = (e) => {
	return ("00" + e.toString()).slice(-2);
}

EXLT120T_ProgressBar = (param) => window.kendo.ui.progress($("#grid_EXLT120"), param);

EXLT120T_getYear = (e) => {

	// 년도
	let nowDate = new Date();
	let nowYear = nowDate.getFullYear();
	let items = [];

	for(var i=0; i<10; i++){
		var year = nowYear - i;
		items.push({text : year, value : year});
	}

	EXLT120_kendoDropDownList_init("EXLT120T_year", items);

}

EXLT120T_initPage = () => YJGB102T_gridData.dataSource.page(1);