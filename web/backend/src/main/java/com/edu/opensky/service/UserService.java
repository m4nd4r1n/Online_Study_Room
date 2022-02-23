package com.edu.opensky.service;

import com.edu.opensky.controller.dto.*;
import com.edu.opensky.domain.Attendance;
import com.edu.opensky.domain.User;
import com.edu.opensky.domain.repository.*;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final MentorRepository mentorRepository;
    private final MenteeRepository menteeRepository;
    private final ParentRepository parentRepository;
    private final AttendanceRepository attendanceRepository;


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
    @Transactional
    public List<String> getCertification(String impUID){
        String url = "https://api.iamport.kr/certifications/" + impUID;
        String accessToken = getToken();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", accessToken);

        HttpEntity request = new HttpEntity(headers);

        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> response = rt.exchange(url, HttpMethod.GET, request, String.class);

        JSONObject jsonObject = new JSONObject(response.getBody());
        JSONObject jsonToken = jsonObject.getJSONObject("response");
        List<String> userInfo = new ArrayList<>();
        userInfo.add(jsonToken.getString("name"));
        userInfo.add(jsonToken.getString("phone"));
        userInfo.add(jsonToken.getString("birthday"));
        return userInfo;
    }

    /* 로그인 */
    @Transactional
    public void login(LoginRequestDto responseDto) {
        userRepository.findByEmailAndPassword(responseDto.getEmail(), responseDto.getPassword()).orElseThrow(() ->
                new IllegalArgumentException("아이디와 비밀번호를 확인해주세요."));
        attendance(responseDto.getEmail());
        dateUpdate(responseDto);
    }

    /* 마지막 접속일자 업데이트 */
    public void dateUpdate(LoginRequestDto responseDto){
        Optional<User> user = userRepository.findByEmail(responseDto.getEmail());
        user.ifPresent(selectUser ->{
            userRepository.save(User.builder()
                    .email(selectUser.getEmail())
                    .password(selectUser.getPassword())
                    .lastAccessDate(LocalDate.now())
                    .birth(selectUser.getBirth())
                    .name(selectUser.getName())
                    .phone(selectUser.getPhone())
                    .build()
            );
        });
    }
    /* 출석체크 */
    @Transactional
    public void attendance(String stdId){
        LocalDate today = LocalDate.now();

        // 오늘 출석체크 했는지 확인
        if(!attendanceRepository.findByStdIdAndDate(stdId, today).isPresent()){
            attendanceRepository.save(Attendance
                    .builder()
                    .stdId(stdId)
                    .date(today)
                    .build());
        }


    }
    /* 회원가입 */
    @Transactional
    public String register(RegisterRequestDto requestDto) {
        UserSaveRequestDto userSaveRequestDto = new UserSaveRequestDto(requestDto.getEmail(), requestDto.getPassword());
        checkDuplicateUser(userSaveRequestDto);

        switch (requestDto.getType()) {
            case "멘티":
                MenteeSaveRequestDto menteeSaveRequestDto = new MenteeSaveRequestDto(requestDto.getEmail(), requestDto.getSchool());
                menteeRepository.save(menteeSaveRequestDto.toEntity());
                break;
            case "멘토":
                MentorSaveRequestDto mentorSaveRequestDto = new MentorSaveRequestDto(requestDto.getEmail());
                mentorRepository.save(mentorSaveRequestDto.toEntity());
                break;
            case "학부모":
                ParentSaveRequestDto parentSaveRequestDto = new ParentSaveRequestDto(
                        requestDto.getEmail(), requestDto.getStdName(), requestDto.getPhoneFirst()+requestDto.getPhoneMiddle()+requestDto.getPhoneLast());
                parentRepository.save(parentSaveRequestDto.toEntity());

        }
        // 아임포트에 certification을 이용하여 이름, 전화번호, 생일을 추가로 받아옴
        List<String> userInfo = getCertification(requestDto.getImpUID());
        userSaveRequestDto = new UserSaveRequestDto(requestDto.getEmail(), requestDto.getPassword(),
                userInfo.get(0), userInfo.get(1), LocalDate.parse(userInfo.get(2), DateTimeFormatter.ISO_DATE));

        return userRepository.save(userSaveRequestDto.toEntity()).getEmail();
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