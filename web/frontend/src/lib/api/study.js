import client from './client';

export const getUserInfo = () => client.get(`/study/info`);

export const getAttendance = ({ userID }) =>
  client.post('/study/attendance', { userID });

export const setAttendance = ({ userID, date }) =>
  client.post('/study/attendance', { userID, date });

export const uploadFrame = (data) => {
  const formData = new FormData();
  formData.append('image', data);

  return client.post('/study/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const setStudyState = () => client.post('/study/state');
