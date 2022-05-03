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
    private String name;

    @Builder
    public ParentSaveRequestDto(String email,String name, String stdName, String stdPhone){
        this.email = email;
        this.name = name;
        this.stdName = stdName;
        this.stdPhone = stdPhone;
    }

    public Parent toEntity(){
        return Parent.builder()
                .prtId(email)
                .stdName(stdName)
                .name(name)
                .stdPhone(stdPhone)
                .build();
    }
}
