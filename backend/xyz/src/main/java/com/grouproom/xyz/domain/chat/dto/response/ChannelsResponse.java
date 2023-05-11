package com.grouproom.xyz.domain.chat.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChannelsResponse {

    @JsonProperty("channels")
    private List<ChannelResponse> channels;
    private Long offset;
    private Long count;
    private Long total;
    private Boolean success;
}
