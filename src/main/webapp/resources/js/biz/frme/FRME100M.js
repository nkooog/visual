/***********************************************************************************************
* Program Name : 메인프레임(FRME100M.js)
* Creator      : dwson
* Create Date  : 2024.01.24
* Description  : 메인프레임
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.24     dwson            최초작성
************************************************************************************************/
const MAINFRAME = (function() {
	const REQ_PATH = {
			MENU_SEL: "/frme/FRME100SEL01",
			AUTH_SEL: "/frme/FRME100SEL03",
		}
	var firstMenu = null;
	let DataFrameInfo = (function () {
		let favrList = [];
		let btnAuthList = [];

		return {
			getBasicInfo: function (type) {
				let basicInfo = {
					menuNm: String(),
					id: String(),
					path: String()
				}

				switch ($.trim(type)) {
					case "direct":
						basicInfo.menuNm = "개발접근";
						basicInfo.id = "direct";
						basicInfo.path = Utils.getUrlParam("target");
						break;
					default:
						basicInfo.menuNm = MAINFRAME_langMap.get("FRME100M.getBasicInfo.default");
						basicInfo.id = "DASH100M";
						basicInfo.path = "/dash/DASH100M";
						break;
				}

				return basicInfo
			},
			getTargetPath: function (_path) {
				return GLOBAL.contextPath + _path
			},
		}
	})();

	const buttonMenu = [];

	function fnSessionCheck(callback) {
		Utils.ajaxSyncCall("/frme/sessionCheck", null, function(sessionCheck) {
			if (sessionCheck.result) {
				if (typeof callback === "function") {
					callback(sessionCheck);
				}
			} else {
				Utils.alert(MAINFRAME_langMap.get("errors.session.expired"), function () {
					location.href = GLOBAL.contextPath + "/lgin/login";
				});
			}
		});
	}

	function fnDataFrameCheck(url, callback, pathPre, id, menuId) {
		$.ajax({
			url: url,
			type: "HEAD",
			success: function () {
				if (typeof callback === "function") {
					callback();
				}

				setTimeout(function() {
					fnInitBtnAuthList(pathPre, id, menuId);
				}, 30);
			},
			error: function () {
				Utils.alert("데이터프레임 로드중 문제가 발생했습니다.");
			}
		});
		console.log(url);
	}

	function fnInitMainFrame() {
		fnInitMenu();
		fnKeyRestrict();
		
		fnInitDataFrame();

		if(GLOBAL.session.user.cnslGrpCd ==='20' ||GLOBAL.session.user.cnslGrpCd ==='30'){
			fnRequiredInstallCheck(GLOBAL.session.user.cnslGrpCd);
		}
	}

	function fnInitDataFrame() {
		let loadList = [];
		let mapgVlu1;
		let menuId;

		// 초기 로드시 고정 탭 정의 (정의 순서대로 탭 노출)
		if(Utils.isNull(firstMenu)){
			loadList.push(DataFrameInfo.getBasicInfo());
		}else{
			
			loadList.push(DataFrameInfo.getBasicInfo());
			
			/* 무조건 대시보드 뜨도록
			// URL 테넌트 기준으로 나눌 때 사용
			firstMenu.mapgVlu1 = firstMenu.mapgVlu1.replace("{tenantPrefix}", GLOBAL.session.user.tenantPrefix);
			
			mapgVlu1 = firstMenu.mapgVlu1;
			menuId = firstMenu.menuId;
			
			let basicInfo = {
				menuNm:  firstMenu.menuNm,
				id: firstMenu.dataFrmId,
				path: firstMenu.mapgVlu1+"/"+firstMenu.dataFrmId
			}
			loadList.push(basicInfo);
			*/
		}
		let basicInfo = {
			menuNm: String(),
			id: String(),
			path: String()
		}

		if (Utils.isNotNull(Utils.getUrlParam("target")))
			loadList.push(DataFrameInfo.getBasicInfo("direct"));

		
		fnDataFrameLoad(loadList.shift(), loadList, mapgVlu1, menuId);
	}

	function fnDataFrameLoad(param, loadList, pathPre, menuId) {
		fnSessionCheck(function () {
			let dfInfo = {};

			if (!$.isEmptyObject(param)) {
				dfInfo.menuNm = param.menuNm;
				dfInfo.id = param.id;
				dfInfo.path = param.path;
				dfInfo.param = param.param;
				dfInfo.menuId = param.menuId;

				if(Utils.isNull(menuId)){
					menuId = param.menuId;
				}

			} else {
				dfInfo = DataFrameInfo.getBasicInfo();
			}

			fnDataFrameCheck(DataFrameInfo.getTargetPath(dfInfo.path), function () {
				let params = $.param($.extend({
					lang: $.trim(GLOBAL.session.user.mlingCd),
					dataframeId: dfInfo.id
				}, dfInfo.param));
				let url = DataFrameInfo.getTargetPath(dfInfo.path) + "?" + encodeURIComponent(params);

				addTab(dfInfo.menuNm, dfInfo.id, url); // (메뉴명, id, url)

				if (Array.isArray(loadList) && loadList.length > 0) {
					fnDataFrameLoad(loadList.shift(), loadList);
				}

				console.info("[DataFrame load : " + url + "]");

				//-- menu close action
				$(".btn_menu_open").removeClass('on');
				$(".sideL_wrap").removeClass('on');
				// 2024-04-29 :: 클릭 한 메뉴 보존
//				$(".nav_list > li > a").removeClass('on');
//				$(".nav_list > li > div.sub_2depth > ul > li > a").removeClass('on');
//				$(".nav_list > li .sub_3depth").hide();
//				$(".nav_list > li > .sub_2depth").hide();
				$(".nav_list > li > a").each(function (index, item) {
		             if($(item).hasClass("on"))
		             {
		                 $(item).next().css("display", "none");
		             }
		        });
				//--// menu close action
			}, pathPre, dfInfo.id, menuId);
		});
	}

	function fnReloadFrame(e) {
		Utils.closeAllKendoPopup();
		fnCancelKeyEvent(e);
		fnSessionCheck(function () {
			fnReloadOpenTab();
		});
	}

	function fnCancelKeyEvent(e){
		if (e) {
			e.preventDefault();
		} else {
			event.keyCode = 0;
			event.cancelBubble = true;
			event.returnValue = false;
		}
	}

	function fnKeyRestrict() {
		/**
		 * 제한되는 키 목록
		 * 116: F5
		 * 123: F12
		 */
		$(document).off("keydown").on("keydown", function (e) {
			let key = (e) ? e.keyCode : event.keyCode;
			let t = document.activeElement;
			let restrictKeyArr = [116];

			if (!GLOBAL.debug) {
				// 제한되어야 하는 키 추가
				restrictKeyArr.push(123);
			}

			if (restrictKeyArr.indexOf(key) > -1) {
				if(GLOBAL.debug){
//					fnReloadFrame(e);
				}
				else if (key == 116) { // F5 & 디버그 모드시
					//fnReloadFrame(e);
					fnReloadNoCache(e);
				} else {
					fnCancelKeyEvent(e);
				}
			}
		});

		// contextmenu 제한 (디버그 모드 오프시)
		if (!GLOBAL.debug) {
			$(document).on("contextmenu dragstart selectstart", function (e) {
				return false;
			});
		}
	}
	
	function fnReloadNoCache(e){
		event.preventDefault();  // Prevent default F5 refresh behavior

        // Check if Ctrl and Shift keys are also pressed
        if (event.ctrlKey && event.shiftKey) {
            // Create a new KeyboardEvent to simulate Ctrl + Shift + R
            var newEvent = $.Event('keydown', {
                key: 'R',
                keyCode: 82,
                ctrlKey: true,
                shiftKey: true
            });

            // Dispatch the new event
            $(document).trigger(newEvent);
        }
	}

	function fnInitMenu() {
		let param = {
			tenantPrefix: GLOBAL.session.user.tenantPrefix,
			agentId: GLOBAL.session.user.agentId,
			usrGrd: GLOBAL.session.user.usrGrd,
			systemIdx : GLOBAL.session.user.systemIdx
		};
		
		Utils.ajaxSyncCall(REQ_PATH.MENU_SEL, JSON.stringify(param), resultMenuList);
	}

	function resultMenuList(data){
		let menu = JSON.parse(data.list);
		let totalMenu = menu.filter(function (depth1) {
			if (depth1.prsMenuLvl == 1) {
				depth1.subMenu = menu.filter(function (depth2) {
					if (depth2.prsMenuLvl == 2 && depth1.menuId == depth2.hgrkMenuId) {
						depth2.subMenu = menu.filter(function (depth3) {
							if (depth3.prsMenuLvl == 3 && depth2.menuId == depth3.hgrkMenuId)
								return true;
						});
						return true;
					}
				});
				return true;
			}
		});

		if(totalMenu[0])
		{
			firstMenu = totalMenu[0].subMenu.find(x=> x.menuTypCd=='D');

			let $parent = $(".sideL_wrap .nav .nav_list")
			fnAppendMenu(totalMenu, $parent);

//			let switchMenu = menu.filter(x=> x.comCd == 'CSM');
	//
//			let count= [ "","","", "three_words","four_words","five_words","six_words","seven_words","eight_words","nine_words","ten_words"]
	//
//			switchMenu.map(x=>{
//				frme_head_CMS.push(x.dataFrmId);
	//
//	 			let regex = /[!@#$%^&*(),.?":{}|<>]/g;
//				let specialCharsCount = (x.menuNm.match(regex) || []).length;
//				let textCount = x.menuNm.replace(regex,'');
//				let totalTextCount = textCount.length+(specialCharsCount/2);
	//
//				let mainSwitch = '<span class="swithCheck '+(totalTextCount <11 ? count[totalTextCount]:"")+'">'+
//						'<input type="checkbox" id="'+x.dataFrmId +'_main" data-path-id="'+x.dataFrmId +'" onclick="FRME_TOP_fnOpenCnsl(this)"/>'+
//						'<label title="'+x.menuNm +'"></label>'+
//						'</span>'
//					$("#FRME_MENU_SYSTEM_FN_BTN").append(mainSwitch);
//			});
			
			frme_head_CMS.push("INHB300M");
//			let advancedViewSwitch = '<span class="swithCheck four_words"><input type="checkbox" id="INHB300M_main" data-path-id="INHB300M" onclick="FRME_TOP_fnOpenCnsl(this)"><label title="고급보기"></label></span>';
//			$("#FRME_MENU_SYSTEM_FN_BTN").append(advancedViewSwitch);

			// menu action -- start
			$(".nav_list > li > a").off("click").on("click", function () {
				if (!$(this).hasClass("on")) {
					$(".sideL_wrap").addClass('on');
					$(this).addClass('on');
					$(".btn_menu_open").addClass('on');
					$(this).next().show();
				} else {
					$(this).removeClass('on');
					$(this).parent().find("div.sub_2depth > ul > li > a").removeClass('on');
					$(this).parent().find(".sub_3depth").hide();
					$(this).parent().find(".sub_2depth").hide();
				}
			});
			$(".nav_list > li > a").focus(function () {
				$(".nav_list > li > a").removeClass('on');
				$(".nav_list > li .sub_3depth").hide();
				$(".nav_list > li > .sub_2depth").hide();
				$(".sideL_wrap").addClass('on');
				$(this).addClass('on');
				$(this).next().show();
			});
			$(".nav_list > li > div.sub_2depth > ul > li > a").off("click").on("click", function () {
				if ($(this).hasClass("on")) {
					$(this).removeClass('on');
					$(this).next().hide();
				} else {
					$(this).addClass('on');
					$(this).next().show();
				}
			});
			// menu action -- end

			// menu url load tab action
			$(".sideL_wrap .nav_list li[data-type=D]").off("click").on('click', function () {
				fnOpenDataFrameById($(this).data("path-id"));
			});
		}
	}

	function fnAppendMenu(menuList, $parent) {
		$parent.empty();

		for (let key in menuList) {
			let menu = menuList[key];
			let isSubMenu = (Array.isArray(menu.subMenu) && menu.subMenu.length > 0);
			let object = fnGetMenuObject(menu, isSubMenu);

			$parent.append(object);

			if (isSubMenu) {
				let $newParent = $parent.children().last().find("ul");
				fnAppendMenu(menu.subMenu, $newParent);
			}
		}
	}

	function fnGetMenuObject(menu, isSubMenu) {
		let menuId = menu.menuId;
		let menuLevel = menu.prsMenuLvl;
		let menuType = menu.menuTypCd;
		let iconType = menu.iconTypClss;
		let menuTitle = menu.menuNm;
		let mapgVlu1 = menu.mapgVlu1;
		let dataFrmId = menu.dataFrmId;
		let dataFrmeTmplCd = menu.dataFrmeTmplCd;	// 템플릿 코드
		let usrGrd = menu.usrGrd;
		let dataFrmTypCd = menu.dataFrmTypCd;
		let szHght = menu.szHght;
		let szWdth = menu.szWdth;

		let menuObj = "";
		let iconObj = "";
		let is3DepthClass = "";
		let dataFrameInfo = "";

		if (menuLevel == 1) {
			if(iconType !== null){
				let imagePath = GLOBAL.contextPath + "/resources/images/contents/" + iconType;
				iconObj = "<span class='ic' style='background-image:url(" + imagePath + ")' title="+menuTitle+"></span>";
			}else{
				iconObj = "<span class='ic' title="+menuTitle+"></span>";
			}
		}
		if (menuLevel == 2 && isSubMenu) {
			is3DepthClass = "three";
		}

		if (menuType == "D"||menuType == "B") {
			if(dataFrmTypCd == "P"){
				let hight = szHght == 0 ? 1000 : szHght
				let width = szWdth == 0 ? 1000 : szWdth
				dataFrameInfo = " onclick='Utils.openPop(\""+GLOBAL.contextPath+mapgVlu1+"/"+ $.trim(dataFrmId)+"\",\""+ $.trim(dataFrmId)+"\","+ width+","+ hight+");'";
				if (menuType == "B") {// 버튼 메뉴 생성
					buttonMenu.push(menu);
				}
			}else{
				dataFrameInfo = " data-type='D' data-menu-id='"+menuId+"' data-menu-nm='" + menuTitle + "' data-path-pre='" + mapgVlu1 + "' data-path-id='" + $.trim(dataFrmId) + "' data-usr-grd-auth='" + (Utils.isNotNull(usrGrd) ? "Y" : "N") + "' data-tmpl-cd='" + $.trim(dataFrmeTmplCd) + "'";
			}
		}

		menuObj += "<li" + dataFrameInfo + ">";
		menuObj += "	<a class='" + is3DepthClass + "'>" + iconObj + "<span class='txt'>" + menuTitle + "</span></a>";
		if (isSubMenu) {
			menuObj += "<div class='sub_" + (menuLevel + 1) + "depth'><ul><!-- 하위 메뉴 영역 --></ul></div>";
		}
		menuObj += "</li>";

		return menuObj;
	}

	function fnOpenDataFrameById(id, paramObject) {
		if (Utils.isNotNull(id)) {
			let $menu = $(".sideL_wrap .nav_list li[data-type=D][data-path-id=" + id + "]");

			// TODO : 인수인계 : 데이터프레임 등급별 권한 구성 완료 후 주석해제
			// if ($menu.data("usr-grd-auth") == "Y") {
			if (true) {
				let dataframePath = $.trim($menu.data("path-pre")) + "/" + $.trim($menu.data("path-id"));

				if (Utils.isNotNull($menu.data("tmpl-cd")) && $menu.data("tmpl-cd") != "V0H0") {
					if ($.isEmptyObject(paramObject)) {
						paramObject = {};
					}

					dataframePath = "/tmpl/TEMPLATE_PAGE";
					paramObject.tenantPrefix = GLOBAL.session.user.tenantPrefix;
					paramObject.tmplCd = $menu.data("tmpl-cd");
				}

				fnDataFrameLoad({
					menuNm: $menu.data("menu-nm"),
					id: $.trim($menu.data("path-id")),
					path: dataframePath,
					param: paramObject,
					menuId: $menu.data("menu-id")
				}, null, $.trim($menu.data("path-pre")));

				return true;
			} else {
				Utils.alert(MAINFRAME_langMap.get("FRME100M.menu.alert.noPermission")); // 현재 등급은 해당 화면에 대한 권한이 없습니다.
				return false;
			}
		} else {
			Utils.alert(MAINFRAME_langMap.get("FRME100M.menu.alert.noDataframe")); // 해당 메뉴의 데이터프레임이 존재하지 않습니다.
			return false;
		}
	}

	function fnOnTabContentLoad() {
		//텝 로드시 테넌트유효성 체크 추가 이벤트
//		fnOnCheckTenantValidity();
	}

	function fnOnCheckTenantValidity(){
		// 유효성 버튼 리스트
		let chkList = $("[tenant-validity=Y]");
		for (let btn of chkList) {
			if(btn.onclick){
				let clickEvent = btn.onclick;
				const changeEvent = () => {
					if(CMMN_SEARCH_TENANT[$(btn).data("frmeId")].validity){
						clickEvent();
					}else{
						Utils.alert(MAINFRAME_langMap.get("error.tenantPrefix"));
					}
				}
				btn.onclick = changeEvent;
			}
		}
	}

	function fnIsTabOpen(datafrmId) {
		return IsTabOpen(datafrmId)
	}

	function fnUpdateSessionUser() {
		fnSessionCheck(function (result) {
			GLOBAL.fn.setSessionUser(result.user);
		});
	}

	// Frame 닫기 탭쪽에서 처리
	function fnCloseDataFrameById(id){
		if (Utils.isNotNull(id)) {
			closeTab(id);
		} else {
			Utils.alert(MAINFRAME_langMap.get("FRME100M.menu.alert.noDataframe")); // 해당 메뉴의 데이터프레임이 존재하지 않습니다.
			return false;
		}
	}


	function fnGetButtonMenuList(){
		return buttonMenu;
	}

	function fnGetButtonMenuClear(){
		while (buttonMenu.length){
			buttonMenu.pop();
		}
	}

	function fnInitBtnAuthList(pathPre, id, menuId) {

		// 버튼 권한 체크
		let chkList = $("div.k-tabstrip-content.k-content.k-state-active [data-auth-chk=Y]");
		if(chkList.length > 0)
		{
			var param = {
				systemIdx : GLOBAL.session.user.systemIdx,
				tenantPrefix: GLOBAL.session.user.tenantPrefix,
				agentId: GLOBAL.session.user.agentId,
				menuId : menuId,
				mapgVlu1 : pathPre,
				dataFrmId : id,
				usrGrd : GLOBAL.session.user.usrGrd
			};

			Utils.ajaxCall("/comm/COMM100SEL07", JSON.stringify(param), function (data) {
				fnOnBtnAuthCheck(chkList, data.fnAuth);
				
				let chkList2 = $("div.k-widget.k-window [data-auth-chk=Y]");
				if(chkList2.length > 0) fnOnPopupBtnAuthCheck(chkList2, data.fnAuth, id);
				
			}, null, null, function(data) {
				console.log("error :: fnAuth");
			});
		}
	}

	function fnOnBtnAuthCheck(chkList, fnAuth){

		// 버튼 권한 체크 안함
//		if ((fnAuth.usrGrd == "00" || fnAuth.usrGrd == "00")) {
//			return;
//		}

		for (let btn of chkList) {
			let dataFrmId = $(btn).data("auth-id");
			let type = $(btn).data("auth-type");
			let lvl = $(btn).data("auth-lvl");
			let typCd = { 		// C0201코드(버튼유형코드)와 데이터 일치시켜야 함
				QUERY: "fnSearchYn",	// 조회
				INSERT: "fnSaveYn",		// 등록
				UPDATE: "fnUpdateYn",	// 수정
				SAVE: "fnSaveYn",		// 저장
				DELETE: "fnDeleteYn",	// 삭제
				POPUP: "POP",			// 팝업호출
				LINK: "LIK", 			// 화면LINK
				CHANGE: "CHA",			// 화면조작
				REFUSE: "REF",			// 거절
				TEMPSAVE: "TMP",		// 임시저장
				XLXDOWN: "fnExcelYn",	// 엑셀다운로드
				FILESELECT: "FIL",		// 파일선택
				DISPOSE: "DIS",			// 폐기
				APPROVAL: "APR",		// 승인
			};
			
//			if(Utils.isNotNull(lvl) && Utils.isNotNull(GLOBAL.session.user.usrLvl) && lvl < GLOBAL.session.user.usrLvl) $(btn).hide();
			if(Utils.isNotNull(lvl) && Utils.isNotNull(GLOBAL.session.user.usrLvl) && lvl < GLOBAL.session.user.usrLvl) $(btn).remove();

			if(fnAuth.usrGrd != "00" && Utils.isNotNull(dataFrmId) && Utils.isNotNull(type) && Utils.isNotNull(typCd[type]))
			{
//				if (Utils.isNull(fnAuth[$.trim(typCd[type])]) || fnAuth[$.trim(typCd[type])] == "N") $(btn).hide();
				if (Utils.isNull(fnAuth[$.trim(typCd[type])]) || fnAuth[$.trim(typCd[type])] == "N") $(btn).remove();
			}
		}
	}
	
	function fnOnPopupBtnAuthCheck(chkList, fnAuth, id){
		for (let btn of chkList) {
			let dataFrmId = $(btn).data("auth-id");
			let type = $(btn).data("auth-type");
			let lvl = $(btn).data("auth-lvl");
			let typCd = { 		// C0201코드(버튼유형코드)와 데이터 일치시켜야 함
				QUERY: "fnSearchYn",	// 조회
				INSERT: "fnSaveYn",		// 등록
				UPDATE: "fnUpdateYn",	// 수정
				SAVE: "fnSaveYn",		// 저장
				DELETE: "fnDeleteYn",	// 삭제
				POPUP: "POP",			// 팝업호출
				LINK: "LIK", 			// 화면LINK
				CHANGE: "CHA",			// 화면조작
				REFUSE: "REF",			// 거절
				TEMPSAVE: "TMP",		// 임시저장
				XLXDOWN: "fnExcelYn",	// 엑셀다운로드
				FILESELECT: "FIL",		// 파일선택
				DISPOSE: "DIS",			// 폐기
				APPROVAL: "APR",		// 승인
			};

			if(Utils.isNotNull(dataFrmId) && dataFrmId == id)
			{
				if(Utils.isNotNull(lvl) && Utils.isNotNull(GLOBAL.session.user.usrLvl) && lvl < GLOBAL.session.user.usrLvl) $(btn).remove();
	
				if(fnAuth.usrGrd != "00" && Utils.isNotNull(dataFrmId) && Utils.isNotNull(type) && Utils.isNotNull(typCd[type]))
				{
					if (Utils.isNull(fnAuth[$.trim(typCd[type])]) || fnAuth[$.trim(typCd[type])] == "N") $(btn).remove();
				}
			}
		}
	}

	return {
		initMainFrame: fnInitMainFrame,
		initMenu: fnInitMenu,
		initDataFrame: fnInitDataFrame,
		dataFrameLoad: fnDataFrameLoad,
		openDataFrameById: fnOpenDataFrameById,
		onTabContentLoad: fnOnTabContentLoad,
		isTabOpen: fnIsTabOpen,
		reloadFrame: fnReloadFrame,
		updateSessionUser: fnUpdateSessionUser,
		closeDataFrameById: fnCloseDataFrameById,
		getButtonMenuList : fnGetButtonMenuList,
		clearButtonMenuList :fnGetButtonMenuClear,
		fnInitBtnAuthList : fnInitBtnAuthList,
};
})();

var MAINFRAME_SUB = (function () {
	return {
		dataFrameLoad: MAINFRAME.dataFrameLoad,
		initEnvironment: MAINFRAME.initEnvironment,
		updateSessionUser: MAINFRAME.updateSessionUser,
		openDataFrameById: MAINFRAME.openDataFrameById,
		isTabOpen: MAINFRAME.isTabOpen,
	}
})();