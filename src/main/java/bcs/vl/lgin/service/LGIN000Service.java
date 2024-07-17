package bcs.vl.lgin.service;

import bcs.vl.lgin.VO.LGIN000VO;
/***********************************************************************************************
* Program Name : 로그인 Service
* Creator      : dwson
* Create Date  : 2024.01.24
* Description  : 로그인
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.24     dwson            최초생성
************************************************************************************************/
public interface LGIN000Service {
	public int LGIN000SEL01(LGIN000VO vo);
	public LGIN000VO LGIN000SEL02(LGIN000VO vo) throws Exception;
	public int LGIN000SEL04(LGIN000VO vo);
	public LGIN000VO LGIN000SEL06(LGIN000VO vo);
	public LGIN000VO LGIN000SEL07(LGIN000VO vo);
	public int LGIN000UPT05(LGIN000VO vo);

	public Integer LGIN000SEL08(String url);
}
