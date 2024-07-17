package bcs.vl.opst.service.mapper;

import java.util.List;

import bcs.vl.opst.VO.OPST100VO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;
/***********************************************************************************************
* Program Name : 사용 이력 Mapper
* Creator      : dwson
* Create Date  : 2024.01.26
* Description  : 사용 이력
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.26     dwson            최초생성
************************************************************************************************/
@Mapper("OPST100Mapper")
public interface OPST100Mapper {
	public List<OPST100VO> OPST100SEL01(OPST100VO vo);
	public List<?> OPST100SEL04();
}
