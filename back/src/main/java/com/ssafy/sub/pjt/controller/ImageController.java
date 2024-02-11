package com.ssafy.sub.pjt.controller;

import static com.ssafy.sub.pjt.util.AuthenticationUtil.getCurrentUserSocialId;
import static org.springframework.http.HttpStatus.CREATED;

import com.ssafy.sub.pjt.dto.Image.ImageUploadType;
import com.ssafy.sub.pjt.dto.Image.ImagesResponse;
import com.ssafy.sub.pjt.dto.Image.IssuePreSignedUrlRequest;
import com.ssafy.sub.pjt.service.ImageService;
import com.ssafy.sub.pjt.service.IssuePreSignedUrlService;
import java.net.URI;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/images")
public class ImageController {

    private final IssuePreSignedUrlService getPreSignedUrlService;
    private final ImageService imageService;

    @PostMapping("/presigned")
    public ResponseEntity<?> createPreSigned(
            @RequestBody IssuePreSignedUrlRequest issuePreSignedUrlRequest) {
        return ResponseEntity.status(CREATED)
                .body(
                        getPreSignedUrlService.execute(
                                getCurrentUserSocialId(), issuePreSignedUrlRequest));
    }

    @PostMapping
    public ResponseEntity<ImagesResponse> uploadImage(
            @RequestPart final List<MultipartFile> images,
            @RequestParam
                    /*@EnumValue(
                    enumClass = ImageUploadType.class,
                    message = "지원하지 않는 이미지 폴더입니다.",
                    ignoreCase = true)*/
                    String type) {
        ImageUploadType.valueOf(type);
        final ImagesResponse imagesResponse =
                imageService.save(images, type, getCurrentUserSocialId());
        final String firstImageName = imagesResponse.getImageNames().get(0);
        return ResponseEntity.created(URI.create(firstImageName)).body(imagesResponse);
    }
}
