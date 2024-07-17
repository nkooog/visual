package bcs.vl.sysm.service.impl;

import java.util.List;

import javax.annotation.Resource;

import bcs.vl.cmmn.VO.MessageBodyVO;
import org.springframework.stereotype.Service;

import bcs.vl.sysm.VO.SYSM200VO;
import bcs.vl.sysm.service.SYSM200Service;
import bcs.vl.sysm.service.mapper.SYSM200Mapper;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
/***********************************************************************************************
* Program Name : 테넌트 관리 ServiceImpl
* Creator      : dwson
* Create Date  : 2024.02.05
* Description  : 테넌트 정보관리
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2022.02.05    dwson           최초생성
************************************************************************************************/
@Service("SYSM200Service")
public class SYSM200ServiceImpl extends EgovAbstractServiceImpl implements SYSM200Service {
	
	@Resource(name="SYSM200Mapper")
	private SYSM200Mapper sysm200DAO;
	
	@Override
	public List<SYSM200VO> SYSM200SEL01(SYSM200VO vo){
		return sysm200DAO.SYSM200SEL01(vo); 
	}
	
	@Override
	public int SYSM200SEL02(SYSM200VO vo){
		return sysm200DAO.SYSM200SEL02(vo); 
	}
	
	@Override
	public List<SYSM200VO> SYSM200SEL03(SYSM200VO vo){
		return sysm200DAO.SYSM200SEL03(vo); 
	}
	
	@Override
	public int SYSM200INS01(SYSM200VO vo){
		
		int result_tenant;
		int result_group;
		int result_serviceType;
		
		try {
			result_tenant = sysm200DAO.SYSM200INS01(vo);
//			result_group = !vo.getTenantGroupId().isEmpty() ? sysm200DAO.SYSM200INS02(vo) : 1;
			result_serviceType = sysm200DAO.SYSM200INS03(vo);
			
			if(result_serviceType > 0)
			{
				if(sysm200DAO.SYSM200INS04(vo) > 0)
				{
					sysm200DAO.SYSM200INS05(vo);
				}
			}
		} catch(Exception e) {
			throw new RuntimeException("[ERROR] " + e.getMessage());
		}
		
//		return result_tenant + result_group + result_serviceType;
		return result_tenant + result_serviceType;
	}

	@Override
	public void SYSM200INS06(SYSM200VO vo) {
		MessageBodyVO messageBodyVO = new MessageBodyVO();
		messageBodyVO.setSystemIdx(vo.getSystemIdx());
		messageBodyVO.setTenantprefix(vo.getTenantPrefix());
		sysm200DAO.SYSM200INS06(messageBodyVO);
	}

	@Override
	public int SYSM200UPT01(SYSM200VO vo){
		
		int result_tenant;
		int result_group;
		
		try {
			sysm200DAO.SYSM200DEL01(vo);
			result_tenant = sysm200DAO.SYSM200UPT01(vo);
			result_group = !(vo.getTenantGroupId() == null) ? sysm200DAO.SYSM200INS02(vo) : 1;
		} catch(Exception e) {
			throw new RuntimeException("[ERROR] " + e.getMessage());
		}
		
		return result_tenant + result_group;
	}

}
