package com.edu.opensky.statics;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class StaticsController {

    private final StaticsService staticsService;

    @GetMapping("/weekStatic")
    public List<? extends Object> statics(@RequestBody StaticsRequestDto staticsRequestDto){

        return staticsService.findWeekStatics(staticsRequestDto.getPtrId(),staticsRequestDto.getYear(),staticsRequestDto.getMonth(),staticsRequestDto.getDay());

    }
}
