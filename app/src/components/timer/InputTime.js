import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import {
  alarmHours,
  timerHours,
  minutesAndSeconds,
} from '../../libs/constants';
import { Picker } from '@react-native-picker/picker';

const InputTime = ({
  changeTimer,
  isTimer,
  onClickTimer,
  time: { hour, minute, second },
  setTime,
}) => {
  return (
    <>
      <View style={tw`flex-row items-center`}>
        <View style={tw`flex-1 border rounded border-gray-300 mx-2 bg-white`}>
          <Picker
            style={tw`-my-2`}
            selectedValue={hour}
            onValueChange={(value) => {
              setTime((state) => ({ ...state, hour: value }));
            }}
            mode="dropdown"
          >
            {isTimer
              ? timerHours.map((data, i) => (
                  <Picker.Item key={i} label={data.label} value={data.value} />
                ))
              : alarmHours.map((data, i) => (
                  <Picker.Item key={i} label={data.label} value={data.value} />
                ))}
          </Picker>
        </View>
        <Text style={tw`mx-2`}>:</Text>
        <View style={tw`flex-1 border rounded border-gray-300 mx-2 bg-white`}>
          <Picker
            style={tw`-my-2`}
            selectedValue={minute}
            onValueChange={(value) => {
              setTime((state) => ({ ...state, minute: value }));
            }}
            mode="dropdown"
          >
            {minutesAndSeconds.map((data, i) => (
              <Picker.Item key={i} label={data.label} value={data.value} />
            ))}
          </Picker>
        </View>
        <Text style={tw`mx-2`}>:</Text>
        <View style={tw`flex-1 border rounded border-gray-300 mx-2 bg-white`}>
          <Picker
            style={tw`-my-2`}
            selectedValue={second}
            onValueChange={(value) => {
              setTime((state) => ({ ...state, second: value }));
            }}
            mode="dropdown"
          >
            {minutesAndSeconds.map((data, i) => (
              <Picker.Item key={i} label={data.label} value={data.value} />
            ))}
          </Picker>
        </View>
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
