package com.edu.opensky.management.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class ImageAndTimeResponseDto {
    LocalDateTime noAcceptTime;
    String imageDest;
}
