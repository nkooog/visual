/***********************************************************************************************
 * Program Name : EXLT130T.jsp
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
var EXLT130_userInfo;

// grid
var EXLT130_gridData;
var EXLT130_popParam = {};
var record = 0;
// 조회유형
var items = [
	{ text: "일", value: "Day" },
	{ text: "월", value: "Month" },
	{ text: "시간", value: "Hour" },
];

$(document).ready(function () {

	EXLT130_userInfo = GLOBAL.session.user;

	$("#grid_EXLT130").kendoGrid({
		dataSource: {
				data : []
			,	schema : {
					model : {
						fields : {
								InviteTime : {type : "number", editable : false}
							,	NumberName : {type : "number", editable : false}
							,	CallDirectionName : {type : "string", editable : false}
							,	RemoteNumber : {type : "string", editable : false}
							,	IsConnection : {type : "string", editable : false}
							,	CallSecond : {type : "number", editable : false}
							,	IsRecordExists : {type : "number", editable : false}
							,	Description : {type : "string", editable : true}
						}
					}
			}
		},
		noRecords: {
			template: `<div class="nodataMsg"><p>해당 목록이 없습니다.</p></div>`
		},
		autoBind: false,
		sortable: true,
		scrollable: true,
		pageable: {
			refresh: false
			, pageSizes: [25, 50, 100, 200, 500]
			, buttonCount: 10
			, pageSize: 25
		},
		change: function (e) {
//			console.log(this.select());
		},
		dataBound: EXLT130_onDataBound,
		columns: [
			  {width: 50, title: 'No', template: "#= ++record #", attributes: {"class": "k-text-center"}}
			, {width: 150, field: "InviteTime", title: '날짜', attributes: {"class": "k-text-center", style:"text-overflow: ellipsis !important; overflow:hidden !important; width:auto; white-space:nowrap "}}
			, {width: 200, field: "NumberName", title: '서비스 번호',
				template: (dataItem) => {
					return (dataItem.IsServiceNumber) ? "<span class=''>" + dataItem.NumberName + "</span>" : "<span class='col_gray'>" + dataItem.NumberName + "</span>";
				}
			  }
			, {width: 150, field: "CallDirectionName", title: '통화 유형', attributes: {"class": "k-text-center", style:"text-overflow: ellipsis !important; overflow:hidden !important; width:auto; white-space:nowrap "}}
			, {width: 150, field: "RemoteNumber", title: '고객 번호'}
			, {width: 150, field: "IsConnection", title: '통화 여부'
				, template : (dataItem) => {
					return (dataItem.IsConnection) ? "<span class='col_green'>성공</span>" : "<span class='col_red'>실패</span>";
				}}
			, {width: 100, field: "CallSecond", title: '통화 시간(초)'}
			, {
				width: 100, field: "IsRecordExists", title: '청취 가능'
				, template: (dataItem) => {
					if (dataItem.IsRecordExists) {
						return "<button type='button' class='k-icon k-i-volume-up' onclick=EXLT130_getListen('" + dataItem.CallId + "')></button>";
					} else {
						return "";
					}
				}
			}
			, { width: 'auto', field: "Description", title: "메모 <span class='col_red'><h4>*내용을 클릭해 메모를 수정하세요.</h4></span>", attributes: { style:"text-overflow: ellipsis !important; overflow:hidden !important; width:auto; white-space:nowrap " }}
			, { width: 100, command: [
					{
						text : "메모수정",
						className: "btnRefer_primary",
						name : "details",
						click: function(e) {
							e.preventDefault();
							let tr = $(e.target).closest("tr"); // get the current table row (tr)
							let data = this.dataItem(tr);
							// console.log("Details for: " + data.NumberName + " StatDate :" + data.StatDate);
							EXLT130T_LiteCallUpdate(data);
						}
					},
				]
			}
		],
		editable: true,
		dataBinding: function () {
			record = (this.dataSource.page() - 1) * this.dataSource.pageSize();
		}
	});

	EXLT130_gridData = $("#grid_EXLT130").data("kendoGrid");
	EXLT130_gridData.tbody.on('dblclick', EXLT130_fnDblclick);
	
	//그리드 높이 조절
	let EXLT130_screenHeight = $(window).height();
	EXLT130_gridData.element.find('.k-grid-content').css('height', EXLT130_screenHeight - 450);

	// grid reSize
	$(window).on({
		'resize': function() {
			EXLT130_gridData.element.find('.k-grid-content').css('height', EXLT130_screenHeight - 450);
		},
	});

	// 서비스번호 API 조회
	EXLT130_getServiceNumber();

	// 검색
	EXLT130_fnSearch();

	// 기간검색 관련 datetime input
	EXLT130_fnDateTimeInput();

//	EXLT130T_tooltip();

	// 검색 입력창 엔터처리
	document.querySelector("form[name='sendForm']").addEventListener('keypress', EXLT130_handleEnterKeyPress);
});

//==============================
//					기타 화면 기능 start
//==============================

function EXLT130_fnDateTimeInput() {
	let target = document.querySelector("input[name='EXLT130T_date']");
	let options =  {
			dateInput: true
		,	startTime: new Date(2023,1,3,8,30,0)
		,	endTime: new Date(2023,1,3,17,00,0)
		,	value: new Date()
		,	format: "yyyy-MM-dd hh:mm:ss"
		,	change: function (e) {
				console.log(e);
				console.log(this.id);
			//$(this).data("kendoDatePicker").min(e.sender.value());
		}
	};
	$("input[name='EXLT130T_date']").kendoDateTimePicker(options);
}

function EXLT130_getServiceNumber() {
	let data = {};
	data.Name = "LiteNumber";
	data.Method = "Get";
	data.Parameter = {};
	data.Parameter.System = EXLT130_userInfo.systemIdx;
	// data.Parameter.System = "Bona2";
	// data.Parameter.Tenant = "DMO";
	data.Parameter.Tenant = EXLT130_userInfo.tenantPrefix;

	Utils.ajaxCall('/exlt/EXLT130T-srvc-number', JSON.stringify(data), function(data){
		let dataSource = (Utils.isNotNull(data.ResultList)) ? data.ResultList : [];
		Utils.setKendoMultiSelectCustom(dataSource, '#EXLT130_keyword1', 'NumberName','Number', true,'');
	});

}

function EXLT130_formatTime(seconds) {
	var minutes = Math.floor(seconds / 60);
	var remainingSeconds = Math.floor(seconds % 60);
	return minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds;
}

function EXLT130_getListen(callId) {
	$("#EXLT130T_modal").kendoDialog({
		content: EXLT130_getHtml,
		visible: false,
		close: function(e) {
			// close animation has finished playing
			console.log(e);
			document.getElementById("audioElement").pause();
		}
	});

	$("#EXLT130T_modal").data("kendoDialog").open();

	let data = {};
	data.Name = "LiteCallRecord";
	data.Method = "Get";
	data.Parameter = {};
	data.Parameter.System = EXLT130_userInfo.systemIdx;
	// data.Parameter.System = "Bona2";
	// data.Parameter.Tenant = "DMO";
	data.Parameter.Tenant = EXLT130_userInfo.tenantPrefix;
	data.Parameter.CallId = callId;

	$.ajax({
		url: GLOBAL.contextPath + '/exlt/EXLT130TCallAPI',
		type: "post",
		xhrFields: {
			responseType: "blob",
		},
		data: JSON.stringify(data),
		success: function (response) {
			EXLT130_audio(response);
		},
		error: function (request, status, error) {
			console.log(error);
		}
	});

}

function EXLT130_audio(response) {
	let source = document.querySelector('#audioElement');
	console.log(response);
	source.src = URL.createObjectURL(response);
	source.play();

	source.addEventListener('timeupdate', function () {
		let progress = (source.currentTime / source.duration) * 100;
		document.querySelector(".progress").style.width = progress + '%';
		timeInfo.textContent = EXLT130_formatTime(source.currentTime) + ' / ' + EXLT130_formatTime(source.duration);
	});

	source.addEventListener('loadedmetadata', function () {
		timeInfo.textContent = '0:00 / ' + EXLT130_formatTime(source.duration);
	});
}

function EXLT130_getHtml() {
	$("#EXLT130T_modal").show();
	return $("#EXLT130T_modal").html();
}

function EXLT130_togglePlayPause() {
	let audio = document.getElementById("audioElement");
	(audio.paused) ?  audio.play() : audio.pause();
}
//검색 입력창 엔터처리 핸들러
function EXLT130_handleEnterKeyPress(e) {
	if (e.keyCode === 13) {
		EXLT130_fnSearch();
	}
}

// grid row 더블클릭
function EXLT130_fnDblclick() {
	console.log(11);
}

//==============================
//					기타 화면 기능 end
//==============================

//==============================
//					grid 조회부분 start
//==============================
// grid 조회
function EXLT130_fnSearch() {

	let multiselect = $("#EXLT130_keyword1").data("kendoMultiSelect");
	let numberId = [];
	console.log(typeof multiselect);
	if(typeof multiselect != 'undefined') {
		numberId = multiselect.value();
	}

	let body = {};

	body.Name = "LiteCallHistory";
	body.Method = "Get";
	body.Parameter = {};
	body.Parameter.System = EXLT130_userInfo.systemIdx;
	body.Parameter.Tenant = EXLT130_userInfo.tenantPrefix;
	// body.Parameter.Tenant = "DMO";
	body.Parameter.StartTime = document.querySelector("input[name='EXLT130T_dateStart']").value + " 00:00:00";
	body.Parameter.EndTime = document.querySelector("input[name='EXLT130T_dateEnd']").value + " 23:59:59";
	body.Parameter.Number = numberId;
	body.Parameter.RemoteNumber = document.getElementById('EXLT130_keyword2').value;
	body.Parameter.Description = document.getElementById('EXLT130_memo').value;
	body.Parameter.IsServiceNumber = !(document.getElementById('EXLT130_use').checked) ? '' : true;
	body.Parameter.CallSecond = document.getElementById('EXLT130_keyword3').value;

	Utils.ajaxCall('/exlt/EXLT130TAPI', JSON.stringify(body), function (data) {
		EXLT130_popParam.token = data.token;
		let response = JSON.parse(data.result);
		if (data.modelAndView.status == "OK" && response.ResultCode == "0000") {
			if (response.ResultList != null) {
				EXLT130_gridData.dataSource.data(response.ResultList);
			}
		} else {
			EXLT130_gridData.dataSource.data([]);
		}

		EXLT130_gridData.dataSource.page(1);

	}, EXLT130T_ProgressBar(true), null,function (result) {
		Utils.alert("500 INTERNAL_SERVER_ERROR.", () => {
			return EXLT130_gridData.dataSource.data([]);
		});
	});
}

function EXLT130_onDataBound(EXLT130_e) {
	EXLT130T_ProgressBar(false);
}

//==============================
//					grid 조회부분 end
//==============================

EXLT130T_ProgressBar = (param) => window.kendo.ui.progress($("#grid_EXLT130"), param);

EXLT130T_LiteCallUpdate = (e) => {
	console.log(e.Description + " StatDate :" + e.CallId);

	let body = {};

	body.Name = 'LiteCall';
	body.Method = 'Update';
	body.Parameter = {};
	body.Parameter.System = EXLT130_userInfo.systemIdx;
	body.Parameter.Tenant = EXLT130_userInfo.tenantPrefix;
	body.Parameter.CallId = e.CallId;
	body.Parameter.Description = e.Description;

	Utils.ajaxCall('/exlt/EXLT130API/LiteCallUpdate', JSON.stringify(body), function (data) {
		console.log(data);
		EXLT130T_ProgressBar(false);
	}, EXLT130T_ProgressBar(true), null, (result) => {

	});

}

EXLT130T_tooltip = () => {
	// tooltip
	$("#grid_EXLT130").kendoTooltip({
		filter: "td:nth-child(9), th",
		show: function(e){
			if(this.content.text() !=""){
				$('[role="tooltip"]').css("visibility", "visible");
			}
		},
		hide: function(){
			$('[role="tooltip"]').css("visibility", "hidden");
		},
		position: "right",
		width: 250,
		content: function(e){
			var element = e.target[0];
			if(element.offsetWidth < element.scrollWidth){
				return e.target.text();
			}else{
				return "";
			}
		}
	});
}