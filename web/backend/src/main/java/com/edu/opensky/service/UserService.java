package com.edu.opensky.service;

import com.edu.opensky.controller.dto.*;
import com.edu.opensky.domain.Attendance;
import com.edu.opensky.domain.User;
import com.edu.opensky.domain.repository.*;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Duration;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
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

    /* 비밀번호 변경 */
    @Transactional
    public String update(String email, UserUpdateRequestDto requestDto) {
        User user = userRepository.findByPassword(requestDto.getOldPassword()).orElseThrow(() -> new
                IllegalArgumentException("비밀번호가 다릅니다"));

        // 유저 아이디와 입력받은 비밀번호에 해당하는 아이디가 같은 경우에만 업데이트
        if (user.getEmail().equals(email)){
            // 새 비밀번호로 업데이트
            user.update(email, requestDto.getNewPassword(), user.getName(), user.getPhone(),user.getBirth());
        }
        else{
            System.out.println("비밀번호가 다릅니다.");
        }

        return user.getEmail();
    }

    /* 회원 정보 찾기 */
    @Transactional
    public String find(FindRequestDto findRequestDto) {
        String email = findRequestDto.getEmail();
        String impUID = findRequestDto.getImpUID();

        List<String> userInfo = getCertification(impUID);

        // 이메일 찾기
        if (!userInfo.isEmpty() && email == null){
            User user = userRepository.findByPhone(userInfo.get(1)).orElseThrow(() -> new
                    IllegalArgumentException("회원 가입 기록이 없습니다."));
            return user.getEmail();
        }
        // 비밀번호 찾기
        else if (!userInfo.isEmpty() && email != null){
            User user = userRepository.findByEmail(email).orElseThrow(() -> new
                    IllegalArgumentException("해당 아이디가 없습니다. id=" + email));
            return user.getPassword();
        }

        return null;
    }

    /*토큰으로부터 유저엔티티 조회*/
    public User getUserByToken(Object principal) {
        String email = ((UserDetails) principal).getUsername();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("사용자가 없습니다."));
        //log.info("토큰으로부터 사용자추출"+user.getEmail().toString());
        return user;
    }
}