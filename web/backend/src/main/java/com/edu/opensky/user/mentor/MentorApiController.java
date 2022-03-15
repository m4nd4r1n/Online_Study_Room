package com.edu.opensky.user.mentor;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mentor")
public class MentorApiController {

    private final MentorService mentorService;




}
