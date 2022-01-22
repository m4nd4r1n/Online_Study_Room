package com.edu.opensky.controller;

import com.edu.opensky.controller.dto.UserSaveRequestDto;
import com.edu.opensky.domain.User;
import com.edu.opensky.domain.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.*;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class UserApiControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private  TestRestTemplate restTemplate;

    @Autowired
    private UserRepository userRepository;

    @AfterEach
    public void tearDown() throws Exception{
        userRepository.deleteAll();
    }

    @Test
    public void User_join() throws Exception{
        String email ="email";
        String password = "pass";

        UserSaveRequestDto requestDto = UserSaveRequestDto.builder()
                .email(email)
                .password(password)
                .build();

        String url = "http://localhost:" + port + "/api/v1/user";

        ResponseEntity<String> responseEntity = restTemplate.postForEntity(url,requestDto,String.class);

        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);

        List<User> all = userRepository.findAll();

        assertThat(all.get(0).getEmail()).isEqualTo(email);
        assertThat(all.get(0).getPassword()).isEqualTo(password);

    }

}