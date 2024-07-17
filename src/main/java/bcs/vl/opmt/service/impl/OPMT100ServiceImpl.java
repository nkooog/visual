package bcs.vl.opmt.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import bcs.vl.opmt.VO.OPMT100VO;
import bcs.vl.opmt.service.OPMT100Service;
import bcs.vl.opmt.service.mapper.OPMT100Mapper;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
/***********************************************************************************************
* Program Name : 사용자 관리 ServiceImpl
* Creator      : dwson
* Create Date  : 2024.01.24
* Description  : 사용자 관리
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.02.06     dwson            최초생성
************************************************************************************************/
@Service("OPMT100Service")
public class OPMT100ServiceImpl extends EgovAbstractServiceImpl implements OPMT100Service {

	@Resource(name="OPMT100Mapper")
	private OPMT100Mapper opmt100DAO;
	
	@Override
	public List<OPMT100VO> OPMT100SEL01(OPMT100VO vo){
		return opmt100DAO.OPMT100SEL01(vo); 
	}
	
	@Override
	public int OPMT100SEL02(OPMT100VO vo){
		return opmt100DAO.OPMT100SEL02(vo); 
	}
	
	@Override
	public int OPMT100INS01(OPMT100VO vo){
		return opmt100DAO.OPMT100INS01(vo);
	}
	
	@Override
	public int OPMT100UPT01(OPMT100VO vo){
		return opmt100DAO.OPMT100UPT01(vo);
	}
}
