package bcs.vl.opst.service;

import java.util.List;

import bcs.vl.opst.VO.OPST200VO;

/***********************************************************************************************
* Program Name : 사용 통계 Service
* Creator      : dwson
* Create Date  : 2024.01.26
* Description  : 사용 통계
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.26     dwson            최초생성
************************************************************************************************/
public interface OPST200Service {
	public List<OPST200VO> OPST200SEL01(OPST200VO vo);
}
