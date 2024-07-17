/***********************************************************************************************
 * Program Name : SYSM410T.js
 * Creator      : yhnam
 * Create Date  : 2024.01.31
 * Description  : 테넌트 그룹별 메뉴권한관리
 * Modify Desc  :
 * -----------------------------------------------------------------------------------------------
 * Date         | Updater        | Remark
 * -----------------------------------------------------------------------------------------------
 * 2024.01.31     yhnam           최초작성
 ************************************************************************************************/

var SYSM410T_comCdList;
var SYSM410T_comCdList = new Array();
var SYSM410T_grid = new Array(3);

$(document).ready(function () {

	$("#SYSM410T_title").text($(".k-tabstrip-items .k-state-active .k-link").eq(0).text());

	// 공통코드
	var param = {"codeList": [{"CATEGORY": "MENUTYPCD"}]};
    Utils.ajaxCall("/comm/COMM100SEL01", JSON.stringify(param), function (result) {
    	SYSM410T_comCdList = JSON.parse(result.codeList);
    });

    for (let i = 0; i < SYSM410T_grid.length; i++) {
        SYSM410T_grid[i] = {
            record: 0,
            instance: new Object(),
            dataSource: new Object(),
            currentItem: new Object(),
            currentCellIndex: new Number(),
            selectedItems: new Array(),
            checkedRows: new Array()
        }
    }

    SYSM410T_grid[2].instance = $("#SYSM410T_grid2").kendoGrid({
        dataSource:{
            transport: {
                read: function (options) {
                    var param = {
                    	isEnabled : 0
                    };
                    Utils.ajaxCall("/comm/COMM100SEL02", JSON.stringify(param), function (result) {
                    	var obj = JSON.parse(result.result);
                    	
                    	let tenantList = obj.filter(function (code) {
                            return code.tenantPrefix != "SYS";
                        });

                        options.success(tenantList);
                    });
                },
            },
            schema: {
                type: "json",
                model: {
                    id: "com_cd",
                    fields: {
                        com_cd: {type: "string"},
                        com_cd_nm: {type: "string"}
                    }
                }
            }
        },
        autoBind: false,
        selectable: "row",
        persistSelection: true,
        editable: false,
        sortable: true,
        resizable: true,
        noRecords: true,
        messages: {
            noRecords: "조회 결과가 없습니다." // 조회 결과가 없습니다.
        },
        dataBound: function (e) {
        	SYSM410T_grid_fnOnDataBound2(e, 2);

            $("#SYSM410T_grid2 .k-grid-content td[role=gridcell]").css("cursor", "pointer");
        },
        columns: [{
            title: "선택",
            width: 40,
            template: '<mark class="singleSelect k-icon k-i-radiobutton"></mark>',
        }
        , {
            field: "systemIdx",
            title: "시스템Idx",
            type: "string",
            width: 65
        }
        , {
            field: "systemName",
            title: "시스템명",
            type: "string",
            width: 100
        }
        , {
            field: "tenantPrefix",
            title: "테넌트ID",
            type: "string",
            width: 80
        }, {
            field: "tenantName",
            title: "테넌트명",
            type: "string",
            width: 120,
            attributes: {"class": "k-text-left"}
        }]
    }).data("kendoGrid");

    SYSM410T_grid[0].instance = $("#SYSM410T_grid0").kendoGrid({
        dataSource:{
            transport: {
                read: function (options) {
                    var param = {
                        "codeList": [
                            {"CATEGORY": "USERAUTHORITY"}
                        ]
                    };
                    Utils.ajaxCall("/comm/COMM100SEL01", JSON.stringify(param), function (result) {
                        var list = JSON.parse(result.codeList);
                        let codeist = list.filter(function (code) {
                            return code.category == "USERAUTHORITY" && code.code != "00";
                        });
                        options.success(codeist);
                    });
                },
            },
            schema: {
                type: "json",
                model: {
                    id: "com_cd",
                    fields: {
                        com_cd: {type: "string"},
                        com_cd_nm: {type: "string"}
                    }
                }
            }
        },
        autoBind: false,
        selectable: "row",
        persistSelection: true,
        editable: false,
        sortable: true,
        resizable: true,
        noRecords: true,
        messages: {
            noRecords: "조회 결과가 없습니다." // 조회 결과가 없습니다.
        },
        dataBound: function (e) {
            SYSM410T_grid_fnOnDataBound2(e, 0);

            $("#SYSM410T_grid0 .k-grid-content td[role=gridcell]").css("cursor", "pointer");
        },
        columns: [{
            title: "선택",
            width: 40,
            template: '<mark class="singleSelect k-icon k-i-radiobutton"></mark>',
        }, {
            field: "code",
            title: "권한 그룹",
            type: "string",
            width: 80
        }, {
            field: "codeName",
            title: "권한 그룹명",
            type: "string",
            width: 120,
            attributes: {"class": "k-text-left"}
        }]
    }).data("kendoGrid");

    SYSM410T_grid[1].instance = $("#SYSM410T_grid1").kendoTreeList({
        dataSource:{
            transport: {
                read: function (options) {
                	// 20240531 SystemIdx 추가
                    var param = {
                    	systemIdx : SYSM410T_grid[2].currentItem.systemIdx,
                    	tenantPrefix: SYSM410T_grid[2].currentItem.tenantPrefix,
                    };
                    
                    $.extend(param, options.data);

                    Utils.ajaxCall("/sysm/SYSM410SEL01", JSON.stringify(param), function (result) {
                        let list = JSON.parse(result.list);
                        let totalList = JSON.parse(result.totalList);

                        $.each(list, function(index, item){
                            if (item.menuTypCd != "D") {
                                let childList = list.filter(function (row) {
                                    return row.hgrkMenuId == item.menuId
                                });
                                if (childList.length > 0) {
                                    item.hasChildren = true;
                                    item.expanded = true;
                                }
                            }
                        });

                        $.each(totalList, function(index, item){
                            if (item.menuTypCd != "D") {
                                item.hasChildren = true;
                                item.expanded = true;
                            }
                        });

                        SYSM410T_grid[1].checkedRows = list;

                        options.success(totalList);
                    });
                },
            },
            schema: {
                type: "json",
                model: {
                    id: "menuId",
                    parentId: "hgrkMenuId",
                    fields: {
                        hgrkMenuId: {type: "string", nullable: true},
                        menuId: {type: "string"},
                        menuNm: {type: "string"},
                        prsMenuLvl: {type: "string"},
//                        fnSearchYn: {type: "string", editable: false},
                        fnUpdateYn: {type: "string", editable: false},
                        fnSaveYn: {type: "string", editable: false},
                        fnDeleteYn: {type: "string", editable: false},
                        fnExcelYn: {type: "string", editable: false},
                    }
                }
            }
        },
        autoBind: false,
        editable: false,
        sortable: false,
        resizable: true,
        messages: {
            noRows: "사용자 그룹을 선택해주세요." // 사용자 그룹을 선택해주세요.
        },
        dataBound: function (e) {
            SYSM410T_grid_fnOnDataBound(e, 1);
        },
        change: function (e) {
            SYSM410T_grid_fnOnChange(e, 1);
        },
        collapse: function (e) {
            e.preventDefault();
        },
        columns: [{
            selectable: true,
            width: 40,
            headerTemplate: "<input type='checkbox' id='headerAllChe' class='k-checkbox k-checkbox-md k-rounded-md header-checkbox'>",
        }, {
            field: "menuId",
            title: "ID",
            type: "string",
            width: 80,
            attributes: {"class": "k-text-left"}
        }, {
            field: "menuNm",
            title: "메뉴명", // 메뉴명
            type: "string",
            width: 120,
            attributes: {"class": "k-text-left"}
        }, {
            field: "prsMenuLvl",
            title: "메뉴레벨", // 메뉴레벨
            type: "string",
            width: 50
        },
//        {field: "fnSearchYn", title: "조회권한", width:"100px", type: "string"
//        	, headerTemplate: "조회권한<br/><span class='swithCheck'><input type='checkbox' id='fnSearchYnAll' data-authname='fnSearchYn' onclick='SYSM410T_fnChgCheckAll(this);')/><label></label></span>"
//        	, template: function (dataItem) {
//	        	var tmpHtmel = "";
//	        	if(dataItem.menuTypCd == "D") tmpHtmel = '<span class="swithCheck"><input type="checkbox" class="fnAll fnSearchYn" data-authname="fnSearchYn" onclick="SYSM410T_fnChgCheck(this);"/><label></label></span>'
//	        	return tmpHtmel;
//        	}
//        },
        {field: "fnSaveYn", title: "저장권한", width:"100px", type: "string"
        	, headerTemplate: "저장권한<br/><span class='swithCheck'><input type='checkbox' id='fnSaveYnAll' data-authname='fnSaveYn' onclick='SYSM410T_fnChgCheckAll(this);')/><label></label></span>"
        	, template: function (dataItem) {
	        	var tmpHtmel = "";
	        	if(dataItem.menuTypCd == "D") tmpHtmel = '<span class="swithCheck"><input type="checkbox" class="fnAll fnSaveYn" data-authname="fnSaveYn" onclick="SYSM410T_fnChgCheck(this);"/><label></label></span>'
	        	return tmpHtmel;
        	}
        },
        {field: "fnUpdateYn", title: "수정권한", width:"100px", type: "string"
        	, headerTemplate: "수정권한<br/><span class='swithCheck'><input type='checkbox' id='fnUpdateYnAll' data-authname='fnUpdateYn' onclick='SYSM410T_fnChgCheckAll(this);')/><label></label></span>"
        	, template: function (dataItem) {
	        	var tmpHtmel = "";
	        	if(dataItem.menuTypCd == "D") tmpHtmel = '<span class="swithCheck"><input type="checkbox" class="fnAll fnUpdateYn" data-authname="fnUpdateYn" onclick="SYSM410T_fnChgCheck(this);"/><label></label></span>'
	        	return tmpHtmel;
        	}
        },
        {field: "fnDeleteYn", title: "삭제권한", width:"100px", type: "string"
        	, headerTemplate: "삭제권한<br/><span class='swithCheck'><input type='checkbox' id='fnDeleteYnAll' data-authname='fnDeleteYn' onclick='SYSM410T_fnChgCheckAll(this);')/><label></label></span>"
        	, template: function (dataItem) {
	        	var tmpHtmel = "";
	        	if(dataItem.menuTypCd == "D") tmpHtmel = '<span class="swithCheck"><input type="checkbox" class="fnAll fnDeleteYn" data-authname="fnDeleteYn" onclick="SYSM410T_fnChgCheck(this);"/><label></label></span>'
	        	return tmpHtmel;
        	}
        },
        {field: "fnExcelYn", title: "엑셀권한", width:"100px", type: "string"
        	, headerTemplate: "엑셀권한<br/><span class='swithCheck'><input type='checkbox' id='fnExcelYnAll' data-authname='fnExcelYn' onclick='SYSM410T_fnChgCheckAll(this);')/><label></label></span>"
        	, template: function (dataItem) {
	        	var tmpHtmel = "";
	        	if(dataItem.menuTypCd == "D") tmpHtmel = '<span class="swithCheck"><input type="checkbox" class="fnAll fnExcelYn" data-authname="fnExcelYn" onclick="SYSM410T_fnChgCheck(this);"/><label></label></span>'
	        	return tmpHtmel;
        	}
        },
        ]
    }).data("kendoTreeList");

    SYSM410T_fnGridResize();
    $(window).on("resize", function () { SYSM410T_fnGridResize();});

    SYSM410T_fnInit();
});

