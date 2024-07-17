package bcs.vl.util.scheduler;

import java.time.LocalTime;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/***********************************************************************************************
 * Program Name : 스케쥴러 Creator : sjyang
 * Create Date : 2023.09.12
 * Description :
 * 기본 통계 및 반복 작업용 Modify Desc :
 * -----------------------------------------------------------------------------------------------
 * Date | Updater | Remark
 * -----------------------------------------------------------------------------------------------
 * 2022.09.12 sjyang 최초생성
 ************************************************************************************************/
@Component
public class Scheduler {

	protected Log log = LogFactory.getLog(this.getClass());

	@Scheduled(cron = "*/5 * * * * *") // 매일 5초마다 실행 //주석시 미사용
	public void SoftPhoneWaitCallScheduler() throws Exception {

		LocalTime currentTime = LocalTime.now();
        
        // 오전 6시부터 오후 23시까지의 범위 설정
        LocalTime startTime = LocalTime.of(6, 0);
        LocalTime endTime = LocalTime.of(23, 0);

        // 현재 시간이 조건을 만족하는지 확인
        if (currentTime.isAfter(startTime) && currentTime.isBefore(endTime)) {

	        int type = (currentTime.getSecond() /5)%3;
	        //TODO :: 스케줄러 5초 이상으로 변경시  type 재계산 할것
//	        System.out.println("SoftPhoneWaitCallScheduler ::" + currentTime.getSecond() +" : "+type);
//        	int intReulst = SoftPhoneService.SOFTPHONEUPT02(type);
        }
        
	}
}
