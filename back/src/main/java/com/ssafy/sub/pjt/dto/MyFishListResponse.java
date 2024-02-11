package com.ssafy.sub.pjt.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MyFishListResponse {

    private List<MyFishResponse> myFish;
    private Boolean hasNext;
}
