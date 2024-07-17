/***********************************************************************************************
 * Program Name : EXLT140T.jsp
 * Creator         :  yhnam
 * Create Date  : 2024.04.03
 * Description    : 콜 모니터링
 * Modify Desc  :
 * -----------------------------------------------------------------------------------------------
 * Date         | Updater        | Remark
 * -----------------------------------------------------------------------------------------------
 * 2024.03.26     yhnam         최초생성
 ************************************************************************************************/

// session
var EXLT140_userInfo;

// grid
var EXLT140_gridData;
var EXLT140_popParam = {};
var record = 0;

$(document).ready(function () {
	
	arrSocketNumber = [];
	tempNumber = [];
	
	$("#EXLT140T_title").text($(".k-tabstrip-items .k-state-active .k-link").eq(0).text());
	
	// 서비스
//	var items = [
//        { text: "V.L IN", 	value: "i" },
//        { text: "V.L OUT", 	value: "o" },
//    ];
//	kendoDropDownList_init("EXLT140_select1", items);

	EXLT140_userInfo = GLOBAL.session.user;
	
	$("#grid_EXLT140").kendoGrid({
        dataSource: [],
        noRecords: {
            template: `<div class="nodataMsg"><p>해당 목록이 없습니다.</p></div>`
        },
        autoBind: false,
		sortable: true,
		scrollable: true,
		change: function(e) {
//			console.log(this.select());
		},
		dataBound: EXLT140_onDataBound,
        columns: [
		      { width: 20,  title: 'No', template: "#= ++record #", attributes: {"class": "k-text-center"}}
//			, { width: 100, field:"StartTime", title: '통화 시작', attributes: {"class": "k-text-left"} }
			, { width: 65, field:"NumberName", title: '서비스 번호', attributes: {"class": "k-text-center"}
				, template: function (dataItem) {
					return (dataItem.IsServiceNumber) ? "<span class=''>" + dataItem.NumberName + "</span>" : "<span class='col_gray'>" + dataItem.NumberName + "</span>";
				}
			}
			, { width: 65, field:"CallDirectionName", title: '통화 유형', attributes: {"class": "k-text-center"}}
			, { width: 65, field:"RemoteNumber", title: '고객 번호', attributes: {"class": "k-text-center"}}
//			, { width: 65, field:"StartTime", title: '통화여부', attributes: {"class": "k-text-center"}}
			, { width: 65, field:"CallSecond", title: '통화 시간(초)', attributes: {"class": "k-text-center"}}
			, { width: 65, field:"StatusName", title: '상태', attributes: {"class": "k-text-center"}}
		],
		dataBinding: function() {
	          record = 0;
	        }
      });
	
    EXLT140_gridData = $("#grid_EXLT140").data("kendoGrid");
    EXLT140_gridData.tbody.on('dblclick', EXLT140_fnDblclick);
    
    EXLT140_fnResize();

    EXLT140_fnSearch();

    $(".EXLT140_input").on("keyup",function(key){
		if(key.keyCode == 13) {
			EXLT140_fnSearch();
		}
	});
    
    setInterval(function() {
    	numberSetInterval();
	}, 1000);
});

//==============================
//					기타 화면 기능 start
//==============================
function kendoDropDownList_init(id, items)
{
	var buttonGroup = $("#"+id).kendoDropDownList({
		dataTextField: "text",
		dataValueField: "value",
		dataSource: items
    }).data("kendoDropDownList");
	
	return buttonGroup;
}

// resize
function EXLT140_fnResize() {
	let screenHeight = $(window).height();
	let screenWidth = $(window).width();
	
	//그리드 높이 조절
	EXLT140_gridData.element.find('.k-grid-content').css('height', screenHeight - 350);

	// grid reSize
	$(window).on({
		'resize': function() {
			EXLT140_gridData.element.find('.k-grid-content').css('height', screenHeight - 350);
		},
	});
}

// grid 검색조건 엔터
function EXLT140_fnKeyup(){
	$("#EXLT140_usrId").on("keyup", function (e) {
        if (e.keyCode == 13) {
            EXLT140_fnSearch();
        }
    });
}

// grid row 더블클릭
function EXLT140_fnDblclick()
{

}
//==============================
//					기타 화면 기능 end
//==============================

