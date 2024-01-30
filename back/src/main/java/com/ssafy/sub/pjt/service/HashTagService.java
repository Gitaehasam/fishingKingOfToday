package com.ssafy.sub.pjt.service;

import com.ssafy.sub.pjt.domain.BoardHashTag;
import com.ssafy.sub.pjt.domain.HashTag;
import com.ssafy.sub.pjt.domain.repository.BoardHashTagRepository;
import com.ssafy.sub.pjt.domain.repository.HashTagRepository;
import com.ssafy.sub.pjt.dto.HashTagResponse;
import com.ssafy.sub.pjt.dto.HashTagsRequest;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HashTagService {

    private final HashTagRepository hashTagRepository;
    private final BoardHashTagRepository boardHashTagRepository;

    public List<HashTag> findOrCreateHashTags(HashTagsRequest hashTagsRequest) {
        List<String> hashTagNames = hashTagsRequest.getHashTagNames();

        return hashTagNames.stream()
                .map(this::getHashTagOrCreateHashTagIfNotExist)
                .collect(Collectors.toList());
    }

    private HashTag getHashTagOrCreateHashTagIfNotExist(String hashTagName) {
        HashTag hashTag = new HashTag(hashTagName);
        return hashTagRepository
                .findByName(hashTag.getName())
                .orElseGet(() -> hashTagRepository.save(hashTag));
    }

    public List<HashTagResponse> findTopFiveHashTags() {
        final List<BoardHashTag> hashTags =
                boardHashTagRepository.findTop5ByOrderByCountDesc();
        return hashTags.stream()
                .map(hashTag -> HashTagResponse.of(hashTag))
                .collect(Collectors.toList());
    }
}
