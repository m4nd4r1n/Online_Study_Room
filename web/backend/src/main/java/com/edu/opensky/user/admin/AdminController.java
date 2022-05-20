package com.edu.opensky.user.admin;

import com.edu.opensky.user.admin.dto.SetMentorMenteeRequestDto;
import com.edu.opensky.user.mentor.MentorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequiredArgsConstructor
@RestController
public class AdminController {

    private final MentorService mentorService;
    private final AdminService adminService;


    @GetMapping("/api/admin/mentor")
    public ResponseEntity getMenteeList(){
        return ResponseEntity.ok(mentorService.getMentorList());
    }

    @PostMapping("/api/admin")
    public ResponseEntity setMentorMentee(
            @RequestBody @Valid SetMentorMenteeRequestDto setMentorMenteeRequestDto, Errors errors){
        if(errors.hasErrors()){
            return ResponseEntity.badRequest().build();
        }
        if(adminService.setMentorMentee(setMentorMenteeRequestDto)){
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/api/admin")
    public ResponseEntity deleteMentorMentee(
            @RequestBody @Valid SetMentorMenteeRequestDto setMentorMenteeRequestDto, Errors errors){
        if(errors.hasErrors()){
            return ResponseEntity.badRequest().build();
        }
        if(adminService.deleteMentorMentee(setMentorMenteeRequestDto)){
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.badRequest().build();
    }


}