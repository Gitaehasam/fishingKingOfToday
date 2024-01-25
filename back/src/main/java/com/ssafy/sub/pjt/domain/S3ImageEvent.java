package com.ssafy.sub.pjt.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class S3ImageEvent {
    private final String imageName;
}
