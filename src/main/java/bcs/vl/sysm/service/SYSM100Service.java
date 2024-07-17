package bcs.vl.sysm.service;

import java.util.List;

import bcs.vl.sysm.VO.SYSM100VO;

/***********************************************************************************************
* Program Name : 시스템 관리 Service
* Creator      : dwson
* Create Date  : 2024.01.26
* Description  : 시스템 관리
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.26     dwson            최초생성
************************************************************************************************/
public interface SYSM100Service {
	public List<SYSM100VO> SYSM100SEL01(SYSM100VO vo);
	public List<SYSM100VO> SYSM100SEL02(SYSM100VO vo);
	public int SYSM100INS01(SYSM100VO vo);
	public int SYSM100UPT01(SYSM100VO vo);
}
