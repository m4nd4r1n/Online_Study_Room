import qs from 'qs';
import client from './client';

/**
 * 주간 공부시간 가져오기
 * @param {number} month
 * @param {number} day 특정 주의 시작일
 * @returns 월~일의 주간 공부시간을 실공시간/목표시간으로 가져옴
 *          주간 통계 막대그래프에 사용
  [ {
      name: '월',
      '실제 공부시간': 360,
      '목표 공부시간': 240,     
    }, ...  ];
 */
export const getWeekStudyTime = ({ month, day }) => {
  const queryString = qs.stringify({
    month,
    day,
  });
  return client.get(`/api/statistics/week?${queryString}`);
};

/**
 * 특정일 학습 시간 가져오기
 * @param {number} month 월
 * @param {number} day 일
 * @returns 10분씩 자른 시간표에서 실공시간으로 인정된 구간, 하루치 실제+목표 공부시간
 *          원형 달성률 그래프에서 사용
  timeTable: [
    {
      date: date,
      time: '1030',
    }, ...                                  // 그 날의 10분단위 실공시간
  ],
  dateStudyTime: [
    { name: '실제 공부시간', value: 360 },
    { name: '목표 공부시간', value: 240 },  // 특정일의 공부시간
  ],
 */
export const getDateStudyTime = ({ month, day }) => {
  const queryString = qs.stringify({
    month,
    day,
  });
  return client.get(`/api/statistics/date?${queryString}`);
};
