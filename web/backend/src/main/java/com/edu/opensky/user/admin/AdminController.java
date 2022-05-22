package com.edu.opensky.user.admin;

import com.edu.opensky.user.admin.dto.SetMentorMenteeRequestDto;
import com.edu.opensky.user.mentee.MenteeService;
import com.edu.opensky.user.mentor.MentorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequiredArgsConstructor
@RestController
public class AdminController {

    private final MentorService mentorService;
    private final MenteeService menteeService;
    private final AdminService adminService;

    @GetMapping("/api/admin/mentee")
    public ResponseEntity getMenteeList(@RequestParam @Nullable String mtrId){
        if(mtrId == null){
            return ResponseEntity.ok(menteeService.getMenteeWithoutMentorList());
        }
        else{
            return ResponseEntity.ok(mentorService.getMenteeWithMentorList(mtrId));
        }

    }

    @GetMapping("/api/admin/mentor")
    public ResponseEntity getMentorList(){
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

    @PutMapping("/api/admin")
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