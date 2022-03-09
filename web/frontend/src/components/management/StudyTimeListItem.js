import React, { useState } from 'react';
import { StyledBox } from '../common/Contents';
import { ListItem, ListItemText } from '../common/List';
import Moment from 'react-moment';
import { Checkbox } from '@material-ui/core';

const StudyTimeListItem = ({ studyTimeItem, acceptTime }) => {
  const { time, image } = studyTimeItem;
  const [accept, setAccept] = useState(false);
  const url = image instanceof Blob && window.URL.createObjectURL(image);

  const handleCheck = (e) => {
    e.preventDefault();
    setAccept(!accept);
    acceptTime({ time });
  };

  return (
    <StyledBox $borderb>
      <ListItem quarter>
        <ListItemText>
          <Moment date={time} format="YYYY.MM.DD hh:mm:ss" />
        </ListItemText>
      </ListItem>
      <ListItem fullwidth>
        {url && <img src={url} alt="이미지를 불러오지 못했습니다." />}
      </ListItem>
      <ListItem quarter>
        <Checkbox
          checked={accept}
          onClick={handleCheck}
          disabled={accept}
          color="primary"
          style={{
            transform: 'scale(2)',
          }}
        />
      </ListItem>
    </StyledBox>
  );
};

export default React.memo(
  StudyTimeListItem,
  (prevProps, nextProps) => prevProps.studyTime === nextProps.studyTime,
);
