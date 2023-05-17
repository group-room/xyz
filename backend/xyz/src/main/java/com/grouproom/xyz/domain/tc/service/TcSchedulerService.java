package com.grouproom.xyz.domain.tc.service;

import com.grouproom.xyz.domain.tc.entity.OpenStatus;
import com.grouproom.xyz.domain.tc.entity.Tc;
import com.grouproom.xyz.domain.tc.repository.TcRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TcSchedulerService {

    private final TcRepository tcRepository;

    @Scheduled(cron = "0 0 0 * * ?") // 매일 자정
    public void updateTcRecords() {
        List<Tc> tcList = tcRepository.findAll();
        LocalDate nowDate = LocalDate.now();
        for (Tc tc : tcList) {
            LocalDate updateEnd = tc.getUpdateEnd().toLocalDate();
            LocalDate openStart = tc.getOpenStart().toLocalDate();
            LocalDate openEnd = tc.getOpenEnd().toLocalDate();
            OpenStatus openStatus = tc.getOpenStatus();

            if (!updateEnd.isBefore(nowDate)) {
                // updateEnd 날짜가 안 지난 경우
                continue;
            } else if (openStart.isAfter(nowDate)) {
                // openStart 날짜가 안 지난 경우
                tc.updateOpenStatus(OpenStatus.LOCKED);
            } else if (!openEnd.isBefore(nowDate) && openStatus != OpenStatus.OPENED) {
                // openStart와 openEnd 사이 기간에 openStatus가 opened가 아닌 경우
                tc.updateOpenStatus(OpenStatus.OPENABLE);
            } else if (openEnd.isBefore(nowDate) && openStatus == OpenStatus.OPENABLE) {
                // openEnd 날짜가 지났는데 openStatus가 openable인 경우
                tc.updateOpenStatus(OpenStatus.EXPIRED);
            }
            tcRepository.save(tc);
        }
    }
}
