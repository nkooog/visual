package bcs.vl.logm.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import bcs.vl.logm.VO.LOGM100VO;
import bcs.vl.logm.service.LOGM100Service;
import bcs.vl.logm.service.mapper.LOGM100Mapper;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
/***********************************************************************************************
* Program Name : 사용자 로그 ServiceImpl
* Creator      : dwson
* Create Date  : 2024.02.21
* Description  : 사용자 로그
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.02.21     dwson            최초생성
************************************************************************************************/
@Service("LOGM100Service")
public class LOGM100ServiceImpl extends EgovAbstractServiceImpl implements LOGM100Service {

	@Resource(name="LOGM100Mapper")
	private LOGM100Mapper logm100DAO;
	
	@Override
	public List<LOGM100VO> LOGM100SEL01(LOGM100VO vo){
		return logm100DAO.LOGM100SEL01(vo); 
	}	
}
