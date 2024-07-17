<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"         uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"      uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="validator" uri="http://www.springmodules.org/tags/commons-validator" %>
<%@ taglib prefix="spring"    uri="http://www.springframework.org/tags"%>
<%
    /**
     * @Class Name : CMMN_TENANT_FIND.jsp
     * @Description : 테넌트 설정
     * @Modification Information
     *  ----------------------------------------------------------
     *   수정일                 수정자                   수정내용
     *  ----------------------------------------------------------
     *  2022.12.26   djjung      최초 생성
     *  ----------------------------------------------------------
     */
%>
<input type="hidden" id="${param.dataFrameId}_tenantPrefix" name="${param.dataFrameId}_tenantPrefix" class="k-input" disabled />
<script type="text/javascript">
	$(document).ready(function () {
		CMMN_SEARCH_TENANT["${param.dataFrameId}"]={
			tenantPrefix : GLOBAL.session.user.tenantPrefix,
			validity : true,
        }
		$('#${param.dataFrameId}_tenantPrefix').val(GLOBAL.session.user.tenantPrefix);
    });
</script>