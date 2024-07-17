1/***********************************************************************************************
 * Program Name : 태넌트 그룹 기본정보(OPMT200T.js)
 * Creator      : yhnam
 * Create Date  : 2024.02.26
 * Description  : 비주얼레터링 관리
 * Modify Desc  : 
 * -----------------------------------------------------------------------------------------------
 * Date         | Updater        | Remark
 * -----------------------------------------------------------------------------------------------
 * 2024.02.26     yhnam            최초작성   
 ************************************************************************************************/
var OPMT200T_grdOPMT200T;

//공통코드
var OPMT200T_cmmCodeList;

var OPMT200T_userInfo = GLOBAL.session.user;

var contentBtnFormSize = 0;

var OPMT200T_fileCheck = false;

$(document).ready(function () {

	$("#OPMT200T_title").text($(".k-tabstrip-items .k-state-active .k-link").eq(0).text());
	
	kendoDropDown_init("OPMT200_systemIdx", "OPMT200_tenantPrefix", "OPMT200_visualType", "전체", "");

	OPMT200T_init();

	setTimeout(function() {

		if(OPMT200T_userInfo.originUsrGrd == "00" && OPMT200T_userInfo.tenantPrefix == "SYS")
		{
//			$("#OPMT200_tenantPrefix").data("kendoDropDownList").enable(false);
			$("#OPMT200_systemIdx").change(function() {

				var idx = $(this).val();
				if(Utils.isNull(idx)) idx = 0;
				var param = {
					systemIdx : idx
				};

				Utils.ajaxCall('/opmt/OPMT200SEL03',  JSON.stringify(param), function(OPMT200SEL03_data){
					let data = JSON.parse(OPMT200SEL03_data.OPMT200Info);

					data.unshift({ tenantName: "전체",  tenantPrefix: ""});
					let OPMT200_dropDownData_tenantPrefix = $("#OPMT200_tenantPrefix").kendoDropDownList({
						dataTextField: "tenantName",
						dataValueField: "tenantPrefix",
						dataSource: data
					}).data("kendoDropDownList");

					setTimeout(function() {
						$("#OPMT200_tenantPrefix").data("kendoDropDownList").select(0);
						$("#OPMT200_tenantPrefix").data("kendoDropDownList").enable(true);
					}, 100);
				});
			});
		} else {
			setTimeout(function() {
				$("#OPMT200_systemIdx").data("kendoDropDownList").enable(false);
				$("#OPMT200_tenantPrefix").data("kendoDropDownList").enable(false);
			}, 100);
		}

	}, 200);
});

$(window).resize(function() {
	$("#OPMT100_editFormArea").data("kendoWindow").center();
});

function OPMT200T_init()
{
	$('.colorpicker').each( function() {
         
     $(this).minicolors({
       control: $(this).attr('data-control') || 'hue',
       defaultValue: $(this).attr('data-defaultValue') || '',
       format: $(this).attr('data-format') || 'hex',
       keywords: $(this).attr('data-keywords') || '',
       inline: $(this).attr('data-inline') === 'true',
       letterCase: $(this).attr('data-letterCase') || 'lowercase',
       opacity: $(this).attr('data-opacity'),
       position: $(this).attr('data-position') || 'bottom',
       swatches: $(this).attr('data-swatches') ? $(this).attr('data-swatches').split('|') : [],
       change: function(value, opacity) {
    	 let color = value;
    	 let opc = opacity;
         if( !value )
        {
        	 $(this).next().find(".minicolors-swatch-color").css("background-color", "");
        	 $(this).parent().next().find(".minicolors-swatch-color").css("background-color", "");
        	 return;
        }

         $(this).next().find(".minicolors-swatch-color").css("background-color", color);
         $(this).parent().next().find(".minicolors-swatch-color").css("background-color", color);

         if( opacity )
	    {
	    	 value += ', ' + opacity;
	    	 $(this).next().find(".minicolors-swatch-color").css("opacity", opc);
	    	 $(this).parent().next().find(".minicolors-swatch-color").css("opacity", opc);
	    }
         if( typeof console === 'object' ) {
//           console.log(value);
         }
       },
       theme: 'bootstrap'
         });
	 
	}); 
 
	
	// 유효성 검사
	$("#OPMT200_editForm").kendoValidator(function(e) {
       if (!$(this).data("kendoValidator").validate()) {
           e.preventDefault();
       }
	});
	// 유효성 검사
	   
	// 안내문구정렬 버튼
	var items = [
        { text: "왼쪽", 	value: "left" },
        { text: "가운데", value: "center" },
    ];
	kendoButtonGroup_init("OPMT200_form_descriptionSort", items);
	// 안내문구정렬 버튼
	
	// 안내문구정렬 버튼
	var items = [
        { text: "작게", value: "small" },
        { text: "보통", value: "default" },
        { text: "크게", value: "big" },
    ];
	kendoButtonGroup_init("OPMT200_form_descriptionSize", items);
	// 안내문구정렬 버튼

	// 입력폼
	$("#OPMT200_editFormArea").kendoWindow({
        width: $(window).width() > 550 ? "650" : "280",
        title: "컨텐츠관리",
        visible: false,
        actions: ["Close"],
        modal: true
    });
	// 입력폼

	setTimeout(function() {
		OPMT200T_createGrid();
	}, 500);
}

