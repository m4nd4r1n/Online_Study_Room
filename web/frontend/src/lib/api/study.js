import client from './client';

export const getUserInfo = () => client.get(`/study/info`);

export const getAttendance = ({ userID }) =>
  client.post('/study/attendance', { userID });

export const setAttendance = ({ userID, date }) =>
  client.post('/study/attendance', { userID, date });
