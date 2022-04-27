import client from './client';

// 로그인
export const login = ({ email, password }) =>
  client.post('/auth/login', { email, password });

// 회원가입
export const register = ({
  type, // 멘티/멘토/학부모 중 하나
  email, // 이메일
  password, // 비밀번호
  impUID, // 아임포트 UID
  school, // 학교 (멘티)
  stdName, // 자녀 이름 (학부모)
  phoneFirst, // 자녀 전화번호 앞자리 (학부모)
  phoneMiddle, // 자녀 전화번호 중간자리 (학부모)
  phoneLast, // 자녀 전화번호 뒷자리 (학부모)
}) =>
  client.post('/auth/register', {
    type,
    email,
    password,
    impUID,
    school,
    stdName,
    phoneFirst,
    phoneMiddle,
    phoneLast,
  });

// 로그인 상태 확인
export const check = () => client.get('/auth/check');

// 로그아웃
export const logout = () => client.post('/auth/logout');

export const find = ({ impUID, email }) =>
  client.post('/auth/find', { impUID, email });

export const signout = () => client.delete('/auth/signout');