function kendoButtonGroup_init(id, items)
{
	var buttonGroup = $("#"+id).kendoButtonGroup({
        // 버튼 항목 정의
        items: items,
        index: 0 // 초기 선택 버튼 인덱스 (선택 사항)
    }).data("kendoButtonGroup");
	
	return buttonGroup;
}

function kendoDropDown_init(systemId, tenantPrefixId, visualTypeId, firstName, firstVaule)
{
	// 시스템 콤보 박스
	Utils.ajaxCall('/opmt/OPMT200SEL02',  JSON.stringify({}), function(OPMT200SEL02_data){
		let data = JSON.parse(OPMT200SEL02_data.OPMT200Info);

		var systemIdx = "";
		if(OPMT200T_userInfo.tenantPrefix != "SYS" && data.length > 0) systemIdx = data[0].systemIdx;
		
		data.unshift({ systemName: firstName,  systemIdx: firstVaule});
		let OPMT200_dropDownData_systemIdx = $("#"+systemId).kendoDropDownList({
			dataTextField: "systemName",
			dataValueField: "systemIdx",
			dataSource: data
		}).data("kendoDropDownList");
		
		$("#"+systemId).data("kendoDropDownList").value(systemIdx);
		
		// OPMT200_dropDownData_visualType change event
		OPMT200_dropDownData_systemIdx.bind("change", function (e) {
			let value_systemIdx = $("#"+systemId).data("kendoDropDownList").value();
		});
	});
	// 시스템 콤보 박스
	
	// 테넌트 콤보 박스
	Utils.ajaxCall('/opmt/OPMT200SEL03',  JSON.stringify({}), function(OPMT200SEL03_data){
		let data = JSON.parse(OPMT200SEL03_data.OPMT200Info);

		var tenantPrefix = "";
		if(OPMT200T_userInfo.tenantPrefix != "SYS" && data.length > 0) tenantPrefix = data[0].tenantPrefix;

		data.unshift({ tenantName: firstName,  tenantPrefix: firstVaule});
		let OPMT200_dropDownData_tenantPrefix = $("#"+tenantPrefixId).kendoDropDownList({
			dataTextField: "tenantName",
			dataValueField: "tenantPrefix",
			dataSource: data
		}).data("kendoDropDownList");
		
		$("#"+tenantPrefixId).data("kendoDropDownList").value(tenantPrefix);
		
		// OPMT200_dropDownData_visualType change event
		OPMT200_dropDownData_tenantPrefix.bind("change", function (e) {
			let value_tenantPrefix = $("#"+tenantPrefixId).data("kendoDropDownList").value();
		});
	});
	// 테넌트 콤보 박스
	
	// 카테고리 콤보 박스
	let visualType_dataSource = new kendo.data.DataSource({
		data: [
			{ Value: firstVaule, Text: firstName},
			{ Value: "p", Text: "프롤로그"},
			{ Value: "e", Text: "에필로그"},
		],
	});
	   
	let OPMT200_dropDownData_visualType = $("#"+visualTypeId).kendoDropDownList({
		dataTextField: "Text",
		dataValueField: "Value",
		dataSource: visualType_dataSource
	}).data("kendoDropDownList");
	
	// OPMT200_dropDownData_visualType change event
	OPMT200_dropDownData_visualType.bind("change", function (e) {
		let value_visualType = $("#"+visualTypeId).data("kendoDropDownList").value();
	});
	// 카테고리 콤보 박스	
	
	if(OPMT200T_userInfo.originUsrGrd != "00")
	{
		setTimeout(function() {
			$("#OPMT200_systemIdx").data("kendoDropDownList").enable(false);
			$("#OPMT200_tenantPrefix").data("kendoDropDownList").enable(false);
		}, 100);
	}
}

