package com.edu.opensky.controller.api;

import com.edu.opensky.controller.dto.MentorSaveRequestDto;
import com.edu.opensky.domain.Mentor;
import com.edu.opensky.service.MentorService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mentor")
public class MentorApiController {

    private final MentorService mentorService;




}
