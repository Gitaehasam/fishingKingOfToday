package com.ssafy.sub.pjt.service;

import static com.ssafy.sub.pjt.common.CustomExceptionStatus.NOT_FOUND_FISH;

import com.ssafy.sub.pjt.domain.FishBook;
import com.ssafy.sub.pjt.domain.repository.FishBookRepository;
import com.ssafy.sub.pjt.dto.FishBookAutoCompleteResponse;
import com.ssafy.sub.pjt.dto.FishBookDetailResponse;
import com.ssafy.sub.pjt.dto.FishBookListResponse;
import com.ssafy.sub.pjt.dto.FishBookResponse;
import com.ssafy.sub.pjt.exception.BadRequestException;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FishBookService {

    private final FishBookRepository fishBookRepository;

    @Transactional(readOnly = true)
    public FishBookListResponse getFishBooksByPage(final Pageable pageable) {
        final Slice<FishBook> fishBooks =
                fishBookRepository.findSliceBy(pageable.previousOrFirst());
        final List<FishBookResponse> fishBookResponse =
                fishBooks.stream()
                        .map(fishBook -> FishBookResponse.of(fishBook))
                        .collect(Collectors.toList());
        return new FishBookListResponse(fishBookResponse, fishBooks.hasNext());
    }

    public FishBookDetailResponse searchById(Integer fishBookId) {
        final FishBook fishBook = findByFishBookById(fishBookId);
        return FishBookDetailResponse.of(fishBook);
    }

    private FishBook findByFishBookById(Integer id) {
        return fishBookRepository
                .findById(id)
                .orElseThrow(() -> new BadRequestException(NOT_FOUND_FISH));
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
