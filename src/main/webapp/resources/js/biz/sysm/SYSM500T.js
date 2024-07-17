1/***********************************************************************************************
 * Program Name : 태넌트 그룹 기본정보(SYSM500T.js)
 * Creator      : yhnam
 * Create Date  : 2024.02.08
 * Description  : 사용자활동내역
 * Modify Desc  : 
 * -----------------------------------------------------------------------------------------------
 * Date         | Updater        | Remark
 * -----------------------------------------------------------------------------------------------
 * 2024.02.08     yhnam            최초작성   
 ************************************************************************************************/

var SYSM500T_grdSYSM500T;
var SYSM500T_cmmCodeList;

$(document).ready(function () {

	$("#SYSM500T_title").text($(".k-tabstrip-items .k-state-active .k-link").eq(0).text());

	SYSM500T_fnSelectCombo();
	SYSM500T_fnSetInit();
	SYSM500T_createGrid();
});

// 초기 설정
function SYSM500T_fnSetInit()
{
	
}

//공통코드 조회
function SYSM500T_fnSelectCombo()
{
	
}

// 그리드 생성
function SYSM500T_createGrid()
{
	$("#grdSYSM500T").kendoGrid({
		dataSource:{
			transport: {
				read : function (options) {

					var param = {
							
					};

					$.extend(param, options.data);

					Utils.ajaxCall("/sysm/SYSM500SEL01", JSON.stringify(param), function (result) {
						let list = JSON.parse(result.SYSM500VOInfo);
						SYSM500T_grdSYSM500T.dataSource.data(list);
					});
				}
			},
			schema : {
				type: "json",
				model: {
					fields: {
						tenantPrefix		: { field: "tenantPrefix", 	type: "string" },
//						originTenantPrefix	: { field: "originTenantPrefix", 	type: "string" },
						dataFrmId			: { field: "dataFrmId", 	type: "string" },
						url					: { field: "url", 			type: "string" },
						paramData			: { field: "paramData", 	type: "string" },
						resultType			: { field: "resultType", 	type: "string" },
						errorMsg			: { field: "errorMsg", 		type: "string" },
//						regrId				: { field: "regrId", 		type: "string" },
						originRegrId		: { field: "originRegrId", 	type: "string" },
						regDtm				: { field: "regDtm", 		type: "string" },
						authCheck			: { field: "authCheck", 	type: "string" },
					}
				}
			}
        },
		autoBind: false,
		sortable: true,
		noRecords: { template: "조회 결과가 없습니다."},
		scrollable: true,
		dataBound: SYSM500T_onDataBound,
		columns: [
			{
			    field: "tenantPrefix",
			    title: "테넌트ID",
			    width: 20,
			    attributes: {"class": "k-text-center"}
			},
//			{
//			    field: "originTenantPrefix",
//			    title: "테넌트ID",
//			    width: 20,
//			    attributes: {"class": "k-text-center"}
//			},
			{
			    field: "dataFrmId",
			    title: "메뉴프레임ID",
			    width: 30,
			    attributes: {"class": "k-text-center"}
			},{
			    field: "url",
			    title: "URL",
			    width: 70,
			    attributes: {"class": "k-text-center"},
			},{
			    field: "paramData",
			    title: "파라미터 data",
			    width: 150,
			    attributes: {"class": "k-text-left"}
			},{
			    field: "resultType",
			    title: "결과",
			    width: 20,
			    attributes: {"class": "k-text-center"}
			},{
			    field: "errorMsg",
			    title: "오류 메세지",
			    width: 400,
			    attributes: {"class": "k-text-left"}
			},{
			    field: "originRegrId",
			    title: "등록자ID",
			    width: 30,
			    attributes: {"class": "k-text-center"}
			}
//			,{
//			    field: "regrId",
//			    title: "등록자ID",
//			    width: 30,
//			    attributes: {"class": "k-text-center"}
//			}
			,{
			    field: "regDtm",
			    title: "등록일자",
			    width: 50,
			    attributes: {"class": "k-text-center"}
			}
			,{
			    field: "authCheck",
			    title: "권한여부",
			    width: 40,
			    attributes: {"class": "k-text-center"},
			    template: function (dataItem) {
		        	var text = "";
		        	if(Utils.isNull(dataItem.authCheck)) text = '메뉴권한없음'
		        	return text;
		        }
			}
		]
	});

	SYSM500T_grdSYSM500T = $("#grdSYSM500T").data("kendoGrid");

	//그리드 높이 조절
	let SYSM500T_screenHeight = $(window).height();
	SYSM500T_grdSYSM500T.element.find('.k-grid-content').css('height', SYSM500T_screenHeight - 400);

	// grid reSize
	$(window).on({
		'resize': function() {
			SYSM500T_grdSYSM500T.element.find('.k-grid-content').css('height', SYSM500T_screenHeight - 400);
		},
	});
	
	SYSM500T_fnSearchList();
}

// 그리드 조회
function SYSM500T_fnSearchList()
{
	let SYSM500T_data = { 

	};

	let SYSM500T_jsonStr = JSON.stringify(SYSM500T_data);

	SYSM500T_grdSYSM500T.dataSource.transport.read(SYSM500T_jsonStr);
}

function SYSM500T_onDataBound(SYSM500T_e)
{
	let grid = SYSM500T_e.sender;
	$.each(SYSM500T_grdSYSM500T.items(), function (index, item) {
		var rowDataItem = grid.dataItem(item);
		if(Utils.isNull(rowDataItem.authCheck)) $(this).addClass("SYSM500T_authX");
		if(Utils.isNull(rowDataItem.resultType) || rowDataItem.resultType == "실패") $(this).addClass("SYSM500T_error");
	});
	
	var rows = grid.items();
	rows.off("click").on("click", function (e) {
		var dataItem = grid.dataItem(this);
        var cellIndex = $(e.target).index();

        if(cellIndex == 1 || cellIndex == 2 || cellIndex == 3 || cellIndex == 5 || cellIndex == 6)
        {
//        	window.navigator.clipboard.writeText($(e.target)[0].innerText).then(() => {Utils.alert("복사 되었습니다.");});
        	console.log($(e.target)[0].innerText);
        }
	});
}