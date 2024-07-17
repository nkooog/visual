package bcs.vl.lgin.service.mapper;

import bcs.vl.lgin.VO.LGIN000VO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;
/***********************************************************************************************
* Program Name : 로그인 Mapper
* Creator      : dwson
* Create Date  : 2024.01.24
* Description  : 로그인
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.24     dwson            최초생성
************************************************************************************************/
@Mapper("LGIN000Mapper")
public interface LGIN000Mapper {
	public int LGIN000SEL01(LGIN000VO vo);
	public LGIN000VO LGIN000SEL02(LGIN000VO vo);
	public int LGIN000SEL04(LGIN000VO vo);
	public LGIN000VO LGIN000SEL06(LGIN000VO vo);
	public LGIN000VO LGIN000SEL07(LGIN000VO vo);
	
	public int LGIN000UPT05(LGIN000VO vo);
	public Integer LGIN000SEL08(String url);
}
