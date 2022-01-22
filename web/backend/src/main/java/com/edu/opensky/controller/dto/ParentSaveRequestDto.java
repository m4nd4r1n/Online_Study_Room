package com.edu.opensky.controller.dto;

import com.edu.opensky.domain.Mentor;
import com.edu.opensky.domain.Parent;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ParentSaveRequestDto {
    private String prtId;
    private String mteId;

    @Builder
    public ParentSaveRequestDto(String prtId, String mteId){
        this.prtId = prtId;
        this.mteId = mteId;
    }

    public ParentSaveRequestDto(String prtId) {
        this.prtId = prtId;
    }

    public Parent toEntity(){
        return Parent.builder()
                .prtId(prtId)
                .mteId(mteId)
                .build();
    }
}
