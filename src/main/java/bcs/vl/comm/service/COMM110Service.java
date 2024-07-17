package bcs.vl.comm.service;


import java.util.List;

import bcs.vl.comm.VO.COMM110VO;

/***********************************************************************************************
 * Program Name : 전역변수 (테넌트)변경 Controller
 * Creator      : jrlee
 * Create Date  : 2022.08.02
 * Description  : 전역변수 (테넌트)변경
 * Modify Desc  :
 * -----------------------------------------------------------------------------------------------
 * Date         | Updater        | Remark
 * -----------------------------------------------------------------------------------------------
 * 2022.08.02     jrlee           최초생성
 * 2023.01.04     djjung          기능변경 - 테넌트,등급,유저아이디 변경
 ************************************************************************************************/
public interface COMM110Service {
	List<COMM110VO> COMM110SEL01(COMM110VO vo);

	List<COMM110VO> COMM110SEL02(COMM110VO vo) throws Exception;
	
	List<COMM110VO> COMM110SEL04(COMM110VO vo) throws Exception;
}