function SYSM410T_fnInit() {

	SYSM410T_fnSearchGroup();
}

function SYSM410T_fnSearchGroup(_type) {
    Utils.markingRequiredField();

    SYSM410T_grid[2].instance.clearSelection();
    SYSM410T_grid[2].currentItem = new Object();
    SYSM410T_grid[2].instance.dataSource.read();

    SYSM410T_grid[0].instance.clearSelection();
    SYSM410T_grid[0].currentItem = new Object();
    SYSM410T_grid[0].instance.dataSource.read({type : _type});
    
    SYSM410T_grid[1].instance.clearSelection();
    SYSM410T_grid[1].currentItem = new Object();
    
    $("#headerAllChe").off("click").on("click", function(e) {
    	var isCheck = $("#headerAllChe").is(':checked');
    	$.each(SYSM410T_grid[1].instance.items(), function (index, item) {
    		if ($(item).css("display") != "none" && !($(item).hasClass("k-selected"))) {
                $(item).find(".k-checkbox").prop("checked", isCheck);
                if(isCheck) $(item).addClass("k-state-selected");
                else $(item).removeClass("k-state-selected");
            }
    	});

//    	var authname = ["fnSearchYn", "fnSaveYn", "fnDeleteYn", "fnExcelYn"];
    	var authname = ["fnSaveYn", "fnUpdateYn", "fnDeleteYn", "fnExcelYn"];
    	$.each(authname, function (i, name) {
        	$("." + name).each(function(index, item) {
        		if($(item).parent().parent().parent().css("display") != "none")
            	{
        			$(item).prop('checked', isCheck);

        			let tr = $(item).closest("tr");
            		let dataItem =  SYSM410T_grid[1].instance.dataItem(tr);

            		if(isCheck) dataItem[name] ='Y';
            		else dataItem[name]='N';
            	}
        	});
    	});

//    	$("#fnSearchYnAll").prop("checked", isCheck);
    	$("#fnUpdateYnAll").prop("checked", isCheck);
		$("#fnSaveYnAll").prop("checked", isCheck);
		$("#fnDeleteYnAll").prop("checked", isCheck);
		$("#fnExcelYnAll").prop("checked", isCheck);
    });
}

