package com.edu.opensky.management.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Getter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class ImageAndTimeResponseDto {
    String noAcceptTime;
    MultipartFile images;
}
