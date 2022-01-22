package com.edu.opensky.service;

import com.edu.opensky.controller.dto.*;
import com.edu.opensky.domain.User;
import com.edu.opensky.domain.repository.MenteeRepository;
import com.edu.opensky.domain.repository.MentorRepository;
import com.edu.opensky.domain.repository.ParentRepository;
import com.edu.opensky.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final MentorRepository mentorRepository;
    private final MenteeRepository menteeRepository;
    private final ParentRepository parentRepository;

    /* 로그인 */
    @Transactional
    public String login(UserResponseDto responseDto) {
        return userRepository.findByEmailAndPassword(responseDto.getEmail(), responseDto.getPassword()).orElseThrow(() ->
                new IllegalArgumentException("아이디와 비밀번호를 확인해주세요.")).getEmail();
    }

    /* 회원가입 */
    @Transactional
    public String register(UserSaveRequestDto requestDto) {
        checkDuplicateUser(requestDto);
        switch (requestDto.getRole()) {
            case "mentee":
                MenteeSaveRequestDto menteeSaveRequestDto = new MenteeSaveRequestDto(requestDto.getEmail());
                menteeRepository.save(menteeSaveRequestDto.toEntity());
                break;
            case "mentor":
                MentorSaveRequestDto mentorSaveRequestDto = new MentorSaveRequestDto(requestDto.getEmail());
                mentorRepository.save(mentorSaveRequestDto.toEntity());
                break;
            case "parent":
                ParentSaveRequestDto parentSaveRequestDto = new ParentSaveRequestDto(requestDto.getEmail());
                parentRepository.save(parentSaveRequestDto.toEntity());

        }
        return userRepository.save(requestDto.toEntity()).getRegnum();
    }

    // 중복확인
    private void checkDuplicateUser(UserSaveRequestDto requestDto) {
        userRepository.findByRegnum(requestDto.getRegnum())
                .ifPresent(m -> {
                    throw new IllegalStateException("이미 존재하는 아이디입니다.");
                });
    }

    /* 비밀번호 변경 수정중 */
    @Transactional
    public String update(String username, UserUpdateRequestDto requestDto) {
        User user = userRepository.findByRegnum(username).orElseThrow(() -> new
                IllegalArgumentException("해당 아이디가 없습니다. id=" + username));
        user.update(requestDto.getUsername(), requestDto.getPassword());

        return username;
    }

}