function SYSM410T_grid_fnOnDataBound(e, gridIndex) {

    var grid = e.sender;
    var rows = grid.items();
    var checkParents = function(isSelected, dataItem) {
        var parentNode = SYSM410T_grid[1].instance.dataSource.parentNode(dataItem);
        if (!$.isEmptyObject(parentNode)) {
            rows.each(function (index, item) {
                var rowDataItem = grid.dataItem(item);
                if (rowDataItem.menuId == parentNode.menuId) {
                    if (isSelected) {
                        grid.select($(item));

                        checkParents(true, rowDataItem);
                    }
                }
            });
        }
    }
    var checkChildren = function(isSelected, dataItem) {
        var childrenNode = SYSM410T_grid[1].instance.dataSource.childNodes(dataItem);
        if (childrenNode.length > 0) {
            rows.each(function (index, item) {
                var rowDataItem = grid.dataItem(item);

                var filter = childrenNode.filter(function (children){
                    return rowDataItem.menuId == children.menuId
                });

                if (filter.length > 0) {
                    $(item).removeClass("k-state-selected");
                    $(item).find("input:checkbox").prop("checked", isSelected);
                    if(isSelected) grid.select($(item));
                    
//                  rowDataItem.fnSearchYn = "N";
                    rowDataItem.fnUpdateYn = "N";
                    rowDataItem.fnSaveYn = "N";
                    rowDataItem.fnDeleteYn = "N";
                    rowDataItem.fnExcelYn = "N";
                    if(isSelected)
                    {
//                    	rowDataItem.fnSearchYn = "Y";
                    	rowDataItem.fnUpdateYn = "Y";
                        rowDataItem.fnSaveYn = "Y";
                        rowDataItem.fnDeleteYn = "Y";
                        rowDataItem.fnExcelYn = "Y";
                    }

                    checkChildren(false, rowDataItem);
                }
            });
        }
    }

    SYSM410T_grid[gridIndex].record = 0;

    rows.off("click").on("click", function (e) {
        var dataItem = grid.dataItem(this);
        var cellIndex = $(e.target).index();
        SYSM410T_grid[gridIndex].currentItem = dataItem;

        if (gridIndex == 1) {
            if (cellIndex == 0) {
//                var isSelected = !$(this).hasClass("k-state-selected");
//                if(isSelected && !$(this).children().eq(0).children().is(':checked')) grid.select($(this));
            	if($(e.target).hasClass("k-checkbox-md") || $(e.target).hasClass("fnAll"))
            	{
	                var isSelected = $(this).children().eq(0).children().is(':checked');
	                var temp;
	                if($(e.target).hasClass("fnAll")) temp = !isSelected;
	                else temp = isSelected;

	                if(!isSelected) grid.select($(this));
	                checkParents(temp, dataItem);
	                checkChildren(temp, dataItem);
            	}

                // 버튼 권한 제어
                var $temp = $(this);
//                var authname = ["fnSearchYn", "fnSaveYn", "fnDeleteYn", "fnExcelYn"];
                var authname = ["fnSaveYn", "fnUpdateYn", "fnDeleteYn", "fnExcelYn"];
            	$.each(authname, function (i, name) {
            		var targetCheck = ($(e.target).hasClass("k-checkbox-md") || $(e.target).children("input").hasClass("k-checkbox-md"));
                    if(targetCheck && $temp.children("td").eq(4+i).find("."+name).length > 0)
                    {
                    	$temp.children("td").eq(4+i).find("."+name).prop('checked', isSelected);
                    	SYSM410T_grid[gridIndex].currentItem[name] = (isSelected == true) ? "Y" : "N";
                    }
            	});

//                var targetCheck = ($(e.target).hasClass("k-checkbox-md") || $(e.target).children("input").hasClass("k-checkbox-md"));
//                if(targetCheck && $(this).children("td").eq(4).find(".fnSearchYn").length > 0)
//                {
//                	$(this).children("td").eq(4).find(".fnSearchYn").prop('checked', isSelected);
//                	SYSM410T_grid[gridIndex].currentItem.fnSearchYn = (isSelected == true) ? "Y" : "N";
//                }
//                if(targetCheck && $(this).children("td").eq(5).find(".fnSaveYn").length > 0)
//                {
//                	$(this).children("td").eq(5).find(".fnSaveYn").prop('checked', isSelected);
//                	SYSM410T_grid[gridIndex].currentItem.fnSaveYn = (isSelected == true) ? "Y" : "N";
//                }
//                if(targetCheck && $(this).children("td").eq(6).find(".fnDeleteYn").length > 0)
//                {
//                	$(this).children("td").eq(6).find(".fnDeleteYn").prop('checked', isSelected);
//                	SYSM410T_grid[gridIndex].currentItem.fnDeleteYn = (isSelected == true) ? "Y" : "N";
//                }
//                if(targetCheck && $(this).children("td").eq(7).find(".fnExcelYn").length > 0)
//            	{
//            		$(this).children("td").eq(7).find(".fnExcelYn").prop('checked', isSelected);
//            		SYSM410T_grid[gridIndex].currentItem.fnExcelYn = (isSelected == true) ? "Y" : "N";
//            	}

                var itemCount = 0;
                $.each(SYSM410T_grid[1].instance.items(), function (index, item) {
            		if ($(item).css("display") != "none" && !($(item).hasClass("k-selected"))) itemCount++;
            	});

                setTimeout(function() {
	      			if(SYSM410T_grid[1].instance.select().length == itemCount) $("#headerAllChe").prop('checked', true);
	      			else $("#headerAllChe").prop('checked', false);
                }, 80);

//  				var authname = ["fnSearchYn", "fnSaveYn", "fnDeleteYn", "fnExcelYn"];
  				var authname = ["fnSaveYn", "fnUpdateYn", "fnDeleteYn", "fnExcelYn"];
  		    	$.each(authname, function (i, name) {
  		    		var isCheck = true;
  		        	$("." + name).each(function(index, item) {
  		        		if($(item).parent().parent().parent().css("display") != "none" && !$(item).is(':checked'))
  		            	{
  		        			isCheck = false;
  		        			return;
  		            	}
  		        	});

  		        	$("#"+name+"All").prop("checked", isCheck);
  		    	});
            }
        }
    });

    if (gridIndex == 1) {

    	var itemCount = 0;
        $.each(SYSM410T_grid[1].instance.items(), function (index, item) {
    		if ($(item).css("display") != "none" && !($(item).hasClass("k-selected"))) itemCount++;
    	});

        var checkedRows = SYSM410T_grid[1].checkedRows;
        if(checkedRows.length == itemCount) $("#headerAllChe").prop('checked', true);

        if (checkedRows.length > 0) {

            rows.each(function () {
                var $this = $(this);
                var dataItem = grid.dataItem(this);

//                dataItem.fnSearchYn = "N";
                dataItem.fnUpdateYn = "N";
                dataItem.fnSaveYn = "N";
                dataItem.fnDeleteYn = "N";
                dataItem.fnExcelYn = "N";
                $.each(checkedRows, function(index, item){
                    if (item.menuId == dataItem.menuId) {
                        dataItem.usrGrd = item.usrGrd;
                        grid.select($this);
                        
//                        if(item.fnSearchYn == "Y") dataItem.fnSearchYn = "Y";
                        if(item.fnUpdateYn == "Y") dataItem.fnUpdateYn = "Y";
                    	if(item.fnSaveYn == "Y") dataItem.fnSaveYn = "Y";
                    	if(item.fnDeleteYn == "Y") dataItem.fnDeleteYn = "Y";
                    	if(item.fnExcelYn == "Y") dataItem.fnExcelYn = "Y";
                    }
                });

                if(dataItem.menuTypCd == "D")
                {
//                	var authname = ["fnSearchYn", "fnSaveYn", "fnDeleteYn", "fnExcelYn"];
                	var authname = ["fnSaveYn", "fnUpdateYn", "fnDeleteYn", "fnExcelYn"];
                	$.each(authname, function (i, name) {
                		if(dataItem[name] == "Y") $this.find('.'+name).prop('checked', true);
                		else $this.find('.'+name).prop('checked', false);

                		var allCheck = true;
                    	$("."+name).each(function(i, item) {
                    		if($(this).parent().parent().parent().css("display") != "none" && !$(this).is(':checked'))
                    		{
                    			allCheck = false;
                    			return false;
                    		}
                    	});
                    	if(allCheck) $("#"+name+"All").prop('checked', true);
                    	else $("#"+name+"All").prop('checked', false);
      		    	});
                	
//                	if(dataItem.fnSearchYn == "Y") $(this).find('.fnSearchYn').prop('checked', true);
//                	else $(this).find('.fnSearchYn').prop('checked', false);
//                	
//                	if(dataItem.fnSaveYn == "Y") $(this).find('.fnSaveYn').prop('checked', true);
//                	else $(this).find('.fnSaveYn').prop('checked', false);
//                	
//                	if(dataItem.fnDeleteYn == "Y") $(this).find('.fnDeleteYn').prop('checked', true);
//                	else $(this).find('.fnDeleteYn').prop('checked', false);
//                	
//                	if(dataItem.fnExcelYn == "Y") $(this).find('.fnExcelYn').prop('checked', true);
//                	else $(this).find('.fnExcelYn').prop('checked', false);
                	
//                	var allCheck = true;
//                	$(".fnSearchYn").each(function(i, item) {
//                		if($(this).parent().parent().parent().css("display") != "none" && !$(this).is(':checked'))
//                		{
//                			allCheck = false;
//                			return false;
//                		}
//                	});
//                	if(allCheck) $("#fnSearchYnAll").prop('checked', true);
//                	else $("#fnSearchYnAll").prop('checked', false);
//                	
//                	allCheck = true;
//                	$(".fnSaveYn").each(function(i, item) {
//                		if($(this).parent().parent().parent().css("display") != "none" && !$(this).is(':checked'))
//                		{
//                			allCheck = false;
//                			return false;
//                		}
//                	});
//                	if(allCheck) $("#fnSaveYnAll").prop('checked', true);
//                	else $("#fnSaveYnAll").prop('checked', false);
//                	
//                	allCheck = true;
//                	$(".fnDeleteYn").each(function(i, item) {
//                		if($(this).parent().parent().parent().css("display") != "none" && !$(this).is(':checked'))
//                		{
//                			allCheck = false;
//                			return false;
//                		}
//                	});
//                	if(allCheck) $("#fnDeleteYnAll").prop('checked', true);
//                	else $("#fnDeleteYnAll").prop('checked', false);
//                	
//                	allCheck = true;
//                	$(".fnExcelYn").each(function(i, item) {
//                		if($(this).parent().parent().parent().css("display") != "none" && !$(this).is(':checked'))
//                		{
//                			allCheck = false;
//                			return false;
//                		}
//                	});
//                	if(allCheck) $("#fnExcelYnAll").prop('checked', true);
//                	else $("#fnExcelYnAll").prop('checked', false);
                }
            });

            SYSM410T_grid[1].checkedRows = [];
        } else {
        	$("#headerAllChe").prop('checked', false);
        	$(".fnAll").prop('checked', false);
//        	$('#fnSearchYnAll').prop('checked', false);
        	$('#fnUpdateYnAll').prop('checked', false);
        	$('#fnSaveYnAll').prop('checked', false);
        	$('#fnDeleteYnAll').prop('checked', false);
        	$('#fnExcelYnAll').prop('checked', false);
        }

        SYSM410T_grid_fnOnChange(e, gridIndex);
    }
}

