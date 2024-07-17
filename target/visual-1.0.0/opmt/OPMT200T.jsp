<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"      uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring"    uri="http://www.springframework.org/tags"%>
<%
/***********************************************************************************************
* Program Name : 비주얼레터링 관리(OPMT200T.jsp)
* Creator      : yhnam
* Create Date  : 2024.02.26
* Description  : 비주얼레터링 관리
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.02.26     yhnam            최초생성
************************************************************************************************/
%>

<!--  Contents Start -->
<div id="OPMT200T">
	<header class="headerTit">
		<h2 id="OPMT200T_title"></h2>
	</header>
	
	<!-- 검색영역 시작 -->
	<article class="SearchWrap subZoon">
		<ul class="option">
	        <li style="width:100%;">
	        	<span class="label_tit ma_left5">시스템</span>
				<input id="OPMT200_systemIdx" name="OPMT200_systemIdx"/>
				
				<span class="label_tit ma_left5">테넌트</span>
				<input id="OPMT200_tenantPrefix" name="OPMT200_tenantPrefix"/>
				
				<span class="label_tit ma_left5">카테고리</span>
				<input id="OPMT200_visualType" name="OPMT200_visualType"/>
				
				<span class="label_tit ma_left5">검색</span>
				<input type="search" class="k-input" id="OPMT200_keyword" name="OPMT200_keyword" autocomplete="off" placeholder="" style="padding-right:0;" onkeyup="if(window.event.keyCode==13){OPMT200T_fnSearch();}">
			</li>
		</ul>
		<span class="btZoon">
			<button type="button" class="btnRefer_primary" onclick="OPMT200T_fnSearch();">조회</button>
		</span>
	</article>
	<!-- 검색영역 끝 -->

	<section class="divisonCol" id="OPMT200T_divisonCol">

		<div class="divContent" style="width: 100%;">
			<h4 class="h4_tit">비주얼레터링 목록
				<span class="btZoon">
					<button class="btnRefer_second" title="추가" onclick="OPMT200T_fnContentAdd();" data-auth-chk="Y" data-auth-type="SAVE" data-auth-id="OPMT200T">추가</button> <%-- 추가 --%>
					<button class="btnRefer_success" title="엑셀" onclick="OPMT200T_fnContentExcel();" data-auth-chk="Y" data-auth-type="XLXDOWN" data-auth-id="OPMT200T" id="OPMT200_btnExcel">엑셀 다운로드</button>
	            </span>
			</h4>
			<div class="tableCnt_TR" id="grdOPMT200T"></div>
		</div>

		<!-- 입력폼 -->
		<div id="OPMT200_editFormArea" style="display:none">
		    <form id="OPMT200_editForm" class="k-form" enctype="multipart/form-data" id="form-contentcreate" name="form-contentcreate" method="post" novalidate="novalidate" onsubmit="return submitForm();">
		    		<input type="hidden" id="saveType" name="saveType">
		    		<input type="hidden" id="contentSeq" name="contentSeq">
		    		<ul class="option">
				        <li style="width:100%;">
				        	<span class="fieldAfter" style="display: block;color: #2a3f5f;margin-bottom: 5px;font-size: 14px;font-weight: bold;">시스템</span>
							<input id="OPMT200_form_systemIdx" name="OPMT200_form_systemIdx" style="margin-bottom: 15px;height: 33px !important;"/>
						</li>
						<li style="width:100%;">
				        	<span class="fieldAfter" style="display: block;color: #2a3f5f;margin-bottom: 5px;font-size: 14px;font-weight: bold;">테넌트</span>
							<input id="OPMT200_form_tenantPrefix" name="OPMT200_form_tenantPrefix" style="margin-bottom: 15px;height: 33px !important;"/>
						</li>
						<li style="width:100%;">
				        	<span class="fieldAfter" style="display: block;color: #2a3f5f;margin-bottom: 5px;font-size: 14px;font-weight: bold;">카테고리</span>
							<input id="OPMT200_form_visualType" name="OPMT200_form_visualType" style="margin-bottom: 15px;height: 33px !important;"/>
						</li>
					</ul>

