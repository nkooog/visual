package bcs.vl.frme.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import bcs.vl.frme.VO.FRME100VO;
import bcs.vl.frme.service.FRME100Service;
import bcs.vl.frme.service.mapper.FRME100Mapper;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
/***********************************************************************************************
* Program Name : 프레임 ServiceImpl
* Creator      : jrlee
* Create Date  : 2024.01.24
* Description  : 프레임 ServiceImpl
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2024.01.24     dwson            최초생성
************************************************************************************************/
@Service("FRME100Service")
public class FRME100ServiceImpl extends EgovAbstractServiceImpl implements FRME100Service {
	
	@Resource(name="FRME100Mapper")
	private FRME100Mapper frme100Mapper;
	
	@Override
	public List<FRME100VO> FRME100SEL01(FRME100VO frme100VO) throws Exception {
		List<FRME100VO> menuList = frme100Mapper.FRME100SEL01(frme100VO);
		return menuList.stream().filter(x -> StringUtils.isNotEmpty(x.getMenuTypCd())).collect(Collectors.toList());
	}

}