// grid 생성
function OPMT200T_createGrid(){

	$("#grdOPMT200T").kendoGrid({
		dataSource:{
			transport: {
				read : function (options) {

					var systemIdx = "";
					var tenantPrefix = "";
					if(OPMT200T_userInfo.originUsrGrd != "00" && OPMT200T_userInfo.tenantPrefix != "SYS" && Utils.isNull($("#OPMT200_systemIdx").data("kendoDropDownList").value()))
					{
						systemIdx = OPMT200T_userInfo.systemIdx;
					} else systemIdx = ($("#OPMT200_systemIdx").data("kendoDropDownList").value() != "") ? $("#OPMT200_systemIdx").data("kendoDropDownList").value() : null;
					
					if(OPMT200T_userInfo.originUsrGrd != "00" && OPMT200T_userInfo.tenantPrefix != "SYS" && Utils.isNull($("#OPMT200_tenantPrefix").data("kendoDropDownList").value()))
					{
						tenantPrefix = OPMT200T_userInfo.tenantPrefix;
					} else tenantPrefix = $("#OPMT200_tenantPrefix").data("kendoDropDownList").value();
					
					let OPMT200T_data = { 
						systemIdx: systemIdx
						, tenantPrefix : tenantPrefix
						, category : $("#OPMT200_visualType").data("kendoDropDownList").value()
						, keyword : $("#OPMT200_keyword").val()
					};

					OPMT200T_grdOPMT200T.dataSource.page(1);

					Utils.ajaxCall("/opmt/OPMT200SEL01", JSON.stringify(OPMT200T_data), function (result) {
						if(Utils.isNotNull(result) && Utils.isNotNull(result.OPMT200VOInfo))
						{
							let list = JSON.parse(result.OPMT200VOInfo);
							OPMT200T_grdOPMT200T.dataSource.data(list);
						}


						let menuInfo = Utils.getMenuInfo("OPMT200T")
						MAINFRAME.fnInitBtnAuthList(menuInfo.pathPre ,menuInfo.pathid,menuInfo.menuId ) //그리드 내에 권한체크가 필요하면 사용.

						window.kendo.ui.progress($("#grdOPMT200T"), false);
					});
				}
				, cache: false
			},
			schema : {
				type: "json",
				model: {
					fields: {
						systemname		: { field: "systemname", type: "string" },
						tenantPrefix	: { field: "tenantPrefix", type: "string" },
						imgPath			: { field: "imgPath", type: "string" },
						category		: { field: "category", type: "string" },
						title			: { field: "title", type: "string" },
						telnum			: { field: "telnum", type: "string" },
						regdate			: { field: "regdate", type: "string" },
						contentSeq		: { field: "contentSeq", type: "string" },
						contentResult	: { field: "contentResult", type: "string" },
						fileyn			: { field: "fileyn", type: "string" },
					}
				}
			}
        },
		autoBind: false,
		sortable: true,
//		selectable: 'multiple',
		noRecords: { template: `<div class="nodataMsg"><p>해당 목록이 없습니다.</p></div>` },
		pageable: {
			refresh:false
			, pageSizes:[ 15, 20, 30, 50, 100 ]
			, buttonCount:10
			, pageSize : 6
		},
		scrollable: true,
		dataBound: OPMT200T_onDataBound,
		excel: {
	        fileName: "비주얼레터링관리_"+ Utils.getNowDateTime() +".xlsx",
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
			    field: "systemname",
			    title: "시스템",
			    width: 120,
			    attributes: {"class": "k-text-center"}
			},
			{
			    field: "tenantPrefix",
			    title: "테넌트",
			    width: 120,
			    attributes: {"class": "k-text-center"}
			},
			{
			    field: "imgPath",
			    title: "등록이미지",
			    width: 120,
			    excelTemplateYn: "N",
			    attributes: {"class": "k-text-center"},
			    template: function (dataItem) {
			    	var today = new Date();
			    	var hours = ('0' + today.getHours()).slice(-2); 
			    	var minutes = ('0' + today.getMinutes()).slice(-2);
			    	var seconds = ('0' + today.getSeconds()).slice(-2); 
			    	var timeString = hours + ':' + minutes  + ':' + seconds;
			    	if(dataItem.imgPath) return '<div><img src="vlContentImg\\'+dataItem.imgPath+'?t='+timeString+'" style="width: 130px;height: 130px;"></div>';
//			    	if(dataItem.imgPath) return '<div><img src="https://bcs.cloudcc.co.kr:33443/Assets/vl/DMO/202304/4f50cb7c-9970-4a90-bb57-cc5cc659ce63.jpg" style="width: 95%;"></div>';
			    	else return "";
	            }
			},
			{
			    field: "category",
			    title: "카테고리",
			    excelTemplateYn: "N",
			    width: 120,
			    attributes: {"class": "k-text-center"},
			    template: function (dataItem) {
			    	if(dataItem.category == "p") return '<div style="color: #b20000;">프롤로그</div>';
			    	else if(dataItem.category == "e") return '<div style="color: #3522b7;">에필로그</div>';
			    	else return "";
	            }
			},
			{
			    field: "title",
			    title: "컨텐츠이름",
			    excelTemplateYn: "N",
			    width: 150,
			    attributes: {"class": "k-text-left"},
			    template: function (dataItem) {
			    	return "<button type='button' class='btnRefer_default' title='상세보기' onclick='OPMT200T_fnContentResultSearch("+dataItem.contentSeq+")'>"+dataItem.title+"</button>";
	            }
			},
			{
			    field: "telnum",
			    title: "전화번호",
			    width: 120,
			    attributes: {"class": "k-text-center"}
			},
			{
			    field: "regdate",
			    title: "등록일시",
			    width: 120,
			    attributes: {"class": "k-text-center"}
			},
			{
			    field: "contentSeq",
			    title: "고유번호",
			    width: 120,
			    attributes: {"class": "k-text-center"}
			},
			{
			    field: "contentResult",
			    title: "결과보기",
			    excelTemplateYn: "N",
			    width: 120,
			    attributes: {"class": "k-text-center"},
			    template: function (dataItem) {
			    	return "<button type='button' class='k-icon k-i-search' title='상세보기' onclick='openPopup("+dataItem.contentSeq+")'></button>";
	            }
			},
			{
			    field: "applyYn",
			    title: "적용",
			    excelTemplateYn: "N",
			    width: 120,
			    attributes: {"class": "k-text-center"},
			    template: function (dataItem) {
			    	if(dataItem.applyYn == "Y") return '<div style="font-weight: 900;color: #0070c0;font-size: larger;">적용중</div>';
			    	else return '<button type="button" class="btnRefer_default" onclick="OPMT200T_fnContentApply('+dataItem.contentSeq+')" data-auth-chk="Y" data-auth-type="UPDATE" data-auth-id="OPMT200T"><span>적용</span></button>'
	            }
			},
		]
	});

	OPMT200T_grdOPMT200T = $("#grdOPMT200T").data("kendoGrid");

	//그리드 높이 조절
	let OPMT200T_screenHeight = $(window).height();
	$('#OPMT200T_divisonCol').css('height', OPMT200T_screenHeight-320);
	OPMT200T_grdOPMT200T.element.find('.k-grid-content').css('height',  $('#OPMT200T_divisonCol').height()-110);

	setTimeout(function() {
		OPMT200T_fnSearch();
	}, 100);
}

