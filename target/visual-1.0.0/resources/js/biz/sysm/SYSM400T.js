/***********************************************************************************************
 * Program Name : SYSM400T.jsp
 * Creator      : yhnam
 * Create Date  : 2024.01.26
 * Description  : 메뉴 관리
 * Modify Desc  :
 * -----------------------------------------------------------------------------------------------
 * Date         | Updater        | Remark
 * -----------------------------------------------------------------------------------------------
 * 2024.01.26     yhnam         최초생성
 ************************************************************************************************/

var SYSM400T_comCdList;
var SYSM400T_totalMenuList;
var SYSM400T_dataframePopupTarget;
var SYSM400T_grid = new Array(3);

$(document).ready(function () {

	$("#SYSM400T_title").text($(".k-tabstrip-items .k-state-active .k-link").eq(0).text());

    /*init Object*/
    for (let i = 0; i < SYSM400T_grid.length; i++) {
        SYSM400T_grid[i] = {
            instance: new Object(),
            dataSource: new Object(),
            currentItem: new Object(),
            currentCellIndex: new Number(),
            selectedItems: new Array(),
            loadCount: 0
        }
    }

    SYSM400T_grid[0].dataSource = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                Utils.ajaxCall("/sysm/SYSM400SEL01", JSON.stringify(options.data), function (result) {
                    SYSM400T_totalMenuList = JSON.parse(result.list);
                    var list = SYSM400T_totalMenuList.filter(function (menu) {
                        return (menu.prsMenuLvl == 1 && Utils.isNotNull(menu.menuTypCd))
                    });
                    options.success(list);
                });
            },
            create: function (options) {
            	
            	var insertList = options.data.models;
                var regInfo = {
                	tenantPrefix : "SYS",
                	usrGrd : "00",
                	fnSearchYn 	: "Y",
                	fnUpdateYn 	: "Y",
                	fnSaveYn 	: "Y",
                	fnDeleteYn 	: "Y",
                	fnExcelYn 	: "Y",
                    systemIdx   : "1"
//                    lstCorprId: GLOBAL.session.user.agentId,
                }

                $.each(insertList, function(index, item){
                    $.extend(item, regInfo);
                });
                
                Utils.ajaxCall("/sysm/SYSM400INS01", JSON.stringify({
                    list: insertList
                }), function (result) {
                    options.success(options.data.models);
                });
            },
            update: function (options) {
                var updateList = options.data.models;
                var regInfo = {
                    lstCorprId: GLOBAL.session.user.originAgentId,
                     
                }

                $.each(updateList, function(index, item){
                    $.extend(item, regInfo);
                });

                Utils.ajaxCall("/sysm/SYSM400UPT01", JSON.stringify({
                    list: updateList
                }), function (result) {
                    options.success(options.data.models);
                });
            },
            destroy: function (options) {
                options.success(options.data.models);
            },
        },
        requestStart: function (e) {
            var type = e.type;
            var response = e.response;
        },
        requestEnd: function (e) {
            var type = e.type;
            var response = e.response;

            if (type != "read" && type != "destroy") {
                SYSM400T_fnSearchTopMenuList();
            }
        },
        batch: true,
        schema: {
            type: "json",
            model: {
                id: "id",
                fields: {
                    menuId: {type: "string", nullable: false},
                    menuNm: {type: "string"},
                    menuTypCd: {type: "string"},
                    menuState: {type: "string"},
                    srtSeqNo: {type: "Integer"}
                }
            }
        }
    });

    SYSM400T_grid[0].instance = $("#SYSM400T_grid0").kendoGrid({
        dataSource: SYSM400T_grid[0].dataSource,
        autoBind: false,
        selectable: "multiple,row",
        persistSelection: true,
        sortable: false,
        resizable: true,
        noRecords: {
            template: "<div class='nodataMsg'><p>" + "조회 결과가 없습니다." + "</p></div>" //조회 결과가 없습니다.
        },
        dataBound: function() {
            SYSM400T_grid_fnOnDataBound(0);
        },
        change: function(e) {
            SYSM400T_grid_fnOnChange(e, 0);
        },
        cellClose: function(e) {
            SYSM400T_fnChkMenuId(e);
        },
        columns: [{
            selectable: true,
            width: 40
        },{
            field: "menuId",
            title: "ID",
            type: "string",
            width: 60,
            attributes: {"class": "k-text-left"}
        }, {
            field: "menuNm",
            title: "메뉴명", // 메뉴명
            type: "string",
            width: 100,
            attributes: {"class": "textEllipsis"}
        }, {
            field: "menuTypCd",
            title: "메뉴유형", // 메뉴유형
            type: "string",
            width: 100,
            editor: function (container, options) {
            	SYSM400T_commonMenuTypCdEditor(container, options, 0, "");
            },
            template: function (dataItem) {
                return Utils.getComCdNm(SYSM400T_comCdList, 'MENUTYPCD', dataItem.menuTypCd);
            }
        }, {
            field: "menuState",
            title: "상태", // 상태
            type: "string",
            width: 80,
            editor: function (container, options) {
                SYSM400T_commonStateCdEditor(container, options, 0, "T");
            },
            template: function (dataItem) {
                return Utils.getComCdNm(SYSM400T_comCdList, 'STATECODE', dataItem.menuState);
            }
        }, {
            title: "상세",
            maxWidth: 40,
            template: "<button type='button' class='k-icon k-i-zoom-in' title='상세보기' onclick='SYSM400T_fnSearchMiddleMenuList(this)'></button>"
        }]
    }).data("kendoGrid");

    SYSM400T_grid[1].dataSource = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                Utils.ajaxCall("/sysm/SYSM400SEL02", JSON.stringify(options.data), function (result) {
                    SYSM400T_totalMenuList = JSON.parse(result.totalList);
                    options.success(JSON.parse(result.list));
                });
            },
            create: function (options) {
            	
            	var insertList = options.data.models;
                var regInfo = {
                	tenantPrefix : "SYS",
                	usrGrd : "00",
                	fnSearchYn 	: "Y",
                	fnUpdateYn 	: "Y",
                	fnSaveYn 	: "Y",
                	fnDeleteYn 	: "Y",
                	fnExcelYn 	: "Y",
                    systemIdx   : "1"
//                    lstCorprId: GLOBAL.session.user.agentId,
                }

                $.each(insertList, function(index, item){
                    $.extend(item, regInfo);
                });
                
                Utils.ajaxCall("/sysm/SYSM400INS01", JSON.stringify({
                    list: insertList
                }), function (result) {
                    options.success(options.data.models);
                });
            },
            update: function (options) {
                var updateList = options.data.models;
                var regInfo = {
                    lstCorprId: GLOBAL.session.user.originAgentId,
                     
                }

                $.each(updateList, function(index, item){
                    $.extend(item, regInfo);
                });

                Utils.ajaxCall("/sysm/SYSM400UPT01", JSON.stringify({
                    list: updateList
                }), function (result) {
                    options.success(options.data.models);
                });
            },
            destroy: function (options) {
                options.success(options.data.models);
            }
        },
        requestStart: function (e) {
            var type = e.type;
            var response = e.response;
        },
        requestEnd: function (e) {
            var type = e.type;
            var response = e.response;

            if (type != "read" && type != "destroy") {
                SYSM400T_fnSearchMiddleMenuList();
            }
        },
        batch: true,
        schema: {
            type: "json",
            model: {
                id: "id",
                fields: {
                    menuId: {type: "string", nullable: false},
                    menuNm: {type: "string"},
                    mapgVlu1: {type: "string"},
                    dataFrmId: {type: "string"},
                    menuTypCd: {type: "string"},
                    menuState: {type: "string"},
                    srtSeqNo: {type: "string"}
                }
            }
        }
    });

    SYSM400T_grid[1].instance = $("#SYSM400T_grid1").kendoGrid({
        dataSource: SYSM400T_grid[1].dataSource,
        autoBind: false,
        selectable: "multiple,row",
        persistSelection: true,
        sortable: false,
        resizable: true,
        noRecords: {
            template: "<div class='nodataMsg'><p>상위 메뉴를 선택해주세요.</p></div>" // "상위 메뉴를 선택해주세요."
        },
        dataBound: function() {
            SYSM400T_grid_fnOnDataBound(1);
        },
        change: function(e) {
            SYSM400T_grid_fnOnChange(e, 1);
        },
        cellClose: function(e) {
            SYSM400T_fnChkMenuId(e);
        },
        columns: [{
            selectable: true,
            width: 40
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
            width: 100,
            attributes: {"class": "k-text-left"}
        }, {
            field: "mapgVlu1",
            title: "메뉴URL분할(URL 분할시 => /{tenantPrefix})",
            type: "string",
            width: 100,
            attributes: {"class": "k-text-left"}
        }, {
            field: "dataFrmId",
            title: "메뉴프레임ID",
            type: "string",
            width: 100,
            attributes: {"class": "k-text-left"}
        }, {
            field: "menuTypCd",
            title: "메뉴유형", // 메뉴유형
            type: "string",
            width: 100,
            editor: function (container, options) {
            	SYSM400T_commonMenuTypCdEditor(container, options, 1, "");
            },
            template: function (dataItem) {
                return Utils.getComCdNm(SYSM400T_comCdList, 'MENUTYPCD', dataItem.menuTypCd);
            }
        }, {
            field: "menuState",
            title: "상태", // 상태
            type: "string",
            width: 80,
            editor: function (container, options) {
                SYSM400T_commonStateCdEditor(container, options, 1, "T");
            },
            template: function (dataItem) {
                return Utils.getComCdNm(SYSM400T_comCdList, 'STATECODE', dataItem.menuState);
            }
        }, {
            title: "상세",
            width: 40,
            template:
                "#if(menuTypCd == 'M'){#" +
                "<button type='button' class='k-icon k-i-zoom-in' title='상세보기' onclick='SYSM400T_fnSearch3DepthList(this)'></button>" +
                "#}#"
        }]
    }).data("kendoGrid");

    SYSM400T_grid[2].dataSource = new kendo.data.DataSource({
        transport: {
            read: function (options) {
                Utils.ajaxCall("/sysm/SYSM400SEL02", JSON.stringify(options.data), function (result) {
                    SYSM400T_totalMenuList = JSON.parse(result.totalList);
                    options.success(JSON.parse(result.list));
                });
            },
            create: function (options) {

            	var insertList = options.data.models;
                var regInfo = {
                	tenantPrefix : "SYS",
                	usrGrd : "00",
                    systemIdx   : "1"
//                    lstCorprId: GLOBAL.session.user.agentId,
                }

                $.each(insertList, function(index, item){
                    $.extend(item, regInfo);
                });

                Utils.ajaxCall("/sysm/SYSM400INS01", JSON.stringify({
                    list: insertList
                }), function (result) {
                    options.success(options.data.models);
                });
            },
            update: function (options) {
                var updateList = options.data.models;
                var regInfo = {
                    lstCorprId: GLOBAL.session.user.agentId,
                     
                }

                $.each(updateList, function(index, item){
                    $.extend(item, regInfo);
                });

                Utils.ajaxCall("/sysm/SYSM400UPT01", JSON.stringify({
                    list: updateList
                }), function (result) {
                    options.success(options.data.models);
                });
            },
            destroy: function (options) {
                options.success(options.data.models);
            }
        },
        requestStart: function (e) {
            var type = e.type;
            var response = e.response;
        },
        requestEnd: function (e) {
            var type = e.type;
            var response = e.response;

            if (type != "read" && type != "destroy") {
                SYSM400T_fnSearch3DepthList();
            }
        },
        batch: true,
        schema: {
            type: "json",
            model: {
                id: "id",
                fields: {
                    menuId: {type: "string", nullable: false},
                    menuNm: {type: "string"},
                    mapgVlu1: {type: "string"},
                    dataFrmId: {type: "string"},
                    menuTypCd: {type: "string"},
                    menuState: {type: "string"},
                }
            }
        }
    });

    SYSM400T_grid[2].instance = $("#SYSM400T_grid2").kendoGrid({
        dataSource: SYSM400T_grid[2].dataSource,
        autoBind: false,
        selectable: "multiple,row",
        persistSelection: true,
        sortable: false,
        resizable: true,
        noRecords: {
            template: "<div class='nodataMsg'><p>상위 메뉴를 선택해주세요.</p></div>" // "상위 메뉴를 선택해주세요."
        },
        dataBound: function() {
            SYSM400T_grid_fnOnDataBound(2);
        },
        change: function(e) {
            SYSM400T_grid_fnOnChange(e, 2);
        },
        cellClose: function(e) {
            SYSM400T_fnChkMenuId(e);
        },
        columns: [{
            selectable: true,
            width: 40
        }, {
            field: "menuId",
            title: "ID",
            type: "string",
            width: 90,
            attributes: {"class": "k-text-left"}
        }, {
            field: "menuNm",
            title: "메뉴명", // 메뉴명
            type: "string",
            width: 100,
            attributes: {"class": "k-text-left"}
        }, {
            field: "mapgVlu1",
            title: "메뉴URL분할(URL 분할시 => /{tenantPrefix})",
            type: "string",
            width: 100,
            attributes: {"class": "k-text-left"}
        }, {
            field: "dataFrmId",
            title: "메뉴프레임ID",
            type: "string",
            width: 100,
            attributes: {"class": "k-text-left"}
        }, {
            field: "menuTypCd",
            title: "메뉴유형", // 메뉴유형
            type: "string",
            width: 100,
            editor: function (container, options) {
            	SYSM400T_commonMenuTypCdEditor(container, options, 2, "");
            },
            template: function (dataItem) {
                return Utils.getComCdNm(SYSM400T_comCdList, 'MENUTYPCD', dataItem.menuTypCd);
            }
        }, {
            field: "menuState",
            title: "상태", // 상태
            type: "string",
            width: 80,
            editor: function (container, options) {
                SYSM400T_commonStateCdEditor(container, options, 2, "T");
            },
            template: function (dataItem) {
                return Utils.getComCdNm(SYSM400T_comCdList, 'STATECODE', dataItem.menuState);
            }
        }]
    }).data("kendoGrid");

    Utils.setKendoGridDoubleClickAction("#SYSM400T_grid0");
    Utils.setKendoGridDoubleClickAction("#SYSM400T_grid1");
    Utils.setKendoGridDoubleClickAction("#SYSM400T_grid2");

    SYSM400T_fnGridResize();
    $(window).on("resize", function () {SYSM400T_fnGridResize();});

    SYSM400T_fnInit();

    const SYSM400T_fnGridClear = () =>{
        SYSM400T_grid[0].instance.clearSelection();

        SYSM400T_grid[2].currentItem = new Object();
        SYSM400T_grid[1].currentItem = new Object();
        SYSM400T_grid[0].currentItem = new Object();

        SYSM400T_grid[2].dataSource.data([]);
        SYSM400T_grid[1].dataSource.data([]);
        SYSM400T_grid[0].dataSource.data([]);
    };
