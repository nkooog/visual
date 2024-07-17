package bcs.vl.comm.service.mapper;

import java.util.List;

import bcs.vl.comm.VO.COMM110VO;
import egovframework.rte.psl.dataaccess.mapper.Mapper;

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
@Mapper("COMM110Mapper")
public interface COMM110Mapper {
	List<COMM110VO> COMM110SEL01(COMM110VO vo);
	List<COMM110VO> COMM110SEL02(COMM110VO vo);
	
	List<COMM110VO> COMM110SEL04(COMM110VO vo);
}
