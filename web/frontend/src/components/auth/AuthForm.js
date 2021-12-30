import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import { StyledInput, InputBlock } from '../common/Input';
import { StyledBox, StyledClickBox } from '../common/Contents';
import { Checkbox } from 'antd';
/**
 * login form
 */

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${palette.gray[8]};
    margin-bottom: 1rem;
  }
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

const AuthForm = ({ type, form, onChange, onSubmit, error, handleImpUID }) => {
  const text = textMap[type];
  const [certSuccess, setCertSuccess] = useState(false);
  const [available, setAvailable] = useState(false);
  const [agreeContents, setAgreeContents] = useState(false);

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

  // 약관 체크 이벤트 핸들러
  const handleCheck = () => {
    setAvailable(!available);
  };

  // 약관 내용 클릭 이벤트 핸들러
  const handleAgreeContents = () => {
    setAgreeContents(!agreeContents);
  };

  return (
    <AuthFormBlock>
      <h3>{text}</h3>
      <form onSubmit={onSubmit}>
        <InputBlock>
          <StyledInput
            autoComplete="email"
            type="email"
            name="email"
            placeholder="E-mail"
            onChange={onChange}
            value={form.email}
            maxLength={30}
            required
          />
        </InputBlock>
        <InputBlock>
          <StyledInput
            autoComplete="new-password"
            name="password"
            placeholder="비밀번호"
            type="password"
            onChange={onChange}
            value={form.password}
            maxLength={16}
            required
          />
        </InputBlock>
        {type === 'register' && (
          <>
            <InputBlock>
              <StyledInput
                autoComplete="new-password"
                name="passwordConfirm"
                placeholder="비밀번호 확인"
                type="password"
                onChange={onChange}
                value={form.passwordConfirm}
                maxLength={16}
                required
              />
            </InputBlock>
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
              <StyledBox style={{ height: '3rem' }}>
                <Checkbox onChange={handleCheck}>약관동의</Checkbox>
                <StyledClickBox onClick={handleAgreeContents}>
                  약관보기
                </StyledClickBox>
              </StyledBox>
            </InputBlock>
            {agreeContents && (
              <StyledBox style={{ marginTop: '-1px', fontSize: '11px' }}>
                약관에 동의함으로서 회원가입 시 수집한 개인정보의 보관 및 이용에
                동의함.
              </StyledBox>
            )}
          </>
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ButtonWithMarginTop
          cyan
          fullwidth="true"
          disabled={type === 'register' ? !available || !certSuccess : false}
        >
          {text}
        </ButtonWithMarginTop>
      </form>
      <Footer>
        {type === 'login' ? (
          <Link to="/register">회원가입</Link>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </Footer>
    </AuthFormBlock>
  );
};

export default AuthForm;
