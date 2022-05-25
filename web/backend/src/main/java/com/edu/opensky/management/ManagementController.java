package com.edu.opensky.management;


import com.edu.opensky.image.ImageService;
import com.edu.opensky.management.dto.ImageAndTimeResponseDto;
import com.edu.opensky.studytime.StudyTimeService;
import com.edu.opensky.user.mentor.MentorService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ManagementController {
    private final MentorService mentorService;
    private final StudyTimeService studyTimeService;
    private final ImageService imageService;

    @GetMapping("/management/info")
    public ResponseEntity getStudentInfo(@RequestParam("userId") String userId) {
        if (userId.isEmpty() || userId.equals(null)) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(mentorService.getMenteeInfo(userId));
    }

    @GetMapping("/management/studyTime")
    public ResponseEntity getStudyTime(@RequestParam("userId") String userId) {
        if (userId.isEmpty() || userId.equals(null)) {
            return ResponseEntity.badRequest().build();
        }
        List<ImageAndTimeResponseDto> responseDtos = null;
        try {
            responseDtos = imageService.getImageAndTime(userId);
        } catch (IOException e) {
            return ResponseEntity.notFound().build();

        }

        return ResponseEntity.ok(responseDtos);

    }

    // 학습 시간 인정 요청
    @PatchMapping("/management/studyTime")
    public ResponseEntity acceptStudyTime(@RequestParam String userId,
                                          @RequestParam String time) {
        if (userId.isEmpty() || userId.equals(null)) {
            return ResponseEntity.badRequest().build();
        }
        if (time.isEmpty() || time.equals(null)) {
            return ResponseEntity.badRequest().build();
        }


        if (!studyTimeService.acceptStudying(userId, time)) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/management/studyTime/image")
    public ResponseEntity<?> getImage(@RequestParam String time) throws MalformedURLException {
        // 이미지 저장 시간을 받음
        String fileDir = imageService.getImageDest(time); // 파일 경로
        if (fileDir.isEmpty() || fileDir.equals(null)) {
            return ResponseEntity.notFound().build();
        }

        Resource resource = new FileSystemResource(fileDir);

        if (!resource.exists())
            return ResponseEntity.notFound().build();

        UrlResource urlResource = new UrlResource("file:" +fileDir);
        // 파일 경로반환
        return new ResponseEntity<UrlResource>(urlResource, HttpStatus.OK);

    }
}