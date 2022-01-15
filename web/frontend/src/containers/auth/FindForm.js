import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, initializeForm, find } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';

const FindForm = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError } = useSelector(({ auth }) => ({
    form: auth.find,
    auth: auth.auth,
    authError: auth.authError,
  }));

  // 인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'find',
        key: name,
        value,
      }),
    );
  };

  const handleImpUID = (value) => {
    dispatch(
      changeField({
        form: 'find',
        key: 'impUID',
        value,
      }),
    );
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = (e) => {
    e.preventDefault();
    const { impUID, email } = form;
    dispatch(find({ impUID, email }));
  };

  // 컴포넌트 렌더링 시 form 초기화
  useEffect(() => {
    dispatch(initializeForm('find'));
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

  useEffect(() => {
    if (authError) {
      console.log('오류 발생');
      console.log(authError);
      setError('찾기 실패');
      return;
    }
    if (auth) {
      console.log('찾기 성공');
      alert(auth.response.data);
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  return (
    <AuthForm
      type="find"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
      handleImpUID={handleImpUID}
    />
  );
};

export default FindForm;