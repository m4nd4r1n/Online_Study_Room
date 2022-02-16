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

const App = () => {
  return (
    <Routes>
      <Route element={<HomePage />} path="/" />
      <Route element={<HomePage />} path="home" />
      <Route element={<LoginPage />} path="login" />
      <Route element={<FindPage />} path="find" />
      <Route element={<RegisterPage />} path="register" />
      <Route element={<AchievementPage />} path="achievement" />
      <Route element={<MentiManagementPage />} path="management" />
      <Route element={<StudyTimeManagementPage />} path="timeManagement" />
      <Route element={<MessengerListPage />} path="messenger" />
      <Route element={<MessengerPage />} path="messenger/:messengerId" />
      <Route element={<PlannerPage />} path="planner" />
      <Route element={<RankingPage />} path="ranking" />
      <Route element={<StudyPage />} path="study" />
      <Route element={<TimerPage />} path="timer" />
      <Route element={<StatisticsPage />} path="statistics" />
    </Routes>
  );
};

export default App;
