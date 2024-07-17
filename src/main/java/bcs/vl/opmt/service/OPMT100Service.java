package bcs.vl.opmt.service;

import java.util.List;

import bcs.vl.opmt.VO.OPMT100VO;

/***********************************************************************************************
* Program Name : 사용자 관리 Service
* Creator      : dwson
* Create Date  : 2024.02.06
* Description  : 사용자 관리
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.02.06     dwson            최초생성
************************************************************************************************/
public interface OPMT100Service {
	public List<OPMT100VO> OPMT100SEL01(OPMT100VO vo);
	public int OPMT100SEL02(OPMT100VO vo);
	public int OPMT100INS01(OPMT100VO vo);
	public int OPMT100UPT01(OPMT100VO vo);
}
