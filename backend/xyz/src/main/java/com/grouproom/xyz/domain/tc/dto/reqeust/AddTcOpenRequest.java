package com.grouproom.xyz.domain.tc.dto.reqeust;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class AddTcOpenRequest {

    private BigDecimal latitude;
    private BigDecimal longitude;
}
