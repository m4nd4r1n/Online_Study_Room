package com.edu.opensky.user.mentor;

import com.edu.opensky.user.mentee.Mentee;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mentor")
public class MentorApiController {

    private final MentorService mentorService;

    @GetMapping("/menteeList")
    public List<Mentee> getMenteeList(){
        // 수정 필요
        // 멘토 아이디
        String id= "dsadsa@naver.com";

        // 멘티 아이디 리스트 반환
        return mentorService.getMenteeList(id);

    }


}
