<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"      uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring"    uri="http://www.springframework.org/tags"%>
<%
/***********************************************************************************************
* Program Name : OPMT100T.jsp
* Creator      : dwson
* Create Date  : 2024.02.06
* Description  : 메인 프레임
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.02.06     dwson            최초생성
************************************************************************************************/
%>

<header class="headerTit">
    <h2 id="OPMT100T_title"></h2>
<!--     <mark class="neceMark">표시는 필수항목</mark> -->
</header>

<!-- // class="popContainer" 시작 -->
<section id="OPMT100T" class="popContainer">
	<div>
		<!-- 검색영역 시작 -->
		<article class="SearchWrap subZoon">
			<ul class="option">
		        <li style="width:100%;">
		        	<span class="label_tit ma_left5">시스템</span>
					<input id="OPMT100_systemIdx" name="OPMT100_systemIdx"/>
					
					<span class="label_tit ma_left5">테넌트</span>
					<input id="OPMT100_tenantPrefix" name="OPMT100_tenantPrefix"/>
					
					<span class="label_tit ma_left5">사용자</span>
					<input type="search" class="k-input" id="OPMT100_keyword" name="OPMT100_keyword" autocomplete="off" placeholder="" style="padding-right:0;"/>
					
					<span class="label_tit ma_left5">상태</span>
					<input id="OPMT100_useYn" name="OPMT100_useYn"/>
				</li>
			</ul>
			<span class="btZoon">
				<button type="button" class="btnRefer_primary" onclick="OPMT100_fnSearch();">조회</button>
			</span>
		</article>
		<!-- 검색영역 끝 -->
		
		<div class="divContent" style="width: 100%;">
			<h4 class="h4_tit">사용자 목록
				<span class="btZoon">
					<button class="btnRefer_second" id="OPMT100_btnNew" data-auth-chk="Y" data-auth-type="SAVE" data-auth-id="OPMT100T">추가</button>
					<button class="btnRefer_success" id="OPMT100_btnExcel" data-auth-chk="Y" data-auth-type="XLXDOWN" data-auth-id="OPMT100T">엑셀 다운로드</button>
	            </span>
			</h4>
			<div id="grid_OPMT100" class="tableCnt_TR"></div><!-- id 명 rename 요함! -->
		</div>

	</div>
	
	<div id="OPMT100_editFormArea" style="display:none">
	    <form id="OPMT100_editForm" class="k-form">
	    	<label class="vl-form-field required-field">
	            <span>사용자ID</span>
	            <input type="text" name="agentId" class="vl-textbox" placeholder="" autocomplete="off" required validationMessage="사용자ID를 입력해주세요" maxlength="64"/>
	        </label>
	        <label class="vl-form-field required-field">
	            <span>사용자명</span>
	            <input type="text" name="name" class="vl-textbox" placeholder="" autocomplete="off" required validationMessage="사용자명을 입력해주세요"/>
	        </label>
	        <label class="vl-form-field required-field">
	            <span>비밀번호</span>
	            <input type="password" name="password" class="vl-textbox" placeholder="" autocomplete="new-password" required validationMessage="비밀번호를 입력해주세요"/>
	            <button type="button" id="btnNewPassword" class="vl-button vl-primary" style="width:100%; display:none; margin-bottom:10px;">비밀번호 변경</button>
	        </label>
	        <label class="vl-form-field required-field">
	            <span>권한</span>
	            <select class="vl-dropdown" name="usrGrd" required validationMessage="권한을 선택해주세요">
	            	<option value="">선택</option>
			    </select>
	        </label>
	        <label class="vl-form-field required-field" style="display:none;">
	            <span>시스템관리자 등급</span>
	            <select class="vl-dropdown" name="usrLvl" required validationMessage="시스템관리자 등급을 선택해주세요">
			        <c:forEach var="data" items="${LVLCdInfo}">
				        <option value="${data.code}">${data.codeName}</option>
				    </c:forEach>
			    </select>
	        </label>
	    	<label class="vl-form-field required-field">
	            <span>시스템 (ID)</span>
	            <select class="vl-dropdown" name="systemIdx" required validationMessage="시스템을 선택해주세요">
	            	<option value="">선택</option>
				    <c:forEach var="data" items="${SYSM100Info}">
				        <option value="${data.systemIdx}">${data.systemName} (${data.systemIdx})</option>
				    </c:forEach>
				</select>
	        </label>
	        <label class="vl-form-field required-field">
	            <span>테넌트</span>
	            <select class="vl-dropdown" name="tenantPrefix" required validationMessage="테넌트를 선택해주세요">
	            	<option value="">선택</option>
				</select>
	        </label>
	        <label class="vl-form-field required-field">
	            <span>상태</span>
	            <select class="vl-dropdown" name="useYn" required validationMessage="상태를 선택해주세요">
			        <option value="1" selected>사용</option>
			        <option value="0">미사용</option>
			    </select>
	        </label>
	        <div class="k-form-buttons">
	            <button type="button" class="vl-button vl-primary" id="OPMT100_editForm_btnSave" data-auth-chk="Y" data-auth-type="SAVE" data-auth-id="OPMT100T">저장</button>
	            <button type="button" class="vl-button" onclick="$('#OPMT100_editFormArea').data('kendoWindow').close();">취소</button>
	        </div>
	    </form>
	</div>
</section>
<!-- // class="popContainer" 끝 -->

<script type="text/javascript" src="<c:url value="/resources/js/biz/opmt/OPMT100T.js?v=${v}"/>"></script>
