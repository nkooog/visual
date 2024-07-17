package bcs.vl.logm.service;

import java.util.List;

import bcs.vl.logm.VO.LOGM100VO;

/***********************************************************************************************
* Program Name : 사용자 로그 Service
* Creator      : dwson
* Create Date  : 2024.02.21
* Description  : 사용자 로그
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.02.21     dwson            최초생성
************************************************************************************************/
public interface LOGM100Service {
	public List<LOGM100VO> LOGM100SEL01(LOGM100VO vo);
}
