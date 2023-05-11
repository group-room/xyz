package com.grouproom.xyz.domain.chat.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChannelResponse {

    private String _id;
    private String ts;
    private String t;
    private String name;
    private Long msgs;
    private String _updatedAt;
    private String username;

}
