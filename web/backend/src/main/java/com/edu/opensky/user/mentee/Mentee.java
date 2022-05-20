package com.edu.opensky.user.mentee;

import com.edu.opensky.achievement.Achievement;
import com.edu.opensky.attendance.Attendance;
import com.edu.opensky.planner.Planner;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
public class Mentee {

    @Id
    private String mteId;

    @Column
    private String name;

    @Column(nullable = true)
    private String mtrId;

    @Column(nullable = true)
    private String prtId;

    @Column(nullable = true)
    private String school;

    @Column(columnDefinition = "integer default 1")
    private Integer level;

    @Column(columnDefinition = "integer default 0")
    private Integer exp;


    @Column(columnDefinition = "varchar(255) default '오프라인'")
    private String state;

    @JsonManagedReference
    @OneToMany(mappedBy = "mentee", fetch = FetchType.LAZY)
    private List<Attendance> attendanceList = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "mentee", fetch = FetchType.LAZY)
    private List<Achievement> achievementList = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "mentee", fetch = FetchType.LAZY)
    private List<Planner> plannerList = new ArrayList<>();

    @Builder
    public Mentee(String mtrId,String name, String mteId, String prtId, String school, String state){
        this.name = name;
        this.mtrId = mtrId;
        this.mteId = mteId;
        this.prtId = prtId;
        this.school = school;
        this.level = 1;
        this.exp = 0;
        this.state = "오프라인";
    }


    public void setState(String state) {
        this.state = state;
    }


    public void updateMentor(String mtrId){
        this.mtrId = mtrId;
    }
    public void updateParent(String prtId){
        this.prtId = prtId;
    }
}
