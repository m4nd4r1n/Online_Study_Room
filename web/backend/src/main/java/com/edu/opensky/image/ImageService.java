package com.edu.opensky.image;

import com.edu.opensky.management.dto.ImageAndTimeResponseDto;
import com.edu.opensky.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
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
            String now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));

            // 파일 이름 유저인덱스-이름-시간(yyyyMMddHHmmss).확장자
            String name = +user.getId()
                    + "-"
                    +user.getName()
                    + "-"
                    +now
                    +file.getContentType().replace("image/",".");
            File dest = new File(absolutePath +name);
            imageRepository.save(Image.builder().name(name).dest(dest.getAbsolutePath()).mteId(user.getEmail()).studyDateTime(now).build());
            file.transferTo(dest);
        }
    }

    public List<ImageAndTimeResponseDto> getImageAndTime(String userId) throws IOException {

        List<ImageAndTimeResponseDto> responseDtos = new ArrayList<>();
        List<Image> images = imageRepository.findByMteId(userId);

        for(Image image : images){
            responseDtos.add(ImageAndTimeResponseDto.builder().imageDest(image.getDest()).noAcceptTime(image.getStudyDateTime()).build());

        }

        return responseDtos;

    }
}
