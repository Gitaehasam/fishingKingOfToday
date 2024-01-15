package com.ssafy.sub.pjt.domain;

import java.time.LocalDateTime;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseTime {

    @CreatedDate protected LocalDateTime joinAt;

    @LastModifiedDate protected LocalDateTime lastLoginAt;

    public void setCreatedAt(LocalDateTime joinAt) {
        this.joinAt = joinAt;
    }
}
