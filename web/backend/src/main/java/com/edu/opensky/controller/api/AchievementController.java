package com.edu.opensky.controller.api;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/achievement")
public class AchievementController {

    @GetMapping("")
    public void achievementList(){

    }
}
