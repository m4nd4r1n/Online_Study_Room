package com.edu.opensky.user;

import com.edu.opensky.user.dto.*;
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
    public void register(@RequestBody RegisterRequestDto requestDto, HttpServletResponse response){
        Cookie authCookie = new Cookie("Authorization", userService.register(requestDto));
        authCookie.setMaxAge(1000 * 60 * 60 * 24 * 7); // 유효 기간 7일
        authCookie.setPath("/"); // 모든 경로에서 접근 가능 하도록 설정
        response.addCookie(authCookie); // response에 cookie 설정
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


    @ResponseBody
    @GetMapping("/auth/check")

    public ResponseEntity<?> authCheck(ServletRequest request,@CookieValue(value="Authorization")String token){
        CheckResponseDto checkResponseDto=userService.check(token);

        if(checkResponseDto==null){
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        else {
            return new ResponseEntity<CheckResponseDto>(checkResponseDto, HttpStatus.OK);
        }

    }

    // 로그아웃
    @PostMapping("/auth/logout")
    public ResponseEntity logout(@CookieValue(value="Authorization") String token, HttpServletResponse response){
        User user = userService.getUserByToken(token);

        Cookie authCookie = new Cookie("Authorization",null);
        authCookie.setMaxAge(0);
        authCookie.setPath("/");
        response.addCookie(authCookie);
        if(userService.logout(user)){
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.badRequest().build();

    }

    // 회원탈퇴
    @DeleteMapping("/auth/signout")
    public ResponseEntity signout(@CookieValue(value="Authorization") String token, HttpServletResponse response){
        User user = userService.getUserByToken(token);
        if (userService.signout(user)){
            Cookie authCookie = new Cookie("Authorization",null);
            authCookie.setMaxAge(0);
            authCookie.setPath("/");
            response.addCookie(authCookie);
            return ResponseEntity.ok().build();
        }
        else{
            return ResponseEntity.badRequest().build();
        }
    }


}
