package com.ssafy.sub.pjt.domain;

import io.hypersistence.utils.hibernate.type.json.JsonType;
import java.util.List;
import javax.persistence.*;
import lombok.*;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

@Entity
@Builder
@Getter
@AllArgsConstructor
@TypeDef(name = "json", typeClass = JsonType.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Tutorials {

    @Id
    @Column(name = "tutorial_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    @Type(type = "json")
    @Column(columnDefinition = "json")
    private List<TutorialInfo> tutorialInfo;
}
