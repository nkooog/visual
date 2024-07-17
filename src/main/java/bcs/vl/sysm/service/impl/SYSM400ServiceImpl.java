package bcs.vl.sysm.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import bcs.vl.sysm.VO.SYSM400VO;
import bcs.vl.sysm.service.SYSM400Service;
import bcs.vl.sysm.service.mapper.SYSM400Mapper;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
/***********************************************************************************************
* Program Name : 메뉴 관리 ServiceImpl
* Creator      : yhnam
* Create Date  : 2024.01.26
* Description  : 메뉴 관리
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.26     yhnam            최초생성
************************************************************************************************/
@Service("SYSM400Service")
public class SYSM400ServiceImpl extends EgovAbstractServiceImpl implements SYSM400Service {

	@Resource(name="SYSM400Mapper")
	private SYSM400Mapper sysm400DAO;
	
	@Override
	public List<SYSM400VO> SYSM400SEL01(SYSM400VO sysm400VO) throws Exception {
		return sysm400DAO.SYSM400SEL01(sysm400VO);
	}
	
	@Override
	public Integer SYSM400INS01(List<SYSM400VO> sysm400voList) throws Exception {
		return sysm400DAO.SYSM400INS01(sysm400voList);
	}
	
	@Override
	public Integer SYSM400INS02(List<SYSM400VO> sysm400voList) throws Exception {
		return sysm400DAO.SYSM400INS02(sysm400voList);
	}
	
	@Override
	public Integer SYSM400UPT01(List<SYSM400VO> sysm400voList) throws Exception {
		return sysm400DAO.SYSM400UPT01(sysm400voList);
	}
	
	@Override
	public Integer SYSM400UPT02(List<SYSM400VO> sysm400voList) throws Exception {
		return sysm400DAO.SYSM400UPT02(sysm400voList);
	}
	
	@Override
	public Integer SYSM400UPT03(List<SYSM400VO> sysm400voList) throws Exception {
		return sysm400DAO.SYSM400UPT03(sysm400voList);
	}
	
	@Override
	public Integer SYSM400UPT04(List<SYSM400VO> sysm400voList) throws Exception {
		return sysm400DAO.SYSM400UPT04(sysm400voList);
	}
	
	@Override
	public List<SYSM400VO> SYSM400SEL02(SYSM400VO sysm400VO) throws Exception {
		List<SYSM400VO> menuList = sysm400DAO.SYSM400SEL01(sysm400VO);
		return menuList.stream().filter(x -> StringUtils.isNotEmpty(x.getMenuTypCd()) && Integer.valueOf(x.getPrsMenuLvl()) == sysm400VO.getPrsMenuLvl() && String.valueOf(x.getHgrkMenuId()).equals(sysm400VO.getMenuId())).collect(Collectors.toList());
	}
	
	@Override
	public Integer SYSM400DEL01(List<SYSM400VO> sysm400voList) throws Exception {
		sysm400DAO.SYSM400DEL02(sysm400voList);
		return sysm400DAO.SYSM400DEL01(sysm400voList);
	}
	
	@Override
	public List<SYSM400VO> SYSM400SEL03(SYSM400VO sysm400VO) throws Exception {
		List<SYSM400VO> menuList = sysm400DAO.SYSM400SEL01(sysm400VO);
		return menuList.stream().filter(x -> x.getMenuId().equals(sysm400VO.getMenuId())).collect(Collectors.toList());
	}
}