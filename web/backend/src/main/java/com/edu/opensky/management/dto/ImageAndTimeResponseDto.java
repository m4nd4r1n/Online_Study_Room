package com.edu.opensky.management.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class ImageAndTimeResponseDto {
    String noAcceptTime;
    String imageDest;
}
