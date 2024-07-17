package bcs.vl.sysm.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import bcs.vl.sysm.VO.SYSM300VO;
import bcs.vl.sysm.service.SYSM300Service;
import bcs.vl.sysm.service.mapper.SYSM300Mapper;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
/***********************************************************************************************
* Program Name : URL 설정 조회 ServiceImpl
* Creator      : dwson
* Create Date  : 2024.01.26
* Description  : URL 설정 조회
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.26     dwson            최초생성
************************************************************************************************/
@Service("SYSM300Service")
public class SYSM300ServiceImpl extends EgovAbstractServiceImpl implements SYSM300Service {

	@Resource(name="SYSM300Mapper")
	private SYSM300Mapper sysm300DAO;
	
	@Override
	public List<SYSM300VO> SYSM300SEL01(SYSM300VO vo){
		return sysm300DAO.SYSM300SEL01(vo); 
	}	
}