//    CMMN_SEARCH_TENANT["SYSM400T"].fnInit(null,SYSM400T_fnSearchTopMenuList,SYSM400T_fnGridClear);
});

function SYSM400T_fnInit() {
    var param = {"codeList": [{"CATEGORY": "USERAUTHORITY"},{"CATEGORY": "STATECODE"},{"CATEGORY": "MENUTYPCD"}]};

    Utils.ajaxCall("/comm/COMM100SEL01", JSON.stringify(param), function (result) {
        SYSM400T_comCdList = JSON.parse(result.codeList);
        SYSM400T_fnSearchTopMenuList();
    });
}

function SYSM400T_fnSearchTopMenuList() {

    SYSM400T_grid[0].instance.clearSelection();

    SYSM400T_grid[2].currentItem = new Object();
    SYSM400T_grid[1].currentItem = new Object();
    SYSM400T_grid[0].currentItem = new Object();

    SYSM400T_grid[2].dataSource.data([]);
    SYSM400T_grid[1].dataSource.data([]);
    SYSM400T_grid[0].dataSource.read({});
}

function SYSM400T_fnSearchMiddleMenuList(obj) {
    SYSM400T_grid[1].instance.clearSelection();

    let selectedItem;

    if (obj) {
        let tr = $(obj).closest("tr");
        selectedItem = SYSM400T_grid[0].instance.dataItem(tr);

        SYSM400T_grid[0].instance.clearSelection();
        SYSM400T_grid[0].instance.select(tr);
    } else {
        selectedItem = SYSM400T_grid[0].currentItem;
    }

    SYSM400T_grid[2].currentItem = new Object();
    SYSM400T_grid[1].currentItem = new Object();

    SYSM400T_grid[2].dataSource.data([]);
    SYSM400T_grid[1].dataSource.read({
        menuId: selectedItem.id,
        prsMenuLvl: 2,
    });
}

