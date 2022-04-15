import React, { useState, useEffect } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const [user, setUser] = useState('');
  useEffect(() => {
    const bootstrap = async () => {
      try {
        const data = await AsyncStorage.getItem('@user');
        console.log(data);
        setUser(data);
      } catch (e) {
        console.log(e);
      }
    };
    bootstrap();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#06B6D4',
        tabBarStyle: { display: user === '학부모' ? 'none' : 'flex' },
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
      {user === '멘티' && (
        <>
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
        </>
      )}
      {(user === '멘토' || user === '멘티') && (
        <>
          <Tab.Screen
            name="PlannerTab"
            component={PlannerStackNavigation}
            options={{
              tabBarIcon: (props) => (
                <MaterialCommunityIcons name="calendar-text" {...props} />
              ),
              tabBarLabel: '플래너',
              title: '플래너',
              tabBarHideOnKeyboard: true,
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
        </>
      )}
      <Tab.Screen
        name="SettingTab"
        component={SettingStackNavigation}
        options={{
          tabBarIcon: (props) => (
            <MaterialCommunityIcons name="cog" {...props} />
          ),
          tabBarItemStyle: { display: 'none' },
          tabBarStyle: { display: 'none' },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
