package com.ssafy.sub.pjt.domain;

import static com.ssafy.sub.pjt.common.CustomExceptionStatus.HASHTAG_FORMAT_EXCEPTION;

import com.ssafy.sub.pjt.exception.BadRequestException;
import java.util.Objects;
import javax.persistence.*;
import lombok.*;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class HashTag {

    private static final int MAX_HASHTAG_LENGTH = 20;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hashtag_id")
    private Integer id;

    private String name;

    public HashTag(String name) {
        if (isNotValidHashTag(name)) {
            throw new BadRequestException(HASHTAG_FORMAT_EXCEPTION);
        }
        this.name = name.toLowerCase();
    }

    private boolean isNotValidHashTag(String name) {
        return Objects.isNull(name) || name.isBlank() || name.length() > MAX_HASHTAG_LENGTH;
    }
}