function SYSM400T_fnSearch3DepthList(obj) {
    SYSM400T_grid[2].instance.clearSelection();

    let selectedItem;

    if (obj) {
        let tr = $(obj).closest("tr");
        selectedItem = SYSM400T_grid[1].instance.dataItem(tr);

        SYSM400T_grid[1].instance.clearSelection();
        SYSM400T_grid[1].instance.select(tr);
    } else {
        selectedItem = SYSM400T_grid[1].currentItem;
    }

    SYSM400T_grid[2].dataSource.read({
        menuId: selectedItem.id,
        prsMenuLvl: 3,
    });
}

function SYSM400T_fnAddMenu(gridIndex) {
    if (gridIndex != 0 && $.isEmptyObject(SYSM400T_grid[gridIndex - 1].currentItem)) {
        Utils.alert("상위 메뉴를 선택해주세요."); // "상위 메뉴를 선택해주세요."
        return;
    }

    SYSM400T_grid_fnTotalSorting(gridIndex);

    let totalRecords = SYSM400T_grid[gridIndex].dataSource.total();
    let row = {
        menuId: "",
        menuNm: "",
        prsMenuLvl: gridIndex + 1,
        srtSeqNo: Number(totalRecords + 1),
        dataFrmId: "",
        dataFrmKornNm: "",
        menuState : "100"
    }
    let focusIndex;

    if (gridIndex == 0) {
    	row.menuTypCd = "T";
        focusIndex = 1;
    } else {
        row.hgrkMenuId = SYSM400T_grid[gridIndex - 1].currentItem.menuId;
        row.menuTypCd = "D";
        focusIndex = 1;
    }

    let regInfo = {
        regrId: GLOBAL.session.user.originAgentId,
        lstCorprId: GLOBAL.session.user.originAgentId,
    }

    SYSM400T_grid[gridIndex].dataSource.add($.extend(row, regInfo));                  //row 추가
    SYSM400T_grid[gridIndex].instance.refresh();

    SYSM400T_grid[gridIndex].instance.clearSelection();
    //기존 선택 제거
    SYSM400T_grid[gridIndex].instance.select("tr:last");
    //새로 추가된 Row 선택
    (SYSM400T_grid[gridIndex].instance).tbody.find("tr:last td:eq(" + focusIndex + ")").dblclick();
    //새로 추가된 Row의 (focusIndex = colum 번호)컬럼의 더블클릭 이벤트 실행
}

