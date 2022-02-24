import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import { Link, useLocation } from 'react-router-dom';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import { InputBlock } from '../common/Input';
import { StyledBox, StyledClickBox } from '../common/Contents';
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  OutlinedInput,
  InputLabel,
  FormControl,
  InputAdornment,
  IconButton,
  FormHelperText,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
/**
 * login form
 */

const AuthFormBlock = tw.div`
    ${(p) => (p.$type !== 'register' || p.$user ? '' : 'hidden')}
`;

/**
 * 폼 하단의 로그인/회원가입 링크
 */
const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;

const textMap = {
  login: '로그인',
  register: '회원가입',
  find: '찾기',
  email: '이메일',
  password: '비밀번호',
};

/**
 * 에러
 */

const ErrorMessage = tw.div`
  text-red-500
  text-center
  text-sm
  mt-4
`;

const UserSelectButton = tw(Button)`
    ${(p) => (p.$type === 'register' && !p.$user ? '' : 'hidden')}
    mb-4
`;

const StyledTextField = styled(TextField)`
  & label.Mui-focused {
    color: ${palette.cyan[5]};
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: ${palette.cyan[5]};
    }
  }
`;

const StyledFormControl = styled(FormControl)`
  & label.Mui-focused {
    color: ${palette.cyan[5]};
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: ${palette.cyan[5]};
    }
  }
`;

