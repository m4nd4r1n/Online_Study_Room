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
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#06B6D4',
        tabBarStyle: { display: user?.type === 'parent' ? 'none' : 'flex' },
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
      {user?.type === 'mentee' && (
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
      {(user?.type === 'mentor' || user?.type === 'mentee') && (
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
