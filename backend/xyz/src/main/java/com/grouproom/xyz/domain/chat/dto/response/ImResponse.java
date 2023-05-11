package com.grouproom.xyz.domain.chat.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ImResponse {

    private String _id;
    private String _updatedAt;
    private String t;
    private String msgs;
    private String ts;
    private String lm;
    private String topic;
    private String username;
}
