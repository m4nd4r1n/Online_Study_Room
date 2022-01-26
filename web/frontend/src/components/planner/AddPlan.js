import React from 'react';
import { InputBlock, StyledInput } from '../common/Input';
import styled, { css } from 'styled-components';
import Select from 'react-select';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';

const PlanBlock = styled(InputBlock)`
  width: 240px;
  padding: 5px;
  background-color: ${palette.LightSteelBlue};
  border: 1px solid ${palette.gray[6]};
  border-radius: 4px;
  justify-content: space-between;
`;

const InputLabel = styled.div`
  display: flex;
  height: 38px;
  align-items: center;
  padding: 4px;
  font-weight: bold;

  ${(props) =>
    props.input &&
    css`
      height: 48px;
    `};
`;

const ErrorMessage = styled.div`
  width: 240px;
  display: flex;
  color: red;
  justify-content: center;
  font-size: 0.875rem;
  margin-top: 1rem;
  white-space: pre-wrap;
`;

const hours = [
  { value: '00', label: '0시' },
  { value: '01', label: '1시' },
  { value: '02', label: '2시' },
  { value: '03', label: '3시' },
  { value: '04', label: '4시' },
  { value: '05', label: '5시' },
  { value: '06', label: '6시' },
  { value: '07', label: '7시' },
  { value: '08', label: '8시' },
  { value: '09', label: '9시' },
  { value: '10', label: '10시' },
  { value: '11', label: '11시' },
  { value: '12', label: '12시' },
  { value: '13', label: '13시' },
  { value: '14', label: '14시' },
  { value: '15', label: '15시' },
  { value: '16', label: '16시' },
  { value: '17', label: '17시' },
  { value: '18', label: '18시' },
  { value: '19', label: '19시' },
  { value: '20', label: '20시' },
  { value: '21', label: '21시' },
  { value: '22', label: '22시' },
  { value: '23', label: '23시' },
];
const minutes = [
  { value: '00', label: '00분' },
  { value: '10', label: '10분' },
  { value: '20', label: '20분' },
  { value: '30', label: '30분' },
  { value: '40', label: '40분' },
  { value: '50', label: '50분' },
];

const AddPlan = ({
  setIsAddPlan,
  plan,
  onChange,
  onSelect,
  onSubmit,
  addError,
}) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <PlanBlock>
          <InputLabel input>과목</InputLabel>
          <StyledInput
            name="subject"
            type="text"
            style={{ width: '180px' }}
            onChange={onChange}
            value={plan.subject}
            maxLength={10}
            required
          />
        </PlanBlock>
        <PlanBlock>
          <InputLabel>시작</InputLabel>
          <Select
            options={hours}
            defaultValue={hours[0]}
            name="startHour"
            placeholder="시"
            onChange={onSelect}
          />
          <Select
            options={minutes}
            defaultValue={minutes[0]}
            name="startMinute"
            placeholder="분"
            onChange={onSelect}
          />
        </PlanBlock>
        <PlanBlock>
          <InputLabel>종료</InputLabel>
          <Select
            options={hours}
            defaultValue={hours[0]}
            name="endHour"
            placeholder="시"
            onChange={onSelect}
          />
          <Select
            options={minutes}
            defaultValue={minutes[0]}
            name="endMinute"
            placeholder="분"
            onChange={onSelect}
          />
        </PlanBlock>
        {addError && <ErrorMessage>{addError}</ErrorMessage>}
        <div
          style={{
            display: 'flex',
            width: '240px',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '1rem',
          }}
        >
          <Button
            left
            style={{
              width: '120px',
              height: '40px',
              borderRadious: '0px',
              borderTopRightRadious: '0px',
              borderBottomRightRadious: '0px',
            }}
          >
            추가
          </Button>
          <Button
            right
            style={{
              width: '120px',
              height: '40px',
            }}
            onClick={() => setIsAddPlan(false)}
          >
            취소
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddPlan;
