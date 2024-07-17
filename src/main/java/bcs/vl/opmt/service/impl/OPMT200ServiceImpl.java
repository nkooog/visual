package bcs.vl.opmt.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import bcs.vl.opmt.VO.OPMT200VO;
import bcs.vl.opmt.service.OPMT200Service;
import bcs.vl.opmt.service.mapper.OPMT200Mapper;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
/***********************************************************************************************
* Program Name : 비주얼레터링 관리 ServiceImpl
* Creator      : dwson
* Create Date  : 2024.01.26
* Description  : 비주얼레터링 관리
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.26     dwson            최초생성
************************************************************************************************/
@Service("OPMT200Service")
public class OPMT200ServiceImpl extends EgovAbstractServiceImpl implements OPMT200Service {

	@Resource(name="OPMT200Mapper")
	private OPMT200Mapper opmt200DAO;
	
	@Override
	public List<OPMT200VO> OPMT200SEL01(OPMT200VO vo){
		return opmt200DAO.OPMT200SEL01(vo); 
	}
	
	@Override
	public OPMT200VO OPMT200SEL04(OPMT200VO vo){
		return opmt200DAO.OPMT200SEL04(vo); 
	}
	
	@Override
	public int OPMT200INS01(OPMT200VO vo){
		return opmt200DAO.OPMT200INS01(vo); 
	}
	
	@Override
	public int OPMT2000UPT01(OPMT200VO vo){
		return opmt200DAO.OPMT2000UPT01(vo); 
	}
	
	@Override
	public int OPMT200INS02(OPMT200VO vo){
		return opmt200DAO.OPMT200INS02(vo); 
	}
	
	@Override
	public int OPMT2000UPT02(OPMT200VO vo){
		return opmt200DAO.OPMT2000UPT02(vo); 
	}

	@Override
	public int OPMT200INS03(OPMT200VO vo){
		return opmt200DAO.OPMT200INS03(vo); 
	}
	
	@Override
	public int OPMT200DEL03(OPMT200VO vo){
		return opmt200DAO.OPMT200DEL03(vo); 
	}
	
	@Override
	public int OPMT200INSLog(OPMT200VO vo){
		return opmt200DAO.OPMT200INSLog(vo); 
	}
	
	@Override
	public int OPMT201INS01(OPMT200VO vo){
		return opmt200DAO.OPMT201INS01(vo); 
	}
	
	@Override
	public int OPMT200DEL04(OPMT200VO vo){
		return opmt200DAO.OPMT200DEL04(vo); 
	}
	
	@Override
	public int OPMT200INS04(OPMT200VO vo){
		return opmt200DAO.OPMT200INS04(vo); 
	}
	
	@Override
	public int OPMT200UPT04(OPMT200VO vo){
		return opmt200DAO.OPMT200UPT04(vo); 
	}
}
