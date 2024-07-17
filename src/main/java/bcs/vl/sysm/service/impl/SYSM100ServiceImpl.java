package bcs.vl.sysm.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import bcs.vl.sysm.VO.SYSM100VO;
import bcs.vl.sysm.service.SYSM100Service;
import bcs.vl.sysm.service.mapper.SYSM100Mapper;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
/***********************************************************************************************
* Program Name : 시스템 관리 ServiceImpl
* Creator      : dwson
* Create Date  : 2024.01.26
* Description  : 시스템 관리
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.26     dwson            최초생성
************************************************************************************************/
@Service("SYSM100Service")
public class SYSM100ServiceImpl extends EgovAbstractServiceImpl implements SYSM100Service {

	@Resource(name="SYSM100Mapper")
	private SYSM100Mapper sysm100DAO;
	
	@Override
	public List<SYSM100VO> SYSM100SEL01(SYSM100VO vo){
		return sysm100DAO.SYSM100SEL01(vo); 
	}
	
	@Override
	public List<SYSM100VO> SYSM100SEL02(SYSM100VO vo){
		return sysm100DAO.SYSM100SEL02(vo); 
	}
	
	@Override
	public int SYSM100INS01(SYSM100VO vo){
		return sysm100DAO.SYSM100INS01(vo); 
	}
	
	@Override
	public int SYSM100UPT01(SYSM100VO vo){
		return sysm100DAO.SYSM100UPT01(vo); 
	}
	
}
