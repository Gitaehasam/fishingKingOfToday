package com.ssafy.sub.pjt.service;

import com.ssafy.sub.pjt.domain.*;
import com.ssafy.sub.pjt.domain.repository.FishingSpotQueryRepository;
import com.ssafy.sub.pjt.domain.repository.FishingSpotRepository;
import com.ssafy.sub.pjt.domain.repository.UserRepository;
import com.ssafy.sub.pjt.dto.*;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FishingSpotService {
    private final FishingSpotRepository fishingSpotRepository;
    private final HashTagService hashTagService;
    private final UserRepository userRepository;
    private final FishingSpotQueryRepository fishingSpotQueryRepository;

    @Transactional(readOnly = true)
    public FishingSpotListResponse getSpotsByPage(
            final Pageable pageable,
            // final String sortType,
            // final Integer fishBookId,
            final String spotType,
            final String sido,
            final String keyword,
            final Integer hashtagId,
            final Float latitude,
            final Float longitude) {
        final Slice<FishingSpotData> fishingSpotData =
                fishingSpotQueryRepository.searchBy(
                        FishingSpotSearchCondition.builder()
                                // .fishBookId(fishBookId)
                                // .sortType(sortType)
                                .sido(sido)
                                .spotType(spotType)
                                .keyword(keyword)
                                .hashtagId(hashtagId)
                                .latitude(latitude)
                                .longitude(longitude)
                                .build(),
                        pageable);
        final List<FishingSpotResponse> fishingSpotResponses =
                fishingSpotData.stream()
                        .map(
                                fishingSpot ->
                                        FishingSpotResponse.of(
                                                fishingSpot,
                                                fishingSpotRepository.findHashtagsBySpotId(
                                                        fishingSpot.getId(), PageRequest.of(0, 3))))
                        .collect(Collectors.toList());
        return new FishingSpotListResponse(fishingSpotResponses, fishingSpotData.hasNext());
    }
}
