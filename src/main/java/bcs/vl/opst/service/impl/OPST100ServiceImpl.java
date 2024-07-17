package bcs.vl.opst.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import bcs.vl.opst.VO.OPST100VO;
import bcs.vl.opst.service.OPST100Service;
import bcs.vl.opst.service.mapper.OPST100Mapper;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
/***********************************************************************************************
* Program Name : 사용 이력 ServiceImpl
* Creator      : dwson
* Create Date  : 2024.02.14
* Description  : 사용 이력
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.02.14     dwson            최초생성
************************************************************************************************/
@Service("OPST100Service")
public class OPST100ServiceImpl extends EgovAbstractServiceImpl implements OPST100Service {

	@Resource(name="OPST100Mapper")
	private OPST100Mapper opst100DAO;
	
	@Override
	public List<OPST100VO> OPST100SEL01(OPST100VO vo){
		return opst100DAO.OPST100SEL01(vo); 
	}

	@Override
	public List<?> OPST100SEL04() {
		return opst100DAO.OPST100SEL04();
	}
}
