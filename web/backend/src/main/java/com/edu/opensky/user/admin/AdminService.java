package com.edu.opensky.user.admin;

import com.edu.opensky.user.admin.dto.SetMentorMenteeRequestDto;
import com.edu.opensky.user.mentee.Mentee;
import com.edu.opensky.user.mentee.MenteeRepository;
import com.edu.opensky.user.mentor.Mentor;
import com.edu.opensky.user.mentor.MentorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class AdminService {
    private final MenteeRepository menteeRepository;
    private final MentorRepository mentorRepository;

    public boolean setMentorMentee(SetMentorMenteeRequestDto setMentorMenteeRequestDto){
        Optional<Mentee> mentee = menteeRepository.findByMteId(setMentorMenteeRequestDto.getMteId());
        Optional<Mentor> mentor = mentorRepository.findByMtrId(setMentorMenteeRequestDto.getMtrId());

        if (mentor.isPresent()){
            mentee.ifPresent(selectMentee ->{
                selectMentee.updateMentor(mentor.get().getMtrId());
                menteeRepository.save(selectMentee);
            });

            return true;
        }

        return false;

    }

    public boolean deleteMentorMentee(SetMentorMenteeRequestDto setMentorMenteeRequestDto) {
        Optional<Mentee> mentee = menteeRepository.findByMteId(setMentorMenteeRequestDto.getMteId());
        Optional<Mentor> mentor = mentorRepository.findByMtrId(setMentorMenteeRequestDto.getMtrId());

        if (mentor.isPresent()){
            mentee.ifPresent(selectMentee ->{
                selectMentee.updateMentor(null);
                menteeRepository.save(selectMentee);
            });

            return true;
        }

        return false;

    }
}
