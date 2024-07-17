package bcs.vl.sysm.service;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import bcs.vl.sysm.VO.SYSM200VO;
/***********************************************************************************************
* Program Name : 테넌트 관리 Service
* Creator      : dwson
* Create Date  : 2024.02.05
* Description  : 테넌트 정보관리
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.02.05    dwson           최초생성
************************************************************************************************/
public interface SYSM200Service {
	public List<SYSM200VO> SYSM200SEL01(SYSM200VO vo);
	public int SYSM200SEL02(SYSM200VO vo);
	public List<SYSM200VO> SYSM200SEL03(SYSM200VO vo);
	
	@Transactional
	public int SYSM200INS01(SYSM200VO vo);

	@Transactional
	public void SYSM200INS06(SYSM200VO vo);
	
	@Transactional
	public int SYSM200UPT01(SYSM200VO vo);
}