function OPMT200T_onDataBound(OPMT200T_e)
{
	var grid = OPMT200T_e.sender;
	var rows = grid.items();
	rows.off("dblclick").on("dblclick", function (e) {

		kendoDropDown_init("OPMT200_form_systemIdx", "OPMT200_form_tenantPrefix", "OPMT200_form_visualType", "선택", "");

		var dataItem = grid.dataItem(this);
		var param = {
			contentSeq : dataItem.contentSeq
		};

		Utils.ajaxCall("/opmt/OPMT200SEL01", JSON.stringify(param), function (result) {

			let list = JSON.parse(result.OPMT200VOInfo);
	    	if(result.modelAndView.status == "OK")
	    	{
	    		setTimeout(function(){
	    			if(result.OPMT200VOButtonInfo) list[0]["buttonList"] = JSON.parse(result.OPMT200VOButtonInfo);
	    			OPMT200_fnOpenEditForm(list[0]);
	    		}, 50);

	    	} else {
	    		Utils.alert(result.modelAndView.msg);
	            return;
	    	}
	    });
	});
}

//그리드 조회
function OPMT200T_fnSearch(){
	
	window.kendo.ui.progress($("#grdOPMT200T"), true);

	OPMT200T_grdOPMT200T.dataSource.data([]);

	OPMT200T_grdOPMT200T.dataSource.transport.read({});
}

function openPopup(contentSeq) {
    let _width  = '400';
//    let _height = '610';
    let _height = '805';
    let _left   = Math.ceil(( window.screen.width - _width )/2);
    let _top    = Math.ceil(( window.screen.height - _height )/2);

    let _url = '/visual/opmt/OPMT201T?contentSeq='+contentSeq;

    //base size
    window.open(_url, "", 'width='+ _width +', height='+ _height +', left=' + _left + ', top='+ _top );
}

// 결과보기
function OPMT200T_fnContentResultSearch(contentSeq)
{
	kendoDropDown_init("OPMT200_form_systemIdx", "OPMT200_form_tenantPrefix", "OPMT200_form_visualType", "선택", "");

	var param = {
		contentSeq : contentSeq
	};

	Utils.ajaxCall("/opmt/OPMT200SEL01", JSON.stringify(param), function (result) {

		let list = JSON.parse(result.OPMT200VOInfo);
    	if(result.modelAndView.status == "OK")
    	{
    		setTimeout(function(){
    			if(result.OPMT200VOButtonInfo) list[0]["buttonList"] = JSON.parse(result.OPMT200VOButtonInfo);
    			OPMT200_fnOpenEditForm(list[0]);
    		}, 50);

    	} else {
    		Utils.alert(result.modelAndView.msg);
            return;
    	}
    });
}

// 적용
function OPMT200T_fnContentApply(contentSeq)
{
	var param = {
		contentSeq : contentSeq
	};

	Utils.confirm("해당("+contentSeq+") 데이터를 적용 하시겠습니까?", function () {
		Utils.ajaxCall("/opmt/OPMT200INS04", JSON.stringify(param), function (result) {
	    	if(result.modelAndView.status == "OK")
	    	{
	    		Utils.alert("적용 되었습니다.");

	    		setTimeout(function(){
					$(".k-alert .k-dialog-buttongroup .k-button").click();
					$('#OPMT200_editFormArea').data('kendoWindow').close();
					OPMT200T_fnSearch();
				}, 1000);

	    	} else {
	    		Utils.alert("다시 한번 확인해 주세요.");
	            return;
	    	}
	    });
	});
}

// 추가
function OPMT200T_fnContentAdd()
{
	kendoDropDown_init("OPMT200_form_systemIdx", "OPMT200_form_tenantPrefix", "OPMT200_form_visualType", "선택", "");

	setTimeout(function(){
		OPMT200_fnOpenEditForm();
	}, 300);
}

