<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%
    /**
     * @Class Name : CMMN_SEARCH_DATE.jsp
     * @Description : 날짜검색
     * @Modification Information
     *  ----------------------------------------------------------
     *   수정일                 수정자                   수정내용
     *  ----------------------------------------------------------
     *  2022.03.04   jrlee      최초 생성
     *  2022.05.18   mhlee      신규 퍼블 적용
     *  2022.06.24   djjung     Defualt Select "직접입력"으로 수정,
     *                          각 화면에서 Trigger로 버튼 Select 호출하여 사용
     *                         ex) $('#KMST200M button[name=KMST200_dateStart_btn1]').click();
     *  2022.07.01   mhlee      화면 ID 값 추가
     *  ----------------------------------------------------------
     * author CRMLab실 jrlee
     * since  2021.12.20
     *
     * Copyright (C) 2021~2022 by BroadC&S  All right reserved.
     */
%>
<input onkeyup="CMMN_SEARCH_DATE['${param.startDateNm}'].inputDateFormat(this)" id="${param.startDateNm}"
       maxlength="10" name="${param.startDateNm}"/> <!-- 시작일 -->
<span class="split">~</span>
<input onkeyup="CMMN_SEARCH_DATE['${param.startDateNm}'].inputDateFormat(this)" id="${param.endDateNm}"
       maxlength="10" name="${param.endDateNm}"/><!-- 종료일 -->
       
<menu class="formAlign">
	<button class="btnRefer_default selected" name="${param.startDateNm}_btn1" id="${param.startDateNm}_btn1"
		onclick="CMMN_SEARCH_DATE['${param.startDateNm}'].fnSetDate(0)">D
    </button>
    <button class="btnRefer_default" name="${param.startDateNm}_btn2" id="${param.startDateNm}_btn2"
		onclick="CMMN_SEARCH_DATE['${param.startDateNm}'].fnSetDate(-3)">D-3
	</button>
	<button class="btnRefer_default" name="${param.startDateNm}_btn3" id="${param.startDateNm}_btn3"
		onclick="CMMN_SEARCH_DATE['${param.startDateNm}'].fnSetDate(-7)">W
	</button>
	<button class="btnRefer_default" name="${param.startDateNm}_btn4" id="${param.startDateNm}_btn4"
		onclick="CMMN_SEARCH_DATE['${param.startDateNm}'].fnSetMonth(-1)">M
	</button>
	<button class="btnRefer_default" name="${param.startDateNm}_btn5" id="${param.startDateNm}_btn5"
		onclick="CMMN_SEARCH_DATE['${param.startDateNm}'].fnSetEnable()"><spring:message
	code="search.date.direct"/>
	</button>
</menu>

