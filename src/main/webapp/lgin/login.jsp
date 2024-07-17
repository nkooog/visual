<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"      uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring"    uri="http://www.springframework.org/tags"%>

<head>
	<script type="text/javascript" src="<c:url value="/resources/js/jquery/3.2.1/jquery.min.js"/>"></script>
</head>
<script type="text/javascript" >
$(document).ready(function(){
	openPopup();
	self.close();
});    

function openPopup() {
    let _width  = '1680';
    let _height = '1050';
    let _left   = Math.ceil(( window.screen.width - _width )/2);
    let _top    = Math.ceil(( window.screen.height - _height )/2);

	let lang = getLang();
	if(lang.length !== 2){
		lang = 'ko';
	}

    let _url = '/visual/lgin/LGIN000M?lang=' + lang;
// 	let systemIdx =  ${systemIdx}

// 	if(!systemIdx){
// 		systemIdx = `1`
// 	}

// 	_url  = _url + '&systemIdx='+systemIdx
	let _title  = "Visual Lettering";

    //base size
    location.href = _url, _title, 'width='+ _width +', height='+ _height +', left=' + _left + ', top='+ _top ;
}

//사용자 Browser 언어 확인
function getLang() {
	let userLang = navigator.language || navigator.userLanguage;
	return userLang.substring(0,2);
}
</script>