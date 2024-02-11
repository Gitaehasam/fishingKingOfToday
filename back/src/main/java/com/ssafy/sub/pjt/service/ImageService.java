package com.ssafy.sub.pjt.service;

import static com.ssafy.sub.pjt.common.CustomExceptionStatus.EMPTY_IMAGE_LIST;
import static com.ssafy.sub.pjt.common.CustomExceptionStatus.EXCEED_IMAGE_LIST_SIZE;

import com.ssafy.sub.pjt.domain.ImageFile;
import com.ssafy.sub.pjt.domain.S3ImageEvent;
import com.ssafy.sub.pjt.dto.Image.ImagesResponse;
import com.ssafy.sub.pjt.exception.ImageException;
import com.ssafy.sub.pjt.infrastructure.image.ImageUploader;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ImageService {
    private static final int MAX_IMAGE_LIST_SIZE = 5;
    private static final int EMPTY_LIST_SIZE = 0;

    private final ImageUploader imageUploader;
    private final ApplicationEventPublisher publisher;

    public ImagesResponse save(
            final List<MultipartFile> images, final String type, final String socialId) {
        validateSizeOfImages(images);
        final List<ImageFile> imageFiles =
                images.stream().map(ImageFile::new).collect(Collectors.toList());
        final List<String> imageNames = uploadImages(imageFiles, type, socialId);
        return new ImagesResponse(imageNames);
    }

    private List<String> uploadImages(
            final List<ImageFile> imageFiles, final String type, final String socialId) {
        try {
            return imageUploader.uploadImages(imageFiles, type, socialId);
        } catch (final ImageException e) {
            imageFiles.forEach(
                    imageFile ->
                            publisher.publishEvent(new S3ImageEvent(imageFile.getHashedName())));
            throw e;
        }
    }

    private void validateSizeOfImages(final List<MultipartFile> images) {
        if (images.size() > MAX_IMAGE_LIST_SIZE) {
            throw new ImageException(EXCEED_IMAGE_LIST_SIZE);
        }
        if (images.size() == EMPTY_LIST_SIZE) {
            throw new ImageException(EMPTY_IMAGE_LIST);
        }
    }
}
