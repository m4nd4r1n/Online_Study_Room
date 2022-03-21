import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  HomeStackNavigation,
  AchievementStackNavigation,
  RankingStackNavigation,
  TimerStackNavigation,
  PlannerStackNavigation,
  MessageStackNavigation,
  SettingStackNavigation,
} from './stacks';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from '../components/common/Header';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#06B6D4',
      }}
      initialRouteName="HomeTab"
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigation}
        options={{
          tabBarIcon: (props) => {
            return <MaterialCommunityIcons name="home" {...props} />;
          },
          tabBarLabel: '홈',
          title: '홈',
        }}
      />
      <Tab.Screen
        name="AchievementTab"
        component={AchievementStackNavigation}
        options={{
          tabBarIcon: (props) => (
            <MaterialCommunityIcons name="trophy" {...props} />
          ),
          tabBarLabel: '도전과제',
          title: '도전과제',
        }}
      />
      <Tab.Screen
        name="RankingTab"
        component={RankingStackNavigation}
        options={{
          tabBarIcon: (props) => (
            <MaterialCommunityIcons name="equalizer" {...props} />
          ),
          tabBarLabel: '랭킹',
          title: '랭킹',
        }}
      />
      <Tab.Screen
        name="TimerTab"
        component={TimerStackNavigation}
        options={{
          tabBarIcon: (props) => (
            <MaterialCommunityIcons name="timer-outline" {...props} />
          ),
          tabBarLabel: '타이머',
          title: '타이머',
        }}
      />
      <Tab.Screen
        name="PlannerTab"
        component={PlannerStackNavigation}
        options={{
          tabBarIcon: (props) => (
            <MaterialCommunityIcons name="calendar-text" {...props} />
          ),
          tabBarLabel: '플래너',
          title: '플래너',
        }}
      />
      <Tab.Screen
        name="MessageTab"
        component={MessageStackNavigation}
        options={{
          tabBarIcon: (props) => (
            <MaterialCommunityIcons name="message-text" {...props} />
          ),
          tabBarLabel: '메시지',
          title: '메시지',
        }}
      />
      <Tab.Screen
        name="SettingTab"
        component={SettingStackNavigation}
        options={{
          tabBarIcon: (props) => (
            <MaterialCommunityIcons name="cog" {...props} />
          ),
          tabBarLabel: '설정',
          title: '설정',
          tabBarItemStyle: { display: 'none' },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
