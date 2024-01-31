package com.ssafy.sub.pjt.domain.repository;

import static com.querydsl.core.group.GroupBy.groupBy;
import static com.ssafy.sub.pjt.domain.QFishingSpot.fishingSpot;
import static com.ssafy.sub.pjt.domain.QFishingSpotHashtag.fishingSpotHashtag;
import static com.ssafy.sub.pjt.domain.QHashTag.hashTag;

import com.querydsl.core.group.GroupBy;
import com.querydsl.core.types.ConstructorExpression;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.sub.pjt.domain.FishingSpotData;
import com.ssafy.sub.pjt.domain.FishingSpotSearchCondition;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class FishingSpotQueryRepository {
    private final JPAQueryFactory jpaQueryFactory;
    private final FishingSpotConditionFilter fishingSpotConditionFilter;

    public Slice<FishingSpotData> searchBy(
            final FishingSpotSearchCondition fishingSpotSearchCondition, final Pageable pageable) {
        final List<FishingSpotData> fishingSpots =
                jpaQueryFactory
                        .select(makeProjections())
                        .from(fishingSpot)
                        .where(
                                fishingSpotConditionFilter.filterByCondition(
                                        fishingSpotSearchCondition))
                        .distinct()
                        // .offset(pageable.getOffset())
                        // .limit(pageable.getPageSize() + 1)
                        .fetch();

        setHashTagName(fishingSpots);

        return new SliceImpl<FishingSpotData>(
                getCurrentPageFishingSpots(fishingSpots, pageable),
                pageable,
                hasNext(fishingSpots, pageable));
    }

    private static ConstructorExpression<FishingSpotData> makeProjections() {
        return Projections.constructor(
                FishingSpotData.class,
                fishingSpot.id,
                fishingSpot.name,
                fishingSpot.latitude,
                fishingSpot.longitude,
                fishingSpot.spotType,
                fishingSpot.charge,
                fishingSpot.spotPhone,
                fishingSpot.sido,
                fishingSpot.streetAddress,
                fishingSpot.localAddress);
    }

    private Map<Integer, List<String>> findHashTagNameMap(List<Integer> fishingSpotIds) {
        return jpaQueryFactory
                .from(fishingSpot)
                .leftJoin(fishingSpot.fishingSpotHashtags, fishingSpotHashtag)
                .leftJoin(fishingSpotHashtag.hashTag, hashTag)
                .where(fishingSpot.id.in(fishingSpotIds))
                .transform(groupBy(fishingSpot.id).as(GroupBy.list(hashTag.name)));
    }

    private void setHashTagName(List<FishingSpotData> fetch) {
        List<Integer> FishingSpotIds = toFishingSpotIds(fetch);
        Map<Integer, List<String>> keywordNameMap = findHashTagNameMap(FishingSpotIds);
        fetch.forEach(o -> o.setHashTags(keywordNameMap.get(o.getId())));
    }

    private List<Integer> toFishingSpotIds(List<FishingSpotData> result) {
        return result.stream().map(FishingSpotData::getId).collect(Collectors.toList());
    }

    private List<OrderSpecifier<?>> orderByCondition(
            String sortType, Float latitude, Float longitude) {
        List<OrderSpecifier<?>> orderBy = new LinkedList<>();

        if (sortType.equals("near")) {
            orderBy.add(
                    fishingSpot
                            .latitude
                            .subtract(latitude)
                            .abs()
                            .add(fishingSpot.longitude.subtract(longitude).abs())
                            .asc());
        } else if (sortType.equals("cost")) {
            orderBy.add(fishingSpot.charge.asc());
        } else {
            orderBy.add(fishingSpot.charge.asc());
        }

        return orderBy;
    }

    private List<FishingSpotData> getCurrentPageFishingSpots(
            final List<FishingSpotData> fishingSpots, final Pageable pageable) {
        if (hasNext(fishingSpots, pageable)) {
            return fishingSpots.subList(0, fishingSpots.size() - 1);
        }
        return fishingSpots;
    }

    private boolean hasNext(final List<FishingSpotData> challenges, final Pageable pageable) {
        return challenges.size() > pageable.getPageSize();
    }
}
