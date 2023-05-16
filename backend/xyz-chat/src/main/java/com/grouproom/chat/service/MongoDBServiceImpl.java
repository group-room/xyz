package com.grouproom.chat.service;

import com.grouproom.chat.dto.LatestChatResponse;
import com.grouproom.chat.entity.Chat;
import com.grouproom.chat.repository.MongoDBRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.newAggregation;

/**
 * packageName    : com.example.WebSocketAndKafka.service
 * fileName       : MongoDBServiceImpl
 * author         : SSAFY
 * date           : 2023-05-10
 * description    :
 * <p>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * <p>
 * 2023-05-10        SSAFY       최초 생성
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class MongoDBServiceImpl implements MongoDBService {

    private final MongoDBRepository mongoDBRepository;
    private final MongoTemplate mongoTemplate;

    @Override
    public List<Chat> getHistory(String room) {
        return mongoDBRepository.findTop20ByRoomOrderByIdDesc(room).stream().sorted(Comparator.comparing(Chat::getId)).collect(Collectors.toList());
    }

    @Override
    public List<Chat> getHistory(String room, Long id) {
        log.error("getHistory {} {}",room,id);
//        return mongoDBRepository.findTop20ByIdLessThanOrderByIdDesc(id).stream().sorted(Comparator.comparing(Chat::getId)).collect(Collectors.toList());
        //조건문 같은 방
        Criteria firstCriteria = new Criteria().where("room").is(room);
        MatchOperation firstMatchOperation = Aggregation.match(firstCriteria);

        //조건문 id미만
        Criteria secondCriteria = new Criteria().where("_id").lt(id);
        MatchOperation secondMatchOperation = Aggregation.match(secondCriteria);

        //역정렬
        SortOperation sortOperation = Aggregation.sort(Sort.Direction.DESC,"_id");

        //limit
        LimitOperation limitOperation = Aggregation.limit(20);


        AggregationResults<Chat> aggregate =
                this.mongoTemplate.aggregate(newAggregation(firstMatchOperation, secondMatchOperation,sortOperation,limitOperation),
//                        this.mongoTemplate.aggregate(newAggregation(firstMatchOperation),
                        Chat.class,
                        Chat.class);

        return aggregate.getMappedResults().stream().sorted(Comparator.comparing(Chat::getId)).collect(Collectors.toList());
    }

    @Override
    public List<Chat> getLatestChat(String name) {

        //조건문
        Criteria criteria = new Criteria().where("name").is(name);
        MatchOperation matchOperation = Aggregation.match(criteria);

        //그룹화
        GroupOperation groupOperation = Aggregation.group("room")
                .last("room").as("room")
                .last("name").as("name")
                .last("text").as("text")
                .last("time").as("time");

        AggregationResults<Chat> aggregate =
                this.mongoTemplate.aggregate(newAggregation(matchOperation, groupOperation),
                        Chat.class,
                        Chat.class);

        return aggregate.getMappedResults().stream().sorted().collect(Collectors.toList());
    }

    public int timeCompare(String time){
        return 0;
    }

}
