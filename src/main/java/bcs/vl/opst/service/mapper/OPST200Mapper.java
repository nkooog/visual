package bcs.vl.opst.service.mapper;

import java.util.List;

import bcs.vl.opst.VO.OPST200VO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;
/***********************************************************************************************
* Program Name : 사용 통계 Mapper
* Creator      : dwson
* Create Date  : 2024.01.26
* Description  : 사용 통계
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.26     dwson            최초생성
************************************************************************************************/
@Mapper("OPST200Mapper")
public interface OPST200Mapper {
	public List<OPST200VO> OPST200SEL01(OPST200VO vo);
}