// 추가 폼
function OPMT200_fnOpenEditForm(item) {	
	if(item) window.kendo.ui.progress($("#grdOPMT200T"), true);

	setTimeout(function(){
		OPMT200_fnEditFormReset();

		if(GLOBAL.session.user.usrGrd != "00")
		{
			$("#OPMT200_form_systemIdx").data("kendoDropDownList").select(1);
			$("#OPMT200_form_tenantPrefix").data("kendoDropDownList").select(1);
			$("#OPMT200_form_systemIdx").data("kendoDropDownList").enable(false);
			$("#OPMT200_form_tenantPrefix").data("kendoDropDownList").enable(false);
		}

		$('#OPMT200_editForm #OPMT200_editForm_btnSave').show();
	
		let saveType = "SAVE";
		if(item) {

			if(!item.contentSeq) {
				Utils.alert("데이터가가 유효하지 않습니다.");
				window.kendo.ui.progress($("#grdOPMT200T"), false);
				return;
			}

			saveType = "UPDT";
			$("#contentSeq").val(item.contentSeq);
			
			$("#OPMT200_form_systemIdx").data("kendoDropDownList").enable(false);
			$("#OPMT200_form_tenantPrefix").data("kendoDropDownList").enable(false);
			$("#OPMT200_form_visualType").data("kendoDropDownList").enable(false);

			// 수정
			var param = {
				systemIdx : item.systemIdx
			};
			Utils.ajaxCall('/opmt/OPMT200SEL03',  JSON.stringify(param), function(OPMT200SEL03_data){
				let data = JSON.parse(OPMT200SEL03_data.OPMT200Info);

				data.unshift({ tenantName: "전체",  tenantPrefix: ""});
				let OPMT200_dropDownData_tenantPrefix = $("#OPMT200_form_tenantPrefix").kendoDropDownList({
					dataTextField: "tenantName",
					dataValueField: "tenantPrefix",
					dataSource: data
				}).data("kendoDropDownList");

				setTimeout(function() {
					$("#OPMT200_form_tenantPrefix").data("kendoDropDownList").value(item.tenantPrefix);
				}, 100);
			});

			$("#OPMT200_form_systemIdx").data("kendoDropDownList").value(item.systemIdx);
//			$("#OPMT200_form_tenantPrefix").data("kendoDropDownList").value(item.tenantPrefix);
			$("#OPMT200_form_visualType").data("kendoDropDownList").value(item.category);
			$("#OPMT200_form_title").val(item.title);
			$("#OPMT200_form_descriptionContent").val(item.guideContent);

			var descriptionSortIdx = 0;
			if(item.guideSort == "center") descriptionSortIdx = 1;
			$("#OPMT200_form_descriptionSort").data("kendoButtonGroup").select(descriptionSortIdx);

			var descriptionSize = 0;
			if(item.guideSize == "default") descriptionSize = 1;
			else if(item.guideSize == "big") descriptionSize = 2;
			$("#OPMT200_form_descriptionSize").data("kendoButtonGroup").select(descriptionSize);

			$("#OPMT200_form_telnum").val(item.telnum);
			$("#OPMT200_form_backgroudColor").val(item.backgroudColor);
			$("#OPMT200_form_backgroudColor").parent().next().find(".minicolors-swatch-color").css("background-color", item.backgroudColor);
			$("#OPMT200_form_backgroudFontColor").val(item.backgroudFontColor);
			$("#OPMT200_form_backgroudFontColor").parent().next().find(".minicolors-swatch-color").css("background-color", item.backgroudFontColor);
			$("#OPMT200_form_buttonColor").val(item.buttonColor);
			$("#OPMT200_form_buttonColor").parent().next().find(".minicolors-swatch-color").css("background-color", item.buttonColor);
			$("#OPMT200_form_buttonFontColor").val(item.buttonFontColor);
			$("#OPMT200_form_buttonFontColor").parent().next().find(".minicolors-swatch-color").css("background-color", item.buttonFontColor);

			if(item.buttonList)
			{
				let buttonList = item.buttonList;
				if(buttonList.sumButtonSize && buttonList.sumButtonTitle)
				{
					let sumButtonLinkList;
					if(buttonList.sumButtonLink) sumButtonLinkList = buttonList.sumButtonLink.split("▣");

					let sumButtonSizeList = buttonList.sumButtonSize.split("▣");
					let sumButtonTitleList = buttonList.sumButtonTitle.split("▣");
					
					let sumButtonUseynList = "";
					if(Utils.isNotNull(buttonList.sumButtonUseyn)) sumButtonUseynList = buttonList.sumButtonUseyn.split("▣");

					for(var i=0; i<sumButtonSizeList.length; i++)
					{
						OPMT200T_fnContentBtnForm();
					}

					setTimeout(function(){
						for(var i=0; i<sumButtonSizeList.length; i++)
						{
							$("#OPMT200T_buttonTitle"+i).val(sumButtonTitleList[i]);
	
							let buttonSizeIdx = 0;
							if(sumButtonSizeList[i] == "default") buttonSizeIdx = 1;
							else if(sumButtonSizeList[i] == "big") buttonSizeIdx = 2;
							$("#OPMT200_form_buttonSize"+i).data("kendoButtonGroup").select(buttonSizeIdx);
	
							$("#OPMT200T_buttonLink"+i).val(sumButtonLinkList[i]);
							
							if(sumButtonUseynList[i] == "Y") $("#OPMT200_form_useYn"+i).prop("checked", true);
							else $("#OPMT200_form_useYn"+i).prop("checked", false);
						}
					}, 10);
				}
			}

			$("#imgid").show();
			
			var today = new Date();
	    	var hours = ('0' + today.getHours()).slice(-2); 
	    	var minutes = ('0' + today.getMinutes()).slice(-2);
	    	var seconds = ('0' + today.getSeconds()).slice(-2); 
	    	var timeString = hours + ':' + minutes  + ':' + seconds;
			$("#imgid").attr("src", "vlContentImg\\"+item.imgPath+"?t="+timeString);
		} else {

			if(OPMT200T_userInfo.originTenantPrefix == "SYS" && OPMT200T_userInfo.originUsrGrd == "00")
			{
				$("#OPMT200_form_systemIdx").off("change").change(function() {

					$("#OPMT200_form_tenantPrefix").data("kendoDropDownList").select(0);

					var idx = $(this).val();
					if(Utils.isNull(idx)) idx = 0;
					var param = {
						systemIdx : idx
					};
	
					Utils.ajaxCall('/opmt/OPMT200SEL03',  JSON.stringify(param), function(OPMT200SEL03_data){
						let data = JSON.parse(OPMT200SEL03_data.OPMT200Info);
	
						data.unshift({ tenantName: "선택",  tenantPrefix: ""});
						let OPMT200_dropDownData_tenantPrefix = $("#OPMT200_form_tenantPrefix").kendoDropDownList({
							dataTextField: "tenantName",
							dataValueField: "tenantPrefix",
							dataSource: data
						}).data("kendoDropDownList");
					});
				});
			}
		}
		
		$("#saveType").val(saveType);

		$("#OPMT200_editForm").find('.k-form-error').hide();

		setTimeout(function(){ window.kendo.ui.progress($("#grdOPMT200T"), false); $("#OPMT200_editFormArea").data("kendoWindow").center().open(); }, saveType == "UPT" ? 500 : 0);
	}, 50);
}

