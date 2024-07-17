package bcs.vl.opst.service;

import java.util.List;

import bcs.vl.opst.VO.OPST100VO;

/***********************************************************************************************
* Program Name : 사용 이력 Service
* Creator      : dwson
* Create Date  : 2024.02.14
* Description  : 사용 이력
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.02.14     dwson            최초생성
************************************************************************************************/
public interface OPST100Service {
	public List<OPST100VO> OPST100SEL01(OPST100VO vo);
	public List<?> OPST100SEL04();
}
