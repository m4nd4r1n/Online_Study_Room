package com.edu.opensky.service;

import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ImportService {
    /* 인증 토큰 발급 */
    @Transactional
    public String getToken(){

        String url = "https://api.iamport.kr/users/getToken";
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("imp_key", "4976088444891919");
        params.add("imp_secret", "585010edcd859d2f8de56189c151242f715461f77919aee2b249bca9991e0ebdfac15b6595658377");

        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> response = rt.postForEntity(url, params, String.class);

        JSONObject jsonObject = new JSONObject(response.getBody());
        JSONObject jsonToken = jsonObject.getJSONObject("response");
        return jsonToken.getString("access_token");
    }

    /* 토큰으로 정보 조회 */
    @Transactional
    public List<String> getCertification(String impUID){
        String url = "https://api.iamport.kr/certifications/" + impUID;
        String accessToken = getToken();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", accessToken);

        HttpEntity request = new HttpEntity(headers);

        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> response = rt.exchange(url, HttpMethod.GET, request, String.class);

        JSONObject jsonObject = new JSONObject(response.getBody());
        JSONObject jsonToken = jsonObject.getJSONObject("response");
        List<String> userInfo = new ArrayList<>();
        userInfo.add(jsonToken.getString("name"));
        userInfo.add(jsonToken.getString("phone"));
        userInfo.add(jsonToken.getString("birthday"));
        return userInfo;
    }
}
