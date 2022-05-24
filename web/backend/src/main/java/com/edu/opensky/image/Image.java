package com.edu.opensky.image;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@NoArgsConstructor
@Entity
public class Image {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    // 파일 저장 경로
    private String dest;

    // 파일 이름
    private String name;

    // 학습 미인정된 시간
    private String studyDateTime;

    // 멘티 아이디
    private String mteId;


    @Builder
    public Image(String studyDateTime, String dest, String name ,String mteId){
        this.studyDateTime = studyDateTime;
        this.dest = dest;
        this.name = name;
        this.mteId = mteId;
    }

}