<!-- 		    	<label class="vl-form-field required-field"> -->
<!-- 		            <span>시스템</span> -->
<!-- 		            <input id="OPMT200_form_systemIdx" name="OPMT200_form_systemIdx" class="vl-textbox" autocomplete="off" required /> -->
<!-- 		        </label> -->
<!-- 		        <label class="vl-form-field required-field"> -->
<!-- 		            <span>테넌트</span> -->
<!-- 		            <input id="OPMT200_form_tenantPrefix" name="OPMT200_form_tenantPrefix" class="vl-textbox" autocomplete="off" required /> -->
<!-- 		        </label> -->
<!-- 		        <label class="vl-form-field required-field"> -->
<!-- 		            <span>카테고리</span> -->
<!-- 		            <input id="OPMT200_form_visualType" name="OPMT200_form_visualType" class="vl-textbox" autocomplete="off" required /> -->
<!-- 		        </label> -->


		        <label class="vl-form-field required-field">
		            <span>컨텐츠이름</span>
		            <input type="text" id="OPMT200_form_title" name="OPMT200_form_title" class="vl-textbox" autocomplete="off" maxlength="50"  validationMessage="컨텐츠이름을 입력해주세요"/>
		        </label>
		        <label class="vl-form-field">
		            <span>안내문구</span>
		            <input type="text" id="OPMT200_form_descriptionContent" name="OPMT200_form_descriptionContent" class="vl-textbox" autocomplete="off" />
		        </label>
		    	<label class="vl-form-field" style="display: flex;justify-content: space-between;margin-bottom: 5px;">
		    		<div class="input-group" style="display: flex;align-items: baseline;flex-direction: column;width: 45% !important;">
			            <span>안내문구정렬</span>
						<div id="OPMT200_form_descriptionSort" style="margin-bottom: 15px;box-shadow: 0 0px 0px 0 rgba(0,0,0,.2);"></div>
					</div>
					<div class="input-group" style="display: flex;align-items: baseline;flex-direction: column;width: 45% !important;">
						<span>안내문구크기</span>
			            <div id="OPMT200_form_descriptionSize" style="margin-bottom: 15px;box-shadow: 0 0px 0px 0 rgba(0,0,0,.2);"></div>
		            </div>
		        </label>
		        <label class="vl-form-field">
		            <span>전화번호</span>
<!-- 		            <input type="text" id="OPMT200_form_telnum" name="OPMT200_form_telnum" class="vl-textbox" maxlength="15" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" autocomplete="off"  validationMessage="전화번호를 입력해주세요"/> -->
		            <input type="text" id="OPMT200_form_telnum" name="OPMT200_form_telnum" class="vl-textbox" maxlength="15" autocomplete="off"  validationMessage="전화번호를 입력해주세요"/>
		        </label>
		        
		        <label class="vl-form-field required-field" style="display: flex;justify-content: space-between;margin-bottom: 5px;">
		        	<div class="input-group" style="display: flex;align-items: baseline;flex-direction: column;width: 45% !important;">
						<span class="input-group-text fieldAfter" style="width: 100%;">페이지 배경색상</span>
<!-- 						<input type="text" id="OPMT200_form_backgroudColor" name="OPMT200_form_backgroudColor" class="vl-textbox" autocomplete="off" required style="width: 100% !important;" validationMessage="페이지 배경색상을 입력해주세요"/> -->
						<div class="minicolors minicolors-theme-bootstrap minicolors-position-bottom" style="width: 100% !important;">
							<input class="vl-textbox form-control colorpicker minicolors-input" id="OPMT200_form_backgroudColor" name="OPMT200_form_backgroudColor" type="text" value="" size="7" autocomplete="off" style="text-align: center;">
							<span class="minicolors-swatch minicolors-sprite minicolors-input-swatch">
								<span class="minicolors-swatch-color"></span>
							</span>
							<div class="minicolors-panel minicolors-slider-hue">
								<div class="minicolors-slider minicolors-sprite">
									<div class="minicolors-picker" style="top: 0px;"></div>
								</div>
								<div class="minicolors-opacity-slider minicolors-sprite">
									<div class="minicolors-picker"></div>
								</div>
								<div class="minicolors-grid minicolors-sprite" style="background-color: rgb(255, 0, 0);">
									<div class="minicolors-grid-inner"></div>
									<div class="minicolors-picker" style="top: 150px; left: 0px;">
										<div></div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="input-group" style="display: flex;align-items: baseline;flex-direction: column;width: 45% !important;">
						<span class="input-group-text fieldAfter" style="width: 100%;">페이지 글자색상</span>
