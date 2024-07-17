package bcs.vl.sysm.service;

import java.util.List;

import bcs.vl.sysm.VO.SYSM500VO;

/***********************************************************************************************
* Program Name : 사용자활동내역 Service
* Creator      : yhnam
* Create Date  : 2024.02.08
* Description  : 사용자활동내역
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.02.08     yhnam            최초생성
************************************************************************************************/
public interface SYSM500Service {
	List<SYSM500VO> SYSM500SEL01(SYSM500VO vo) throws Exception;
}
