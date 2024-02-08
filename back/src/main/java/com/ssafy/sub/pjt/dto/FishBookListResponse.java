package com.ssafy.sub.pjt.dto;

import java.io.Serializable;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FishBookListResponse implements Serializable {
    private static final long serialVersionUID = 1L;

    private List<FishBookResponse> fishBooks;
    private Boolean hasNext;
}