//==============================
//					grid 조회부분 start
//==============================
// grid 조회
function EXLT140_fnSearch() {

	Utils.ajaxCall('/exlt/EXLT140TAPI', "", function (data) {

		if(data != null && data.modelAndView.status == "OK" && data.apiKey != null && data.apiKey != "" && Utils.isNotNull(data.apiUrl)){
			let apiUrl = data.apiUrl;
			const url = "wss://"+apiUrl+"/ws";
			const token = data.apiKey;
			var param = {};

			param = {
		        // System : "Bona2"
		        System : EXLT140_userInfo.systemIdx
		        // , Tenant : "DMO"
		        , Tenant : EXLT140_userInfo.tenantPrefix
		    };
			Utils.webSocketConnect(url, token, null, "LiteMonitoring", "Call", "Start", param, webSocketOnmessage, webSocketOnerror);

		} else {
			Utils.alert("조회된 내역이 없습니다.", ()=> {return EXLT140_gridData.dataSource.data([]);});
			return;
		}
	});
}

var arrSocketNumber = [];
function webSocketOnmessage(event) {
    const data = JSON.parse(event.data);
    console.log("webSocketOnmessage :", data);

    if(data.ResultCode == "0000")
    {
    	if(data.Name == "LiteMonitoring")
	    {
    		if(Utils.isNotNull(data.ResultCount) && Utils.isNotNull(data.ResultList))
    		{
    			var resultData = data.ResultList;
    			
    			EXLT140_gridData.dataSource.data(resultData);

    			// 삭제
    			arrSocketNumber.forEach(function(item1, index1) {
    				var isCheck = false;
    				resultData.forEach(function(item2, index2) {
        				if(item1 == item2.RemoteNumber) isCheck = true;
    				});
    				
    				if(!isCheck) arrSocketNumber.splice(index1, 1);
				});

    			// 추가
    			resultData.forEach(function(item1, index1) {
    				var isCheck = false;
    				arrSocketNumber.forEach(function(item2, index2) {
        				if(item1.RemoteNumber == item2) isCheck = true;
    				});
    				
    				if(!isCheck && Utils.isNotNull(item1.StartTime))
    				{
    					arrSocketNumber.push(item1.RemoteNumber);
    					tempNumberPush(item1.RemoteNumber, item1.StartTime);
    				}
				});

    		} else {
    			arrSocketNumber = [];
    			EXLT140_gridData.dataSource.data([]);
    		}
	    }

    } else if(data.ResultCode == "9001" || data.ResultCode == "9002") {
    	console.log("토큰 재발급 필요");
    } else {
	
	}
}

function webSocketOnerror(event) {
    const data = JSON.parse(event.data);
    console.log("webSocketOnerror :", data);
    
    if(data.Name == "LiteMonitoring")
    {

    }
}

function EXLT140_onDataBound(EXLT140_e){
	
}

function tempNumberPush(remoteNumber, startTime)
{
	var isCheck = false;
	var time = 0;
	if(Utils.isNotNull(startTime))
	{
		const now = new Date();
		const standardTime = new Date(startTime);
		const diffMSec = now.getTime() - standardTime.getTime();
		time = parseInt(diffMSec / 1000);
	}

	tempNumber.forEach(function(item, index) {
		if(item.RemoteNumber == remoteNumber) isCheck = true;
	});

	if(!isCheck) tempNumber.push({RemoteNumber : remoteNumber, time : time});
}

var tempNumber = [];
function numberSetInterval()
{
	if(tempNumber.length > 0)
	{
		var tempCount = 0;
		for(var i=0; i<tempNumber.length; i++)
		{
			var check = false;
			var data = tempNumber[i];
			data.time = (data.time + 1);

			for(var z=0; z<arrSocketNumber.length; z++)
			{
				var data2 = arrSocketNumber[z];
				if(data.RemoteNumber == data2) check = true;
			}

			if(!check)
			{
				tempNumber.splice(i - tempCount, 1);
				tempCount++;
			} else {
				for(var v=0; v<EXLT140_gridData._data.length; v++)
				{
					if(EXLT140_gridData._data[v].RemoteNumber == data.RemoteNumber) EXLT140_gridData._data[v].set("CallSecond", data.time);
				}
			}
		}
	}
}
//==============================
//					grid 조회부분 end
//==============================
