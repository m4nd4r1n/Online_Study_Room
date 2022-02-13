import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeField, initializeForm, login } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';

const LoginForm = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    message: null,
  });
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  // 인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'login',
        key: name,
        value,
      }),
    );
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = form;
    const regex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!(email !== undefined && regex.test(email))) {
      setErrors({ email: true });
      changeField({ form: 'register', key: 'email', value: '' });
      return;
    }
    if (password.length < 8) {
      setErrors({ password: true });
      changeField({ form: 'register', key: 'password', value: '' });
      changeField({ form: 'register', key: 'passwordConfirm', value: '' });
      return;
    }
    dispatch(login({ email, password }));
  };

  // 컴포넌트 렌더링 시 form 초기화
  useEffect(() => {
    dispatch(initializeForm('login'));
    dispatch(initializeForm('register'));
    dispatch(initializeForm('find'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      console.log('오류 발생');
      console.log(authError);
      setErrors({ message: '로그인 실패' });
      return;
    }
    if (auth) {
      console.log('로그인 성공');
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      navigate('/home');
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not working');
      }
    }
  }, [navigate, user]);

  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      errors={errors}
    />
  );
};

export default LoginForm;
