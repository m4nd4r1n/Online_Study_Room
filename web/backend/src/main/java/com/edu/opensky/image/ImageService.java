package com.edu.opensky.image;

import com.edu.opensky.management.dto.ImageAndTimeResponseDto;
import com.edu.opensky.user.User;
import com.edu.opensky.user.UserRepository;
import com.edu.opensky.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.time.format.DateTimeParseException;
import java.time.temporal.ChronoField;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class ImageService {
    private final ImageRepository imageRepository;
    private final UserService userService;
    private final UserRepository userRepository;

    public void saveImage(User user, List<MultipartFile> files) throws IOException {

        // 파일 저장 경로
        String absolutePath = new File("").getAbsolutePath()+"\\";
        absolutePath += "/web/backend/src/main/java/com/edu/opensky/image/Images/";

        String os = System.getProperty("os.name").toLowerCase();

        File dir = null;
        if(os.contains("win")){
            dir = new File(absolutePath);

        }
        else if(os.contains("linux")) {
            dir = new File("/home/ec2-user/app/step1/Online_Study_Room/web/backend/src/main/java/com/edu/opensky/image/Images");

        }

        if(!dir.exists()){
            dir.mkdirs();
        }

        for (MultipartFile file : files){
            LocalDateTime nowDateTime = LocalDateTime.now();
            String now = nowDateTime.format(DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS"));

            // 파일 이름 유저인덱스-이름-시간(yyyyMMddHHmmssSSS).확장자
            String name = +user.getId()
                    + "-"
                    +user.getName()
                    + "-"
                    +now
                    +file.getContentType().replace("image/",".");
            File dest = new File(absolutePath +name);
            imageRepository.save(Image.builder().name(name).dest(dest.getAbsolutePath()).mteId(user.getEmail()).studyDateTime(nowDateTime).build());
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

    public String getImageDest(String time){
        LocalDateTime dateTime = LocalDateTime.now();
        try {
            DateTimeFormatter formatter = new DateTimeFormatterBuilder()
                    .appendPattern("yyyyMMddHHmmss")
                    .appendValue(ChronoField.MILLI_OF_SECOND, 3)
                    .toFormatter();

            dateTime = LocalDateTime.parse(time, formatter);
        } catch (DateTimeParseException e) {
            e.getStackTrace();
        }
        Optional<Image> image = imageRepository.findByStudyDateTime(dateTime);
        if(image.isPresent()){

            return image.get().getDest();
        }
        return null;
    }
}
