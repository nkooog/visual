package bcs.vl.opmt.service.mapper;

import java.util.List;

import bcs.vl.opmt.VO.OPMT200VO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;
/***********************************************************************************************
* Program Name : 비주얼레터링 관리 Mapper
* Creator      : dwson
* Create Date  : 2024.01.26
* Description  : 비주얼레터링 관리
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.26     dwson            최초생성
************************************************************************************************/
@Mapper("OPMT200Mapper")
public interface OPMT200Mapper {
	public List<OPMT200VO> OPMT200SEL01(OPMT200VO vo);
	public OPMT200VO OPMT200SEL04(OPMT200VO vo);
	public int OPMT200INS01(OPMT200VO vo);
	public int OPMT2000UPT01(OPMT200VO vo);
	public int OPMT200INS02(OPMT200VO vo);
	public int OPMT2000UPT02(OPMT200VO vo);
	public int OPMT200INS03(OPMT200VO vo);
	public int OPMT200DEL03(OPMT200VO vo);
	public int OPMT200INSLog(OPMT200VO vo);
	public int OPMT201INS01(OPMT200VO vo);
	public int OPMT200DEL04(OPMT200VO vo);
	public int OPMT200INS04(OPMT200VO vo);
	public int OPMT200UPT04(OPMT200VO vo);
}
