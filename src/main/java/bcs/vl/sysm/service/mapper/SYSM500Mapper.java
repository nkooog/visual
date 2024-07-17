package bcs.vl.sysm.service.mapper;

import java.util.List;

import bcs.vl.sysm.VO.SYSM500VO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;

/***********************************************************************************************
* Program Name : 사용자활동내역 Mapper
* Creator      : yhnam
* Create Date  : 2024.02.08
* Description  : 사용자활동내역
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.02.08     yhnam            최초생성
************************************************************************************************/
@Mapper("SYSM500Mapper")
public interface SYSM500Mapper {
	List<SYSM500VO> SYSM500SEL01(SYSM500VO vo) throws Exception;
}
