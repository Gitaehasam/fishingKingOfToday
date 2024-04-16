package com.ssafy.sub.pjt.domain;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Image {
    private String url;

    private Float longitude;

    private Float latitude;

    private LocalDateTime createdAt;

    public static Image of(
            final String url,
            final Float longitude,
            final Float latitude,
            final LocalDateTime createdAt) {
        return new Image(url, longitude, latitude, createdAt);
    }
}
