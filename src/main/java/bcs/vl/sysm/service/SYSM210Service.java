package bcs.vl.sysm.service;

import java.util.List;

import bcs.vl.sysm.VO.SYSM210VO;


/***********************************************************************************************
* Program Name : 태넌트 그룹 기본정보 Service
* Creator      : yhnam
* Create Date  : 2024.02.05
* Description  : 태넌트 그룹 기본정보
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.02.05     yhnam           최초생성
************************************************************************************************/
public interface SYSM210Service {
	List<SYSM210VO> SYSM210SEL01(SYSM210VO vo) throws Exception;
	List<SYSM210VO> SYSM210SEL02(SYSM210VO vo) throws Exception;
	SYSM210VO SYSM210SEL03(SYSM210VO vo) throws Exception;
	Integer SYSM210INS01(SYSM210VO vo) throws Exception;
	Integer SYSM210UPT01(SYSM210VO vo) throws Exception;
	Integer SYSM210UPT02(SYSM210VO vo) throws Exception;
}