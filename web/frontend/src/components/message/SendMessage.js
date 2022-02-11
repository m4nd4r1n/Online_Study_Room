import React from 'react';
import Button from '../common/Button';
import { InputBlock, StyledInput } from '../common/Input';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import palette from '../../lib/styles/palette';

const SendMessage = () => {
  return (
    <InputBlock border>
      <StyledInput none />
      <Button none left right type="send">
        <IoPaperPlaneOutline color={palette.SkyBlue} size="25px" />
      </Button>
    </InputBlock>
  );
};

export default SendMessage;