function OPMT200_fnEditFormReset()
{
	OPMT200T_fileCheck = false;

	$("#saveType").val("");
	$("#contentSeq").val("");
	
	$("#OPMT200_form_systemIdx").data("kendoDropDownList").enable(true);
	$("#OPMT200_form_tenantPrefix").data("kendoDropDownList").enable(true);
	$("#OPMT200_form_visualType").data("kendoDropDownList").enable(true);

	$("#OPMT200_form_systemIdx").data("kendoDropDownList").value("");
	$("#OPMT200_form_tenantPrefix").data("kendoDropDownList").refresh();
	$("#OPMT200_form_tenantPrefix").data("kendoDropDownList").value("");
	$("#OPMT200_form_visualType").data("kendoDropDownList").value("");
	$("#OPMT200_form_title").val("");
	$("#OPMT200_form_descriptionContent").val("");
	$("#OPMT200_form_descriptionSort").data("kendoButtonGroup").select(0);
	$("#OPMT200_form_descriptionSize").data("kendoButtonGroup").select(0);
	$("#OPMT200_form_telnum").val("");
	
	$("#OPMT200_form_backgroudColor").val("");
	$("#OPMT200_form_backgroudColor").parent().next().find(".minicolors-swatch-color").css("background-color", "");
	$("#OPMT200_form_backgroudFontColor").val("");
	$("#OPMT200_form_backgroudFontColor").parent().next().find(".minicolors-swatch-color").css("background-color", "");
	$("#OPMT200_form_buttonColor").val("");
	$("#OPMT200_form_buttonColor").parent().next().find(".minicolors-swatch-color").css("background-color", "");
	$("#OPMT200_form_buttonFontColor").val("");
	$("#OPMT200_form_buttonFontColor").parent().next().find(".minicolors-swatch-color").css("background-color", "");

	$("#OPMT200_realFile").val("");

	$("#imgid").hide();

	$("#OPMT200T_fnContentBtnFormAdd").empty();
	contentBtnFormSize = 0;
}

//grid 엑셀 다운로드 체크
function OPMT200T_fnContentExcel() {
	let excelsize = OPMT200T_grdOPMT200T.dataSource.total();
	if(excelsize > 100000){
		let msg = '데이터량이 많아 프로그램이 종료 또는 오래 걸릴 수 있습니다. 진행하시겠습니까?';
		Utils.confirm(msg, OPMT200_settingExcelExport);
	}else OPMT200_settingExcelExport();
}

// grid 엑셀 설정
function OPMT200_settingExcelExport() {
//	var today = new Date();
//	var year = today.getFullYear();
//	var month = ('0' + (today.getMonth() + 1)).slice(-2);
//	var day = ('0' + today.getDate()).slice(-2);
//	var dateString = year + month  + day;
//	var excelNm = dateString + "_비주얼레터링관리";
//
//	OPMT200_excelExport(OPMT200T_grdOPMT200T, excelNm);
	
	OPMT200T_grdOPMT200T.saveAsExcel();
}

// grid 엑셀 다운로드
function OPMT200_excelExport(targetGrid, fileName) {
//    const pageSize = targetGrid.dataSource.view().length;
//    if (pageSize === 0) {
//        Utils.alert("조회된 내역이 없습니다.");
//        return;
//    }
//    const dataSourceTotal = targetGrid.dataSource.total();
//    targetGrid.dataSource.pageSize(dataSourceTotal);
//    targetGrid.bind("excelExport", function (e) {
//        e.workbook.fileName = fileName;
//        let sheet = e.workbook.sheets[0];
//
//        let setDataItem = {};
//        let selectableNum = 0;
//        if (this.columns[0].selectable) {
//            selectableNum = 1
//        }
//        if (this.columns[0].template === '#= ++record #') {
//            record = 0;
//        }
//        this.columns.forEach(function (item, index) {
//            if (Utils.isNotNull(item.template) && item.excelTemplateYn != "N") {
//                let targetTemplate = kendo.template(item.template);
//                let fieldName = item.field;
//                for (let i = 1; i < sheet.rows.length; i++) {
//                    let row = sheet.rows[i];
//                    setDataItem = {
//                        [fieldName]: row.cells[(index - selectableNum)].value
//                    }
//                    row.cells[(index - selectableNum)].value = targetTemplate(setDataItem);
//                }
//            }
//        })
//    });
//    targetGrid.saveAsExcel();
}

