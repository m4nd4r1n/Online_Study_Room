import React from 'react';
import { Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';

const SelectMentee = ({ menteeList, menteeId, handleChange }) => {
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
          {menteeList.map((mentee, index) => (
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
