package bcs.vl.opst.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import bcs.vl.opst.VO.OPST200VO;
import bcs.vl.opst.service.OPST200Service;
import bcs.vl.opst.service.mapper.OPST200Mapper;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
/***********************************************************************************************
* Program Name : 사용 통계 ServiceImpl
* Creator      : dwson
* Create Date  : 2024.01.26
* Description  : 사용 통계
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.26     dwson            최초생성
************************************************************************************************/
@Service("OPST200Service")
public class OPST200ServiceImpl extends EgovAbstractServiceImpl implements OPST200Service {

	@Resource(name="OPST200Mapper")
	private OPST200Mapper opst200DAO;
	
	@Override
	public List<OPST200VO> OPST200SEL01(OPST200VO vo){
		return opst200DAO.OPST200SEL01(vo); 
	}	
}
