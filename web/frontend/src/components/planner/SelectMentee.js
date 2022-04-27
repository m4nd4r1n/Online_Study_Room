import React from 'react';
import { Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';

const SelectMentee = ({ menteeList, menteeId, handleChange }) => {
  const testMenteeList = [
    {
      id: '1234',
      school: '서울중',
      name: '박서울',
      state: '학습중',
      messengerId: 'messengerId1',
    },
    {
      id: '5678',
      school: '부산고',
      name: '김부산',
      state: '오프라인',
      messengerId: 'messengerId2',
    },
  ];

  return (
    <div className="mx-auto mb-[5px] w-full max-w-2xl items-center justify-center px-4 text-center">
      <FormControl className="flex w-full" variant="standard">
        <InputLabel id="mentee-select-label">Mentee</InputLabel>
        <Select
          className="flex w-full"
          id="mentee-select"
          value={menteeId}
          label="Mentee"
          onChange={handleChange}
        >
          {testMenteeList.map((mentee, index) => (
            <MenuItem value={mentee.id} key={index}>
              {mentee.name}({mentee.school})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectMentee;
