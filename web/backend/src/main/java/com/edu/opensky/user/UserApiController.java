package com.edu.opensky.user;

import com.edu.opensky.user.dto.FindRequestDto;
import com.edu.opensky.user.dto.LoginRequestDto;
import com.edu.opensky.user.dto.RegisterRequestDto;
import com.edu.opensky.user.dto.UserUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletRequest;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@RequiredArgsConstructor
@RestController
@RequestMapping("")
public class UserApiController {

    private final UserService userService;

    // 회원가입
    @PostMapping("/auth/register")
    public String register(@RequestBody RegisterRequestDto requestDto){
        return userService.register(requestDto);
    }

    // 로그인
    @PostMapping("/auth/login")
    public void login(@RequestBody LoginRequestDto requestDto, HttpServletResponse response){
        // access token cookie 생성
        Cookie authCookie = new Cookie("Authorization", userService.login(requestDto));
        authCookie.setMaxAge(1000 * 60 * 60 * 24 * 7); // 유효 기간 7일
        authCookie.setPath("/"); // 모든 경로에서 접근 가능 하도록 설정
        response.addCookie(authCookie); // response에 cookie 설정
    }


    @PutMapping("/auth/update/{email}")
    public String update(
            @PathVariable String email, @RequestBody UserUpdateRequestDto requestDto){
        return userService.update(email, requestDto);
    }

    @PostMapping("/auth/find")
    public String find(@RequestBody FindRequestDto findRequestDto) {
        return userService.find(findRequestDto);
    }

    /* 구현 필요 */
    @ResponseBody
    @GetMapping("/auth/check")
    public ResponseEntity<?> authCheck(ServletRequest request){
        String user=userService.check(request);
        if(user==null){
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        else{
            return new ResponseEntity<String>(user,HttpStatus.OK);
        }
    }

    // 로그아웃
    @PostMapping("/auth/logout")
    public void logout(HttpServletResponse response){
        Cookie authCookie = new Cookie("Authorization",null);
        authCookie.setMaxAge(0);
        authCookie.setPath("/");
        response.addCookie(authCookie);
    }

//    // 회원탈퇴
//    @DeleteMapping("/auth/signout")
//    public ResponseEntity<?> signout(){
//        if (userService.signout()){
//            return new ResponseEntity<>(HttpStatus.OK);
//        }
//        else{
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//    }


}
