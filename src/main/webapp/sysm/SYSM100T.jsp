<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"      uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring"    uri="http://www.springframework.org/tags"%>
<%
/***********************************************************************************************
* Program Name : SYSM100T.jsp
* Creator      : dwson
* Create Date  : 2024.01.26
* Description  : 시스템 관리
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.26     dwson            최초생성
************************************************************************************************/
%>

<header class="headerTit">
    <h2 id="SYSM100T_title"></h2>
<!--     <mark class="neceMark">표시는 필수항목</mark> -->
</header>

<!-- // class="popContainer" 시작 -->
<section id="SYSM100T" class="popContainer">
	<div>
		<!-- 검색영역 시작 -->
		<article class="SearchWrap subZoon">
			<ul class="option">
		        <li style="width:100%;">
					<span class="label_tit ma_left5">시스템명</span>
					<input type="search" class="k-input" id="SYSM100_systemName" name="SYSM100_systemName" autocomplete="off" placeholder="" style="padding-right:0;"/>
					
					<span class="label_tit ma_left5">상태</span>
					<input id="SYSM100_isEnabled" name="SYSM100_isEnabled"/>
				</li>
			</ul>
			<span class="btZoon">
				<button type="button" class="btnRefer_primary" onclick="SYSM100_fnSearch();">조회</button>
<!-- 				<button type="button" class="btnRefer_primary ma_left5" onclick="SYSM100_filterClearButton();">Clear</button> -->
			</span>
		</article>
		<!-- 검색영역 끝 -->
		
		<div class="divContent" style="width: 100%;">
			<h4 class="h4_tit">시스템 목록
				<span class="btZoon">
					<button class="btnRefer_second" id="SYSM100_btnNew" data-auth-chk="Y" data-auth-type="SAVE" data-auth-id="SYSM100T">추가</button>
					<button class="btnRefer_success" id="SYSM100_btnExcel" data-auth-chk="Y" data-auth-type="XLXDOWN" data-auth-id="SYSM100T">엑셀 다운로드</button>
	            </span>
			</h4>
			<div id="grid_SYSM100" class="tableCnt_TR"></div><!-- id 명 rename 요함! -->
		</div>

	</div>
	
	<div id="SYSM100_editFormArea" style="display:none">
	    <form id="SYSM100_editForm" class="k-form">
	    	<input type="hidden" name="systemIdx" value="0"/>
	        <label class="vl-form-field required-field">
	            <span>시스템명</span>
	            <input type="text" name="systemName" class="vl-textbox" placeholder="" autocomplete="off" required validationMessage="시스템명을 입력해주세요"/>
	        </label>
	        <label class="vl-form-field">
	            <span>비고</span>
	            <input type="text" name="description" class="vl-textbox" placeholder="" autocomplete="off"/>
	        </label>
	        <label class="vl-form-field required-field">
	            <span>상태</span>
	            <select class="vl-dropdown" name="isEnabled" required validationMessage="상태를 선택해주세요">
			        <option value="1" selected>사용</option>
			        <option value="0">미사용</option>
			    </select>
	        </label>
	        <div class="k-form-buttons">
	            <button type="button" class="vl-button vl-primary" id="SYSM100_editForm_btnSave" data-auth-chk="Y" data-auth-type="SAVE" data-auth-id="SYSM100T">저장</button>
	            <button type="button" class="vl-button" onclick="$('#SYSM100_editFormArea').data('kendoWindow').close();">취소</button>
	        </div>
	    </form>
	</div>
</section>
<!-- // class="popContainer" 끝 -->

<script type="text/javascript" src="<c:url value="/resources/js/biz/sysm/SYSM100T.js?v=${v}"/>"></script>
