package bcs.vl.comm.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import bcs.vl.comm.VO.COMM100VO;
/***********************************************************************************************
* Program Name : 공통 서비스 Service
* Creator      : sukim
* Create Date  : 2022.02.03
* Description  : 공통 서비스
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2022.02.03     sukim            최초생성
* 2024.01.30     yhnam            
************************************************************************************************/
public interface COMM100Service {
	List<COMM100VO> COMM100SEL01(Map<String, Object> codeList) throws Exception;
	List<COMM100VO> COMM100SEL02(COMM100VO vo) throws Exception;
	COMM100VO COMM100SEL03(COMM100VO vo) throws Exception;
	List<COMM100VO> COMM100SEL04(COMM100VO vo) throws Exception;
	List<COMM100VO> COMM100SEL05(COMM100VO vo) throws Exception;
	List<COMM100VO> COMM100SEL06() throws Exception;
	COMM100VO COMM100SEL07(COMM100VO vo) throws Exception;
	Integer userLogInsert(String dataFrmId, String mapgVlu1, String paramData, String resultType, String errorMsg, HttpSession session) throws Exception;
}
