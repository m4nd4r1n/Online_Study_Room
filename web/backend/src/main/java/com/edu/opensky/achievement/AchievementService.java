package com.edu.opensky.achievement;

import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.*;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
@Transactional
public class AchievementService {
    private final AchievementRepository achievementRepository;
    private final AchieveListRepository achieveListRepository;

    // 학생 아이디로 달성한 과제 번호와 달성일자 리스트 반환
    public JSONArray getAchievementList(String stdId){
        return convertListToJson(achievementRepository.findIdByMentee_MteId(stdId));

    }

    public void setAchievementList(){
        JSONParser parser = new JSONParser();
        String absolutePath = new File("").getAbsolutePath()+"\\";
        String path = absolutePath +"/web/backend/src/main/java/com/edu/opensky/achievement/achievement_list.json";

        Reader reader = null;
        try {
            String os = System.getProperty("os.name").toLowerCase();

            if(os.contains("win")){
                reader = new FileReader(path);

            }
            else if(os.contains("linux")){
                path = "/home/ec2-user/app/step1/Online_Study_Room/web/backend/src/main/java/com/edu/opensky/achievement/achievement_list.json";
                reader = new FileReader(path);
            }
            JSONObject jsonObject = (JSONObject) parser.parse(reader);

            JSONArray jsonArray = (JSONArray) jsonObject.get("normal");
            for (Object o : jsonArray){
                JSONObject jsonAchievement = (JSONObject) o;
                Long id = (Long) jsonAchievement.get("id");
                String title = (String) jsonAchievement.get("title");
                String description = (String) jsonAchievement.get("description");
                Long exp = (Long) jsonAchievement.get("exp");
                achieveListRepository.save(AchieveList.builder().id(id).title(title).experience(exp).build());
            }
            
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }

    }

    public static JSONArray convertListToJson(List<HashMap<Long, LocalDate>> bankCdList) {
        JSONArray jsonArray = new JSONArray();
        for (Map<Long, LocalDate> map : bankCdList) {
            jsonArray.add(convertMapToJson(map));
        }
        return jsonArray;
    }
    public static JSONObject convertMapToJson(Map<Long, LocalDate> map) {
        JSONObject json = new JSONObject();
        for (Map.Entry<Long, LocalDate> entry : map.entrySet()) {
            String key = String.valueOf(entry.getKey());
            Object value = entry.getValue();
            json.put(key, value);
        }
        return json;
    }
}
