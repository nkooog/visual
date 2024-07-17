package bcs.vl.sysm.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import bcs.vl.sysm.VO.SYSM210VO;
import bcs.vl.sysm.service.SYSM210Service;
import bcs.vl.sysm.service.mapper.SYSM210Mapper;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
/***********************************************************************************************
* Program Name : 태넌트 그룹 기본정보 ServiceImpl
* Creator      : yhnam
* Create Date  : 2024.02.05
* Description  : 태넌트 기본정보
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.02.05     yhnam           최초생성
************************************************************************************************/
@Service("SYSM210Service")
public class SYSM210ServiceImpl extends EgovAbstractServiceImpl implements SYSM210Service {

	@Resource(name="SYSM210Mapper")
	private SYSM210Mapper SYSM210DAO;
	
	@Override
	public List<SYSM210VO> SYSM210SEL01(SYSM210VO vo) throws Exception {
		return SYSM210DAO.SYSM210SEL01(vo);
	}
	
	@Override
	public List<SYSM210VO> SYSM210SEL02(SYSM210VO vo) throws Exception {
		return SYSM210DAO.SYSM210SEL02(vo);
	}
	
	@Override
	public SYSM210VO SYSM210SEL03(SYSM210VO vo) throws Exception {
		return SYSM210DAO.SYSM210SEL03(vo);
	}
	
	@Override
	public Integer SYSM210INS01(SYSM210VO vo) throws Exception {
		return SYSM210DAO.SYSM210INS01(vo);
	}
	
	@Override
	public Integer SYSM210UPT01(SYSM210VO vo) throws Exception {
		return SYSM210DAO.SYSM210UPT01(vo);
	}
	
	@Override
	public Integer SYSM210UPT02(SYSM210VO vo) throws Exception {
		return SYSM210DAO.SYSM210UPT02(vo);
	}
}