package com.ssafy.sub.pjt.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.HttpMethod;
import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.Headers;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.ssafy.sub.pjt.dto.Image.ImageFileExtension;
import com.ssafy.sub.pjt.dto.Image.ImageUploadType;
import com.ssafy.sub.pjt.dto.Image.ImageUrlDto;
import java.net.URL;
import java.util.Date;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class S3UploadPreSignedUrlService {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public ImageUrlDto execute(ImageFileExtension fileExtension, ImageUploadType type) {
        String valueFileExtension = fileExtension.getUploadExtension();
        String valueType = type.getType();
        String fileName = createFileName(valueFileExtension, valueType);
        log.info(fileName);

        GeneratePresignedUrlRequest generatePresignedUrlRequest =
                getGeneratePreSignedUrlRequest(bucket, fileName, valueFileExtension);
        URL url = amazonS3Client.generatePresignedUrl(generatePresignedUrlRequest);

        return ImageUrlDto.of(url.toString(), fileName);
    }

    private String createFileName(String fileExtension, String valueType) {
        return valueType + "/original/" + UUID.randomUUID() + "." + fileExtension;
    }

    // 업로드용 Pre-Signed URL을 생성하기 때문에, PUT을 지정
    private GeneratePresignedUrlRequest getGeneratePreSignedUrlRequest(
            String bucket, String fileName, String fileExtension) {
        GeneratePresignedUrlRequest generatePresignedUrlRequest =
                new GeneratePresignedUrlRequest(bucket, fileName)
                        .withMethod(HttpMethod.PUT)
                        .withKey(fileName)
                        .withContentType("image/" + fileExtension)
                        .withExpiration(getPreSignedUrlExpiration());
        generatePresignedUrlRequest.addRequestParameter(
                Headers.S3_CANNED_ACL, CannedAccessControlList.PublicRead.toString());
        return generatePresignedUrlRequest;
    }

    private Date getPreSignedUrlExpiration() {
        Date expiration = new Date();
        long expTimeMillis = expiration.getTime();
        // 유효 기간 설정 (1분)
        expTimeMillis += 60 * 1000;
        expiration.setTime(expTimeMillis);
        return expiration;
    }

    public void deleteImage(String key) {
        DeleteObjectRequest deleteObjectRequest = new DeleteObjectRequest(bucket, key);
        try {
            amazonS3Client.deleteObject(deleteObjectRequest);
        } catch (AmazonServiceException e) {
            throw e;
        } catch (SdkClientException e) {
            throw e;
        }
    }
}
