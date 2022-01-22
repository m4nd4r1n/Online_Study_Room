package com.edu.opensky.domain.repository;

import com.edu.opensky.domain.Mentor;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class MentorRepositoryTest {

    @Autowired
    MentorRepository mentorRepository;

    @AfterEach
    public void teardown(){
        mentorRepository.deleteAll();

    }

    @Test
    public void asdasd(){
        String mentor = "mentor";
        String mentee = "mentee";

        mentorRepository.save(Mentor.builder()
                .mtrId(mentor)
                .mteId(mentee)
                .build());

        List<Mentor> mentorList = mentorRepository.findAll();

        Mentor mentor1=mentorList.get(0);
        assertThat(mentor1.getMtrId()).isEqualTo(mentor);
        assertThat(mentor1.getMteId()).isEqualTo(mentee);

    }
}