<script>
    var CMMN_langMap = new HashMap();
    CMMN_langMap.put("search.date.type.errors", '<spring:message code="search.date.type.errors"/>');
    CMMN_langMap.put("search.date.period.errors", '<spring:message code="search.date.period.errors"/>');
    CMMN_langMap.put("search.date.30day.errors", '<spring:message code="search.date.30day.errors"/>');
    
	var startDayOld, endDayOld;				//kw--- 잘못선택했을 경우 되돌리기 위해 이전 시간 저장
	var fnLocked = false;					//kw--- 달력 선택 후 포커스 아웃이 되는 경우(동일 함수를 동시에 타지 못하도록) lock을 걸어 한번만 타도록
	var CMMNSearch30Day_menuAtht;			//kw--- 현재 사용자의 권한 조회

    CMMN_SEARCH_DATE["${param.startDateNm}"] = {};
    $(document).ready(function () {
        const cultureSet = {
            ko : "ko-KR",
            en : "en-US",
        }
        const getCulture = cultureSet[GLOBAL.session.user.mlingCd];
        CMMNSearch30Day_menuAtht = GLOBAL.session.user.menuAtht;

        $("#${param.id} .formAlign button").click(function () {
            $("#${param.id} .formAlign button").removeClass('selected');
            $(this).addClass('selected');
        });

        $("#${param.startDateNm}, #${param.endDateNm}").on('focus', function () {
            $(this).removeClass("inputError");
        });
        
        $("#${param.startDateNm}").focusout(function () {
        	CMMNSearch30Days_dateChage(this, "start");
        });
        
        $("#${param.endDateNm}").focusout(function () {
        	CMMNSearch30Days_dateChage(this, "end");
        });
        
        $("#${param.endDateNm}").on('change', function (e) {
        	CMMNSearch30Days_dateChage(this, "end");
    	});
        
        $("#${param.startDateNm}").on('change', function (e) {
        	CMMNSearch30Days_dateChage(this, "start");
    	});

        $("#${param.startDateNm}").kendoDatePicker({
//             value: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
			value: new Date(),
            format: "yyyy-MM-dd",
            change: function (e) {
//                 $("#${param.endDateNm}").data("kendoDatePicker").min(e.sender.value());
            },
            culture: getCulture
        });

        $("#${param.endDateNm}").kendoDatePicker({
            value: new Date(),
            format: "yyyy-MM-dd",
            change: function (e) {
//                 $("#${param.startDateNm}").data("kendoDatePicker").max(e.sender.value());
            },
            culture: getCulture,
        });
        
//         CMMN_SEARCH_DATE["${param.startDateNm}"].startDateDp.readonly();
//         CMMN_SEARCH_DATE["${param.startDateNm}"].endDateDp.readonly();

        CMMN_SEARCH_DATE["${param.startDateNm}"] = {
            startDateDp: $("#${param.startDateNm}").data("kendoDatePicker"),
            endDateDp: $("#${param.endDateNm}").data("kendoDatePicker"),
            initMaxDate: $("#${param.startDateNm}").data("kendoDatePicker").max(),
            initMinDate: $("#${param.endDateNm}").data("kendoDatePicker").min(),
            fnSetEnable: function () {
                CMMN_SEARCH_DATE["${param.startDateNm}"].startDateDp.max(CMMN_SEARCH_DATE["${param.startDateNm}"].initMaxDate);
                CMMN_SEARCH_DATE["${param.startDateNm}"].endDateDp.min(CMMN_SEARCH_DATE["${param.startDateNm}"].initMinDate);

                CMMN_SEARCH_DATE["${param.startDateNm}"].startDateDp.enable();
                CMMN_SEARCH_DATE["${param.startDateNm}"].endDateDp.enable();

            },
            fnSetDate: function (range) {
                CMMN_SEARCH_DATE["${param.startDateNm}"].startDateDp.max(CMMN_SEARCH_DATE["${param.startDateNm}"].initMaxDate);
                CMMN_SEARCH_DATE["${param.startDateNm}"].endDateDp.min(CMMN_SEARCH_DATE["${param.startDateNm}"].initMinDate);


                CMMN_SEARCH_DATE["${param.startDateNm}"].startDateDp.readonly();
                CMMN_SEARCH_DATE["${param.startDateNm}"].endDateDp.readonly();


                var today = new Date();
                var fromDate = new Date();

                fromDate.setDate(fromDate.getDate() + Number(range));

                CMMN_SEARCH_DATE["${param.startDateNm}"].startDateDp.value(fromDate);
                CMMN_SEARCH_DATE["${param.startDateNm}"].startDateDp.trigger("change");

                CMMN_SEARCH_DATE["${param.startDateNm}"].endDateDp.value(today);
                CMMN_SEARCH_DATE["${param.startDateNm}"].endDateDp.trigger("change");
            },
            fnSetMonth: function (range) {
                CMMN_SEARCH_DATE["${param.startDateNm}"].startDateDp.max(CMMN_SEARCH_DATE["${param.startDateNm}"].initMaxDate);
                CMMN_SEARCH_DATE["${param.startDateNm}"].endDateDp.min(CMMN_SEARCH_DATE["${param.startDateNm}"].initMinDate);

                CMMN_SEARCH_DATE["${param.startDateNm}"].startDateDp.readonly();
                CMMN_SEARCH_DATE["${param.startDateNm}"].endDateDp.readonly();

                var today = new Date();
                var fromDate = new Date(today.getFullYear(), today.getMonth() + Number(range), today.getDate());

                CMMN_SEARCH_DATE["${param.startDateNm}"].startDateDp.value(fromDate);
                CMMN_SEARCH_DATE["${param.startDateNm}"].startDateDp.trigger("change");

                CMMN_SEARCH_DATE["${param.startDateNm}"].endDateDp.value(today);
                CMMN_SEARCH_DATE["${param.startDateNm}"].endDateDp.trigger("change");
            },
            inputDateFormat: function (obj) {
                let fistIndex = 5
                let lastIndex = 7
                let number = obj.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');
                let str = "";
                if (number.length < fistIndex) {
                    str = number;
                } else if (number.length < lastIndex) {
                    str = ''.concat(
                        number.substring(0, fistIndex - 1),
                        "-",
                        number.substr(fistIndex - 1));
                } else {
                    str = ''.concat(
                        number.substring(0, fistIndex - 1),
                        "-",
                        number.substring(fistIndex - 1, lastIndex - 1),
                        "-",
                        number.substr(lastIndex - 1));
                }
                obj.value = str;
            },
        }
        startDayOld = CMMN_SEARCH_DATE["${param.startDateNm}"].startDateDp.value();
        endDayOld =CMMN_SEARCH_DATE["${param.startDateNm}"].endDateDp.value();
        
        CMMN_SEARCH_DATE["${param.startDateNm}"].startDateDp.readonly();
        CMMN_SEARCH_DATE["${param.startDateNm}"].endDateDp.readonly();
    });
 	
 	function CMMNSearch30Days_dateChage(nThis, nType){
 		if(fnLocked == false){
 			fnLocked = true;
 			
 			const regExp_date = /(^(19|20)\d{2})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
 			
 			let fromDate = CMMN_SEARCH_DATE["${param.startDateNm}"].startDateDp;
 	        let toDate = CMMN_SEARCH_DATE["${param.startDateNm}"].endDateDp;
 	        
 	     	//kw---id로 다시 가져오는 이유는 포커스 아웃시(입력후 마우스 클릭으로 포커스 아웃) 가져오는 날짜가 변경되지 않아 다시 불러옴
 	     	
 	    	let date1, date2;
 	    	//kw---20230626 : 시작 날짜 선택시  
			if(nType == "start"){
				date2 = new Date($("#${param.endDateNm}").val());
				date1 = new Date($("#${param.startDateNm}").val());
				toDate.value(date2);
  	        } else {
  	        	date1 = new Date($("#${param.startDateNm}").val());
  	        	date2 = new Date($("#${param.endDateNm}").val());
  	        }
 	     	
 	        if (date1 > date2) {
 	        	Utils.alert(CMMN_langMap.get("search.date.period.errors"));
 	        	fromDate.value(startDayOld);
 				toDate.value(endDayOld);
 				fnLocked = false;
 				startDayOld = startDayOld;
 	            endDayOld = endDayOld;
 				return;
 	        } 
 	        
 	        //kw---20230623 : 날짜 체크 (마우스 선택, 직접입력후 엔터, 직접입력후 마우스로 포커스 아웃)
 	        let dayDiff = CMMNSearch30Days_getDateDiff(date1,date2);
 	        	
 			if(dayDiff > 30 && CMMNSearch30Day_menuAtht < 900){				//kw---권한이 900미만이며, 30일 초과		
 				Utils.alert(CMMN_langMap.get("search.date.30day.errors"));
 				fromDate.value(startDayOld);
 				toDate.value(endDayOld);
 				fnLocked = false;
 				return;
 			} else if(isNaN(dayDiff)){	//kw---날짜 입력을 잘 못했을경우 NaN으로 떨어짐 ex)2023-14-14 : NaN
 				Utils.alert(CMMN_langMap.get("search.date.type.errors"));
 				fromDate.value(startDayOld);
 				toDate.value(endDayOld);
 				fnLocked = false;
 				return;
 			} else {
 				startDayOld = CMMN_SEARCH_DATE["${param.startDateNm}"].startDateDp.value();
 	            endDayOld =CMMN_SEARCH_DATE["${param.startDateNm}"].endDateDp.value();
 			}
 			
 			fnLocked = false;
 		}
 		
 	}
 	
 	//kw---20230623 : 시작일과 마지막일 차이를 알기 위한 함수
    function CMMNSearch30Days_getDateDiff(date1, date2){
    	const diffDate = date1.getTime() - date2.getTime();
    	return Math.abs(diffDate / (1000 * 60 * 60 * 24)); // 밀리세컨 * 초 * 분 * 시 = 일
    }
 	
  //파리미터로 받은 날짜(date)에 일수(days)를 더하여 리턴 
    function CMMNSearch30Days_addDays(date, days) {
    	
        // date는 문자열로 받는다 ex, '2020-10-15'
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

</script>