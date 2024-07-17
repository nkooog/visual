/***********************************************************************************************
* Program Name : 사용자정보조회(사진, 출/퇴근 등록) - POP(FRME110P.js)
* Creator      : dwson
* Create Date  : 2024.01.24
* Description  : 사용자정보조회 - POP
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.24     dwson            최초생성
************************************************************************************************/

$(document).ready(function () {
	if(GLOBAL.session.user == ""){
		Utils.alert("세션정보가 없습니다. 다시 로그인해주세요.");
		return;
	}
	fnReady();
});

function fnReady(){
	fnInitPopup();
}

function fnInitPopup(){

	document.getElementById('FRME110P_userInfo').innerHTML="";
	
	//성명(등급), 이메일 설정
	$("#FRME180P_userInfo").append("<li class='name'>" + GLOBAL.session.user.name + "(등급없음)" + "</li>");
}

function FRME110P_fnLogout(){

	Utils.confirm("로그아웃 하시겠습니까?", function(){
		Utils.ajaxCall('/lgin/logout', null, function(logout_rtn){
			Utils.getParent().Utils.closeAllPopup();
			let obj = JSON.parse(JSON.stringify(logout_rtn.result));
			if(obj == "0"){
				console.log("logOut")
				var systemIdx = GLOBAL.session.user.systemIdx
				Utils.getParent().document.location.href = GLOBAL.contextPath + "/lgin/login?systemIdx="+systemIdx;
			}else{
				console.log("message: " + JSON.parse(JSON.stringify(logout_rtn.msg)));
			}
		}); 
	});
}
