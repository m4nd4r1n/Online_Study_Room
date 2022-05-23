import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  HomeStackNavigation,
  AchievementStackNavigation,
  RankingStackNavigation,
  TimerStackNavigation,
  PlannerStackNavigation,
  MessengerStackNavigation,
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
        tabBarStyle: { display: user?.role === '학부모' ? 'none' : 'flex' },
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
      {user?.role === '멘티' && (
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
      {(user?.role === '멘토' || user?.role === '멘티') && (
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
            name="MessengerTab"
            component={MessengerStackNavigation}
            options={{
              tabBarIcon: (props) => (
                <MaterialCommunityIcons name="message-text" {...props} />
              ),
              tabBarLabel: '메시지',
              title: '메신저',
            }}
          />
        </>
      )}
      <Tab.Screen
        name="MessageTab"
        component={MessageStackNavigation}
        options={{
          tabBarIcon: (props) => (
            <MaterialCommunityIcons name="message" {...props} />
          ),
          tabBarItemStyle: { display: 'none' },
          tabBarStyle: { display: 'none' },
        }}
      />
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
