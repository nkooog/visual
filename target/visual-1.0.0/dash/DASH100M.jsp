<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<%
/***********************************************************************************************
* Program Name : 대시보드
* Creator      : dwson
* Create Date  : 2024.02.28
* Description  : 대시보드
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.02.28     dwson            최초생성
************************************************************************************************/
%>

<header class="headerTit">
    <h2 id="DASH100T_title">대시보드</h2>
<!--     <mark class="neceMark">표시는 필수항목</mark> -->
</header>

<!-- // class="popContainer" 시작 -->
<section id="DASH100T" class="popContainer">
	<div>
		<div class="divContent" style="width: 100%;">

		</div>
	</div>
</section>
<!-- // class="popContainer" 끝 -->

<script>
// 	const url = "ws://tst.exona.kr:18080/v1/ws";
// 	const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJQd1RKZUgxcnhNeHdHM…NTyJ9.hXn1RLYHESZJcMjuM6OvXjos_hVHFI3yOfJqE5YUC14";
// 	var param = {};

// 	param = {
//         System : "Bon1234a2"
//         , Tenant : "DM1234O"
//     };
// 	Utils.webSocketConnect(url, token, null, "LiteMonitoring", "CallCount", "Start", param, webSocketOnmessage, webSocketOnerror);

// 	param = {
//         System : "Bon1234a2"
//         , Tenant : "DM1234O"
//     };
// 	Utils.webSocketConnect(url, token, null, "LiteMonitoring", "Call", "Start", param, webSocketOnmessage, webSocketOnerror);

// 	param = {
//         System : "Bon1234a2"
//         , Tenant : "DM1234O"
//     };
// 	Utils.webSocketConnect(url, token, null, "LiteMonitoring", "CallHistory", "Start", param, webSocketOnmessage, webSocketOnerror);
	
// 	param = {
//         System : "Bon1234a2"
//         , Tenant : "DM1234O"
//     };
// 	Utils.webSocketConnect(url, token, null, "LiteMonitoring", "CallGate", "Start", param, webSocketOnmessage, webSocketOnerror);
	
// 	function webSocketOnmessage(event) {
// 	    const data = JSON.parse(event.data);
// 	    console.log("data :", data);

// 	    if(data.ResultCode == "0000")
// 	    {
// 	    	if(data.Name == "LiteMonitoring")
// 		    {
// 		    	console.log();
// 		    }

// 	    } else if(data.ResultCode == "9001" || data.ResultCode == "9002") {
// 	    	console.log("토큰 재발급 필요");
// 	    } else {
    	
//     	}
// 	}
	
// 	function webSocketOnerror(event) {
// 	    const data = JSON.parse(event.data);
// 	    console.log("data :", data);
	    
// 	    if(data.Name == "LiteMonitoring")
// 	    {
// 	    	console.log();
// 	    }
// 	}

// 	// send 따로 뺄 때
// 	Utils.webSocketConnect(url, null, authenticationSend, null, null, null, null, webSocketOnmessage, webSocketOnerror);
// 	function authenticationSend(socket) {

// 	    var param = {
// 	        ClientId : "PwTJeH1rxMxwG1SGsY4w"
// 	        , ClientSecret : "3ktA_f5KKl1WXDzzViVjiA2uVcvdpgEcMyePibZA"
// 	    };

// 	    socket.onopen = () => {
// 	    	const data = {
// 	    		Name : "Authentication"
// 	   	        , Method : "Create"
// 	   	        , Subscribe : null
// 	   	        , Parameter : param
// 	    	}

// 	        const temp = JSON.stringify(data);
// 	        socket.send(temp);
// 	    };
// 	}
</script>

<!-- JS 및 명칭 호출 -->
<%-- <script type="text/javascript" src="<c:url value="/resources/js/biz/bizs/HYJG/YJGB100T.js?v=${v}"/>"></script> --%>