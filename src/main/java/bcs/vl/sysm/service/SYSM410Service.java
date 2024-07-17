package bcs.vl.sysm.service;

import java.util.List;

import bcs.vl.sysm.VO.SYSM410VO;

/***********************************************************************************************
* Program Name : 테넌트 그룹별 메뉴권한관리 Service
* Creator      : yhnam
* Create Date  : 2024.01.31
* Description  : 테넌트 그룹별 메뉴권한관리
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.31     yhnam            최초생성
************************************************************************************************/
public interface SYSM410Service {
	List<SYSM410VO> SYSM410SEL01(SYSM410VO sysm410VO) throws Exception;
	List<SYSM410VO> SYSM410SEL02(SYSM410VO sysm410VO) throws Exception;
    Integer SYSM410INS01(List<SYSM410VO> list) throws Exception;
    Integer SYSM410DEL01(SYSM410VO sysm410VO) throws Exception;
}
