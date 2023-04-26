package com.grouproom.xyz.domain.memory.entity;

import com.grouproom.xyz.domain.azt.entity.Azt;
import com.grouproom.xyz.domain.memory.dto.request.AddMemoryRequest;
import com.grouproom.xyz.domain.user.entity.User;
import com.grouproom.xyz.global.model.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Memory extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sequence")
    private Long sequence;

    @Column(length = 200, name = "content")
    private String content;

    @Column(name = "date")
    private LocalDateTime date;

    @Column(name = "latitude", precision = 10, scale = 6)
    private BigDecimal latitude;

    @Column(name = "longitude", precision = 10, scale = 6)
    private BigDecimal longitude;

    @Column(name = "location")
    private String location;

    @Enumerated
    @Column(name = "accessibility")
    private Accessibility accessibility;

    @Column(name = "is_deleted")
    private Boolean isDeleated;

    @Column(name = "is_blinded")
    private boolean isBlinded;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_sequence")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "azt_sequence")
    private Azt azt;

    @Builder
    public Memory(User user, AddMemoryRequest addMemoryRequest) {
        this.content = addMemoryRequest.getContent();
        this.date = addMemoryRequest.getDate().atStartOfDay();
        this.latitude = addMemoryRequest.getLatitude();
        this.longitude = addMemoryRequest.getLongitude();
        this.location = addMemoryRequest.getLocation();
        this.accessibility = Accessibility.valueOf(addMemoryRequest.getAccessibility());
        this.isDeleated = false;
        this.isBlinded = false;
        this.user = user;
//        this.azt = azt;
    }
}