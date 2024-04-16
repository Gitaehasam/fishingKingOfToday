package com.ssafy.sub.pjt.service;

import static com.ssafy.sub.pjt.common.CustomExceptionStatus.NOT_FOUND_MEMBER_ID;

import com.ssafy.sub.pjt.domain.repository.UserRepository;
import com.ssafy.sub.pjt.dto.Image.IssuePreSignedUrlRequest;
import com.ssafy.sub.pjt.dto.Image.IssuePreSignedUrlResponse;
import com.ssafy.sub.pjt.exception.AuthException;
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
            throw new AuthException(NOT_FOUND_MEMBER_ID);
        }

        return IssuePreSignedUrlResponse.from(
                S3UploadPreSignedUrlService.execute(
                        issuePresignedUrlRequest.getImageFileExtension(),
                        issuePresignedUrlRequest.getType()));
    }
}
