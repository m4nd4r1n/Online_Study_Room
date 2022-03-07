import qs from 'qs';
import client from './client';

// 플랜 추가
export const addPlan = ({ subject, date, startTime, endTime }) =>
  client.post(`/api/planner`, { subject, date, startTime, endTime });

// 플랜 제거
export const removePlan = ({ subject, month, day }) => {
  const queryString = qs.stringify({
    subject,
    month,
    day,
  });
  return client.delete(`/api/planner?${queryString}`);
};

// 플래너 가져오기
export const readPlanner = ({ month, day, userId }) => {
  const queryString = qs.stringify({
    month,
    day,
    userId,
  });
  return client.get(`/api/planner?${queryString}`);
};
