import client from './client';

// 로그인
export const login = ({ email, password }) =>
  client.post('/auth/login', { email, password });

// 회원가입
export const register = ({
  email,
  password,
  impUID,
  school,
  stdName,
  phoneFirst,
  phoneMiddle,
  phoneLast,
}) =>
  client.post('/auth/register', {
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
