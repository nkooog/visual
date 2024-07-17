package bcs.vl.frme.service.mapper;

import java.util.List;

import bcs.vl.frme.VO.FRME100VO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;
/***********************************************************************************************
* Program Name : 프레임 Mapper
* Creator      : jrlee
* Create Date  : 2022.02.10
* Description  : 프레임 Mapper
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2022.02.10     jrlee            최초생성
************************************************************************************************/
@Mapper("FRME100Mapper")
public interface FRME100Mapper {
	List<FRME100VO> FRME100SEL01(FRME100VO frme100VO) throws Exception;
}
