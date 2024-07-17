package bcs.vl.logm.service.mapper;

import java.util.List;

import bcs.vl.logm.VO.LOGM100VO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;
/***********************************************************************************************
* Program Name : 사용자 로그 Mapper
* Creator      : dwson
* Create Date  : 2024.02.21
* Description  : 사용자 로그
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.02.21     dwson            최초생성
************************************************************************************************/
@Mapper("LOGM100Mapper")
public interface LOGM100Mapper {
	public List<LOGM100VO> LOGM100SEL01(LOGM100VO vo);
}
