import client from './client';

/**
 * 학교, 이름 등의 기본적인 학생정보 요청
 */
export const getStudentInfo = ({ userId }) =>
  client.get(`/api/management/info?userId=${userId}`);

/**
 * 학습 미인식 시간 및 캡쳐사진 요청
 * 받은 시간정보로 인증 요청할 예정
 */
export const getStudyTime = ({ userId }) =>
  client.get(`/api/management/studyTime?userId=${userId}`);

/**
 * 백서버에서 전달받은 시간정보로 학습시간 인정 요청
 */
export const acceptStudyTime = ({ userId, time }) =>
  client.patch(`/api/management/studyTime`, { userId, time });
