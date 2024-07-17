/***********************************************************************************************
 * Program Name : 로그인(LGIN000M.js)
 * Creator      : dwson
 * Create Date  : 2024.01.24
 * Description  : 로그인
 * Modify Desc  : 
 * -----------------------------------------------------------------------------------------------
 * Date         | Updater        | Remark
 * -----------------------------------------------------------------------------------------------
 * 2024.01.24     dwson            최초작성   
 ************************************************************************************************/
var tryCount = 0;
var loginFlag = true;
var digit = /[0-9]/;
var korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
var systemIdx = "systemIdx";


$(document).ready(function(){
	LGIN000M_fnLogin(); //서버 핑테스트용 함수

	loginResizeHeight();

	$(window).on('resize', function(){
		loginResizeHeight();
	});
	LGIN000M_fnCheckBrower();

	//cookie 설정
	LGIN000M_fngetCookie();
});

function loginResizeHeight() {
	$('body.loginWrap').css('height', $(window).height());
};
function LGIN000M_fnCheckBrower(){//IE browser 제한
	if(!checkBrowser()){
		Utils.alert("지원하는 브라우저가 아닙니다.크롬이나 엣지를 사용하시기 바랍니다.<br/><br/>3초 후에 브라우저가 자동으로 종료됩니다.");
		setTimeout(WinClose(), 2000);
	}
}

function LGIN000M_fnLoginValidationCheck(){
	if(loginFlag){
		loginFlag = false;

		if($("#agentId").val() == ''){
			Utils.alert("아이디를 입력해주세요.");
			loginFlag = true;
			return;
		}else if($("#password").val() == ''){
	    	Utils.alert("비밀번호를 입력해주세요.");
	    	loginFlag = true;
	    	return;
		}
//		else if($("#password").val().length < 6 || $("#password").val().length > 20 ){
//	    	Utils.alert("비밀번호의 길이는 6자 이상 ~ 20자 이하로 입력하십시오.");
//	    	loginFlag = true;
//	    	return;
//		}
		else{
			LGIN000_fnchkCookie();
		}		
	}
}

function LGIN000M_fngetCookie(){
	$("#tenantPrefix").val(getCookie("vl.tenantPrefix"));
    $("#agentId").val(getCookie("vl.agentId"));
    if($("#agentId").val() == ""){
    	$("#IdSave").attr("checked", false);
    }else{
    	$("#IdSave").attr("checked", true);
    }
}

function fn_chkIdSave(e){
	if(event.target.checked)  {
		$("#IdSaveYn").val("Y");
	}else{
		$("#IdSaveYn").val("N");
	}	
}

function LGIN000_fnchkCookie(){

	setCookie("vl.tenantPrefix", $('#tenantPrefix').val(), 1);

	if($("#IdSaveYn").val() == "Y"){
		setCookie("vl.agentId", $('#agentId').val(), 1);
	}else{
		deleteCookie("vl.agentId");
	}
	LGIN000M_fnLogin();
}

function LGIN000M_fnLogin(){

	let url = new URL(window.location.href);
	let params = url.searchParams.get(systemIdx);
	let object = {
		tenantPrefix : $("#tenantPrefix").val(),
		agentId : $("#agentId").val(),
		password : $("#password").val(),
		systemIdx : params,
	}

	$.ajax({
    	url: GLOBAL.contextPath +'/lgin/LGIN000SEL01',
        type:'post',
        dataType : 'json',
        contentType : 'application/json; charset=UTF-8',
    	data : JSON.stringify(object),
        success : function(loginRtn){
        	let obj = JSON.parse(JSON.stringify(loginRtn));

			if(tryCount>0){
				Utils.alert(obj.msg);
			}

			if(obj.result === true){
				setTimeout(function() {
					popupMain();
					setTimeout("self.close();", 1000);
				}, 1500);
			}
			tryCount++;
		},
        error :function(request, status, error){
        	if(status === 'error'){
            	if(request.status === 0){
            		Utils.alert("서버 응답 제한시간 초과 - 서버를 확인하십시오.");
            	}else{
            		Utils.alert(request.status + " " + status + " 서버를 확인하십시오.");
            	}
        	}else{
        		Utils.alert("login error : " + status + " ::: " + error);
        	}
        },
        timeout: 5000 //서버 응답 제한시간 5초
    });
    
 	loginFlag = true;
}

function popupMain(){
	var winFullOpts='height=' + screen.availHeight + ',width=' + screen.availWidth +',scrollbars=no,resizable=yes,top=0,left=0,fullscreen=yes';
	location.href = '/visual/main';
}
