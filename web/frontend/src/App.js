import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AchievementPage from './pages/AchievementPage';
import MentiManagementPage from './pages/MentiManagementPage';
import MessengerListPage from './pages/MessengerListPage';
import MessengerPage from './pages/MessengerPage';
import PlannerPage from './pages/PlannerPage';
import RankingPage from './pages/RankingPage';
import RegisterPage from './pages/RegisterPage';
import StudyPage from './pages/StudyPage';
import StudyTimeManagementPage from './pages/StudyTimeManagementPage';
import TimerPage from './pages/TimerPage';
import FindPage from './pages/FindPage';
import StatisticsPage from './pages/StatisticsPage';
import BottomTabBar from './components/common/BottomTabBar';

const App = () => {
  return (
    <Routes>
      <Route
        element={
          <>
            <HomePage />
            <BottomTabBar />
          </>
        }
        path="/"
      />
      <Route
        element={
          <>
            <HomePage />
            <BottomTabBar />
          </>
        }
        path="home"
      />
      <Route element={<LoginPage />} path="login" />
      <Route element={<FindPage />} path="find" />
      <Route element={<RegisterPage />} path="register" />
      <Route
        element={
          <>
            <AchievementPage />
            <BottomTabBar />
          </>
        }
        path="achievement"
      />
      <Route element={<MentiManagementPage />} path="management" />
      <Route element={<StudyTimeManagementPage />} path="timeManagement" />
      <Route
        element={
          <>
            <MessengerListPage />
            <BottomTabBar />
          </>
        }
        path="messenger"
      />
      <Route element={<MessengerPage />} path="messenger/:messengerId" />
      <Route
        element={
          <>
            <PlannerPage />
            <BottomTabBar />
          </>
        }
        path="planner"
      />
      <Route
        element={
          <>
            <RankingPage />
            <BottomTabBar />
          </>
        }
        path="ranking"
      />
      <Route element={<StudyPage />} path="study" />
      <Route
        element={
          <>
            <TimerPage />
            <BottomTabBar />
          </>
        }
        path="timer"
      />
      <Route
        element={
          <>
            <StatisticsPage />
            <BottomTabBar />
          </>
        }
        path="statistics"
      />
    </Routes>
  );
};

export default App;
