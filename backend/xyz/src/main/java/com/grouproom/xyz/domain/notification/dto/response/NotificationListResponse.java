package com.grouproom.xyz.domain.notification.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class NotificationListResponse {
    private List<NotificationResponse> notifications;
}
