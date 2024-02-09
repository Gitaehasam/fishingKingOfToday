package com.ssafy.sub.pjt.domain.repository;

import static com.ssafy.sub.pjt.domain.QFishingSpot.fishingSpot;

import com.querydsl.core.BooleanBuilder;
import com.ssafy.sub.pjt.domain.FishingSpotSearchCondition;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class FishingSpotConditionFilter {
    private final HashTagRepository hashTagRepository;

    public BooleanBuilder filterByCondition(FishingSpotSearchCondition condition) {

        BooleanBuilder booleanBuilder = new BooleanBuilder();

        filterByFishBook(booleanBuilder, condition.getFishBookId());
        filterBySpotType(booleanBuilder, condition.getSpotType());
        searchByKeyword(booleanBuilder, condition.getKeyword());
        filterBySido(booleanBuilder, condition.getSido());

        return booleanBuilder;
    }

    private void filterByFishBook(BooleanBuilder booleanBuilder, Integer fishBookId) {
        if (fishBookId != null) {
            booleanBuilder.and(fishingSpot.fishingSpotFishBooks.any().fishBook.id.eq(fishBookId));
        }
    }

    private void filterBySpotType(BooleanBuilder booleanBuilder, String spotType) {
        if (!spotType.isEmpty()) {
            booleanBuilder.and(fishingSpot.spotType.eq(spotType));
        }
    }

    private void filterBySido(BooleanBuilder booleanBuilder, String sido) {
        if (!sido.isEmpty()) {
            booleanBuilder.and(fishingSpot.sido.eq(sido));
        }
    }

    private void searchByKeyword(BooleanBuilder booleanBuilder, String keyword) {
        if (!keyword.isEmpty()) {
            booleanBuilder.and(fishingSpot.name.contains(keyword));
        }
    }
}
