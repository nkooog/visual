<!DOCTYPE html>
<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width, height=device-height" />
    <title id="contentTitle"></title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
    <script type="text/javascript" src="/resources/js/biz/comm/utils.js?v=${v}"></script>
    <script type="text/javascript" src="<c:url value="/resources/js/biz/comm/utils.js?v=${v}"/>"></script>
    <style>
        @font-face {
	        font-family: 'Pretendard';
	        font-weight: 400;
	        font-style: normal;
        }  
        * { margin: 0 auto; padding: 0; }
        body {font-size: 12px; font-family: 'Pretendard', Arial, Helvetica, sans-serif !important;}      
        a { text-decoration: none;}

        .content_01{width: 100%; height:calc(39vh - 44px); font-size: 12px; overflow-y: auto;}
        .cont_img { width: 100%; background-size: 100%; position: relative;}
        .cont_img .cont_tit { width: 100vw; height: 60px; position: absolute; top: 34%; line-height: 60px;}
        .cont_img .cont_tit .small p { font-size: 2em; padding:20px; }
        .cont_img .cont_tit .default p { font-size: 3em; padding:20px;}
        .cont_img .cont_tit .big p { font-size: 4em; padding:20px;}
        
        .content_01 .size_button { margin: 20px auto; width: 80%;}
        .content_01 .size_button > button { width: 100%; height: 40px; margin: 3px; font-weight: bold; text-align: center; border-radius: 20px;  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);  position:relative; cursor: pointer;}
        .content_01 .size_button > button:active:after {
            content: "";
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            background: rgba(0,0,0,0.2);
            border-radius: 10px;
        }

        .content_01 .size_button .btn_small { font-size: 3vw; height: 2.5em;}
        .content_01 .size_button .btn_default { font-size: 4vw; height: 2.5em;}
        .content_01 .size_button .btn_big { font-size: 5vw; height: 2.5em;}

        .number{
        	font-size:6.3vw !important;
        	font-weight:bold;
        	text-align:center;
        	margin:0;
        	padding:10px 0px 10px 0px;
        }

        footer{ width: 100%; height: 70px; position: fixed; background-color: #555; color: #fff; text-align: center; bottom: 0;}
        footer p{ font-size: 12px; font-weight: 600; margin-top: 20px;}

    </style>
</head>
<script type="text/javascript" >
	$(document).ready(function () {

		var contentSeq = "${contentSeq}";
		search(contentSeq*1);
	});

	function search(contentSeq)
	{
		var param = {
			contentSeq : contentSeq
		};

		$.ajax({
            url: '/visual/content/OPMT200SEL01',
            type: "post",
            dataType: "json",
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify(param),
            success: function (result) {
                if(result.modelAndView.status == "OK")
               	{
                    let info = JSON.parse(result.OPMT200VOInfo)[0];
                    let infoButton = JSON.parse(result.OPMT200VOButtonInfo);
                    
                    $("#contentTitle").text(info.title);
                    
                    $("body").css("background", info.backgroudColor);
                    $(".content_01").css("background-color", info.backgroudColor);
                    $(".cont_img").css("height", "calc("+info.imgHeight+"*100vw/"+info.imgWidth+")");

                    var today = new Date();
        	    	var hours = ('0' + today.getHours()).slice(-2); 
        	    	var minutes = ('0' + today.getMinutes()).slice(-2);
        	    	var seconds = ('0' + today.getSeconds()).slice(-2); 
        	    	var timeString = hours + ':' + minutes  + ':' + seconds;
                    $(".cont_img").css("background", "url(../vlContentImg/" + info.imgPath + "?t="+timeString+") no-repeat center");
                    $(".cont_img").css("background-size", "100%");

                    if(info.guideContent)
                    {
                    	$("#contentDescriptionsize").addClass(info.guideSize);
                    	$("#contentDescriptioncontent").text(info.guideContent);
                    	$("#contentDescriptionsize").css("text-align", info.guideSort);
                    	$("#contentDescriptionsize").css("color", info.backgroudFontColor);
                    } else $(".cont_tit").hide();
                    
                    if(info.category == "p")
                   	{
                    	$(".number").css("color", info.buttonFontColor + " !important");
                    	$(".number").css("background-color", info.buttonColor);
                   		$("#contentTelnum").show();
//                    		$("#contentTelnum").text(info.telnum);
                   		if(info.telnum) $("#contentTelnum").html('<div style="border: solid 2px '+info.buttonFontColor+';border-radius: 15px;width: 75%;">' + info.telnum + '</div>');
                   	}
                    else
                    {
                    	$("#contentFooter").show();
                    }
                    
                    if(info.bottomButtonUseyn == "Y")
                    {
	                    $("#contentButton").show();
	
	                	var buttonTitleList = infoButton.sumButtonTitle.split("▣");
	                	var buttonSizeList = infoButton.sumButtonSize.split("▣");
	                	var buttonLinkList = infoButton.sumButtonLink.split("▣");
	                	for(var i=0; i<buttonTitleList.length; i++)
	                	{
	                		var html = '<button class="btn_'+buttonSizeList[i]+'" onclick="btnClick('+contentSeq+', '+(i+1)+', \''+buttonLinkList[i]+'\', \''+buttonTitleList[i]+'\')">'+buttonTitleList[i]+'</button>';
	
	                    	html += '<form method="post" id="form_button_'+(i+1)+'" action="/visual/content/BtnClick">';
	                    	html += '<input type="hidden" id="contentSeq" name="contentSeq" value="'+contentSeq+'"/>';
	                    	html += '<input type="hidden" id="btnLink" name="btnLink" value="'+buttonLinkList[i]+'" />';
	                    	html += '<input type="hidden" id="btnOrd" name="btnOrd" value="'+(i+1)+'"/>';
	                    	html += '<input type="hidden" id="btnTitle" name="btnTitle" value="'+buttonTitleList[i]+'"/>';
	                    	html += '</form>';
	
	                    	$("#contentButton").append(html);
	                	}
	                	
	                	$(".content_01 .size_button > button").css("background-color", info.buttonColor);
						$(".content_01 .size_button > button").css("color", info.buttonFontColor);
						$(".content_01 .size_button > button").css("border", "1px solid " + info.buttonFontColor);
                    }
               	}
                else {
	           		Utils.alert("다시 한번 이용해 주세요.");
	                 return;
	         	}
            },
            error: function (request, status, error) {
                console.log("[error]");
                console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
            },
            beforeSend: function (jqXHR) {

            },
            complete: function (jqXHR) {

            }
        });
	}

	// buttonHistoryAction
	function btnClick(contentSeq, ord, link, title)
	{
		var param = {
			contentSeq : contentSeq
			, ord : ord
			, buttonLink : link
			, title : title
		};
		
		$.ajax({
            url: '/visual/content/OPMT201INS01',
            type: "post",
            dataType: "json",
            contentType: 'application/json; charset=UTF-8',
            data: JSON.stringify(param),
            success: function (result) {
                if(result.modelAndView.status == "OK")
               	{
                	if(link.search(/\./) != -1) {
            	        var uri = '';
            	        if(link.search(/http/i) != -1) {
            	          uri = '';
            	        } else {
            	          uri = 'https://';
            	        }
            	        uri += link;
            	        $(location).attr('href', uri);
            	    } else {
            	        $(location).attr('href', 'tel:' + link.replace(/-/g, ""));
            	    }
               	}
                else {
	           		Utils.alert("다시 한번 이용해 주세요.");
	                 return;
	         	}
            },
            error: function (request, status, error) {
                console.log("[error]");
                console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
            },
            beforeSend: function (jqXHR) {

            },
            complete: function (jqXHR) {

            }
        });
	}

</script>
<body>
	<section class="cont_img" id="call">
        <div class="cont_tit">
            <div id="contentDescriptionsize">
                <p id="contentDescriptioncontent"></p>
            </div>
        </div>
    </section>
    <div class="number" id="contentTelnum" style="display: none;"></div>
	<div class="content_01">
        <section class="size_button" id="contentButton" style="display: none;"></section>
	</div>
	<footer id="contentFooter" style="display: none;"><p id="contentFooterText">브로드C&S <br> 서비스 이용/수신거부 : ☎ 080-135-1136</p></footer>
</body>
</html>