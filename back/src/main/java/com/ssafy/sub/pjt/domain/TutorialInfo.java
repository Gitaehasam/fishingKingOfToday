package com.ssafy.sub.pjt.domain;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TutorialInfo implements Serializable {

    private String order;

    private String imageUrl;

    private String description;
}
