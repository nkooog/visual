/***********************************************************************************************
 * Program Name : utils 공통 함수
 * Creator      : jrlee
 * Create Date  : 2022 .02 .22
 * Description  : 공통 함수
 * Modify Desc  :
 * -----------------------------------------------------------------------------------------------
 * Date         | Updater        | Remark
 * -----------------------------------------------------------------------------------------------
 *
 ************************************************************************************************/
var arrWin = Array(); // 팝업창 관리

var CMMN_INPUT_DATE = new Object();
var CMMN_SEARCH_DATE = new Object();
var CMMN_SEARCH_TENANT = new Object();
var CMMN_SEARCH_AUTO_COMPLETE = new Object();

var TEMPLATE_BASE = new Object();

var Utils = (function () {
    var kendoPopInstances = new Array();
    var callbackFunctions = new Object();
    // var ajaxList = new Array();
    return {
    	/**
    	 * formData -> json 형태로 변환
    	 */
    	formDataToJson: function(formData) {
    		let object = {};
    	    formData.forEach((value, key) => {
    	        if (!object.hasOwnProperty(key)) {
    	            object[key] = value;
    	        } else if (!Array.isArray(object[key])) {
    	            object[key] = [object[key], value];
    	        } else {
    	            object[key].push(value);
    	        }
    	    });
    	    return object;
    	},
        /**
         * 공통 ajax 요청
         *
         * @param {string} url 요청url
         * @param {string} param 파라메터
         * @param {function} callback 콜백함수
         * @param {function} beforeFn 요청전함수
         * @param {function} completeFn 완료함수
         * @param {function} errorFn 에러함수
         */
        ajaxCall: function (url, param, callback, beforeFn, completeFn, errorFn) {
            $.ajax({
                url: GLOBAL.contextPath + url,
                type: "post",
                dataType: "json",
                contentType: 'application/json; charset=UTF-8',
                data: param,
                success: function (result) {
                    if (typeof callback === "function") {
                        callback(result);
                    }
                },
                error: function (request, status, error) {
                    if (typeof errorFn === "function") {
                        errorFn(request);
                    }
                    console.log("[error]");
                    console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
                },
                beforeSend: function (jqXHR) {
                    if (typeof beforeFn === "function") {
                        beforeFn();
                    }
                },
                complete: function (jqXHR) {
                    if (typeof completeFn === "function") {
                        completeFn();
                    }
                }
            });
        },
        /**
         * 동기 ajax 요청
         *
         * @param {string} url 요청url
         * @param {string} param 파라메터
         * @param {function} callback 콜백함수
         * @param {function} beforeFn 요청전함수
         * @param {function} completeFn 완료함수
         * @param {function} errorFn 에러함수
         */
        ajaxSyncCall: function (url, param, callback, beforeFn, completeFn, errorFn) {
            $.ajax({
                url: GLOBAL.contextPath + url,
                type: "post",
                dataType: "json",
                contentType: 'application/json; charset=UTF-8',
                async: false,
                data: param,
                success: function (result) {
                    if (typeof callback === "function") {
                        callback(result);
                    }
                },
                error: function (request, status, error) {
                    if (typeof errorFn === "function") {
                        errorFn();
                    }
                    console.log("[error]");
                    console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
                },
                beforeSend: function (jqXHR) {
                    if (typeof beforeFn === "function") {
                        beforeFn();
                    }
                },
                complete: function (jqXHR) {
                    if (typeof completeFn === "function") {
                        completeFn();
                    }
                }
            });
        },
        /**
         * formData ajax 요청
         *
         * @param {string} url 요청url
         * @param {formData} param 파라메터
         * @param {function} callback 콜백함수
         * @param {function} beforeFn 요청전함수
         * @param {function} completeFn 완료함수
         * @param {function} errorFn 에러함수
         */
        ajaxCallFormData: function (url, param, callback, beforeFn, completeFn, errorFn) {
            $.ajax({
                url: GLOBAL.contextPath + url,
                type: "post",
                dataType: "json",
                enctype: 'multipart/form-data',  //필수
                cache: false,                  //필수
                contentType: false,                  //필수
                processData: false,                  //필수
                timeout: 18000,                   //필수
                data: param,
                success: function (result) {
                    if (typeof callback === "function") {
                        callback(result);
                    }
                },
                error: function (request, status, error) {
                    if (typeof errorFn === "function") {
                        errorFn();
                    }
                    console.log("[error]");
                    console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
                },
                beforeSend: function (jqXHR) {
                	jqXHR.setRequestHeader("ajaxhost","ncrm");		//필수 : interceptor 사용 시 ajax를 이요한 파일 업로드 허용
                    if (typeof beforeFn === "function") {
                        beforeFn();
                    }
                },
                complete: function (jqXHR) {
                    if (typeof completeFn === "function") {
                        completeFn();
                    }
                }
            });
        },
        /**
         * fileDownload ajax 요청
         *
         * @param {string} url 요청url
         * @param {string} path 파일경로
         * @param {string} idxNm 파일인덱스명
         * @param {formData} param 파라메터
         * @param {function} callback 콜백함수
         * @param {function} beforeFn 요청전함수
         * @param {function} completeFn 완료함수
         * @param {function} errorFn 에러함수
         */
        ajaxCallFileDownload: function (url, path, idxNm, callback, beforeFn, completeFn, errorFn) {
            $.ajax({
                url: GLOBAL.contextPath + url + "?urlPath=" + path + "&fileName=" + idxNm,
                type: "get",
                cache: false,
                xhrFields: {
                    responseType: "blob",
                },
                success: function (result) {
                    if (typeof callback === "function") {
                        callback(result);
                    }
                },
                error: function (request, status, error) {
                    if (typeof errorFn === "function") {
                        errorFn();
                    }
                    console.log("[error]");
                    console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
                },
                beforeSend: function (jqXHR) {
                    if (typeof beforeFn === "function") {
                        beforeFn();
                    }
                },
                complete: function (jqXHR) {
                    if (typeof completeFn === "function") {
                        completeFn();
                    }
                }
            });
        },
        /**
         * 팝업형태로 새창을 오픈합니다.
         * GetUrl 로 Parmater를 전송한다.
         * 2023.07 이후 신규 코드 작성시 사용 지양
         * @param {string} url 오픈url
         * @param {string} targetName 팝업이름
         * @param {number} w 팝업넓이
         * @param {number} h 팝업높이
         * @param {Object} param 전송 파라메터
         * @param {booleam} isChildOpen 팝업 Open 위치 true <-자식창 오픈
         */
        openPop: function (url, targetName, w, h, param, isChildOpen, pos) {
       		let _paramObject = {lang: $.trim(GLOBAL.session.user.mlingCd)};
            if (this.isObject(param)) {
                var _objectKeys = Object.keys(param);
                for (let i = 0; i < _objectKeys.length; i++) {
                    _paramObject[_objectKeys[i]] = param[_objectKeys[i]];
                }
            }

            let _params = $.param(_paramObject);
            let _url = url + "?" + _params;

            let dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
            let dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
            let width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
            let height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

            if (isChildOpen) {
             width = window.parent.innerWidth;
             height = window.parent.innerHeight;
            }

            let left = ((width / 2) - (w / 2)) + dualScreenLeft;
            let top = ((height / 2) - (h / 2)) + dualScreenTop;

            let newWindow = window.open(_url, targetName, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

            arrWin.push(newWindow);

            if (window.focus) {
                newWindow.focus();
            }
            return newWindow;
        },
        /**
         * 팝업형태로 새창을 오픈합니다
         * LocalStorage 를 사용하여 Parmater를 전송한다.
         * 2023.07 이후 신규 코드 작성시 사용 지향
         * @param {string} url 오픈url
         * @param {string} targetName 팝업이름
         * @param {number} w 팝업넓이
         * @param {number} h 팝업높이
         * @param {object|boolean} pos 팝업 포지션 {x:number y:number} = 해당 포지션에 팝업 오픈 | false = 센터 오픈
         * @param {Object} param 추가파라메터
         * @param {booleam} isChildOpen 팝업 Open 위치 true <-자식창 오픈
         */
        openPopV2: function (url, targetName, w, h, pos, param, isChildOpen) {

            let dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
            let dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
            let width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
            let height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

            if (isChildOpen) {
                width = window.parent.innerWidth;
                height = window.parent.innerHeight;
            }

            let x = ((width / 2) - (w / 2)) + dualScreenLeft;
            let y = ((height / 2) - (h / 2)) + dualScreenTop;

            if(this.isObject(pos)){
                x = pos.x;
                y = pos.y;
            }

            let newWindow = window.open(url, targetName, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, ' +
                'width=' + w + ', height=' + h + ', top=' + y + ', left=' + x);

            if(param != null || param != undefined){
                localStorage.setItem(targetName, JSON.stringify(param));
            }
            arrWin.push(newWindow);

            if (window.focus) {
                newWindow.focus();
            }

            return newWindow;
        },
        /**
         * 팝업형태로 새창을 오픈합니다.
         * GetUrl 로 Parmater를 전송한다.
         * 2023.07 이후 신규 코드 작성시 사용 지양
         * @param {string} url 오픈url
         * @param {string} targetName 팝업이름
         * @param {number} w 팝업넓이
         * @param {number} h 팝업높이
         * @param {Object} param 전송 파라메터
         * @param {booleam} isChildOpen 팝업 Open 위치 true <-자식창 오픈
         */
        openPopV3: function (url, targetName, w, h, param, isChildOpen, pos) { 
        	let _paramObject = {lang: $.trim(GLOBAL.session.user.mlingCd)};
            if (this.isObject(param)) {
                var _objectKeys = Object.keys(param);
                for (let i = 0; i < _objectKeys.length; i++) {
                    _paramObject[_objectKeys[i]] = param[_objectKeys[i]];
                }
            }

            let _params = $.param(_paramObject);
            let _url = url + "?" + _params;

            let dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
            let dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
            let width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
            let height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

            if (isChildOpen) {
             width = window.parent.innerWidth;
             height = window.parent.innerHeight;
            }

            let left = ((width / 2) - (w / 2)) + dualScreenLeft;
            let top = ((height / 2) - (h / 2)) + dualScreenTop;
            
            if(this.isObject(pos)){
            	left = pos.x;
            	top = pos.y;
            }

            let newWindow = window.open(_url, targetName, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

            arrWin.push(newWindow);

            if (window.focus) {
                newWindow.focus();
            }
            return newWindow;
        },

        /**
         * 팝업에서 부모창에서 넘긴 데이터를 찾아온다;
         * @param {string} targetName 팝업이름
         * @return {object} Data
         */
        getPopV2Param: function(targetName){
            let data = localStorage.getItem(targetName);
            localStorage.removeItem(targetName);
            return JSON.parse(data);
        },
        /**
         * 현재 url에 포함된 특정 parameter의 값을 추출
         *
         * @param {string} param parameter
         * @returns {string|number|null}
         */
        getUrlParam: function (param) {
            var results = new RegExp('[\?&]' + param + '=([^&#]*)').exec(window.location.href);

            if (results == null) {
                return null;
            } else {
                return decodeURI(results[1]) || 0;
            }
        },
        /**
         * input 태그에서 입력 된 값 중 숫자만 입력이 가능 하도록 처리
         * 용법 : <input type="text" onkeypress='return Utils.onlyNumber(event)'/>
         *
         * @param :event
         * @returns number
         */
        onlyNumber: function (event) {
            if (event.key >= 0 && event.key <= 9) {
                return true;
            }
            return false;
        },
        /**
         * 원하는 코드의 코드명을 가져온다.
         * 해당 코드가 없으면 코드를 그대로 리턴.
         *
         * @param {Object[]} codeList 전체코드배열
         * @param {string} mgntItemCd 특정코드그룹
         * @param {string} comCd 코드
         * @returns {string}
         */
        getComCdNm: function (codeList, category, comCd) {
            var comCdNm = "";

            if(this.isNull(codeList) || this.isNull(category) || this.isNull(comCd)) return comCdNm;

            var code = codeList.find(function (code) {
                return code.category == category && code.code == comCd;
            });

            if (code && !this.isNull(code.codeName)) {
            	comCdNm = code.codeName;
            }

            return comCdNm;
        },
        /**
         * 원하는 코드의 서브 코드를 가져온다.
         * 해당 코드가 없으면 코드를 그대로 리턴.
         *
         * @param {Object[]} codeList 전체코드배열
         * @param {string} mgntItemCd 특정코드그룹
         * @param {string} comCd 코드
         * @returns {string}
         */
        getComCdSubMgntitem: function (codeList, mgntItemCd, comCd) {
            var subMgntItemCd = comCd;
            var code = codeList.find(function (code) {
                return code.mgntItemCd == mgntItemCd && code.comCd == comCd;
            });

            if (code && !this.isNull(code.subMgntItemCd)) {
                subMgntItemCd = code.subMgntItemCd;
            }

            return subMgntItemCd;
        },
        /**
         * 확인 대상이 Object인지 확인
         *
         * @param {any} obj 확인대상
         * @returns {boolean} 결과
         */
        isObject: function (obj) {
            if (this.isNull(obj)) {
                return false;
            }
            if (Array.isArray(obj)) {
                return false;
            }

            return typeof obj === 'object';
        },
        /**
         * 공백임을 체크
         *
         * @param {string} str 문자열
         * @returns {boolean}
         */
        isNull: function (str) {
            return undefined == str || "undefined" == str ||'' == str || null == str || "null" == str;
        },
        /**
         * 공백이 아님을 체크
         *
         * @param {string} str 문자열
         * @returns {boolean}
         */
        isNotNull: function (str) {
            return !this.isNull(str);
        },
        /**
         * 공백 제거
         *
         * @param {string} str 문자열
         * @returns {string}
         */
        removeBlank: function (str) {
            return str.replace(/ /gi, "");
        },
        /**
         * (kendo) alert
         *
         * @param {string} content 내용
         * @param {function} callback 확인콜백
         */
        alert: function (content, callback) {
            var target = (self !== top) ? parent : window;
            var kendoAlert = target.$("<div></div>").kendoAlert({
                minWidth: "400px",
                maxWidth: "800px",
                title: "알림",
                content: content,
                messages: {
                    okText: "확인",
                },
                actions: [{
                    action: function (e) {
                        if (typeof callback === "function") {
                            callback();
                        }
                    }
                }]
            }).data("kendoAlert");

            kendoAlert.open();

            kendoPopInstances.push(kendoAlert);
        },
        /**
         * (kendo) confirm
         *
         * @param {string} content 내용
         * @param {function} callback 확인콜백
         * @param {function} cancelCallback 취소콜백
         */
        confirm: function (content, callback, cancelCallback) {
            var target = (self !== top) ? parent : window;
            var kendoConfirm = target.$("<div></div>").kendoConfirm({
                minWidth: "400px",
                title: "확인",
                content: content,
                messages: {
                    okText: "확인",
                    cancel: "취소"
                }
            }).data("kendoConfirm");

            kendoConfirm.open().result.done(function () {
                if (typeof callback === "function") {
                    callback();
                }
            }).fail(function () {
                if (typeof cancelCallback === "function") {
                    cancelCallback();
                }
            });

            kendoPopInstances.push(kendoConfirm);
        },
        /**
         * (kendo) KendoMultiSelect 구성 : 공통코드용
         *
         * @param {Object[]} codeList 전체코드배열
         * @param {string} mgntItemCd 특정코드그룹
         * @param {string} target 선택자
         * @param {boolean} multiLabel 표기방식
         * @param {string[]} initValues 선택값배열
         * @returns {kendoDropDownList} 인스턴스
         */
        setKendoMultiSelect: function (codeList, mgntItemCd, target, multiLabel, initValues) {
            let options = {
                placeholder: "선택",
                dataTextField: "text",
                dataValueField: "value",
                autoClose: false,
                // autoBind: false,
                dataSource: codeList.filter(function (code) {
                    if (code.mgntItemCd == mgntItemCd) {
                        code.text = code.comCdNm;
                        code.value = code.comCd;

                        return code;
                    }
                }),
                itemTemplate: '<p class="multiCheck">#: text #</p>'
            };
            if (!multiLabel) {
                options.tagMode = "single";
            }

            let kendoMultiSelect = $(target).kendoMultiSelect(options).data("kendoMultiSelect");

            kendoMultiSelect.ul.addClass('multiSelect');
            kendoMultiSelect.input.attr("readonly", true);
            kendoMultiSelect.value(initValues);

            return kendoMultiSelect;
        },
        /**
         * (kendo) KendoMultiSelect 구성 : 일반배열용
         *
         * @param {Object[]} list 전체배열
         * @param {string} target 선택자
         * @param {string} dataTextField text필드
         * @param {string} dataValueField value필드
         * @param {boolean} multiLabel 표기방식
         * @param {string[]} initValues 선택값배열
         * @returns {kendoDropDownList} 인스턴스
         */
        setKendoMultiSelectCustom: function (list, target, dataTextField, dataValueField, multiLabel, initValues) {
            let options = {
                placeholder: "선택",
                dataTextField: dataTextField,
                dataValueField: dataValueField,
                autoClose: false,
                // autoBind: false,
                dataSource: list,
                clearButton: false,
                itemTemplate: '<p class="multiCheck">#: ' + dataTextField + ' #</p>'
            };
            if (!multiLabel) {
                options.tagMode = "single";
            }

            let kendoMultiSelect = $(target).kendoMultiSelect(options).data("kendoMultiSelect");

            kendoMultiSelect.ul.addClass('multiSelect');
            kendoMultiSelect.input.attr("readonly", true);
            kendoMultiSelect.value(initValues);
            return kendoMultiSelect;
        },
        /**
         * (kendo) kendoComboBox 구성 : 공통코드용
         *
         * @param {Object[]} codeList 전체코드배열
         * @param {string} mgntItemCd 특정코드그룹
         * @param {string} target 선택자
         * @param {string} initValue 선택값
         * @param {boolean|string} isTotalOption 전체옵션값여부
         * @returns {kendoComboBox} 인스턴스
         */
        setKendoComboBox: function (codeList, category, target, initValue, isTotalOption) {
            let dataSource = [];

            if (typeof isTotalOption === "string") {
                dataSource.push({text: isTotalOption, value: ""});
            } else if (isTotalOption != false) {
                dataSource.push({text: "전체", value: ""});
            }

            dataSource = dataSource.concat(codeList.filter(function (code) {
                if (code.category == category) {
                    code.text = code.codeName;
                    code.value = code.code;

                    return code;
                }
            }))

            let kendoComboBox = $(target).kendoComboBox({
                dataSource: dataSource,
                dataTextField: "text",
                dataValueField: "value",
                clearButton: false,
                autoWidth: true,
            }).data("kendoComboBox");

            if (Utils.isNotNull(initValue)) {
                kendoComboBox.value(initValue);
            } else {
                if (dataSource.length > 0)
                    kendoComboBox.value(dataSource[0].value);
            }

            kendoComboBox.input.attr("readonly", true);

            return kendoComboBox;
        },
        /**
         * (kendo) kendoComboBox 데이터 변경  : 공통코드용
         *
         * @param {Object[]} codeList 전체코드배열
         * @param {string} mgntItemCd 특정코드그룹
         * @param {kendoComboBox} target 생성된 kendoComboBox
         * @param {string} initValue 선택값
         * @param {boolean|string} isTotalOption 전체옵션값여부
         */
        changeKendoComboBoxDataSource: function (codeList, mgntItemCd, target, initValue, isTotalOption) {
            let dataSource = [];

            if (typeof isTotalOption === "string") {
                dataSource.push({text: isTotalOption, value: ""});
            } else if (isTotalOption != false) {
                dataSource.push({text: "전체", value: ""});
            }

            dataSource = dataSource.concat(codeList.filter(function (code) {
                if (code.mgntItemCd == mgntItemCd) {
                    code.text = code.comCdNm;
                    code.value = code.comCd;
                    return code;
                }
            }));

            target.setDataSource(new kendo.data.DataSource({data: dataSource}));

            if (Utils.isNotNull(initValue)) {
                target.value(initValue);
            } else {
                if (dataSource.length > 0)
                    target.value(dataSource[0].value);
            }
            target.input.attr("readonly", true);
        },
        /**
         * (kendo) kendoComboBox 구성 : 일반배열용
         *
         * @param {Object[]} list 전체코드배열
         * @param {string} target 선택자
         * @param {string} dataTextField text필드
         * @param {string} dataValueField value필드
         * @param {string} initValue 선택값
         * @param {boolean|string} isTotalOption 전체옵션값여부
         * @returns {kendoComboBox} 인스턴스
         */
        setKendoComboBoxCustom: function (list, target, dataTextField, dataValueField, initValue, isTotalOption) {
            let dataSource = [];

            if (typeof isTotalOption === "string") {
                let object = new Object();
                object[dataTextField] = isTotalOption;
                object[dataValueField] = "";

                dataSource.push(object);
            } else if (isTotalOption != false) {
                let object = new Object();
                object[dataTextField] = "전체";
                object[dataValueField] = "";

                dataSource.push(object);
            }

            dataSource = dataSource.concat(list);

            let kendoComboBox = $(target).kendoComboBox({
                dataSource: dataSource,
                dataTextField: dataTextField,
                dataValueField: dataValueField,
                clearButton: false
            }).data("kendoComboBox");

            if (Utils.isNotNull(initValue)) {
                kendoComboBox.value(initValue);
            } else {
                if (dataSource.length > 0)
                    kendoComboBox.value(dataSource[0][dataValueField]);
            }

            kendoComboBox.input.attr("readonly", true);

            return kendoComboBox;
        },
        /**
         * (kendo) kendoComboBox 데이터 변경 : 일반배열용
         *
         * @param {Object[]} list 전체코드배열
         * @param {Object} target 선택자
         * @param {string} dataTextField text필드
         * @param {string} dataValueField value필드
         * @param {string} initValue 선택값
         * @param {boolean|string} isTotalOption 전체옵션값여부
         * @returns {kendoComboBox} 인스턴스
         */
        changeKendoComboBoxDataSourceCustom: function (list, target, dataTextField, dataValueField, initValue, isTotalOption) {
            let dataSource = [];

            if (typeof isTotalOption === "string") {
                let object = new Object();
                object[dataTextField] = isTotalOption;
                object[dataValueField] = "";

                dataSource.push(object);
            } else if (isTotalOption != false) {
                let object = new Object();
                object[dataTextField] = "전체";
                object[dataValueField] = "";

                dataSource.push(object);
            }

            dataSource = dataSource.concat(list);


            target.setDataSource(new kendo.data.DataSource({data: dataSource}));

            if (Utils.isNotNull(initValue)) {
                target.value(initValue);
            } else {
                if (dataSource.length > 0)
                    target.value(dataSource[0][dataValueField]);
            }
            target.input.attr("readonly", true);
        },
        /**
         * (kendo) kendoComboBox의 클리어버튼 추가.
         *
         * @param kendoInstance 켄도콤보인스턴스
         * @returns {kendoInstance} 켄도콤보인스턴스
         */
        addComboClearButton: function (kendoInstance) {
            kendoInstance.setOptions(kendoInstance.options.clearButton = true);
            kendoInstance.refresh();

            return kendoInstance;
        },
        /**
         * (kendo) iframe 형식의 kendoWindow 팝업
         *
         * 팝업 내부에서 부모창 접근시 parent로 호출필요
         *
         * @param {string} url 경로
         * @param {number} width 가로
         * @param {number} height 세로
         * @param {string} position 기준위치(left|right|center)
         * @param {number} distance 기준부터의거리
         * @param {number} top 상단거리
         * @param {string|boolean} title 타이틀
         * @param {Object} param 추가파라메터
         * @returns {kendoWindow} instance
         */
        openKendoWindow: function (url, width, height, position, distance, top, title, param) {
            let timeStamp = Math.floor(Math.random() * 100).toString() + new Date().getTime();
            let paramObject = {
//                lang: 'ko',
                id: timeStamp
            };
            if (this.isObject(param)) {
                $.extend(paramObject, param);
            }
            let _url = GLOBAL.contextPath + url + "?" + $.param(paramObject);

            let kendoWindow = $("<div id='" + timeStamp + "'></div>").kendoWindow({
                content: _url,
                title: title,
                modal: true,
                iframe: true,
                visible: false,
                draggable: false,
                resizable: true,
                width: width,
                height: height,
                actions: ["Refresh", "Close"],
                activate: function() { // 메인화면 클릭시 윈도우 닫기
                    $(".k-overlay").on("click", function () {
                        kendoWindow.close();
                    });
                },
                deactivate: function (e) {
                    this.destroy()
                }
            }).data("kendoWindow");

            if (position == "center") {
                kendoWindow.center().open();
            } else {
                if (position == "right") {
                    kendoWindow.wrapper.css({top: top, left: "auto", right: distance});
                } else {
                    kendoWindow.wrapper.css({top: top, left: distance});
                }
                kendoWindow.open();
            }

            kendoPopInstances.push(kendoWindow);

            return kendoWindow;
        },
        /**
         * (kendo) kendoWindow 팝업 닫기
         *
         * @param {string} id 아이디
         */
        closeKendoWindow: function (id) {
            if (self !== top) {
                parent.$("#" + id).data("kendoWindow").close();
            } else if (self.opener) {
                window.close();
            } else {
                $("#" + id).data("kendoWindow").close();
            }
        },
        /**
         * (kendo) 모든 켄도창들을 강제로 닫는다.
         * alert, confirm, window
         */
        closeAllKendoPopup: function () {
            for (const x in kendoPopInstances) {
                var instance = kendoPopInstances[x];
                instance.close();
            }

            kendoPopInstances = new Array();
        },
        /**
         * 모든 팝업창을 닫는다.
         * 윈도우 팝업, 켄도 팝업
         */
        closeAllPopup: function () {
            var windowPopInstances = arrWin;

            for (const i in windowPopInstances) {
                windowPopInstances[i].close();
            }

            this.closeAllKendoPopup();
        },
        /**
         * 현재 팝업 상태에 따른 부모창 접근자를 리턴
         *
         * @returns {parent|opener|WindowProxy}
         */
        getParent: function () {
            if (self !== top) {
                return parent;
            } else if (self.opener) {
                return opener;
            } else {
                return window;
            }
        },
        /**
         * 콜백함수를 특정 키값으로 가져오기
         *
         * @param {string} key 함수키값
         * @returns {function}
         */
        getCallbackFunction: function (key) {
            return callbackFunctions[key];
        },
        /**
         * 콜백함수를 특정 키값으로 지정
         *
         * @param {string} key 함수키값
         * @param {function} callback 함수
         */
        setCallbackFunction: function (key, callback) {
            callbackFunctions[key] = callback;
        },
        /**
         * 팝업의 콜백을 가져온다. (콜백은 부모창의 함수를 말한다.)
         *
         * @param {string} key 함수키값
         * @returns {function} callback 함수
         */
        getPopupCallback: function (key) {
            let callback = Utils.getParent().Utils.getCallbackFunction(key);

            if (typeof callback === "function") {
                return callback;
            } else {
                return function () {
                    console.log("Callback not found : " + key);
                }
            }
        },
        /**
         * 리스트에서 특정컬럼의 값이 일치하는 오브젝트를 리턴
         *
         * @param {Object[]} list 리스트
         * @param {string} column 대상컬럼
         * @param {string} value 대상컬럼의값
         * @returns {Object} 오브젝트
         */
        getObjectFromList(list, column, value) {
            return list.find(function (item) {
                return item[column] == value;
            });
        },
        /**
         * 검색영역의 라벨 사이즈를 통일
         * (SearchWrap 영역 내부만 적용)
         */
        resizeLabelWidth() {
            let target = "div.k-tabstrip-content.k-content.k-state-active .SearchWrap";

            if (self.opener) {
                target = ".SearchWrap";
            }

            $(target + " .label_tit").removeAttr('style');
            $(target).each(function () {
                let labelArray = [];
                $(this).find('.label_tit').each(function () {
                    let labelW = $(this).width();
                    labelArray.push(labelW);
                });
                let maxLabel = Math.max.apply(Math, labelArray);
                $(this).find('.label_tit').css('width', maxLabel + 20);
            });
        },
        /**
         * 필수 입력 필드를 체크한다.
         * 해당 필드의 값이 없을시 색상을 변경하여 입력이 필요한 부분을 알려준다.
         *
         * @returns {boolean} 체크결과
         */
        markingRequiredField() {
            let valid = true;
            let parentDiv = "div.k-tabstrip-content.k-content.k-state-active";
            let checkRequiredArr = new Array();

            checkRequiredArr.push("input.checkRequired");
            checkRequiredArr.push("select.checkRequired");
            checkRequiredArr.push("textarea.checkRequired");

            let checkRequiredStr = checkRequiredArr.join(",");
            let $target = $(parentDiv).find(checkRequiredStr);

            if (self.opener) {
                $target = $(checkRequiredStr);
            }

            $target.each(function (index, item) {
                let targetValue = $(this).val();

                if ($(this).data("role") == "combobox") {
                    targetValue = $(this).data("kendoComboBox").value();
                }

                if (Utils.isNull(targetValue)) {
                    valid = false;

                    if ($(this).data("role") == "combobox") {
                        $(this).siblings("input").addClass("inputError");
                    } else {
                        $(this).addClass("inputError");
                    }
                } else {
                    $(this).removeClass("inputError");
                }

                $(this).off("focus").on("focus", function () {
                    $(this).removeClass("inputError");
                    $(this).off("focus");
                });
            });

            return valid;
        },
        /**
         * 팝업 그리드에서 더블클릭 시 콜백 함수로 데이터 반환
         *
         * @param {string} target 그리드 선택자
         */
        popKendoGridDoubleClickReturnData(target) {
            let callback = Utils.getUrlParam('callbackKey');
            let iframeId = Utils.getUrlParam('id');
            let grid = $(target).getKendoGrid();
            $(target + " tbody").on("dblclick", "td", function (e) {
                let selectItem = grid.dataItem(grid.select());
                Utils.getPopupCallback(callback)(selectItem);
                Utils.isNotNull(iframeId) ? Utils.closeKendoWindow(iframeId) : window.close();
            });
        },

        /**
         * 특정 그리드에 더블클릭 이벤트 주입
         *
         * @param {string} target 그리드선택자
         */
        setKendoGridDoubleClickAction(target) {
            let grid = $(target).getKendoGrid();
            let $editCell = null;

            $(target + " tbody").on("dblclick", "td", function (e) {
                if (!$(this).hasClass("k-edit-cell")) {
                    grid.editCell($(this));
                    $editCell = $(this);
                    let checkInputType = $editCell.find("input").attr("role");
                    if (Utils.isNull(checkInputType)) {
                        $(this).find("input[type=text]").select();
                    }
                }
            });
            $(target + " tbody").on("blur", "td", function (e) {
                let exceptArr = [
                    "input:checkbox",
                    "button.btnRefer_default",
                    "button.k-i-zoom-in"
                ];

                if ($(this).find(exceptArr.join(",")).length == 0) {
                    if ($(this).find(".k-focus").length == 0) {
                        grid.closeCell($(this));
                        grid.refresh();
                        $editCell = null;
                    }
                }
            });
            $(target + " tbody").on("click", "td", function (e) {
                if ($editCell && !$(this).hasClass("k-edit-cell")) {
                    $editCell.find("input").blur();
                }
            });
        },
        /**
         * 이스케이프로 변환된 태그를 HTML 태그로 변환시킨다.
         *
         * @param {string} input 이스케이프가 포함된 HTML Code
         * @returns {string}  이스케이프가 제거된 HTML Code
         */
        htmlDecode(input) {
            var doc = new DOMParser().parseFromString(input, "text/html");
            return doc.documentElement.textContent;
        },
        /**
         * List 형 데이터를 KendoTreeList 형식으로 데이터를 변환한다
         *
         * @param {any[]} MappedArr 부모코드가있는 리스트형 데이터
         * @param {string} hgrk {} 안에 부모코드 지정이름
         * @param {boolean} expanded {} 펼침여부
         * @returns {[]}  변환된 리스트
         */
        CreateTreeDataFormat(MappedArr, hgrk, expanded) {
            for (let item of MappedArr) {
                if (expanded != null) {
                    item.expanded = expanded;
                }
                item.items = [];
            }

            let treeCol = [], MappedElem;

            for (let num in MappedArr) {
                if (MappedArr.hasOwnProperty(num)) {
                    MappedElem = MappedArr[num];
                    if (MappedElem[hgrk]) {//부모코드가 있는경우
                        let hgrkNo = MappedArr.findIndex(e => e.id === MappedElem[hgrk]); // 부모조직의 인덱스 찾기
                        MappedArr[hgrkNo].items.push(MappedElem);
                    } else {//부모코드가 없을경우 -> 최상단
                        treeCol.push(MappedElem);
                    }
                }
            }

            return treeCol;
        },

        /**
         * 8자리 문자열 yyyy-MM-dd 형식으로 변환한다
         *
         * @param {string} str 8자리 문자 (ex. 20221028)
         * @returns {string} 변환된 날짜 형식의 문자열 (ex. 2022-10-28)
         */
        stringToDateFormat: function (str) {
            return str.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
        },
        /**
         * 4자리 문자열 HH:mm 형식으로 변환한다
         *
         * @param {string} str 4자리 문자 (ex. 0930)
         * @returns {string} 변환된 시간 형식의 문자열 (ex. 09:30)
         */
        stringToTimeFormat: function (str) {
            return str.replace(/(\d{2})(\d{2})/, '$1:$2');
        },

        /**
         * 테넌트 찾기 공통 팝업
         *
         * @param {event} call 호출 화면의 target element(input)
         * @param {string} target 값이 들어갈 ID 값
         * @returns {none}
         */
        fnSearchTenantNm: function (call, target) {
            const tempTenantPrefix = call.value.toUpperCase();
            $(call).val(tempTenantPrefix);
            if (tempTenantPrefix.length >= 3) {
                GetTenantNm(tempTenantPrefix, target);
            }
        },
        /**
         * 테넌트 찾기 공통 팝업
         *
         * @param {event} e 호출 화면의 target element(button)
         * @returns {none}
         */
        fnSearchTenantPopUp: function (e) {
            const target = e.previousElementSibling;
            const targetId = target.id.slice(0, target.id.indexOf('_'))
            const targetCallBackKey = ''.concat(targetId, "_fnSYSM101PCallback")
            Utils.setCallbackFunction(targetCallBackKey, function (tenantPrefix) {
                $('#' + targetId + "_tenantPrefix").val(tenantPrefix);
                GetTenantNm(tenantPrefix, targetId + "_tenantNm");
            });
            Utils.openPop(GLOBAL.contextPath + "/sysm/SYSM101P", "SYSM101P", 900, 600, {callbackKey: targetCallBackKey})
        },

        /**
         * 특정 구문에서 특정 글자 하이라이팅 처리
         * @param {string} textContent 구문
         * @param {string} text 하이라이팅 할 텍스트
         * @param {string} backgroundColor 하이라이팅 백그라운드 색상
         * @param {string} fontColor 하이라이팅 폰트 색상
         * @returns {string} 하이라팅 추가된 Html 텍스트 코드
         */
        convertTextHighlight : function(textContent,text,backgroundColor,fontColor){
            backgroundColor = this.isNull(backgroundColor) ? "yellow": backgroundColor;
            fontColor = this.isNull(fontColor) ? "black": fontColor;
            text = this.isNull(text) ? null: text;

            return textContent.replace(new RegExp(text, 'gi'), "<mark style='background-color: "+backgroundColor+"; color:"+fontColor+";'>$&</mark>")
        },
        getContextPath() {
            var hostIndex = location.href.indexOf( location.host ) + location.host.length;
            return location.href.substring( hostIndex, location.href.indexOf('/', hostIndex + 1) );
        },
        /**
         * call : Utils.getToday("-");
         * return yyyy-mm-dd
         */
        getToday(ch) {
    	  var date = new Date();
    	  var year = date.getFullYear();
    	  var month = String(date.getMonth() + 1).padStart(2, "0");
    	  var day = String(date.getDate()).padStart(2, "0");
    	 
    	  ch = this.isNull(ch) ? "-" : ch;
    	  
    	  return year + ch + month + ch + day;
    	},
    	/**
         * call : Utils.getNowDateTime();
         * return yyyymmddHHmmss
         */
    	getNowDateTime() {
    		var now = new Date();
    	    var year = now.getFullYear();
    	    var month = now.getMonth() + 1; // 월은 0부터 시작하므로 1을 더합니다.
    	    var day = now.getDate();
    	    var hours = now.getHours();
    	    var minutes = now.getMinutes();
    	    var seconds = now.getSeconds();

    	    // 두 자리 숫자로 포맷팅
    	    month = month < 10 ? '0' + month : month;
    	    day = day < 10 ? '0' + day : day;
    	    hours = hours < 10 ? '0' + hours : hours;
    	    minutes = minutes < 10 ? '0' + minutes : minutes;
    	    seconds = seconds < 10 ? '0' + seconds : seconds;

    	    return year + month + day + hours + minutes + seconds;
    	},
    	webSocketConnect : function(url, token, funSendName, Name, Method, Subscribe, param, onmessage, onerror) {

    	    const socket = new WebSocket(url);

    	    if (typeof funSendName === "function") {
    	    	funSendName(socket, token, Name, Method, Subscribe, param);
    	    } else this.webSocketSend(socket, token, Name, Method, Subscribe, param);

    	    socket.onmessage = (event) => {
    	    	if (typeof onmessage === "function") {
    	    		onmessage(event);
                }
    	    };

    	    socket.onerror = (error) => {
    	    	if (typeof onerror === "function") {
    	    		onerror(error);
                }
    	    };
    	    
    	    socket.onclose = async (e) => {
				this.webSocketConnect(url, token, funSendName, Name, Method, Subscribe, param, onmessage, onerror);
			}
    	},
    	webSocketSend : function(socket, token, Name, Method, Subscribe, param)
    	{
    		const data = {
				Name : Name
				, Method : Method
				, Subscribe : Subscribe
    		};

    		if(token != null && token != "") data.Authorization = token;
    		if(param != null && param != "") data.Parameter = param;

    		socket.onopen = () => {
    	        const temp = JSON.stringify(data);
    	        socket.send(temp);
    	    };
    	},

        /**
         * pathID기준 메뉴 속성 정보 가져오기
         * @param pathId
         * @returns {{menuId: *, pathid: *, pathPre: *}}
         */
        getMenuInfo : function (pathId){
            let menuInfo = $('.sideL_wrap [data-path-id = '+pathId+']')
            return {
                pathPre : menuInfo.attr("data-path-pre"),
                pathid  : menuInfo.attr("data-path-id"),
                menuId  : menuInfo.attr("data-menu-id")
            }
        }
    }
})();