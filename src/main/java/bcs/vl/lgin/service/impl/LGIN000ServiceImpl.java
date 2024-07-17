package bcs.vl.lgin.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import bcs.vl.lgin.VO.LGIN000VO;
import bcs.vl.lgin.service.LGIN000Service;
import bcs.vl.lgin.service.mapper.LGIN000Mapper;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
/***********************************************************************************************
* Program Name : 로그인 ServiceImpl
* Creator      : dwson
* Create Date  : 2024.01.24
* Description  : 로그인
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.24     dwson            최초생성
************************************************************************************************/
@Service("LGIN000Service")
public class LGIN000ServiceImpl extends EgovAbstractServiceImpl implements LGIN000Service {

	@Resource(name="LGIN000Mapper")
	private LGIN000Mapper lgin000DAO;
	
	@Override
	public int LGIN000SEL01(LGIN000VO vo){
		return lgin000DAO.LGIN000SEL01(vo); 
	}	

	@Override
	public LGIN000VO LGIN000SEL02(LGIN000VO vo) throws Exception {
		return lgin000DAO.LGIN000SEL02(vo);
	}

	@Override
	public int LGIN000SEL04(LGIN000VO vo){
		return lgin000DAO.LGIN000SEL04(vo); 
	}

	@Override
	public LGIN000VO LGIN000SEL06(LGIN000VO vo){
		return lgin000DAO.LGIN000SEL06(vo); 
	}	
	
	@Override
	public LGIN000VO LGIN000SEL07(LGIN000VO vo){
		return lgin000DAO.LGIN000SEL07(vo); 
	}
	
	@Override
	public int LGIN000UPT05(LGIN000VO vo) {
		return lgin000DAO.LGIN000UPT05(vo);
	}

	@Override
	public Integer LGIN000SEL08(String url) {
		return lgin000DAO.LGIN000SEL08(url);
	}
}
