/***********************************************************************************************
 * Program Name : 비밀번호변경 - 팝업(FRME120P.js)
 * Creator      : dwson
 * Create Date  : 2024.01.24
 * Description  : 비밀번호변경 - 팝업
 * Modify Desc  :
 * -----------------------------------------------------------------------------------------------
 * Date         | Updater        | Remark
 * -----------------------------------------------------------------------------------------------
 * 2024.01.24     dwson            최초작성
 ************************************************************************************************/
var pwCheck = false;

$(document).ready(function () {
	$('#FRME120P_agentId').text(GLOBAL.session.user.agentId);

	$('#FRME120P_newScrtNo, #FRME120P_cfrmScrtNo, #FRME120P_curScrtNo').on('input', function() {
		pwValidation();
	});
});

function FRME120P() {
    let param = {
        callbackKey: "callback_FRME120P"
    };
    let callback_FRME120P = function (result) {
        console.info(result);
    }
    Utils.setCallbackFunction("callback_FRME120P", callback_FRME120P);
    Utils.openPop(GLOBAL.contextPath + "/frme/FRME120P", "FRME120P", 600, 330, param, true);
}


function pwValidation(){
	let FRME120P_curScrtNo = $('#FRME120P_curScrtNo').val();
	let FRME120P_scrtNo = $('#FRME120P_newScrtNo').val();
	let FRME120P_scrtNoConfrim = $('#FRME120P_cfrmScrtNo').val();
	let msg = '';
	pwCheck = true;


	if (Utils.isNull(FRME120P_curScrtNo)) {
		msg = '현재 비밀번호를 입력해주세요.'
		pwCheck = false;
		$('#FRME120P_validMsg').text(msg);
		return;
	}

	// 비밀번호에 숫자, 영문, 특수문자가 모두 포함되는지 확인
//	var pattern = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).{5,}$/;
//	if (!pattern.test(FRME120P_scrtNo)) {
//		msg = '비밀번호에 숫자, 영문, 특수문자가 포함되어야 합니다.'
//		pwCheck = false;
//	}

	// 비밀번호와 비밀번호 확인이 일치하는지 확인
	if (FRME120P_scrtNo !== FRME120P_scrtNoConfrim) {
		msg = '비밀번호가 일치하지 않습니다.'
		pwCheck = false;
	}

//	if(FRME120P_scrtNo.length < 6 || FRME120P_scrtNo.length > 20 ) {
//		msg = "비밀번호의 길이는 6자~20자 미만으로 입력해주세요.";
//		pwCheck = false;
//	}

	$('#FRME120P_validMsg').text(msg);
}

function FRME120P_savePwd(){
	let FRME120P_curScrtNo = $('#FRME120P_curScrtNo').val();
	let FRME120P_scrtNo = $('#FRME120P_newScrtNo').val();

	if(pwCheck === false){
		pwValidation();
		Utils.alert("비밀번호를 확인해주세요.")
		return;
	}
	
	Utils.confirm('저장하시겠습니까?', function(){
		let FRME120P_JsonStr = {
			tenantPrefix    : GLOBAL.session.user.originTenantPrefix,
				agentId		: GLOBAL.session.user.originAgentId,
				curPwd		: FRME120P_curScrtNo,
				newPwd		: FRME120P_scrtNo,
			systemIdx		: GLOBAL.session.user.systemIdx,
		};
		
		var FRME120P_insertJsonStr = JSON.stringify(FRME120P_JsonStr);
		Utils.ajaxCall('/frme/FRME120UPT01', FRME120P_insertJsonStr, FRME120P_saveAfter)
	});
}

function FRME120P_saveAfter(data){
	let FRME120P_jsonEncode = JSON.stringify(data.result);

	if(FRME120P_jsonEncode == 0){
		Utils.alert("현재 비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
	}else if(FRME120P_jsonEncode == 1){
		Utils.alert("비밀번호가 변경되었습니다.", function(){
			self.close();
		});
	}
}

//function FRME120P_fnViewPW(){
//	$('#FRME120P_viewPW').on("mousedown", function(){
//	    $('#FRME120P_scrtNo').attr('type',"text");
//	}).on('mouseup mouseleave', function() {
//	    $('#FRME120P_scrtNo').attr('type',"password");
//	});
//}
