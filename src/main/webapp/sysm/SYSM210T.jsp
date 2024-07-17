<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"      uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring"    uri="http://www.springframework.org/tags"%>
<%
/***********************************************************************************************
* Program Name : 테넌트 그룹 기본정보관리(SYSM210T.jsp)
* Creator      : yhnam
* Create Date  : 2024.02.05
* Description  : 테넌트 그룹 기본정보관리
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.02.05     yhnam            최초생성
************************************************************************************************/
%>

<!--  Contents Start -->
<div id="SYSM210T">
	<header class="headerTit">
		<h2 id="SYSM210T_title"></h2>
		<mark class="neceMark">표시는 필수항목</mark>
	</header>

	<section class="divisonCol" id="SYSM210T_divisonCol">
		<!-- Left -->
		<div class="divContent" style="width: 50%;">
			<h4 class="h4_tit">테넌트 그룹 목록
				<span class="btZoon">
					<button class="btnRefer_default icoType k-icon k-i-plus" title="추가" onclick="SYSM210T_fnAddtenantGroupCheck();" data-auth-chk="Y" data-auth-type="SAVE" data-auth-id="SYSM210T"></button> <%-- 추가 --%>
					<button class="btnRefer_success" title="엑셀" onclick="SYSM210T_fnContentExcel();" data-auth-chk="Y" data-auth-type="XLXDOWN" data-auth-id="SYSM210T" id="SYSM210T_btnExcel">엑셀 다운로드</button>
	            </span>
			</h4>
			<div class="tableCnt_TR" id="grdSYSM210T"></div>
		</div><!-- //  Left -->

		<!-- Right -->
		<div class="divContent" style="width: 50%;">  
			<div class="tabMainCnt" id="SYSM210TTab">
				<h4 class="h4_tit">테넌트 그룹 기본정보</h4>
				<div>
					<div id="SYSM211T">
						<div class="tableCnt_Row">
							<table> 
								<colgroup>						
									<col style="width:auto">
									<col style="width:auto">
									<col style="width:auto">
									<col style="width:auto">
								</colgroup>
								<tbody>
									<tr>
										<th class="neceMark">테넌트그룹ID</th>
										<td>
											<input type="text" id="SYSM210T_tenantGroupId_key" style="display: none;" disabled>
											<input type="text" class="k-input infoChg" placeholder="입력하세요." style="width: 100%;" id="SYSM210T_tenantGroupId">
										</td>
										<th class="neceMark">테넌트그룹명</th>
										<td>
											<input type="text" class="k-input infoChg" placeholder="입력하세요." style="width: 100%;" id="SYSM210T_tenantGroupNm">
										</td>
									</tr>
									<tr>
					                    <th class="neceMark">상태</th>
					                    <td colspan="3">
											<input class="infoChg" name="infoSelectChg" id="SYSM210M_cobTenantgState" style="width: 100%;" />
					                    </td>
					                </tr>
								</tbody> 
							</table>
						</div>
						<p class="btnArea_right">
							<button type="button" class="btnRefer_default" id="SYSM210T_btnSave" data-auth-chk="Y" data-auth-type="SAVE" data-auth-id="SYSM210T"><span>저장</span></button>
						</p>
						<div class="divContent" style="margin-top: 10px;">
							<h4 class="h4_tit">테넌트 목록</h4>
							<div class="tableCnt_TR" id="grdSYSM210T1"></div>
						</div>
					</div>
				</div>
			</div>
		</div><!-- //  Right --> 
	</section>
</div>
<!--  Contents End  -->

<script type="text/javascript" src="<c:url value="/resources/js/biz/sysm/SYSM210T.js?v=${v}"/>"></script>

<style>
	#uptBackground {
		background-color: #ffe8d9;
	}
	
	#addBackground {
		background-color: #e2ffd9;
	}
</style>
