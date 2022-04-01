import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import useInterval from '../../libs/useInterval';
import tw from 'twrnc';

const Timer = ({ onClickTimer, inputTime, time, sendNotification }) => {
  const [hour, setHour] = useState(time.hour);
  const [minute, setMinute] = useState(time.minute);
  const [second, setSecond] = useState(time.second);
  const [pause, setPause] = useState(true);
  const [delay, setDelay] = useState(1000);

  const pauseTimer = () => {
    if (hour === 0 && minute === 0 && second === 0) onClickTimer();
    setPause(!pause);
  };

  const countdown = useCallback(async () => {
    if (minute >= 0 && second > 0) {
      setSecond(second - 1);
    }
    if (second === 0) {
      if (minute === 0) {
        // 시 분 초 0
        if (hour === 0) {
          setPause(true);
          await sendNotification('Online Study', '타임아웃!');
        }
        // 분 초 0
        else {
          setHour(hour - 1);
          setMinute(59);
          setSecond(59);
        }
      }
      // 초 0
      else {
        setMinute(minute - 1);
        setSecond(59);
      }
    }
  }, [hour, minute, second, sendNotification]);

  useInterval(() => {
    countdown();
  }, delay);

  useEffect(() => {
    if (pause) setDelay(null);
    else setDelay(1000);
  }, [pause]);

  useEffect(() => {
    if (!inputTime) setPause(false);
  }, [inputTime]);
  return (
    <>
      <View style={tw`flex-row items-center`}>
        <Text style={tw`flex-1 text-3xl text-center font-medium`}>
          {hour < 10 ? `0${hour}` : hour}
        </Text>
        <Text style={tw`mx-2`}>:</Text>
        <Text style={tw`flex-1 text-3xl text-center font-medium`}>
          {minute < 10 ? `0${minute}` : minute}
        </Text>
        <Text style={tw`mx-2`}>:</Text>
        <Text style={tw`flex-1 text-3xl text-center font-medium`}>
          {second < 10 ? `0${second}` : second}
        </Text>
      </View>
      <View style={tw`flex-row justify-between w-1/2 mt-8`}>
        <TouchableOpacity onPress={pauseTimer}>
          <Text>{pause ? '재개' : '일시정지'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClickTimer}>
          <Text>취소</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Timer;
