package com.edu.opensky.user;

import com.edu.opensky.Jwt.JwtTokenProvider;
import com.edu.opensky.Jwt.JwtUserDetailService;
import com.edu.opensky.attendance.Attendance;
import com.edu.opensky.attendance.AttendanceRepository;
import com.edu.opensky.user.dto.*;
import com.edu.opensky.user.mentee.Mentee;
import com.edu.opensky.user.mentee.MenteeRepository;
import com.edu.opensky.user.mentee.dto.MenteeSaveRequestDto;
import com.edu.opensky.user.mentor.MentorRepository;
import com.edu.opensky.user.mentor.dto.MentorSaveRequestDto;
import com.edu.opensky.user.parent.ParentRepository;
import com.edu.opensky.user.parent.dto.ParentSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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
    private final ImportService importService;
    private final JwtUserDetailService jwtUserDetailService;
    private final JwtTokenProvider jwtTokenProvider;




    /* 로그인 */
    @Transactional
    public String login(LoginRequestDto responseDto) {
        User user = userRepository.findByEmailAndPassword(responseDto.getEmail(), responseDto.getPassword()).orElseThrow(() ->
                new IllegalArgumentException("아이디와 비밀번호를 확인해주세요."));
        attendance(user.getEmail());

        UserDetails userDetails = jwtUserDetailService.loadUserByUsername(responseDto.getEmail());

        // 마지막 접속일자 업데이트
        user.setLastAccessDate(LocalDate.now());

        if(user.getRole().equals("멘티")){
            Mentee mentee =  menteeRepository.findByMteId(user.getEmail()).orElseThrow(()->{
                return new IllegalArgumentException("멘티 아이디가 존재하지 않음");

            });
            mentee.setState("온라인");
        }

        return jwtTokenProvider.createToken(userDetails); //토큰 생성

    }

    @Transactional
    public void logout(User user){

        menteeRepository.findByMteId(user.getEmail()).ifPresent(m ->m.setState("오프라인"));

    }

    /* 마지막 접속일자 업데이트 */
    public void dateUpdate(LoginRequestDto responseDto){
        Optional<User> user = userRepository.findByEmail(responseDto.getEmail());
        user.ifPresent(u -> u.setLastAccessDate(LocalDate.now()));
    }
    /* 출석체크 */
    @Transactional
    public void attendance(String userId){
        LocalDate today = LocalDate.now();
        Optional<Mentee> mentee = menteeRepository.findByMteId(userId);
        mentee.ifPresent(
                selectMentee ->{
                    // 오늘 출석체크 했는지 확인
                    if(!attendanceRepository.findByMenteeAndDate(selectMentee, today).isPresent()){
                        attendanceRepository.save(Attendance
                                .builder()
                                .mentee(selectMentee)
                                .date(today)
                                .build());
                    }
                }
        );

    }
    /* 회원가입 */
    @Transactional
    public String register(RegisterRequestDto requestDto) {
        // 아임포트에 certification을 이용하여 이름, 전화번호, 생일을 추가로 받아옴
        List<String> userInfo = importService.getCertification(requestDto.getImpUID());
        UserSaveRequestDto userSaveRequestDto = new UserSaveRequestDto(requestDto.getEmail(), requestDto.getPassword(),
                userInfo.get(0), userInfo.get(1), LocalDate.parse(userInfo.get(2), DateTimeFormatter.ISO_DATE));
        checkDuplicateUser(userSaveRequestDto);


        switch (requestDto.getType()) {
            case "멘티":
                MenteeSaveRequestDto menteeSaveRequestDto = new MenteeSaveRequestDto(requestDto.getEmail(), userSaveRequestDto.getName(), requestDto.getSchool());
                menteeRepository.save(menteeSaveRequestDto.toEntity());
                userSaveRequestDto.setRole("멘티");
                break;
            case "멘토":
                MentorSaveRequestDto mentorSaveRequestDto = new MentorSaveRequestDto(requestDto.getEmail(), userSaveRequestDto.getName());
                mentorRepository.save(mentorSaveRequestDto.toEntity());
                userSaveRequestDto.setRole("멘토");
                break;
            case "학부모":
                ParentSaveRequestDto parentSaveRequestDto = new ParentSaveRequestDto(
                        requestDto.getEmail(), userSaveRequestDto.getName(), requestDto.getStdName(), requestDto.getPhoneFirst()+requestDto.getPhoneMiddle()+requestDto.getPhoneLast());
                parentRepository.save(parentSaveRequestDto.toEntity());
                userSaveRequestDto.setRole("학부모");

        }

        userRepository.save(userSaveRequestDto.toEntity()).getEmail();

        User user = userRepository.findByEmailAndPassword(requestDto.getEmail(),  requestDto.getPassword()).orElseThrow(() ->
                new IllegalArgumentException("아이디와 비밀번호를 확인해주세요."));
        attendance(user.getEmail());

        UserDetails userDetails = jwtUserDetailService.loadUserByUsername(requestDto.getEmail());

        // 마지막 접속일자 업데이트
        user.setLastAccessDate(LocalDate.now());

        return jwtTokenProvider.createToken(userDetails); //토큰 생성

    }

    // 중복확인
    private void checkDuplicateUser(UserSaveRequestDto requestDto) {
        userRepository.findByEmail(requestDto.getEmail())
                .ifPresent(m -> {
                    throw new IllegalStateException("이미 존재하는 아이디입니다.");
                });
        userRepository.findByPhone(requestDto.getPhone())
                .ifPresent(m -> {
                    throw new IllegalArgumentException("이미 가입한 사용자입니다.");
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
            user.update(email, requestDto.getNewPassword(),user.getRole(), user.getName(), user.getPhone(),user.getBirth());
        } else{
            System.out.println("비밀번호가 다릅니다.");
        }

        return user.getEmail();
    }

    /* 회원 정보 찾기 */
    @Transactional
    public String find(FindRequestDto findRequestDto) {
        String email = findRequestDto.getEmail();
        String impUID = findRequestDto.getImpUID();

        List<String> userInfo = importService.getCertification(impUID);

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
    public User getUserByToken(String token) {
        String email= jwtTokenProvider.getUsername(token);
        //System.out.println(email);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("사용자가 없습니다."));
        return user;
    }

    public CheckResponseDto check(String token){

        //토큰을 가지고 있는지, 토큰이 유효한지
        // 유효한 토큰인지 확인
        if (token != null && jwtTokenProvider.validateToken(token)) {


            User user=getUserByToken(token);

            CheckResponseDto checkResponseDto=new CheckResponseDto();
            checkResponseDto.setUserId(user.getEmail());
            checkResponseDto.setToken(token);
            checkResponseDto.setRole(user.getRole());
            return checkResponseDto;
        }
        return null;


    }

    public boolean signout(User user) {
        if(user.getRole().equals("멘티")){

        }
    }
}