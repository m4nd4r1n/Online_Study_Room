import React, { useRef, useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import InputTime from '../components/timer/InputTime';
import Timer from '../components/timer/Timer';
import { ContentsBlock } from '../components/common/Contents';
import Alarm from '../components/timer/Alarm';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function sendNotification(title, body) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      sound: '',
    },
    trigger: null,
  });
}

const TimerPage = () => {
  const notificationListener = useRef();
  const responseListener = useRef();
  const [time, setTime] = useState({
    hour: 0,
    minute: 0,
    second: 0,
  });
  const [inputTime, setInputTime] = useState(true);
  const [isTimer, setIsTimer] = useState(true);

  const onClickTimer = () => {
    setInputTime(!inputTime);
  };

  const changeTimer = () => {
    setTime({ hour: 0, minute: 0, second: 0 });
    setIsTimer(!isTimer);
  };

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener();

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current,
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <ContentsBlock>
      {inputTime ? (
        <InputTime
          changeTimer={changeTimer}
          isTimer={isTimer}
          onClickTimer={onClickTimer}
          time={time}
          setTime={setTime}
        />
      ) : isTimer ? (
        <Timer
          onClickTimer={onClickTimer}
          inputTime={inputTime}
          time={time}
          sendNotification={sendNotification}
        />
      ) : (
        <Alarm
          onClickTimer={onClickTimer}
          time={time}
          sendNotification={sendNotification}
        />
      )}
    </ContentsBlock>
  );
};

export default TimerPage;
