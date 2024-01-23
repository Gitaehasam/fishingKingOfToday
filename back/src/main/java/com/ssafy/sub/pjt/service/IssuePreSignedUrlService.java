package com.ssafy.sub.pjt.service;

import com.ssafy.sub.pjt.domain.repository.UserRepository;
import com.ssafy.sub.pjt.dto.IssuePreSignedUrlRequest;
import com.ssafy.sub.pjt.dto.IssuePreSignedUrlResponse;
import com.ssafy.sub.pjt.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class IssuePreSignedUrlService {

    private final UserRepository userRepository;
    private final S3UploadPreSignedUrlService S3UploadPreSignedUrlService;

    public IssuePreSignedUrlResponse execute(
            String socialId, IssuePreSignedUrlRequest issuePresignedUrlRequest) {

        boolean isExist = userRepository.existsBySocialId(socialId);

        if (!isExist) {
            throw UserNotFoundException.EXCEPTION;
        }

        return IssuePreSignedUrlResponse.from(
                S3UploadPreSignedUrlService.execute(
                        issuePresignedUrlRequest.getImageFileExtension(),
                        issuePresignedUrlRequest.getType()));
    }
}
