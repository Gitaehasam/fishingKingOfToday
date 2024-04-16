package com.ssafy.sub.pjt.domain;

import com.ssafy.sub.pjt.dto.FishType;
import io.hypersistence.utils.hibernate.type.json.JsonType;
import java.time.LocalDate;
import javax.persistence.*;
import lombok.*;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

@Entity
@Builder
@Getter
@Cacheable
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_ONLY, region = "fishBook")
@AllArgsConstructor
@TypeDef(name = "json", typeClass = JsonType.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FishBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fish_book_id")
    private Integer id;

    private String name;

    private String scientificName;

    private LocalDate tabooStartAt;

    private LocalDate tabooEndAt;

    private Integer minimumSize;

    @Enumerated(EnumType.STRING)
    private FishType fishType;

    private String size;

    private String habitat;

    private String bait;

    @Type(type = "json")
    @Column(columnDefinition = "json")
    private String interview;

    private String imageUrl;

    private String detailImageUrl;
}