// 저장
function OPMT200_fnEditSave()
{
	if((!Utils.isNull($("#contentSeq").val()) && !Utils.isNull($('#OPMT200_realFile')[0].files[0]) && !OPMT200T_fileCheck) || (Utils.isNull($("#contentSeq").val()) && !OPMT200T_fileCheck))
	{
		Utils.alert("이미지를 다시 한번 등록해 주세요.");
//		return;
	}

	var formData = new FormData();
    formData.append('uploadimage', $('#OPMT200_realFile')[0].files[0]);

	var OPMT200_form_systemIdx = $("#OPMT200_form_systemIdx").data("kendoDropDownList").value();
	var OPMT200_form_tenantPrefix = $("#OPMT200_form_tenantPrefix").data("kendoDropDownList").value();
	var OPMT200_form_visualType = $("#OPMT200_form_visualType").data("kendoDropDownList").value();
	var OPMT200_form_title = $("#OPMT200_form_title").val();
	var OPMT200_form_descriptionContent = $("#OPMT200_form_descriptionContent").val();
	var OPMT200_form_descriptionSort = $("#OPMT200_form_descriptionSort").data("kendoButtonGroup").options.items[$("#OPMT200_form_descriptionSort").data("kendoButtonGroup").selectedIndices[0]].value;
	var OPMT200_form_descriptionSize = $("#OPMT200_form_descriptionSize").data("kendoButtonGroup").options.items[$("#OPMT200_form_descriptionSize").data("kendoButtonGroup").selectedIndices[0]].value;
	var OPMT200_form_telnum = $("#OPMT200_form_telnum").val();
	var OPMT200_form_backgroudColor = $("#OPMT200_form_backgroudColor").val();
	var OPMT200_form_backgroudFontColor = $("#OPMT200_form_backgroudFontColor").val();
	var OPMT200_form_buttonColor = $("#OPMT200_form_buttonColor").val();
	var OPMT200_form_buttonFontColor = $("#OPMT200_form_buttonFontColor").val();

	if(!OPMT200_form_systemIdx || !OPMT200_form_tenantPrefix || !OPMT200_form_visualType || !OPMT200_form_title || !OPMT200_form_backgroudColor || !OPMT200_form_backgroudFontColor)
	{
		Utils.alert("필수 값을 입력해 주세요.");
		return;
	}
	
	var OPMT200T_buttonTitle_check = true;
	var OPMT200T_buttonTitleList = [];
	$(".OPMT200T_buttonTitle").each( function(i) {
		if(!$(this).val()) OPMT200T_buttonTitle_check = false;
		OPMT200T_buttonTitleList.push({"buttonTitle" : $(this).val()});
	});

	var OPMT200_form_buttonSize_check = true;
	var OPMT200_form_buttonSizeList = [];
	$(".OPMT200_form_buttonSize").each( function(i) {
		var value = $(this).data('kendoButtonGroup').options.items[$(this).data('kendoButtonGroup').selectedIndices[0]].value;
		if(!value) OPMT200_form_buttonSize_check = false;
		OPMT200_form_buttonSizeList.push({"buttonSize" : value});
	});
	
	var OPMT200T_buttonLink_check = true;
	var OPMT200T_buttonLinkList = [];
	$(".OPMT200T_buttonLink").each( function(i) {
		if(!$(this).val()) OPMT200T_buttonLink_check = false;
		OPMT200T_buttonLinkList.push({"buttonLink" : $(this).val().replace(/ /g,"")});
	});
	
	var OPMT200T_buttonUseyn_check = true;
	var OPMT200T_buttonUseynList = [];
	$(".OPMT200T_buttonUseyn").each( function(i) {
		if(!$(this).val()) OPMT200T_buttonUseyn_check = false;
		OPMT200T_buttonUseynList.push({"buttonUseyn" : $(this).is(":checked") ? "Y" : "N"});
	});
	
	if(!OPMT200T_buttonTitle_check || !OPMT200_form_buttonSize_check || !OPMT200T_buttonLink_check || !OPMT200T_buttonUseyn_check)
	{
		Utils.alert("버튼 필수 값을 입력해 주세요.");
		return;
	}
	
	var OPMT200_form_contentSeq = 0;
	if($("#contentSeq").val()) OPMT200_form_contentSeq = $("#contentSeq").val() * 1;

	formData.append('OPMT200INS01_data',JSON.stringify({
		saveType : $("#saveType").val()
		, contentSeq : OPMT200_form_contentSeq
		, systemIdx : OPMT200_form_systemIdx
		, tenantPrefix : OPMT200_form_tenantPrefix
		, category : OPMT200_form_visualType
		, title : OPMT200_form_title
		, guideContent : OPMT200_form_descriptionContent
		, guideSort : OPMT200_form_descriptionSort 
		, guideSize : OPMT200_form_descriptionSize 
		, telnum : OPMT200_form_telnum
		, backgroudColor : OPMT200_form_backgroudColor.replace(/ /g,"")
		, backgroudFontColor : OPMT200_form_backgroudFontColor.replace(/ /g,"")
		, buttonColor : OPMT200_form_buttonColor.replace(/ /g,"")
		, buttonFontColor : OPMT200_form_buttonFontColor.replace(/ /g,"")
		, originAgentId : GLOBAL.session.user.originAgentId
		, originUsrGrd : GLOBAL.session.user.originUsrGrd
		, buttonTitleList : OPMT200T_buttonTitleList
		, buttonSizeList : OPMT200_form_buttonSizeList
		, buttonLinkList : OPMT200T_buttonLinkList
		, buttonUseynList : OPMT200T_buttonUseynList
		, uploadPath : "VL_CONTENT_IMG"
	}));

	Utils.ajaxCallFormData('/opmt/OPMT200INS01',formData,function(data){

		Utils.alert(data.msg);
		if(data.modelAndView.status == "OK")
		{
			setTimeout(function(){
				$(".k-alert .k-dialog-buttongroup .k-button").click();
				$('#OPMT200_editFormArea').data('kendoWindow').close();
				OPMT200T_fnSearch();
			}, 1000);

		} else console.log(data.errorMsg);

	});
}

