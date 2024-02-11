package com.ssafy.sub.pjt.infrastructure.image;

import static com.ssafy.sub.pjt.common.CustomExceptionStatus.INVALID_IMAGE;
import static com.ssafy.sub.pjt.common.CustomExceptionStatus.INVALID_IMAGE_PATH;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ssafy.sub.pjt.domain.ImageFile;
import com.ssafy.sub.pjt.exception.ImageException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ImageUploader {
    private static final String CACHE_CONTROL_VALUE = "max-age=3153600";

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.s3.folder}")
    private String folder;

    @Value("${image.prefix}")
    private String prefix;

    public List<String> uploadImages(
            final List<ImageFile> imageFiles, final String type, final String socialId) {
        return imageFiles.stream()
                .map(imageFile -> uploadImage(imageFile, type, socialId))
                .collect(Collectors.toList());
    }

    private String uploadImage(
            final ImageFile imageFile, final String type, final String socialId) {
        final String path = folder + "/" + type + "/" + socialId + "/" + imageFile.getHashedName();
        final ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(imageFile.getContentType());
        metadata.setContentLength(imageFile.getSize());
        metadata.setCacheControl(CACHE_CONTROL_VALUE);

        try (final InputStream inputStream = imageFile.getInputStream()) {
            amazonS3Client.putObject(bucket, path, inputStream, metadata);
        } catch (final AmazonServiceException e) {
            throw new ImageException(INVALID_IMAGE_PATH);
        } catch (final IOException e) {
            throw new ImageException(INVALID_IMAGE);
        }
        return prefix + path;
    }
}
