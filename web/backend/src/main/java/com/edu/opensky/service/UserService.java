package com.edu.opensky.service;

import com.edu.opensky.controller.dto.*;
import com.edu.opensky.domain.User;
import com.edu.opensky.domain.repository.MenteeRepository;
import com.edu.opensky.domain.repository.MentorRepository;
import com.edu.opensky.domain.repository.ParentRepository;
import com.edu.opensky.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final MentorRepository mentorRepository;
    private final MenteeRepository menteeRepository;
    private final ParentRepository parentRepository;


    /* 인증 토큰 발급 */
    @Transactional
    public String getToken(){

        String url = "https://api.iamport.kr/users/getToken";
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("imp_key", "4976088444891919");
        params.add("imp_secret", "585010edcd859d2f8de56189c151242f715461f77919aee2b249bca9991e0ebdfac15b6595658377");

        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> response = rt.postForEntity(url, params, String.class);

        JSONObject jsonObject = new JSONObject(response.getBody());
        JSONObject jsonToken = jsonObject.getJSONObject("response");
        return jsonToken.getString("access_token");
    }

    /* 토큰으로 정보 조회 */
    public String getCertification(String imp_UID){
        String url = "https://api.iamport.kr/certifications/" + imp_UID;
        return "token";

    }

    /* 로그인 */
    @Transactional
    public String login(UserResponseDto responseDto) {
        return userRepository.findByEmailAndPassword(responseDto.getEmail(), responseDto.getPassword()).orElseThrow(() ->
                new IllegalArgumentException("아이디와 비밀번호를 확인해주세요.")).getImpUID();
    }

    /* 회원가입 */
    @Transactional
    public String register(UserSaveRequestDto requestDto) {
        System.out.println("requestDto.getType() = " + requestDto.getType());
        checkDuplicateUser(requestDto);
        switch (requestDto.getType()) {
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
        return userRepository.save(requestDto.toEntity()).getEmail();
    }

    // 중복확인
    private void checkDuplicateUser(UserSaveRequestDto requestDto) {
        userRepository.findByEmail(requestDto.getEmail())
                .ifPresent(m -> {
                    throw new IllegalStateException("이미 존재하는 아이디입니다.");
                });
    }

    /* 비밀번호 변경 수정중 */
    @Transactional
    public String update(String username, UserUpdateRequestDto requestDto) {
        User user = userRepository.findByEmail(username).orElseThrow(() -> new
                IllegalArgumentException("해당 아이디가 없습니다. id=" + username));
        user.update(requestDto.getUsername(), requestDto.getPassword());

        return username;
    }


}