function SYSM410T_grid_fnOnDataBound2(e, gridIndex) {

    var grid = e.sender;
    var rows = grid.items();

    SYSM410T_grid[gridIndex].record = 0;

    rows.off("click").on("click", function (e) {
        var dataItem = grid.dataItem(this);
        var cellIndex = $(e.target).index();
        SYSM410T_grid[gridIndex].currentItem = dataItem;
        
        if(SYSM410T_grid[0].currentItem.code != null && SYSM410T_grid[2].currentItem.tenantPrefix != null)
    	{
        	SYSM410T_grid[1].instance.clearSelection();
			SYSM410T_grid[1].instance.dataSource.read({
			      usrGrd: SYSM410T_grid[0].currentItem.code
			});
    	}
    });

    if (SYSM410T_grid[0].currentItem.code == null && gridIndex == 0) $("#SYSM410T_grid" + gridIndex + " tbody tr:first").trigger("click");
    if (SYSM410T_grid[2].currentItem.tenantPrefix == null && gridIndex == 2) $("#SYSM410T_grid" + gridIndex + " tbody tr:first").trigger("click");
}

function SYSM410T_grid_fnOnChange(e, gridIndex) {
    var rows = e.sender.select(),
        items = [];

    rows.each(function(e) {
        var dataItem = SYSM410T_grid[gridIndex].instance.dataItem(this);
        items.push(dataItem);
    });

    SYSM410T_grid[gridIndex].selectedItems = items;
}

