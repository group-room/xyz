package com.grouproom.chat.service;

import com.grouproom.chat.dto.LatestChatResponse;
import com.grouproom.chat.entity.Chat;
import com.grouproom.chat.repository.MongoDBRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.GroupOperation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
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
public class MongoDBServiceImpl implements MongoDBService {

    private final MongoDBRepository mongoDBRepository;
    private final MongoTemplate mongoTemplate;

    @Override
    public List<Chat> getHistory(String room) {
        return mongoDBRepository.findTop20ByRoomOrderByIdDesc(room).stream().sorted(Comparator.comparing(Chat::getId)).collect(Collectors.toList());
    }

    @Override
    public List<Chat> getHistory(String room, Long id) {
//        return mongoDBRepository.findTop20ByIdLessThanOrderByIdDesc(id).stream().sorted(Comparator.comparing(Chat::getId)).collect(Collectors.toList());
        Query query = new Query();
        query.addCriteria(Criteria.where("room").is(room));
        return mongoTemplate.find(query, Chat.class);
    }

    @Override
    public List<LatestChatResponse> getLatestChat(String name) {

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

        return aggregate.getMappedResults().stream().map(o -> convert(o)).collect(Collectors.toList());
    }

    public LatestChatResponse convert(Chat chat) {
        LatestChatResponse latestChatResponse = LatestChatResponse.builder()
                .room(chat.getRoom())
                .text(chat.getText())
                .time(chat.getTime())
                .build();

        return latestChatResponse;

    }

}