function SYSM400T_fnSaveMenu(gridIndex) {
    var isValid = true;

    $.each(SYSM400T_grid[gridIndex].dataSource.data(), function (index, item) {
        if (Utils.isNull(item.menuId)) {
            Utils.alert("ID를 입력해주세요."); // "ID를 입력해주세요."
            isValid = false;
            return false;
        }
        if (Utils.isNull(item.menuNm)) {
            Utils.alert("메뉴명을 입력해주세요."); // "메뉴명을 입력해주세요."
            isValid = false;
            return false;
        }
        
        if(item.prsMenuLvl > 1) {
        	$.each(SYSM400T_grid[item.prsMenuLvl - 2].dataSource.data(), function (index, item) {
        		if(!$.isEmptyObject(item.dirtyFields))
        		{
        			Utils.alert("상위 메뉴를 먼저 저장해주세요.");
                    isValid = false;
                    return false;
        		}
        	});
        }
    });

    if (isValid) {
        Utils.confirm("저장하시겠습니까?", function () { // "저장하시겠습니까?"
            SYSM400T_grid[gridIndex].instance.dataSource.sync().then(function () {
                Utils.alert("정상적으로 저장되었습니다."); // "정상적으로 저장되었습니다."
            });
        });
    }
}

function SYSM400T_fnDeleteMenu(gridIndex) {
    var selectedItems = SYSM400T_grid[gridIndex].selectedItems;

    if (selectedItems.length == 0) {
        Utils.alert("삭제할 메뉴를 선택해주세요."); // "삭제할 메뉴를 선택해주세요."
        return;
    }

    var childMenuCount = 0;
    $.each(selectedItems, function(index, item){
        childMenuCount += SYSM400T_totalMenuList.filter(function (menu) {
            return item.menuId == menu.hgrkMenuId
        }).length;
    });

    if (childMenuCount > 0) {
        Utils.alert("하위 메뉴 삭제 후 현재 메뉴를 삭제 할 수 있습니다."); // "하위 메뉴 삭제 후 현재 메뉴를 삭제 할 수 있습니다."
        return;
    }

    Utils.confirm("삭제하시겠습니까?", function () { // "삭제하시겠습니까?"
        Utils.ajaxCall("/sysm/SYSM400DEL01", JSON.stringify({
            list : selectedItems
        }), function (result) {
            Utils.alert("정상적으로 삭제되었습니다.", function () { // "정상적으로 삭제되었습니다."
                if (gridIndex == 0) {
                    SYSM400T_fnSearchTopMenuList();
                } else if (gridIndex == 1) {
                    SYSM400T_fnSearchMiddleMenuList();
                } else if (gridIndex == 2) {
                    SYSM400T_fnSearch3DepthList();
                }
            });
        });
    });
}

