package bcs.vl.sysm.service.mapper;

import java.util.List;

import bcs.vl.cmmn.VO.MessageBodyVO;
import bcs.vl.sysm.VO.SYSM200VO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;
/***********************************************************************************************
* Program Name : 테넌트 관리 Mapper
* Creator      : dwson
* Create Date  : 2024.02.05
* Description  : 테넌트 정보관리
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.02.05    dwson           최초생성
************************************************************************************************/
@Mapper("SYSM200Mapper")
public interface SYSM200Mapper {
	public List<SYSM200VO> SYSM200SEL01(SYSM200VO vo);
	public int SYSM200SEL02(SYSM200VO vo);
	public List<SYSM200VO> SYSM200SEL03(SYSM200VO vo);
	public int SYSM200INS01(SYSM200VO vo);
	public int SYSM200UPT01(SYSM200VO vo);
	
	public int SYSM200INS02(SYSM200VO vo);
	public int SYSM200DEL01(SYSM200VO vo);
	
	public int SYSM200INS03(SYSM200VO vo);
	
	public int SYSM200INS04(SYSM200VO vo);
	public int SYSM200INS05(SYSM200VO vo);

	void SYSM200INS06(MessageBodyVO messageBodyVO);
}
