import client from './client';

// 도전과제 달성현황
export const readAhievement = () => client.get(`/api/achievement`);
