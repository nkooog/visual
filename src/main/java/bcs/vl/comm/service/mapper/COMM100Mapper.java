package bcs.vl.comm.service.mapper;

import java.util.List;
import java.util.Map;

import bcs.vl.comm.VO.COMM100VO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;
/***********************************************************************************************
* Program Name : 공통 서비스 Mapper
* Creator      : sukim
* Create Date  : 2022.02.03
* Description  : 공통 서비스
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2022.02.03     sukim            최초생성
* 2024.01.30     yhnam            
************************************************************************************************/
@Mapper("COMM100Mapper")
public interface COMM100Mapper {
	public List<COMM100VO> COMM100SEL01(Map<String, Object> codeList) throws Exception;
	public List<COMM100VO> COMM100SEL02(COMM100VO vo) throws Exception;
	public COMM100VO COMM100SEL03(COMM100VO vo) throws Exception;
	public List<COMM100VO> COMM100SEL04(COMM100VO vo) throws Exception;
	public List<COMM100VO> COMM100SEL05(COMM100VO vo) throws Exception;
	public List<COMM100VO> COMM100SEL06() throws Exception;
	public COMM100VO COMM100SEL07(COMM100VO vo) throws Exception;
	public int userLogInsert(COMM100VO vo) throws Exception;
}
