package com.ssafy.sub.pjt.service;

import static com.ssafy.sub.pjt.common.CustomExceptionStatus.NOT_FOUND_FISH;
import static com.ssafy.sub.pjt.dto.FishType.FRESH_WATER;
import static com.ssafy.sub.pjt.dto.FishType.SEA;

import com.ssafy.sub.pjt.domain.FishBook;
import com.ssafy.sub.pjt.domain.repository.FishBookRepository;
import com.ssafy.sub.pjt.dto.*;
import com.ssafy.sub.pjt.exception.BadRequestException;
import com.ssafy.sub.pjt.util.RedisUtil;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FishBookService {
    private final RedisUtil redisUtil;
    private final FishBookRepository fishBookRepository;

    @Transactional(readOnly = true)
    public List<FishBookResponse> getFish() {

        if (redisUtil.getObject("fishBook") != null) {
            return (List<FishBookResponse>) redisUtil.getObject("fishBook");
        }

        final List<FishBook> fishBooks = fishBookRepository.findAll();
        final List<FishBookResponse> fishBookResponse =
                fishBooks.stream()
                        .map(fishBook -> FishBookResponse.of(fishBook))
                        .collect(Collectors.toList());
        redisUtil.setObject("fishBook", fishBookResponse);

        return fishBookResponse;
    }

    public FishBookDetailResponse searchById(Integer fishBookId) {

        if (redisUtil.getObject("fish_book_" + fishBookId.toString()) != null) {
            return (FishBookDetailResponse)
                    redisUtil.getObject("fish_book_" + fishBookId.toString());
        }

        final FishBook fishBook = findByFishBookById(fishBookId);
        redisUtil.setObject(
                "fish_book_" + fishBookId.toString(), FishBookDetailResponse.of(fishBook));

        return FishBookDetailResponse.of(fishBook);
    }

    private FishBook findByFishBookById(Integer id) {
        return fishBookRepository
                .findById(id)
                .orElseThrow(() -> new BadRequestException(NOT_FOUND_FISH));
    }

    public FishBookFilterListResponse getFIshBooksByFishType() {
        List<FishBook> seaFishResponse = fishBookRepository.findByFishType(SEA);
        List<FishBook> freshWaterFishResponse = fishBookRepository.findByFishType(FRESH_WATER);

        final List<FishBookFilterResponse> seaFishListResponse =
                seaFishResponse.stream()
                        .map(seaFishes -> FishBookFilterResponse.of(seaFishes))
                        .collect(Collectors.toList());

        final List<FishBookFilterResponse> freshWaterFishListResponse =
                seaFishResponse.stream()
                        .map(freshFishes -> FishBookFilterResponse.of(freshFishes))
                        .collect(Collectors.toList());

        return new FishBookFilterListResponse(seaFishListResponse, freshWaterFishListResponse);
    }

    public List<FishBookAutoCompleteResponse> findAutoCompleteName(String searchWord) {
        List<FishBook> fishBooks =
                fishBookRepository.findTop3ByNameStartsWithOrderByNameAsc(searchWord);

        final List<FishBookAutoCompleteResponse> fishBookAutoCompleteResponse =
                fishBooks.stream()
                        .map(fishBook -> FishBookAutoCompleteResponse.of(fishBook))
                        .collect(Collectors.toList());
        return fishBookAutoCompleteResponse;
    }
}