function SYSM400T_commonStateCdEditor(container, options, gridIndex, exceptCode) {
    let $select = $('<select data-bind="value:' + options.field + '"/>').appendTo(container);
    let menuStateList = SYSM400T_comCdList.filter(function (code) {
        return code.category == "STATECODE" && code.code != exceptCode
    });

    Utils.setKendoComboBox(menuStateList, "STATECODE", $select, "", false).bind("change", function (e) {
        let element = e.sender.element;
        let row = element.closest("tr");
        let dataItem = SYSM400T_grid[gridIndex].instance.dataItem(row);
        let selectedValue = e.sender.value();

        dataItem.set("menuState", selectedValue);

        SYSM400T_grid[gridIndex].instance.refresh();
    });
}

function SYSM400T_commonMenuTypCdEditor(container, options, gridIndex, exceptCode) {

	let $select = $('<select data-bind="value:' + options.field + '"/>').appendTo(container);
    let menuTypCdList = SYSM400T_comCdList.filter(function (code) {
        return code.category == "MENUTYPCD" && code.code != exceptCode
    });

    Utils.setKendoComboBox(menuTypCdList, "MENUTYPCD", $select, "", false).bind("change", function (e) {
        let element = e.sender.element;
        let row = element.closest("tr");
        let dataItem = SYSM400T_grid[gridIndex].instance.dataItem(row);
        let selectedValue = e.sender.value();

        dataItem.set("menuTypCd", selectedValue);

        SYSM400T_grid[gridIndex].instance.refresh();
    });
}

