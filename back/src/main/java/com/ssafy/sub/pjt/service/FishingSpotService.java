package com.ssafy.sub.pjt.service;

import com.ssafy.sub.pjt.domain.*;
import com.ssafy.sub.pjt.domain.repository.BoardQueryRepository;
import com.ssafy.sub.pjt.domain.repository.FishingSpotQueryRepository;
import com.ssafy.sub.pjt.domain.repository.FishingSpotRepository;
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
    private final FishingSpotQueryRepository fishingSpotQueryRepository;
    private final BoardQueryRepository boardQueryRepository;

    @Transactional(readOnly = true)
    public FishingSpotListResponse getSpotsByPage(
            final Pageable pageable,
            final Integer fishBookId,
            final String spotType,
            final String sido,
            final String keyword,
            // final Integer hashtagId,
            final Float latitude,
            final Float longitude) {
        final Slice<FishingSpotData> fishingSpotData =
                fishingSpotQueryRepository.searchBy(
                        FishingSpotSearchCondition.builder()
                                .sido(sido)
                                .fishBookId(fishBookId)
                                .spotType(spotType)
                                .keyword(keyword)
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
                                                        fishingSpot.getId(), PageRequest.of(0, 3)),
                                                fishingSpotRepository.findFishListByFishingSpotId(
                                                        fishingSpot.getId())))
                        .collect(Collectors.toList());
        return new FishingSpotListResponse(fishingSpotResponses, fishingSpotData.hasNext());
    }

    @Transactional(readOnly = true)
    public FishingSpotListResponse getSpotsByHashTag(
            final Pageable pageable, final String hashtag) {
        final Slice<FishingSpotData> fishingSpotData =
                fishingSpotQueryRepository.searchByHashTag(hashtag, pageable);
        final List<FishingSpotResponse> fishingSpotResponses =
                fishingSpotData.stream()
                        .map(
                                fishingSpot ->
                                        FishingSpotResponse.of(
                                                fishingSpot,
                                                fishingSpotRepository.findHashtagsBySpotId(
                                                        fishingSpot.getId(), PageRequest.of(0, 3)),
                                                fishingSpotRepository.findFishListByFishingSpotId(
                                                        fishingSpot.getId())))
                        .collect(Collectors.toList());
        return new FishingSpotListResponse(fishingSpotResponses, fishingSpotData.hasNext());
    }

    @Transactional(readOnly = true)
    public List<BoardResponse> getBoardsByFishingSpotIdPage(
            final Pageable pageable,
            final Integer fishingSpotId,
            final Integer categoryId,
            String socialId) {
        final Slice<BoardData> boardData =
                boardQueryRepository.searchBy(
                        BoardSearchCondition.builder()
                                .fishingSpotId(fishingSpotId)
                                .categoryId(categoryId)
                                .sortType("")
                                .build(),
                        pageable,
                        socialId);

        return boardData.stream()
                .map(board -> BoardResponse.of(board, board.getCommentCnt(), board.getLikeCnt()))
                .collect(Collectors.toList());
    }

    public FishingSpotDetailResponse searchById(
            final Integer fishingSpotId, final Integer categoryId, String socialId) {
        final FishingSpot fishingSpot = fishingSpotRepository.findFishingSpotById(fishingSpotId);
        if (fishingSpot != null)
            return FishingSpotDetailResponse.of(
                    fishingSpot,
                    fishingSpotRepository.findHashtagsBySpotId(
                            fishingSpot.getId(), PageRequest.of(0, 3)),
                    fishingSpotRepository.findFishListByFishingSpotId(fishingSpotId),
                    getBoardsByFishingSpotIdPage(
                            PageRequest.of(0, 3), fishingSpotId, categoryId, socialId));
        return null;
    }

    public List<FishingSpotAutoCompleteResponse> findAutoCompleteName(String searchWord) {
        List<FishingSpot> fishingSpots =
                fishingSpotRepository.findTop3ByNameStartsWithOrderByNameAsc(searchWord);

        final List<FishingSpotAutoCompleteResponse> fishingSpotAutoCompleteResponses =
                fishingSpots.stream()
                        .map(fishingSpot -> FishingSpotAutoCompleteResponse.of(fishingSpot))
                        .collect(Collectors.toList());
        return fishingSpotAutoCompleteResponses;
    }
}