const AuthForm = ({ type, form, onChange, onSubmit, errors }) => {
  const text = textMap[type];
  const [state, setState] = useState({
    certSuccess: false,
    available: false,
    agreeContents: false,
    user: null,
    showPassword: false,
  });
  const location = useLocation();
  const sch = location.search;
  const params = new URLSearchParams(sch);
  const keyword = params.get('type');
  if (location.pathname === '/find' && !keyword) {
    return null;
  }
  const findType = textMap[keyword];

  const handleCert = (e) => {
    e.preventDefault();
    const USERCODE = 'imp34059711';
    const { IMP } = window;
    IMP.init(USERCODE);
    const data = {
      merchant_uid: `mid_${new Date().getTime()}`,
    };
    IMP.certification(data, (rsp) => {
      if (rsp.success) {
        setState({ ...state, certSuccess: true });
        const values = { target: { value: rsp.imp_uid, name: 'impUID' } };
        onChange(values);
      } else {
        alert(`인증에 실패하였습니다.\n에러 내용: ${rsp.error_msg}`);
      }
    });
  };

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  // 약관 체크 이벤트 핸들러
  const handleCheck = (e) => {
    e.preventDefault();
    setState({ ...state, available: !state.available });
  };

  // 약관 내용 클릭 이벤트 핸들러
  const handleAgreeContents = () => {
    setState({ ...state, agreeContents: !state.agreeContents });
  };

  const handleUser = (value) => {
    const type = value.target.innerText.slice(0, -3);
    setState({ ...state, user: type });
    const values = { target: { value: type, name: 'type' } };
    onChange(values);
  };

  const inNumber = (e) => {
    e.target.value = e.target.value.replace(/[^-0-9]/g, '');
    onChange(e);
  };

  const canRegister =
    type === 'register'
      ? !state.available || !state.certSuccess
      : type === 'find'
      ? !state.certSuccess
      : false;

  return (
    <>
      <UserSelectButton
        cyan="true"
        fullwidth="true"
        onClick={handleUser}
        $type={type}
        $user={state.user}
      >
        멘토 가입
      </UserSelectButton>
      <UserSelectButton
        cyan="true"
        fullwidth="true"
        onClick={handleUser}
        $type={type}
        $user={state.user}
      >
        멘티 가입
      </UserSelectButton>
      <UserSelectButton
        cyan="true"
        fullwidth="true"
        onClick={handleUser}
        $type={type}
        $user={state.user}
      >
        학부모 가입
      </UserSelectButton>
      <AuthFormBlock $type={type} $user={state.user}>
        <h3 className="m-0 mb-4 text-gray-800">
          {state.user} {findType} {text}
        </h3>
        <form onSubmit={onSubmit}>
          {type === 'find' && (
            <>
              {keyword === 'password' && (
                <InputBlock>
                  <StyledTextField
                    error={errors.email}
                    autoComplete="email"
                    type="email"
                    name="email"
                    label="E-mail"
                    placeholder="ex) example@example.com"
                    onChange={onChange}
                    value={form.email}
                    inputProps={{ maxLength: 30 }}
                    required
                    variant="outlined"
                    fullWidth
                    helperText={errors.email ? '이메일 형식이 아닙니다.' : ''}
                  />
                </InputBlock>
              )}
              <InputBlock>
                {!state.certSuccess ? (
                  <Button cyan="true" fullwidth="true" onClick={handleCert}>
                    본인인증
                  </Button>
                ) : (
                  <Button fullwidth="true" disabled>
                    인증완료
                  </Button>
                )}
              </InputBlock>
            </>
          )}
          {type !== 'find' && (
            <>
              <InputBlock>
                <StyledTextField
                  error={errors.email}
                  autoComplete="email"
                  type="email"
                  name="email"
                  label="E-mail"
                  placeholder="ex) example@example.com"
                  onChange={onChange}
                  value={form.email}
                  inputProps={{ maxLength: 30 }}
                  required
                  variant="outlined"
                  fullWidth
                  helperText={errors.email ? '이메일 형식이 아닙니다.' : ''}
                />
              </InputBlock>
              <InputBlock>
                <StyledFormControl
                  error={errors.password}
                  variant="outlined"
                  fullWidth
                  required
                >
                  <InputLabel>비밀번호</InputLabel>
                  <OutlinedInput
                    autoComplete="new-password"
                    name="password"
                    placeholder="최소 8자리"
                    inputProps={{ maxLength: 16 }}
                    type={state.showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={onChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {state.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={70}
                  />
                  <FormHelperText error={errors.password}>
                    {errors.password ? '비밀번호는 최소 8자리입니다.' : ''}
                  </FormHelperText>
                </StyledFormControl>
              </InputBlock>
            </>
          )}
          {type === 'register' && (
            <>
              <InputBlock>
                <StyledFormControl
                  error={errors.passwordConfirm}
                  variant="outlined"
                  fullWidth
                  required
                >
                  <InputLabel>비밀번호 확인</InputLabel>
                  <OutlinedInput
                    autoComplete="new-password"
                    name="passwordConfirm"
                    placeholder="최소 8자리"
                    inputProps={{ maxLength: 16 }}
                    type={state.showPassword ? 'text' : 'password'}
                    value={form.passwordConfirm}
                    onChange={onChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {state.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={100}
                  />
                  <FormHelperText error={errors.passwordConfirm}>
                    {errors.passwordConfirm
                      ? '비밀번호가 일치하지 않습니다.'
                      : ''}
                  </FormHelperText>
                </StyledFormControl>
              </InputBlock>
              {state.user === '멘티' && (
                <InputBlock>
                  <StyledTextField
                    name="school"
                    label="학교"
                    placeholder="ex) 스카이고등학교"
                    type="text"
                    onChange={onChange}
                    value={form.school}
                    inputProps={{ maxLength: 10 }}
                    required
                    variant="outlined"
                    fullWidth
                  />
                </InputBlock>
              )}
              {state.user === '학부모' && (
                <>
                  <InputBlock>
                    <StyledTextField
                      name="stdName"
                      label="자녀 이름"
                      placeholder="ex) 홍길동"
                      type="text"
                      onChange={onChange}
                      value={form.stdName}
                      inputProps={{ maxLength: 10 }}
                      required
                      variant="outlined"
                      fullWidth
                    />
                  </InputBlock>
                  <InputBlock>
                    <StyledTextField
                      name="phoneFirst"
                      label="자녀"
                      placeholder="ex) 010"
                      type="text"
                      onChange={inNumber}
                      value={form.phoneFirst}
                      inputProps={{ maxLength: 3 }}
                      required
                      variant="outlined"
                      fullWidth
                      style={{ marginRight: '0.5rem' }}
                    />
                    <StyledTextField
                      name="phoneMiddle"
                      label="전화번호"
                      placeholder="ex) 1234"
                      type="text"
                      onChange={inNumber}
                      value={form.phoneMiddle}
                      inputProps={{ maxLength: 4 }}
                      required
                      variant="outlined"
                      fullWidth
                    />
                    <StyledTextField
                      name="phoneLast"
                      label="입력"
                      placeholder="ex) 5678"
                      type="text"
                      onChange={inNumber}
                      value={form.phoneLast}
                      inputProps={{ maxLength: 4 }}
                      required
                      variant="outlined"
                      fullWidth
                      style={{ marginLeft: '0.5rem' }}
                    />
                  </InputBlock>
                </>
              )}
              <InputBlock>
                {!state.certSuccess ? (
                  <Button cyan="true" fullwidth="true" onClick={handleCert}>
                    본인인증
                  </Button>
                ) : (
                  <Button fullwidth="true" disabled>
                    인증완료
                  </Button>
                )}
              </InputBlock>
              <InputBlock>
                <StyledBox style={{ height: '3.5rem' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.available}
                        onClick={handleCheck}
                        color="primary"
                      />
                    }
                    label={<Typography variant="button">약관동의</Typography>}
                  />
                  <StyledClickBox onClick={handleAgreeContents}>
                    약관보기
                  </StyledClickBox>
                </StyledBox>
              </InputBlock>
              {state.agreeContents && (
                <>
                  <div className="mt-4" />
                  <StyledBox $agreement>
                    약관에 동의함으로서 회원가입 시 수집한 개인정보의 보관 및
                    이용에 동의함.
                  </StyledBox>
                </>
              )}
            </>
          )}
          {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
          <div className="mb-4" />
          <Button cyan="true" fullwidth="true" disabled={canRegister}>
            {findType} {text}
          </Button>
        </form>
        <Footer>
          {type === 'login' ? (
            <>
              <Link to="/find?type=email" style={{ marginRight: '1rem' }}>
                E-mail 찾기
              </Link>
              <Link to="/find?type=password" style={{ marginRight: '1rem' }}>
                비밀번호 찾기
              </Link>
              <Link to="/register">회원가입</Link>
            </>
          ) : (
            <Link to="/login">로그인</Link>
          )}
        </Footer>
      </AuthFormBlock>
    </>
  );
};

export default AuthForm;
