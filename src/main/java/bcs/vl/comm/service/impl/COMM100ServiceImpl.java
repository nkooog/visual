package bcs.vl.comm.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;

import bcs.vl.comm.VO.COMM100VO;
import bcs.vl.comm.service.COMM100Service;
import bcs.vl.comm.service.mapper.COMM100Mapper;
import bcs.vl.lgin.VO.LGIN000VO;
import bcs.vl.lgin.service.LGIN000Service;
import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;
/***********************************************************************************************
* Program Name : 공통 서비스 ServiceImpl
* Creator      : sukim
* Create Date  : 2022.02.03
* Description  : 공통 서비스
* Modify Desc  :
* -----------------------------------------------------------------------------------------------
* Date         | Updater        | Remark
* -----------------------------------------------------------------------------------------------
* 2022.02.03     sukim            최초생성
* 2024.01.30     yhnam            
************************************************************************************************/
@Service("COMM100Service")
public class COMM100ServiceImpl extends EgovAbstractServiceImpl implements COMM100Service{
	@Resource(name="COMM100Mapper")
	private COMM100Mapper comm100DAO;

	@Resource(name="LGIN000Service")
	private LGIN000Service LGIN000Service;
	
	@Override
	public List<COMM100VO> COMM100SEL01(Map<String, Object> codeList) throws Exception {
		return comm100DAO.COMM100SEL01(codeList);
	}
	
	@Override
	public List<COMM100VO> COMM100SEL02(COMM100VO vo) throws Exception{
		return comm100DAO.COMM100SEL02(vo);
	}
	
	@Override
	public COMM100VO COMM100SEL03(COMM100VO vo) throws Exception{
		return comm100DAO.COMM100SEL03(vo);
	}
	
	@Override
	public List<COMM100VO> COMM100SEL04(COMM100VO vo) throws Exception {
		return comm100DAO.COMM100SEL04(vo);
	}
	
	@Override
	public List<COMM100VO> COMM100SEL05(COMM100VO vo) throws Exception {
		return comm100DAO.COMM100SEL05(vo);
	}

	@Override
	public List<COMM100VO> COMM100SEL06() throws Exception {
		return comm100DAO.COMM100SEL06();
	}
	
	@Override
	public COMM100VO COMM100SEL07(COMM100VO vo) throws Exception{
		return comm100DAO.COMM100SEL07(vo);
	}
	
	@Override
	public Integer userLogInsert(String dataFrmId, String mapgVlu1, String paramData, String resultType, String errorMsg, HttpSession session) throws Exception{

		int result = 0;
		if(dataFrmId != null && !"".equals(dataFrmId) && mapgVlu1 != null && !"".equals(mapgVlu1))
		{
			LGIN000VO sessionVo = (LGIN000VO) session.getAttribute("user");
			
			COMM100VO vo = new COMM100VO();
			vo.setTenantPrefix(sessionVo.getTenantPrefix());
			vo.setDataFrmId(dataFrmId);
			vo.setMapgVlu1(mapgVlu1);
			vo.setParamData(paramData);
			vo.setResultType(resultType);
			vo.setErrorMsg(errorMsg);
			vo.setRegrId(sessionVo.getAgentId());
			vo.setOriginRegrId(sessionVo.getOriginAgentId());
			vo.setOriginTenantPrefix(sessionVo.getOriginTenantPrefix());

			result = comm100DAO.userLogInsert(vo);
		}

		return result;
	}
}
