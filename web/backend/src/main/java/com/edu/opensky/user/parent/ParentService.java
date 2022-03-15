package com.edu.opensky.user.parent;

import com.edu.opensky.user.parent.dto.ParentSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class ParentService {
    private final ParentRepository parentRepository;

    /* 회원가입 */
    @Transactional
    public String save(ParentSaveRequestDto requestDto) {
        System.out.println("requestDto.toEntity() = " + requestDto.toEntity());
        return parentRepository.save(requestDto.toEntity()).getPrtId();
    }

}
