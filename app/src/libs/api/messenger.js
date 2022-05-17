import client from './client';

// 메신저 리스트 가져오기
export const listMessengers = () => client.get(`/api/messenger`);

// 메시지 리스트 가져오기
export const listMessages = ({ messengerId }) =>
  client.get(`/api/messenger/${messengerId}`);
