import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Achievement from '../screens/Achievement';
import Header from '../components/common/Header';
import Message from '../screens/Message';
import Planner from '../screens/Planner';
import Ranking from '../screens/Ranking';
import Setting from '../screens/Setting';
import Timer from '../screens/Timer';

const Stack = createStackNavigator();

export const HomeStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ header: Header }}>
      <Stack.Screen name="Home" component={Home} options={{ title: '홈' }} />
    </Stack.Navigator>
  );
};

export const AchievementStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ header: Header }}>
      <Stack.Screen
        name="Achievement"
        component={Achievement}
        options={{ title: '도전과제' }}
      />
    </Stack.Navigator>
  );
};

export const MessageStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ header: Header }}>
      <Stack.Screen
        name="Message"
        component={Message}
        options={{ title: '메시지' }}
      />
    </Stack.Navigator>
  );
};

export const PlannerStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ header: Header }}>
      <Stack.Screen
        name="Planner"
        component={Planner}
        options={{ title: '플래너' }}
      />
    </Stack.Navigator>
  );
};

export const RankingStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ header: Header }}>
      <Stack.Screen
        name="Ranking"
        component={Ranking}
        options={{ title: '랭킹' }}
      />
    </Stack.Navigator>
  );
};

export const SettingStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ header: Header }}>
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{ title: '설정' }}
      />
    </Stack.Navigator>
  );
};

export const TimerStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ header: Header }}>
      <Stack.Screen
        name="Timer"
        component={Timer}
        options={{
          title: '타이머',
        }}
      />
    </Stack.Navigator>
  );
};