function SYSM400T_grid_fnOnDataBound(gridIndex) {
    $("#SYSM400T_grid" + gridIndex + " tbody").on("click", "td", function(e) {
        var $row = $(this).closest("tr");
        var $cell = $(this).closest("td");
        SYSM400T_grid[gridIndex].currentItem = SYSM400T_grid[gridIndex].instance.dataItem($row);
        SYSM400T_grid[gridIndex].currentCellIndex = $cell.index();
    });

    let totalCnt = SYSM400T_grid[gridIndex].instance.dataSource.total();
    let firstItem = SYSM400T_grid[gridIndex].instance.dataItem("tr:first");

    if (totalCnt > 0) {
        if (gridIndex == 0 && SYSM400T_grid[gridIndex].loadCount == 0) {
            if (firstItem.menuTypCd == "T") {
                $("#SYSM400T_grid" + gridIndex + " tbody tr:first td:eq(6) button").trigger("click");
            }
        } else if (gridIndex == 1) {
            if (firstItem.menuTypCd == "M" && SYSM400T_grid[gridIndex].loadCount == 1) {
                $("#SYSM400T_grid" + gridIndex + " tbody tr:first td:eq(5) button").trigger("click");
            }
        }
    }

    SYSM400T_grid[gridIndex].loadCount++;
}

function SYSM400T_grid_fnOnChange(e, gridIndex) {
    var rows = e.sender.select(),
        items = [];

    rows.each(function(e) {
        var dataItem = SYSM400T_grid[gridIndex].instance.dataItem(this);
        items.push(dataItem);
    });

    SYSM400T_grid[gridIndex].selectedItems = items;
};

function SYSM400T_fnMenuUpDown(gridIndex, val) {
    if (SYSM400T_grid[gridIndex].selectedItems.length == 0) {
        Utils.alert("메뉴를 선택해주세요."); // "메뉴를 선택해주세요."
        return;
    }
    if (SYSM400T_grid[gridIndex].selectedItems.length > 1) {
        Utils.alert("메뉴 한개만 선택해주세요.", function () { // "메뉴 한개만 선택해주세요."
            SYSM400T_grid[gridIndex].instance.clearSelection();
        });
        return;
    }

    var totalRecords = SYSM400T_grid[gridIndex].instance.dataSource.total();
    var index = SYSM400T_grid[gridIndex].instance.select().index();
    var from = index + 1;
    var to = from + val;

    if (1 > to || to > totalRecords) {
        return;
    }

    SYSM400T_grid[gridIndex].instance.dataSource.pushMove(to, SYSM400T_grid[gridIndex].instance.dataSource.at(index));

    SYSM400T_grid_fnTotalSorting(gridIndex);
}