<!-- 		            	<input type="text" id="OPMT200_form_backgroudFontColor" name="OPMT200_form_backgroudFontColor" class="vl-textbox" autocomplete="off" required style="width: 100% !important;" validationMessage="페이지 글자색상을 입력해주세요"/> -->
		            	<div class="minicolors minicolors-theme-bootstrap minicolors-position-bottom" style="width: 100% !important;">
							<input class="vl-textbox form-control colorpicker minicolors-input" id="OPMT200_form_backgroudFontColor" name="OPMT200_form_backgroudFontColor" type="text" value="" size="7" autocomplete="off" style="text-align: center;">
							<span class="minicolors-swatch minicolors-sprite minicolors-input-swatch">
								<span class="minicolors-swatch-color"></span>
							</span>
							<div class="minicolors-panel minicolors-slider-hue">
								<div class="minicolors-slider minicolors-sprite">
									<div class="minicolors-picker" style="top: 0px;"></div>
								</div>
								<div class="minicolors-opacity-slider minicolors-sprite">
									<div class="minicolors-picker"></div>
								</div>
								<div class="minicolors-grid minicolors-sprite" style="background-color: rgb(255, 0, 0);">
									<div class="minicolors-grid-inner"></div>
									<div class="minicolors-picker" style="top: 150px; left: 0px;">
										<div></div>
									</div>
								</div>
							</div>
						</div>
					</div>
		        </label>
		        
		        <label class="vl-form-field required-field" style="display: flex;justify-content: space-between;margin-bottom: 5px;">
		        	<div class="input-group" style="display: flex;align-items: baseline;flex-direction: column;width: 45% !important;">
						<span class="input-group-text " style="width: 100%;">버튼 배경색상</span>
<!-- 						<input type="text" id="OPMT200_form_buttonColor" name="OPMT200_form_buttonColor" class="vl-textbox" autocomplete="off" required style="width: 100% !important;" validationMessage="버튼 배경색상을 입력해주세요"/> -->
						<div class="minicolors minicolors-theme-bootstrap minicolors-position-bottom" style="width: 100% !important;">
							<input class="vl-textbox form-control colorpicker minicolors-input" id="OPMT200_form_buttonColor" name="OPMT200_form_buttonColor" type="text" value="" size="7" autocomplete="off" style="text-align: center;">
							<span class="minicolors-swatch minicolors-sprite minicolors-input-swatch">
								<span class="minicolors-swatch-color"></span>
							</span>
							<div class="minicolors-panel minicolors-slider-hue">
								<div class="minicolors-slider minicolors-sprite">
									<div class="minicolors-picker" style="top: 0px;"></div>
								</div>
								<div class="minicolors-opacity-slider minicolors-sprite">
									<div class="minicolors-picker"></div>
								</div>
								<div class="minicolors-grid minicolors-sprite" style="background-color: rgb(255, 0, 0);">
									<div class="minicolors-grid-inner"></div>
									<div class="minicolors-picker" style="top: 150px; left: 0px;">
										<div></div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="input-group" style="display: flex;align-items: baseline;flex-direction: column;width: 45% !important;">
						<span class="input-group-text " style="width: 100%;">버튼 글자색상</span>
