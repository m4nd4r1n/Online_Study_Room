import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import useInterval from '../../libs/useInterval';
import tw from 'twrnc';

const Alarm = ({ onClickTimer, time, sendNotification }) => {
  const date = new Date();
  const [hour, setHour] = useState(date.getHours());
  const [minute, setMinute] = useState(date.getMinutes());
  const [second, setSecond] = useState(date.getSeconds());
  const [delay, setDelay] = useState(1000);

  const countdown = useCallback(async () => {
    setSecond(second + 1);
    if (second === 59) {
      if (minute === 59) {
        // 23시 59분 60초
        if (hour === 23) {
          setHour(0);
          setMinute(0);
          setSecond(0);
        }
        // 59분 60초
        else {
          setHour(hour + 1);
          setMinute(0);
          setSecond(0);
        }
      }
      // 60초
      else {
        setMinute(minute + 1);
        setSecond(0);
      }
    }
    if (
      hour === time.hour &&
      minute === time.minute &&
      second === time.second
    ) {
      setDelay(null);
      await sendNotification('Online Study', '목표 시간 달성!');
    }
  }, [hour, minute, second, sendNotification]);

  useInterval(() => {
    countdown();
  }, delay);

  return (
    <>
      <View style={tw`flex-row items-center`}>
        <Text style={tw`text-3xl font-medium`}>
          {hour < 10 ? `0${hour}` : hour}
        </Text>
        <Text style={tw`mx-4`}>:</Text>
        <Text style={tw`text-3xl font-medium`}>
          {minute < 10 ? `0${minute}` : minute}
        </Text>
        <Text style={tw`mx-4`}>:</Text>
        <Text style={tw`text-3xl font-medium`}>
          {second < 10 ? `0${second}` : second}
        </Text>
      </View>
      <View style={tw`flex-row justify-between w-1/2 mt-8`}>
        <TouchableOpacity onPress={() => setDelay(null)}>
          <Text>정지</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClickTimer}>
          <Text>취소</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Alarm;
