package com.ssafy.sub.pjt.service;

import com.ssafy.sub.pjt.domain.FishBook;
import com.ssafy.sub.pjt.domain.repository.FishBookRepository;
import com.ssafy.sub.pjt.dto.FishBookListResponse;
import com.ssafy.sub.pjt.dto.FishBookResponse;
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
}
