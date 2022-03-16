package com.edu.opensky.user.mentee;

import com.edu.opensky.achievement.Achievement;
import com.edu.opensky.attendance.Attendance;
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

    @Column(nullable = true, length=15)
    private String mtrId;

    @Column(nullable = true, length=15)
    private String prtId;

    @Column(nullable = true, length=15)
    private String school;

    @Column(columnDefinition = "integer default 1")
    private Integer level;

    @Column(columnDefinition = "integer default 0")
    private Integer exp;

    @OneToMany(mappedBy = "mentee")
    private List<Attendance> attendanceList = new ArrayList<>();;

    @OneToMany(mappedBy = "mentee")
    private List<Achievement> achievementList = new ArrayList<>();
    @Builder
    public Mentee(String mtrId, String mteId, String prtId, String school){
        this.mtrId = mtrId;
        this.mteId = mteId;
        this.prtId = prtId;
        this.school = school;
        this.level = 1;
        this.exp = 0;
    }
}
