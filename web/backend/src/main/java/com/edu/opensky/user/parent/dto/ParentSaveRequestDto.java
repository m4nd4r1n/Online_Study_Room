package com.edu.opensky.user.parent.dto;

import com.edu.opensky.user.parent.Parent;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ParentSaveRequestDto {
    private String email;
    private String stdName;
    private String stdPhone;

    @Builder
    public ParentSaveRequestDto(String email, String stdName, String stdPhone){
        this.email = email;
        this.stdName = stdName;
        this.stdPhone = stdPhone;
    }

    public Parent toEntity(){
        return Parent.builder()
                .prtId(email)
                .stdName(stdName)
                .stdPhone(stdPhone)
                .build();
    }
}
