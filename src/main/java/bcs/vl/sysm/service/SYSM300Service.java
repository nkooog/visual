package bcs.vl.sysm.service;

import java.util.List;

import bcs.vl.sysm.VO.SYSM300VO;

/***********************************************************************************************
* Program Name : URL 설정 조회 Service
* Creator      : dwson
* Create Date  : 2024.01.26
* Description  : URL 설정 조회
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.26     dwson            최초생성
************************************************************************************************/
public interface SYSM300Service {
	public List<SYSM300VO> SYSM300SEL01(SYSM300VO vo);
}