function SYSM410T_fnInitMenu() {

	if ($.isEmptyObject(SYSM410T_grid[2].currentItem)) {
        Utils.alert("테넌트를 선택해주세요.");
        return;
    }

    if ($.isEmptyObject(SYSM410T_grid[0].currentItem)) {
        Utils.alert("사용자 그룹을 선택해주세요.");
        return;
    }

    SYSM410T_grid[1].instance.dataSource.read({
        usrGrd : SYSM410T_grid[0].currentItem.code
    });
}

function SYSM410T_fnSaveMenu() {
//    var selectedItems = SYSM410T_grid[1].selectedItems;
    var rows = SYSM410T_grid[1].instance.select();
    var selectedItems = [];
    rows.each(function(e) {
        var dataItem = SYSM410T_grid[1].instance.dataItem(this);
        selectedItems.push(dataItem);
    });
    
    var currentUsrGrd = SYSM410T_grid[0].currentItem.code;
    // 20240531 SystemIdx 추가
    var regInfo = {
    	systemIdx : SYSM410T_grid[2].currentItem.systemIdx,
    	tenantPrefix : SYSM410T_grid[2].currentItem.tenantPrefix,
        usrGrd: currentUsrGrd,
        regrId: GLOBAL.session.user.originAgentId,
        lstCorprId: GLOBAL.session.user.originAgentId
    }

    Utils.confirm("현재 선택된 메뉴만 저장 됩니다.<br>저장 하시겠습니까?", function() { // 현재 선택된 메뉴만 저장 됩니다.<br>저장 하시겠습니까?
        $.each(selectedItems, function(index, item){
            $.extend(item, regInfo);
        });
        
     // 20240531 SystemIdx 추가
        Utils.ajaxCall("/sysm/SYSM410INS01", JSON.stringify({
        	systemIdx : SYSM410T_grid[2].currentItem.systemIdx,
        	tenantPrefix: SYSM410T_grid[2].currentItem.tenantPrefix,
            usrGrd: currentUsrGrd,
            list: selectedItems
        }), function (result) {
            Utils.alert("정상적으로 저장되었습니다.", function () { // 정상적으로 저장되었습니다.
                SYSM410T_fnInitMenu();
            });
        });
    });
}