// 버튼 추가
function OPMT200T_fnContentBtnFormAdd()
{
	if($(".contentBtnForm").length > 2)
	{
		Utils.alert("버튼은 3개까지 지원합니다.");
		return;
	}
	
	OPMT200T_fnContentBtnForm();
}

// 버튼 폼
function OPMT200T_fnContentBtnForm()
{
	var html = '<div class="contentBtnForm" id="OPMT200_form_button'+contentBtnFormSize+'" style="border: 1px solid #6563ff99;padding: 5px;margin-bottom: 2px;">';
	// 버튼 삭제 필요하면 주석 제거
//	html += '<button type="button" class="k-icon k-i-x-circle" title="상세보기" onclick="OPMT200T_fnContentBtnFormRemove(\'OPMT200_form_button'+contentBtnFormSize+'\')" style="position: absolute;margin-top: -13px;margin-left: 89%;"></button>';
	html += '<div class="input-group" style="display: flex;align-items: baseline;margin-bottom: 5px;">';
	html += '<span class="input-group-text fieldAfter" style="margin-right: 4px;font-weight: 900;">버튼이름</span>';
	html += '<input type="text" maxlength="15" class="vl-textbox OPMT200T_buttonTitle" id="OPMT200T_buttonTitle'+contentBtnFormSize+'" name="OPMT200T_buttonTitle'+contentBtnFormSize+'" autocomplete="off" placeholder="표시할 버튼명" style="width: 30% !important;margin-bottom: 0px !important;">';
	html += '<span class="input-group-text fieldAfter" style="margin-right: 4px;margin-left: 3%;font-weight: 900;">버튼크기</span>';
	html += '<div class="OPMT200_form_buttonSize" id="OPMT200_form_buttonSize'+contentBtnFormSize+'" name="OPMT200_form_buttonSize'+contentBtnFormSize+'" style="margin-bottom: 15px;box-shadow: 0 0px 0px 0 rgba(0,0,0,.2);"></div>';
	html += '<span class="input-group-text fieldAfter" style="margin-right: 4px;margin-left: 3%;font-weight: 900;">상태</span>';
	html += '<span class="swithCheck"><input type="checkbox" id="OPMT200_form_useYn'+contentBtnFormSize+'" class="OPMT200T_buttonUseyn"/><label></label></span>';
	html += '</div>';
	html += '<div class="input-group" style="display: flex;align-items: baseline;">';
	html += '<span class="input-group-text fieldAfter" style="margin-right: 4px;font-weight: 900;">연결정보</span>';
	html += '<input type="text" class="vl-textbox OPMT200T_buttonLink" id="OPMT200T_buttonLink'+contentBtnFormSize+'" name="OPMT200T_buttonLink'+contentBtnFormSize+'" autocomplete="off" placeholder="전화번호 또는 http를 포함한 url을 입력해주세요." style="width: 88% !important;margin-bottom: 0px !important;" >';
	html += '</div>';
	html += '</div>';

	$("#OPMT200T_fnContentBtnFormAdd").append(html);
	
	$("#OPMT200_form_useYn"+contentBtnFormSize).prop("checked", true);

	var items = [
        { text: "작게", value: "small" },
        { text: "보통", value: "default" },
        { text: "크게", value: "big" },
    ];
	kendoButtonGroup_init("OPMT200_form_buttonSize"+contentBtnFormSize, items);
	
	contentBtnFormSize++;
}

function OPMT200T_fnContentBtnFormRemove(id)
{
	Utils.confirm("버튼을 정말로 삭제 하시겠습니까?", function () {$("#"+id).remove();});
}

function OPMT200_fnOpenEditFormClose()
{
	Utils.confirm("정보를 정말로 저장 안하시겠습니까?", function () {$('#OPMT200_editFormArea').data('kendoWindow').close();});
}

function uploadFile() {

	OPMT200T_fileCheck = false;

	var file = $('#OPMT200_realFile')[0].files[0];

    var formData = new FormData();
    formData.append('uploadimage', file);

	Utils.ajaxCallFormData('/opmt/OPMT200ImgCheck',formData,function(data){

    	if(data.result == "success")
    	{
    		OPMT200T_fileCheck = true;

    	    var reader = new FileReader(); 
    	    reader.onload = function(e) {

    	        $("#imgid").attr("src", e.target.result);
    	        $("#imgid").show();
    	    }

    	    reader.readAsDataURL(file);
    	}
    	else
    	{
    		$('#OPMT200_realFile').val("");
    		Utils.alert(data.msg);
    	}
	});
}