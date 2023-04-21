package com.grouproom.xyz.global.service;

import com.grouproom.xyz.global.config.AuthConfig;
import com.grouproom.xyz.global.config.Credentials;
import com.grouproom.xyz.global.exception.ErrorResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.ObjectCannedACL;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * packageName    : com.grouproom.xyz.global.service
 * fileName       : S3UploadService
 * author         : SSAFY
 * date           : 2023-04-21
 * description    : S3에 파일 업로드하는 부분
 * <p>
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * <p>
 * 2023-04-21        SSAFY       최초 생성
 */
@Service
@RequiredArgsConstructor
public class S3UploadService {

    private final AuthConfig authConfig;
    private String bucket = "ssafy-xyz";
    private String s3domain= "https://dsmdwofhojppt.cloudfront.net/";
    private S3Client s3Client;

    //S3Access 권한 가진 IAM 유저의 public key, private key로 s3client 객체 생성
    @PostConstruct
    private void init(){
        Credentials awsCredentials = authConfig.getCredentials().get("aws");

        this.s3Client = S3Client
                .builder()
                .region(Region.AP_NORTHEAST_2)															//S3지역
                .credentialsProvider(StaticCredentialsProvider.create(
                        AwsBasicCredentials.create(awsCredentials.getId(), awsCredentials.getSecret())))	//id 시크릿키 불러오기
                .build();
    }


    //파일 확장자 검사 후 추출
    private String getExtension(String originalFileName) {

        try{
            String extension = originalFileName.substring(originalFileName.lastIndexOf(".") + 1)
                    .toLowerCase();
            if(!(extension.equals("png") || extension.equals("jpg") || extension.equals("jpeg") ||
                    extension.equals("mp3") || extension.equals("mp4") || extension.equals("avi"))) {		//정해진 파일만 넣기 위함
                throw new ErrorResponse(HttpStatus.BAD_REQUEST,"정해진 파일 형식만 받을 수 있습니다.(png,jpg,jpeg,mp3,mp4,avi 추가가능)");
            }
            return extension;
        } catch(IndexOutOfBoundsException iob){
            throw new ErrorResponse(HttpStatus.BAD_REQUEST,"잘못된 파일입니다.");
        }
    }

    //파일명 난수화
    private String createNewFileName(String originalFileName) {
        String extension = getExtension(originalFileName);
        String uuid = UUID.randomUUID().toString();
        return uuid+ "." + extension;
    }

    //제대로 된 파일인지 확인
    private void isValidFile(MultipartFile file) throws ErrorResponse {
        if (file.isEmpty() || file.getSize() == 0) {
            throw new ErrorResponse(HttpStatus.BAD_REQUEST,"잘못된 파일입니다.");
        }
    }

    //PutObjectRequest 생성 (권한 설정 및 키 값.. 등등 설정)
    public PutObjectRequest getPutObjectRequest(MultipartFile multipartFile, String dirName) {
        try {
            isValidFile(multipartFile);

            //key= directory 경로 포함 파일 이름
            String key = dirName + "/" + createNewFileName(multipartFile.getOriginalFilename());

            //필요한 ObjectMetadata
            return PutObjectRequest.builder()
                    .bucket(bucket)
                    .contentType(multipartFile.getContentType())
                    .key(key)															//key값
                    .contentLength(multipartFile.getSize())
                    .acl(ObjectCannedACL.PUBLIC_READ)									//소유자는 FULL_CONTROL을 가집니다. AuthenticatedUsers 그룹은 READ 액세스 권한을 가집니다.
                    .build();
        } catch (Exception e) {

            throw new ErrorResponse(HttpStatus.FAILED_DEPENDENCY, e.toString());
        }
    }

    //S3에 실제로 파일을 저장하고 key값 불러오기(PutObjectRequest 타입이어야 저장이 가능)
    private String putS3(PutObjectRequest putObjectRequest, MultipartFile multipartFile) {
        try {
            PutObjectResponse putObjectResponse = s3Client.putObject(putObjectRequest,
                    RequestBody.fromBytes(multipartFile.getBytes()));

            if(putObjectResponse.sdkHttpResponse().statusCode()!=200){
                throw new IOException();
            }

            return s3domain+putObjectRequest.key();
        } catch (IOException e) {

            throw new RuntimeException(e);

        }
    }

    public String upload(MultipartFile multipartFile, String dirName){
        this.isValidFile(multipartFile);

        return this.putS3(this.getPutObjectRequest(multipartFile,dirName),multipartFile);
    }

    public List<String> upload(List<MultipartFile> multipartFiles, String dirName) {
        List<String> uploadUrls = new ArrayList<>();

        multipartFiles.stream().forEach((multipartFile -> uploadUrls.add(this.upload(multipartFile, dirName))));

        return uploadUrls;
    }



}