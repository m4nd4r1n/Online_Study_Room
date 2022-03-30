package com.edu.opensky.user.mentee;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@NoArgsConstructor
@Entity
public class Mentee {

    @Id
    private String mteId;

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

//    @JsonManagedReference
//    @OneToMany(mappedBy = "mentee", fetch = FetchType.LAZY)
//    private List<Attendance> attendanceList = new ArrayList<>();;
//
//    @JsonManagedReference
//    @OneToMany(mappedBy = "mentee", fetch = FetchType.LAZY)
//    private List<Achievement> achievementList = new ArrayList<>();
//
//    @JsonManagedReference
//    @OneToMany(mappedBy = "mentee", fetch = FetchType.LAZY)
//    private List<Planner> PlannerList = new ArrayList<>();

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
