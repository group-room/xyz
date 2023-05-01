package com.grouproom.xyz.domain.myroom.service;

import java.util.HashMap;
import java.util.List;

public interface MyRoomService {
    void removeAllStickers();
    void addStickersFromS3Asset(List<HashMap> assets);
}
