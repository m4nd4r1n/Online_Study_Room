import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  alarmHours,
  timerHours,
  minutesAndSeconds,
} from '../../libs/constants';

const InputTime = ({
  changeTimer,
  isTimer,
  onClickTimer,
  time: { hour, minute, second },
  setTime,
}) => {
  const [hourOpen, setHourOpen] = useState(false);
  const [minuteOpen, setMinuteOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const [start, setStart] = useState(false);
  const onHourOpen = useCallback(() => {
    setMinuteOpen(false);
    setSecondOpen(false);
  }, []);
  const onMinuteOpen = useCallback(() => {
    setHourOpen(false);
    setSecondOpen(false);
  }, []);
  const onSecondOpen = useCallback(() => {
    setMinuteOpen(false);
    setHourOpen(false);
  }, []);
  const setHour = (callback) => {
    setTime((state) => ({ ...state, hour: callback(state.hour) }));
  };
  const setMinute = (callback) => {
    setTime((state) => ({ ...state, minute: callback(state.minute) }));
  };
  const setSecond = (callback) => {
    setTime((state) => ({ ...state, second: callback(state.second) }));
  };
  return (
    <>
      <View style={tw`flex-row items-center`}>
        <DropDownPicker
          open={hourOpen}
          value={hour}
          setOpen={setHourOpen}
          setValue={setHour}
          items={isTimer ? timerHours : alarmHours}
          containerStyle={tw`w-1/4`}
          placeholder="시"
          closeOnBackPressed
          autoScroll
          onOpen={onHourOpen}
        />
        <Text style={tw`mx-4`}>:</Text>
        <DropDownPicker
          open={minuteOpen}
          value={minute}
          setOpen={setMinuteOpen}
          setValue={setMinute}
          items={minutesAndSeconds}
          containerStyle={tw`w-1/4`}
          placeholder="분"
          closeOnBackPressed
          autoScroll
          onOpen={onMinuteOpen}
        />
        <Text style={tw`mx-4`}>:</Text>
        <DropDownPicker
          open={secondOpen}
          value={second}
          setOpen={setSecondOpen}
          setValue={setSecond}
          items={minutesAndSeconds}
          containerStyle={tw`w-1/4`}
          placeholder="초"
          closeOnBackPressed
          autoScroll
          onOpen={onSecondOpen}
        />
      </View>
      <View style={tw`flex-row justify-between w-1/2 mt-8`}>
        <TouchableOpacity onPress={changeTimer}>
          <Text>{isTimer ? '타이머' : '알람'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClickTimer}>
          <Text>시작</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default InputTime;