function SYSM410T_fnGridResize() {
    let screenHeight = $(window).height() - 210; // (헤더+푸터) 영역 높이 제외

    if (SYSM410T_grid[0].instance.element)
        SYSM410T_grid[0].instance.element.find('.k-grid-content').css('height', screenHeight-182);
    if (SYSM410T_grid[1].instance.element)
        SYSM410T_grid[1].instance.element.find('.k-grid-content').css('height', screenHeight-197);
    if (SYSM410T_grid[2].instance.element)
        SYSM410T_grid[2].instance.element.find('.k-grid-content').css('height', screenHeight-182);
}

function SYSM410T_fnChgCheckAll(obj)
{
	let isCheck = $(obj).is(':checked');
	let authname= $(obj).data("authname");

	$("." + authname).each(function(index, item) {
		if($(item).parent().parent().parent().css("display") != "none" && isCheck != $(item).is(':checked')) $(item).click();
	});

	if(isCheck) $(obj).prop("checked", true);
	else $(obj).prop("checked", false);
}

function SYSM410T_fnChgCheck(obj){

	let isCheck = $(obj).is(':checked');
	let tr = $(obj).closest("tr");
	let item =  SYSM410T_grid[1].instance.dataItem(tr);
	let authname= $(obj).data("authname");

	if(isCheck) item[authname] ='Y';
	else item[authname] = 'N';

	var allCheck = true;
	$("."+authname).each(function(index, item) {
		if($(this).parent().parent().parent().css("display") != "none")
		{
			if(!$(this).is(':checked'))
			{
				allCheck = false;
				return;
			}
		}
	});

//	if(!$("#"+authname+"All").is(':checked')) $("#"+authname+"All").prop("checked", allCheck);

//	if(allCheck)
//	{
//		if(!$("#"+authname+"All").is(':checked')) $("#"+authname+"All").prop("checked", true);
//	}
//	else
//	{
//		if($("#"+authname+"All").is(':checked')) $("#"+authname+"All").prop("checked", false);
//	}
}
