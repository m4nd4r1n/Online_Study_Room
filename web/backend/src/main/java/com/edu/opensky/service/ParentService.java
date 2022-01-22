package com.edu.opensky.service;

import com.edu.opensky.controller.dto.ParentSaveRequestDto;
import com.edu.opensky.domain.repository.ParentRepository;
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
        return parentRepository.save(requestDto.toEntity()).getPrtId();
    }

}
