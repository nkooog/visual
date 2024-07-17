package bcs.vl.sysm.service.mapper;

import java.util.List;

import bcs.vl.sysm.VO.SYSM100VO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;
/***********************************************************************************************
* Program Name : 시스템 관리 Mapper
* Creator      : dwson
* Create Date  : 2024.01.26
* Description  : 시스템 관리
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.26     dwson            최초생성
************************************************************************************************/
@Mapper("SYSM100Mapper")
public interface SYSM100Mapper {
	public List<SYSM100VO> SYSM100SEL01(SYSM100VO vo);
	public List<SYSM100VO> SYSM100SEL02(SYSM100VO vo);
	public int SYSM100INS01(SYSM100VO vo);
	public int SYSM100UPT01(SYSM100VO vo);
}
