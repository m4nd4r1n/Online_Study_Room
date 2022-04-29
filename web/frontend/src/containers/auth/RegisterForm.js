import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    passwordConfirm: false,
    message: null,
  });
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  // 인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'register',
        key: name,
        value,
      }),
    );
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = (e) => {
    e.preventDefault();
    const {
      type,
      email,
      password,
      passwordConfirm,
      impUID,
      school,
      stdName,
      phoneFirst,
      phoneMiddle,
      phoneLast,
    } = form;
    const regex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    // 하나라도 비어있다면
    if (
      (type === '멘티' && [school].includes('')) ||
      (type === '학부모' &&
        [stdName, phoneFirst, phoneMiddle, phoneLast].includes('')) ||
      [email, password, passwordConfirm, impUID].includes('')
    ) {
      setErrors({ message: '모든 정보를 입력하세요.' });
      return;
    }
    if (!(email !== undefined && regex.test(email))) {
      setErrors({ email: true });
      changeField({ form: 'register', key: 'email', value: '' });
      return;
    }

    // 비밀번호가 일치하지 않는다면
    if (password !== passwordConfirm) {
      setErrors({ passwordConfirm: true });
      changeField({ form: 'register', key: 'password', value: '' });
      changeField({ form: 'register', key: 'passwordConfirm', value: '' });
      return;
    }

    if (password.length < 8) {
      setErrors({ password: true });
      changeField({ form: 'register', key: 'password', value: '' });
      changeField({ form: 'register', key: 'passwordConfirm', value: '' });
      return;
    }

    dispatch(
      register({
        type,
        email,
        password,
        passwordConfirm,
        impUID,
        school,
        stdName,
        phoneFirst,
        phoneMiddle,
        phoneLast,
      }),
    );
  };

  // 컴포넌트가 처음 렌더링 될 때 form 을 초기화함
  useEffect(() => {
    dispatch(initializeForm('register'));
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    const jquery = document.createElement('script');
    jquery.src = 'https://code.jquery.com/jquery-1.12.4.min.js';
    const iamport = document.createElement('script');
    iamport.src = 'https://cdn.iamport.kr/js/iamport.payment-1.2.0.js';
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  // 회원가입 성공 / 실패 처리
  useEffect(() => {
    if (authError) {
      // 중복 값 존재
      if (authError.response.status === 409) {
        setErrors({ message: authError.response.data.error });
        return;
      }
      // 기타 이유
      setErrors({ message: '회원가입 실패' });
      return;
    }

    if (auth) {
      console.log('회원가입 성공');
      console.log(auth);
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  // user 값이 잘 설정되었는지 확인
  useEffect(() => {
    if (user) {
      navigate('/'); // 홈 화면으로 이동
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not working');
      }
    }
  }, [navigate, user]);

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      errors={errors}
    />
  );
};

export default RegisterForm;
