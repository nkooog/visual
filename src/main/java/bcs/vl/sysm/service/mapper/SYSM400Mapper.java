package bcs.vl.sysm.service.mapper;

import java.util.List;

import bcs.vl.sysm.VO.SYSM400VO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;
/***********************************************************************************************
* Program Name : 메뉴 관리 Mapper
* Creator      : yhnam
* Create Date  : 2024.01.26
* Description  : 메뉴 관리
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.26     yhnam            최초생성
************************************************************************************************/
@Mapper("SYSM400Mapper")
public interface SYSM400Mapper {
	List<SYSM400VO> SYSM400SEL01(SYSM400VO sysm400VO) throws Exception;
	Integer SYSM400INS01(List<SYSM400VO> sysm400voList) throws Exception;
	Integer SYSM400INS02(List<SYSM400VO> sysm400voList) throws Exception;
	Integer SYSM400UPT01(List<SYSM400VO> sysm400voList) throws Exception;
    Integer SYSM400UPT02(List<SYSM400VO> sysm400voList) throws Exception;
    Integer SYSM400UPT03(List<SYSM400VO> sysm400voList) throws Exception;
    Integer SYSM400UPT04(List<SYSM400VO> sysm400voList) throws Exception;
    Integer SYSM400DEL01(List<SYSM400VO> sysm400voList) throws Exception;
    Integer SYSM400DEL02(List<SYSM400VO> sysm400voList) throws Exception;
}