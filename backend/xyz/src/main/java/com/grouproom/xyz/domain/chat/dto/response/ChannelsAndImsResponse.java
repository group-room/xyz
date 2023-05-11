package com.grouproom.xyz.domain.chat.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChannelsAndImsResponse {

    private ChannelsResponse channels;
    private ImsResponse ims;
}
