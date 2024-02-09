package com.ssafy.sub.pjt.controller;

import static com.ssafy.sub.pjt.util.AuthenticationUtil.getCurrentUserSocialId;
import static org.springframework.http.HttpStatus.CREATED;

import com.ssafy.sub.pjt.dto.IssuePreSignedUrlRequest;
import com.ssafy.sub.pjt.service.IssuePreSignedUrlService;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/images")
public class ImageController {

    private final IssuePreSignedUrlService getPreSignedUrlService;

    @PostMapping("/presigned")
    public ResponseEntity<?> createPreSigned(
            @RequestBody @Valid IssuePreSignedUrlRequest issuePreSignedUrlRequest) {
        return ResponseEntity.status(CREATED)
                .body(
                        getPreSignedUrlService.execute(
                                getCurrentUserSocialId(), issuePreSignedUrlRequest));
    }
}
