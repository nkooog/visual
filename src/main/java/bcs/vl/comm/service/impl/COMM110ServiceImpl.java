package bcs.vl.comm.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import bcs.vl.comm.VO.COMM110VO;
import bcs.vl.comm.service.COMM110Service;
import bcs.vl.comm.service.mapper.COMM110Mapper;
import bcs.vl.util.crypto.AES256Crypt;


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
@Service("COMM110Service")
@Transactional
public class COMM110ServiceImpl implements COMM110Service {
	@Resource(name="COMM110Mapper")
	private COMM110Mapper COMM110DAO;

	@Override
	public List<COMM110VO> COMM110SEL01(COMM110VO vo) {
		return COMM110DAO.COMM110SEL01(vo);
	}

	@Override
	public List<COMM110VO> COMM110SEL02(COMM110VO vo) throws Exception {
		List<COMM110VO> volist  = COMM110DAO.COMM110SEL02(vo);
		for (COMM110VO resultvo : volist){
			if(resultvo.getUsrNm() != null){
				resultvo.setDecUsrNm(AES256Crypt.decrypt(resultvo.getUsrNm()));
			}
		}
		return volist;
	}
	
	@Override
	public List<COMM110VO> COMM110SEL04(COMM110VO vo) throws Exception {
		List<COMM110VO> volist  = COMM110DAO.COMM110SEL04(vo);
		for (COMM110VO resultvo : volist){
			if(resultvo.getUsrNm() != null){
				resultvo.setUsrNm(AES256Crypt.decrypt(resultvo.getUsrNm()));
			}
		}
		return volist;
	}
}
