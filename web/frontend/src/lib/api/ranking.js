import client from './client';

export const getRanking = (url) => client.get(url).then((res) => res.data);
/*
    destination: /api/ranking
    query : page - 1 이상의 정수
            type - time(학습시간) 또는 level(레벨)
            time - type=time인 경우 day(일간), week(주간), month(월간)
                    level인 경우 ""
    expected data : type과 time에 맞는 page * 25만큼의 객체 배열
                ex1) [ 
                        { school:"오픈고등학교", name:"홍길동", time:"5:30" }, 
                        { school:"스카이고등학교", name:"아무개", time:"4:28" }, ...
                     ]
                ex2) [
                        { school:"오픈고등학교", name:"홍길동", level:60 }, 
                        { school:"스카이고등학교", name:"아무개", level:58 }, ...
                     ]
*/

/* 
    destination: /api/rank
    http method: GET
    query: none
    expected data:      current - 현재 학습중인 인원
                        today   - 오늘 학습한 인원
                        day     - 일간 나의 순위
                        week    - 주간 나의 순위
                        month   - 월간 나의 순위
                        level   - 레벨 순위
                        
                        ex) 
                        {
                           current:23,
                           today: 50,
                           day: 25,
                           week: 40,
                           month: 60,
                           level: 30
                        }
*/
