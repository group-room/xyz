package com.grouproom.xyz.domain.chat.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class RoomsResponse {

    @JsonProperty("chats")
    private List<RoomResponse> chats;
}
