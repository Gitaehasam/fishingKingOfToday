package com.ssafy.sub.pjt.domain;

import java.time.LocalDateTime;
import javax.persistence.*;
import lombok.*;

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

    @Column(name = "nick_name")
    private String nickName;

    @Column(name = "social_id")
    private String socialId;

    private String platform;

    private String imageUrl;

    private LocalDateTime joinAt;

    private LocalDateTime LastLoginAt;
}