function SYSM400T_fnChkMenuId(e) {
    let grid = e.sender;
    let dataItem = e.model;

    dataItem.set("menuId", $.trim(dataItem.menuId));

    if (dataItem.id != dataItem.menuId) {
        let param = {
            menuId: $.trim(dataItem.menuId),
        }

        Utils.ajaxCall("/sysm/SYSM400SEL03", JSON.stringify(param), function (result) {
            let list = JSON.parse(result.list);

            if (list.length > 0) {
                dataItem.set("menuId", dataItem.id);
                Utils.alert("입력한 ID와 동일한 ID가 존재합니다."); // "입력한 ID와 동일한 ID가 존재합니다."
            }
        });
    }
}

function SYSM400T_fnDeleteDataframe(gridIndex, obj) {
    var tr = $(obj).closest("tr");
    var dataItem = SYSM400T_grid[gridIndex].instance.dataItem(tr);

    dataItem.set("dataFrmId", "");
    dataItem.set("dataFrmKornNm", "");
}

function SYSM400T_fnOpenPopSYSM252P(obj) {
    if ($(obj).hasClass("toolTipActive")) {
        return;
    }

    let kendoTooltip = $(obj).parent().kendoTooltip({
        filter: "button",
        position: "right",
        width: 400,
        offset: -2,
        showOn: "click",
        autoHide: false,
        content: {
            url: GLOBAL.contextPath + "/sysm/SYSM252P" + "?" + $.param({
                callbackKeyOk: "SYSM400T_fnSYSM252PCallback_ok",
                callbackKeyCancel: "SYSM400T_fnSYSM252PCallback_cancel"
            })
        },
        hide: function () {
            this.destroy();
            $(obj).removeClass("toolTipActive");
        }
    }).data("kendoTooltip");
    $(obj).addClass("toolTipActive");

    Utils.setCallbackFunction("SYSM400T_fnSYSM252PCallback_ok", function (icon) {
        SYSM400T_grid[0].currentItem.set("iconTypClss", icon);
    });
    Utils.setCallbackFunction("SYSM400T_fnSYSM252PCallback_cancel", function () {
        kendoTooltip.hide();
    });
}

function SYSM400T_fnOpenPopSYSM251P(gridIndex) {
    SYSM400T_dataframePopupTarget = gridIndex;
    Utils.setCallbackFunction("SYSM400T_fnSYSM251PCallback", function(item){
        if (SYSM400T_dataframePopupTarget == 1) {
            SYSM400T_grid[1].currentItem.set("dataFrmId", item.dataFrmId);
            SYSM400T_grid[1].currentItem.set("dataFrmKornNm", item.dataFrmKornNm);
        } else {
            SYSM400T_grid[2].currentItem.set("dataFrmId", item.dataFrmId);
            SYSM400T_grid[2].currentItem.set("dataFrmKornNm", item.dataFrmKornNm);
        }
    });
    Utils.openPop(GLOBAL.contextPath + "/sysm/SYSM251P", "SYSM251P", 780, 550, {callbackKey: "SYSM400T_fnSYSM251PCallback"});
}

function SYSM400T_grid_fnTotalSorting(gridIndex) {
    let result = false;
    let changeCnt = 0;

    $.each(SYSM400T_grid[gridIndex].dataSource.data(), function (index, item) {
        let srtSeqNo = index + 1;
        if (item.srtSeqNo != srtSeqNo) {
            item.set("srtSeqNo", srtSeqNo);
            changeCnt++;
        }
    });

    if (changeCnt > 0) {
        result = true;
    }

    return result;
}

function SYSM400T_fnGridResize() {
    let screenHeight = $(window).height() - 210; // (헤더+푸터) 영역 높이 제외
    if (SYSM400T_grid[0].instance.element)
        SYSM400T_grid[0].instance.element.find('.k-grid-content').css('height', screenHeight-182);
    if (SYSM400T_grid[1].instance.element)
        SYSM400T_grid[1].instance.element.find('.k-grid-content').css('height', screenHeight/2-146);
    if (SYSM400T_grid[2].instance.element)
        SYSM400T_grid[2].instance.element.find('.k-grid-content').css('height', screenHeight/2-146);
}