<!-- 		            	<input type="text" id="OPMT200_form_buttonFontColor" name="OPMT200_form_buttonFontColor" class="vl-textbox" autocomplete="off" required style="width: 100% !important;" validationMessage="버튼 글자색상을 입력해주세요"/> -->
		            	<div class="minicolors minicolors-theme-bootstrap minicolors-position-bottom" style="width: 100% !important;">
							<input class="vl-textbox form-control colorpicker minicolors-input" id="OPMT200_form_buttonFontColor" name="OPMT200_form_buttonFontColor" type="text" value="" size="7" autocomplete="off" style="text-align: center;">
							<span class="minicolors-swatch minicolors-sprite minicolors-input-swatch">
								<span class="minicolors-swatch-color"></span>
							</span>
							<div class="minicolors-panel minicolors-slider-hue">
								<div class="minicolors-slider minicolors-sprite">
									<div class="minicolors-picker" style="top: 0px;"></div>
								</div>
								<div class="minicolors-opacity-slider minicolors-sprite">
									<div class="minicolors-picker"></div>
								</div>
								<div class="minicolors-grid minicolors-sprite" style="background-color: rgb(255, 0, 0);">
									<div class="minicolors-grid-inner"></div>
									<div class="minicolors-picker" style="top: 150px; left: 0px;">
										<div></div>
									</div>
								</div>
							</div>
						</div>
					</div>
		        </label>

		        <div class="vl-form-field required-field" style="margin-bottom: 5px;">
		            <span>이미지</span>
					<input id="SavePath" name="SavePath" type="hidden" value="">
	                <input id="RealFileName" name="RealFileName" type="hidden" value="">
	                <input data-val="true" data-val-number="ImgWidth 필드는 숫자여야 합니다." data-val-required="ImgWidth 필드가 필요합니다." id="ImgWidth" name="ImgWidth" type="hidden" value="">
	                <input data-val="true" data-val-number="ImgHeight 필드는 숫자여야 합니다." data-val-required="ImgHeight 필드가 필요합니다." id="ImgHeight" name="ImgHeight" type="hidden" value="">
		            <input class="form-control" type="file" id="OPMT200_realFile" name="OPMT200_realFile" accept=".png,.gif,.jpg" onchange="uploadFile()">
					<div class="row">
						<div class="col-lg-1"></div>
						<div class="col-lg-11" style="text-align:left;font-size:9pt;font-weight:normal;">
						    <div id="imagezone">
						    </div>
						    <ul>
						        <li><b>프롤로그 또는 에필로그 화면에 표시되며 PNG 또는 JPG 또는 GIF 형식의 이미지만 업로드 가능합니다.</b></li>
						        <li><b><font color="red">파일명이 한글로 된 이미지는 제대로 보이지 않을 수 있습니다.</font></b></li>
						        <li><img id="imgid" style="width: 100px;height: 100px;"/></li>
						    </ul>
						</div>
					</div>
		        </div>
		        <label class="vl-form-field " style="display: inline-block;width: 40%;margin-bottom: 0px !important;margin-top: 5px;">
		            <span>버튼(옵션)등록  <button type="button" class="btnRefer_success" title="추가" onclick="OPMT200T_fnContentBtnFormAdd();"  data-auth-chk="Y" data-auth-type="SAVE" data-auth-id="OPMT200T"  id="OPMT200_form_buttonAdd" name="OPMT200_form_buttonAdd">추가</button></span>
		        </label>

				<div id="OPMT200T_fnContentBtnFormAdd"></div>

		        <div class="k-form-buttons">
		            <button type="button" class="vl-button vl-primary" onclick="OPMT200_fnEditSave();" id="OPMT200_editForm_btnSave" data-auth-chk="Y" data-auth-type="SAVE" data-auth-id="OPMT200T">저장</button>
		            <button type="button" class="vl-button" onclick="OPMT200_fnOpenEditFormClose();" style="border: 1px solid #cbcbcb;">취소</button>
		        </div>
		    </form>
		</div>
		<!--// 입력폼 -->
	</section>
</div>
<!--  Contents End  -->

<link rel="stylesheet" type="text/css" href="<c:url value='/resources/css/vl/jquery.minicolors.css?v=${v}'/>"/>
<script type="text/javascript" src="<c:url value="/resources/js/biz/opmt/OPMT200T.js?v=${v}"/>"></script>
<script type="text/javascript" src="<c:url value="/resources/js/vl/jquery.minicolors.js?v=${v}"/>"></script>
<%-- <script type="text/javascript" src="<c:url value="/resources/js/vl/jquery.minicolors.min.js?v=${v}"/>"></script> --%>


<style>
	.fieldAfter::after {
	    content: "*";
	    color: red;
	    margin-left: 5px;
	}
	
	body[class*='theme'] .k-input-button, body[class*='theme'] #OPMT200_editFormArea .k-input-button.k-button {
	    width: 25px;
	    height: 33px;
	    background: #dae9ff;
	    border-color: #d6d6d6;
	    border-left-width: 1px;
	    padding: 0;
	    color: #2678f7f0;
	    font-weight: bold;
	}
	
	.singleSelect {
	    color: #9903f4;
	}
	
	#OPMT200_editFormArea > .k-button-solid-base.k-hover, .k-button-solid-base:hover {
	    border-color: #d6deffa6;
	    color: #444;
	    background-color: #d6deffa6;
	}

	#OPMT200_editFormArea > .k-button-solid-base.k-active, .k-button-solid-base.k-selected, .k-button-solid-base:active {
	    border-color: #c8e54a61;
	    color: #000;
	    background-color: #c8e54a61;
	}
	
	bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }
      
      @@media (min-width: 768px) {
          .bd-placeholder-img-lg {
            font-size: 3.5rem;
          }
      }

      .b-example-divider {
        height: 3rem;
        background-color: rgba(0, 0, 0, .1);
        border: solid rgba(0, 0, 0, .15);
        border-width: 1px 0;
        box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
      }

      .b-example-vr {
        flex-shrink: 0;
        width: 1.5rem;
        height: 100vh;
      }

      .bi {
        vertical-align: -.125em;
        fill: currentColor;
      }

      .nav-scroller {
        position: relative;
        z-index: 2;
        height: 2.75rem;
        overflow-y: hidden;
      }

      .nav-scroller .nav {
        display: flex;
        flex-wrap: nowrap;
        padding-bottom: 1rem;
        margin-top: -1px;
        overflow-x: auto;
        text-align: center;
        white-space: nowrap;
        -webkit-overflow-scrolling: touch;
      }
      
      .container {
        max-width: 960px;
      }
</style>