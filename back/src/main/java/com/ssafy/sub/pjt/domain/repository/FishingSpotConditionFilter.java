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
        // filterByHashTag(booleanBuilder, condition.getHashtagId());
        searchByKeyword(booleanBuilder, condition.getKeyword());

        if (condition.getLongitude() == null || condition.getLatitude() == null) {
            filterBySido(booleanBuilder, condition.getSido());
        }
        return booleanBuilder;
    }

    private void filterByFishBook(BooleanBuilder booleanBuilder, Integer fishBookId) {
        if (fishBookId != null) {
            booleanBuilder.and(fishingSpot.fishingSpotFishBooks.any().fishBook.id.eq(fishBookId));
        }
    }

    //    private void filterByHashTag(BooleanBuilder booleanBuilder, Integer hashTagId) {
    //        if (hashTagId != null) {
    //
    // booleanBuilder.and(fishingSpot.fishingSpotHashtags.any().hashTag.id.eq(hashTagId));
    //        }
    //    }

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
