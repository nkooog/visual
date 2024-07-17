package bcs.vl.frme.service;

import java.util.List;

import bcs.vl.frme.VO.FRME100VO;
/***********************************************************************************************
* Program Name : 프레임 Service
* Creator      : jrlee
* Create Date  : 2022.02.10
* Description  : 프레임 Service
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2022.02.10     jrlee            최초생성
************************************************************************************************/
public interface FRME100Service {
	List<FRME100VO> FRME100SEL01(FRME100VO frme100VO) throws Exception;
}
