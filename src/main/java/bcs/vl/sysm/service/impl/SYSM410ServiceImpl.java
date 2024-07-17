package bcs.vl.sysm.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import bcs.vl.sysm.VO.SYSM410VO;
import bcs.vl.sysm.service.SYSM410Service;
import bcs.vl.sysm.service.mapper.SYSM410Mapper;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
/***********************************************************************************************
* Program Name : 테넌트 그룹별 메뉴권한관리 ServiceImpl
* Creator      : yhnam
* Create Date  : 2024.01.31
* Description  : 테넌트 그룹별 메뉴권한관리
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.26     yhnam            최초생성
************************************************************************************************/
@Service("SYSM410Service")
public class SYSM410ServiceImpl extends EgovAbstractServiceImpl implements SYSM410Service {

	@Resource(name="SYSM410Mapper")
	private SYSM410Mapper sysm410DAO;
	
	@Override
	public List<SYSM410VO> SYSM410SEL01(SYSM410VO sysm410VO) throws Exception {
		return sysm410DAO.SYSM410SEL01(sysm410VO);
	}
	
	@Override
	public List<SYSM410VO> SYSM410SEL02(SYSM410VO sysm410VO) throws Exception {
		return sysm410DAO.SYSM410SEL02(sysm410VO);
	}
	
	@Override
	public Integer SYSM410INS01(List<SYSM410VO> list) throws Exception {
		return sysm410DAO.SYSM410INS01(list);
	}

	@Override
	public Integer SYSM410DEL01(SYSM410VO sysm410VO) throws Exception {
		return sysm410DAO.SYSM410DEL01(sysm410VO);
	}
}
