package bcs.vl.sysm.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import bcs.vl.sysm.VO.SYSM500VO;
import bcs.vl.sysm.service.SYSM500Service;
import bcs.vl.sysm.service.mapper.SYSM500Mapper;

/***********************************************************************************************
* Program Name : 사용자활동내역 ServiceImpl
* Creator      : yhnam
* Create Date  : 2024.02.08
* Description  : 사용자활동내역
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.02.08     yhnam            최초생성
************************************************************************************************/
@Service("SYSM500Service")
public class SYSM500ServiceImpl implements SYSM500Service{

	@Resource(name="SYSM500Mapper")
	private SYSM500Mapper dao;
	
	@Override
	public List<SYSM500VO> SYSM500SEL01(SYSM500VO vo) throws Exception {
		return dao.SYSM500SEL01(vo);
	}
}
