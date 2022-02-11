import React, { useState } from 'react';
import styled from 'styled-components';
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

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1rem;
  }

  display: ${(props) =>
    props.type !== 'register' || props.user ? '' : 'none'};
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

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
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
const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

const UserSelectButton = styled(Button)`
  display: ${(props) =>
    props.type === 'register' && !props.user ? '' : 'none'};
  margin-bottom: 1rem;
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

const AuthForm = ({
  type,
  form,
  onChange,
  onSubmit,
  error,
  errors,
  handleImpUID,
  handleRegType,
}) => {
  const text = textMap[type];
  const [certSuccess, setCertSuccess] = useState(false);
  const [available, setAvailable] = useState(false);
  const [agreeContents, setAgreeContents] = useState(false);
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
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
        setCertSuccess(true);
        handleImpUID(rsp.imp_uid);
      } else {
        alert(`인증에 실패하였습니다.\n에러 내용: ${rsp.error_msg}`);
      }
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // 약관 체크 이벤트 핸들러
  const handleCheck = (e) => {
    e.preventDefault();
    setAvailable(!available);
  };

  // 약관 내용 클릭 이벤트 핸들러
  const handleAgreeContents = () => {
    setAgreeContents(!agreeContents);
  };

  const handleUser = (value) => {
    const type = value.target.innerText.slice(0, -3);
    setUser(type);
    handleRegType(type);
  };

  const inNumber = (e) => {
    e.target.value = e.target.value.replace(/[^-0-9]/g, '');
    onChange(e);
  };

  return (
    <>
      <UserSelectButton
        cyan
        fullwidth="true"
        onClick={handleUser}
        type={type}
        user={user}
      >
        멘토 가입
      </UserSelectButton>
      <UserSelectButton
        cyan
        fullwidth="true"
        onClick={handleUser}
        type={type}
        user={user}
      >
        멘티 가입
      </UserSelectButton>
      <UserSelectButton
        cyan
        fullwidth="true"
        onClick={handleUser}
        type={type}
        user={user}
      >
        학부모 가입
      </UserSelectButton>
      <AuthFormBlock type={type} user={user}>
        <h3>
          {user} {findType} {text}
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
                {!certSuccess ? (
                  <Button cyan fullwidth="true" onClick={handleCert}>
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
                    type={showPassword ? 'text' : 'password'}
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
                          {showPassword ? <Visibility /> : <VisibilityOff />}
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
                    type={showPassword ? 'text' : 'password'}
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
                          {showPassword ? <Visibility /> : <VisibilityOff />}
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
              {user === '멘티' && (
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
              {user === '학부모' && (
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
                {!certSuccess ? (
                  <Button cyan fullwidth="true" onClick={handleCert}>
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
                        checked={available}
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
              {agreeContents && (
                <StyledBox style={{ marginTop: '-1px', fontSize: '11px' }}>
                  약관에 동의함으로서 회원가입 시 수집한 개인정보의 보관 및
                  이용에 동의함.
                </StyledBox>
              )}
            </>
          )}
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <ButtonWithMarginTop
            cyan
            fullwidth="true"
            disabled={
              type === 'register'
                ? !available || !certSuccess
                : type === 'find'
                ? !certSuccess
                : false
            }
          >
            {findType} {text}
          </ButtonWithMarginTop>
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
