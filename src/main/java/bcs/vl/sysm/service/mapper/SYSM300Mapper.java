package bcs.vl.sysm.service.mapper;

import java.util.List;

import bcs.vl.sysm.VO.SYSM300VO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;
/***********************************************************************************************
* Program Name : URL 설정 조회 Mapper
* Creator      : dwson
* Create Date  : 2024.01.26
* Description  : URL 설정 조회
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.26     dwson            최초생성
************************************************************************************************/
@Mapper("SYSM300Mapper")
public interface SYSM300Mapper {
	public List<SYSM300VO> SYSM300SEL01(SYSM300VO vo);
}
