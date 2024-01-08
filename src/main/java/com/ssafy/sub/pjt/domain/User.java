package com.ssafy.sub.pjt.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    private String name;

    @Column(name = "social_id")
    private String socialId;

    private String platform;

    private String imageUrl;

    private LocalDateTime joinAt;

    private LocalDateTime LastLoginAt;

}
