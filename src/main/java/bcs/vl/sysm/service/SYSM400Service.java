package bcs.vl.sysm.service;

import java.util.List;

import bcs.vl.sysm.VO.SYSM400VO;

/***********************************************************************************************
* Program Name : 메뉴 관리 Service
* Creator      : yhnam
* Create Date  : 2024.01.26
* Description  : 메뉴 관리
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.26     yhnam            최초생성
************************************************************************************************/
public interface SYSM400Service {
	List<SYSM400VO> SYSM400SEL01(SYSM400VO sysm400VO) throws Exception;
	Integer SYSM400INS01(List<SYSM400VO> sysm400voList) throws Exception;
	Integer SYSM400INS02(List<SYSM400VO> sysm400voList) throws Exception;
	Integer SYSM400UPT01(List<SYSM400VO> sysm400voList) throws Exception;
    Integer SYSM400UPT02(List<SYSM400VO> sysm400voList) throws Exception;
    Integer SYSM400UPT03(List<SYSM400VO> sysm400voList) throws Exception;
    Integer SYSM400UPT04(List<SYSM400VO> sysm400voList) throws Exception;
    List<SYSM400VO> SYSM400SEL02(SYSM400VO sysm400VO) throws Exception;
    Integer SYSM400DEL01(List<SYSM400VO> sysm400voList) throws Exception;
    List<SYSM400VO> SYSM400SEL03(SYSM400VO sysm400VO) throws Exception;
}