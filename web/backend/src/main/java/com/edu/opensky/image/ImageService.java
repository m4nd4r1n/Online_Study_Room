package com.edu.opensky.image;

import com.edu.opensky.management.dto.ImageAndTimeResponseDto;
import com.edu.opensky.user.User;
import lombok.RequiredArgsConstructor;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ImageService {
    private final ImageRepository imageRepository;

    public void saveImage(User user, List<MultipartFile> files) throws IOException {

        // 파일 저장 경로
        String absolutePath = new File("").getAbsolutePath()+"\\";
        absolutePath += "/web/backend/src/main/java/com/edu/opensky/image/Images/";
        File dir = new File(absolutePath);
        if(!dir.exists()){
            dir.mkdirs();
        }

        for (MultipartFile file : files){
            String now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmm"))+"00";

            // 파일 이름 유저인덱스-이름-시간(yyyyMMddHHmmss).확장자
            File dest = new File(absolutePath
                    +user.getId()
                    + "-"
                    +user.getName()
                    + "-"
                    +now
                    +file.getContentType().replace("image/","."));
            imageRepository.save(Image.builder().dest(dest.getAbsolutePath()).mteId(user.getEmail()).studyDateTime(now).build());
            file.transferTo(dest);
        }
    }

    public List<ImageAndTimeResponseDto> getImageAndTime(String userId) throws IOException {

        List<ImageAndTimeResponseDto> responseDtos = new ArrayList<>();
        List<Image> images = imageRepository.findByMteId(userId);

        for(Image image : images){
            File file = new File(image.getDest());
            FileItem fileItem = new DiskFileItem("originFile", Files.probeContentType(file.toPath()), false, file.getName(), (int) file.length(), file.getParentFile());
            InputStream input = new FileInputStream(file);
            OutputStream os = fileItem.getOutputStream();
            IOUtils.copy(input,os);
            responseDtos.add(ImageAndTimeResponseDto.builder().images(new CommonsMultipartFile(fileItem)).noAcceptTime(image.getStudyDateTime()).build());

        }

        return responseDtos;

    }
}
