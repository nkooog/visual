<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"      uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring"    uri="http://www.springframework.org/tags"%>
<%
/***********************************************************************************************
* Program Name : 비밀번호변경 - POP(FRME120P.jsp)
* Creator      : sukim
* Create Date  : 2022.08.25
* Description  : 비밀번호변경 - POP
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2022.08.25     sukim            최초생성
************************************************************************************************/
%>
<jsp:include page="/frme/FRME_HEAD.jsp"/>

<!-- Head -->
<header class="popHeader">
	비밀번호변경    <button class="popClose" title="창닫기" onclick="window.close();"></button>
</header>

<!-- 본문 켄텐츠 -->
<section class="popContainer"> 
	 <div class="ma_bottom10"></div>
	 

	 <div class="tableCnt_Row"> 
		<table>
			<colgroup>
				<col style="width: 25%">
				<col style="width: auto">
			</colgroup>  
			<tbody>
				<tr>   
					<th>로그인 ID</th> 
					<td id="FRME120P_agentId"></td>
				</tr>  
				<tr>   
					<th>현재 비밀번호<span> * </span></th> 
					<td><input type="password" class="k-input" id="FRME120P_curScrtNo" placeholder="입력하세요." maxlength="20" style="width:33%;"> (6자리~20자리 영문, 숫자로 입력해 주십시오.) </td>
				</tr>
				<tr>   
					<th>새 비밀번호<span> * </span></th> 
					<td><input type="password" class="k-input" id="FRME120P_newScrtNo" placeholder="입력하세요." maxlength="20" style="width:33%;"> (6자리~20자리 영문, 숫자로 입력해 주십시오.) </td>
				</tr>
				<tr>   
					<th>새 비밀번호 (확인)<span> * </span></th> 
					<td><input type="password" class="k-input" id="FRME120P_cfrmScrtNo" placeholder="입력하세요." maxlength="20" style="width:33%;"> (6자리~20자리 영문, 숫자로 입력해 주십시오.) </td>
				</tr>
			</tbody>
		</table>
	</div>
	

	<!-- Btn -->
	<p class="btnArea_right ma_top30">
		<button class="btnRefer_default" onclick="FRME120P_savePwd();">저장</button> 
		<button class="btnRefer_default" onClick="window.close();">취소</button> 
	</p>
</section><!-- //  class="popContainer"  끝 -->
<script>
var FRME120_map = new HashMap();
FRME120_map.put("common.logout.msg",'<spring:message code="common.logout.msg" />');
FRME120_map.put("aicrm.noSession",'<spring:message code="aicrm.noSession" />');
</script>
<script type="text/javascript" src="<c:url value="/resources/js/biz/frme/FRME120P.js?v=${v}"/>"></script>

<jsp:include page="/frme/FRME_BOTTOM.jsp"/>
