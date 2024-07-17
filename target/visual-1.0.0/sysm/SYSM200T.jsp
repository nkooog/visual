<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"      uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring"    uri="http://www.springframework.org/tags"%>
<%
/***********************************************************************************************
* Program Name : 테넌트 관리(SYSM200T.jsp)
* Creator      : dwson
* Create Date  : 2024.02.05
* Description  : 테넌트 관리
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.02.05     dwson            최초생성
************************************************************************************************/
%>

<header class="headerTit">
    <h2 id="SYSM200T_title"></h2>
<!--     <mark class="neceMark">표시는 필수항목</mark> -->
</header>

<!-- // class="popContainer" 시작 -->
<section id="SYSM200T" class="popContainer">
	<div>
		<!-- 검색영역 시작 -->
		<article class="SearchWrap subZoon">
			<ul class="option">
		        <li style="width:100%;">
		        	<span class="label_tit ma_left5">시스템</span>
					<input id="SYSM200_systemIdx" name="SYSM200_systemIdx"/>
					
					<span class="label_tit ma_left5">테넌트</span>
					<input type="search" class="k-input" id="SYSM200_keyword" name="SYSM200_keyword" autocomplete="off" placeholder="" style="padding-right:0;"/>
					
					<span class="label_tit ma_left5">상태</span>
					<input id="SYSM200_isEnabled" name="SYSM200_isEnabled"/>
				</li>
			</ul>
			<span class="btZoon">
				<button type="button" class="btnRefer_primary" onclick="SYSM200_fnSearch();">조회</button>
			</span>
		</article>
		<!-- 검색영역 끝 -->
		
		<div class="divContent" style="width: 100%;">
			<h4 class="h4_tit">테넌트 목록
				<span class="btZoon">
					<button class="btnRefer_second" id="SYSM200_btnNew" data-auth-chk="Y" data-auth-type="SAVE" data-auth-id="SYSM200T">추가</button>
					<button class="btnRefer_success" id="SYSM200_btnExcel" data-auth-chk="Y" data-auth-type="XLXDOWN" data-auth-id="SYSM200T">엑셀 다운로드</button>
	            </span>
			</h4>
			<div id="grid_SYSM200" class="tableCnt_TR"></div><!-- id 명 rename 요함! -->
		</div>

	</div>
	
	<div id="SYSM200_editFormArea" style="display:none">
	    <form id="SYSM200_editForm" class="k-form">
	    	<label class="vl-form-field required-field">
	            <span>시스템 (ID)</span>
	            <select class="vl-dropdown" name="systemIdx" required validationMessage="시스템을 선택해주세요">
	            	<option value="">선택</option>
				    <c:forEach var="data" items="${SYSM100Info}">
				        <option value="${data.systemIdx}">${data.systemName} (${data.systemIdx})</option>
				    </c:forEach>
				</select>
	        </label>
<!-- 	        <label class="vl-form-field"> -->
<!-- 	            <span>테넌트 그룹</span> -->
<!-- 	            <select class="vl-dropdown" name="tenantGroupId"> -->
<!-- 	            	<option value="">선택</option> -->
<%-- 				    <c:forEach var="data" items="${SYSM210Info}"> --%>
<%-- 				        <option value="${data.tenantGroupId}">${data.tenantGroupId} (${data.tenantGroupNm})</option> --%>
<%-- 				    </c:forEach> --%>
<!-- 				</select> -->
<!-- 	        </label> -->
	        <label class="vl-form-field required-field">
	            <span>TenantPrefix</span>
	            <input type="text" name="tenantPrefix" class="vl-textbox" placeholder="" autocomplete="off" required validationMessage="TenantPrefix를 입력해주세요" maxlength="20"/>
	        </label>
	        <label class="vl-form-field required-field">
	            <span>테넌트명</span>
	            <input type="text" name="tenantName" class="vl-textbox" placeholder="" autocomplete="off" required validationMessage="테넌트명을 입력해주세요"/>
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
	            <button type="button" class="vl-button vl-primary" id="SYSM200_editForm_btnSave" data-auth-chk="Y" data-auth-type="SAVE" data-auth-id="SYSM200T">저장</button>
	            <button type="button" class="vl-button" onclick="$('#SYSM200_editFormArea').data('kendoWindow').close();">취소</button>
	        </div>
	    </form>
	</div>
</section>
<!-- // class="popContainer" 끝 -->

<script type="text/javascript" src="<c:url value="/resources/js/biz/sysm/SYSM200T.js?v=${v}"/>"></script>
</html>