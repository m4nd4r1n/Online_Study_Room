import React from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AchievementPage from './pages/AchievementPage';
import MenteeManagementPage from './pages/MenteeManagementPage';
import MessengerListPage from './pages/MessengerListPage';
import MessengerPage from './pages/MessengerPage';
import PlannerPage from './pages/PlannerPage';
import RankingPage from './pages/RankingPage';
import RegisterPage from './pages/RegisterPage';
import StudyPage from './pages/StudyPage';
import StudyScreenPage from './pages/StudyScreenPage';
import StudyTimeManagementPage from './pages/StudyTimeManagementPage';
import TimerPage from './pages/TimerPage';
import FindPage from './pages/FindPage';
import StatisticsPage from './pages/StatisticsPage';
import SettingPage from './pages/SettingPage';
import BottomTabBarContainer from './containers/common/BottomTabBarContainer';
import NotFound from './pages/404';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

const App = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route
          element={
            <>
              <HomePage />
              <BottomTabBarContainer />
            </>
          }
          path="/"
        />
        <Route
          element={
            <>
              <AchievementPage />
              <BottomTabBarContainer />
            </>
          }
          path="achievement"
        />
        <Route element={<MenteeManagementPage />} path="management/:userId" />
        <Route
          element={<StudyTimeManagementPage />}
          path="management/time/:userId"
        />
        <Route
          element={
            <>
              <MessengerListPage />
              <BottomTabBarContainer />
            </>
          }
          path="messenger"
        />
        <Route element={<MessengerPage />} path="messenger/:messengerId" />
        <Route
          element={
            <>
              <PlannerPage />
              <BottomTabBarContainer />
            </>
          }
          path="planner/:userId"
        />
        <Route
          element={
            <>
              <PlannerPage />
              <BottomTabBarContainer />
            </>
          }
          path="planner"
        />
        <Route
          element={
            <>
              <RankingPage />
              <BottomTabBarContainer />
            </>
          }
          path="ranking"
        />
        <Route element={<StudyPage />} path="study" />
        <Route element={<StudyScreenPage />} path="study/:userId" />
        <Route
          element={
            <>
              <TimerPage />
              <BottomTabBarContainer />
            </>
          }
          path="timer"
        />
        <Route
          element={
            <>
              <StatisticsPage />
              <BottomTabBarContainer />
            </>
          }
          path="statistics/:userId"
        />
        <Route
          element={
            <>
              <StatisticsPage />
              <BottomTabBarContainer />
            </>
          }
          path="statistics"
        />
        <Route
          element={
            <>
              <SettingPage />
              <BottomTabBarContainer />
            </>
          }
          path="setting"
        />
      </Route>
      <Route element={<LoginPage />} path="login" />
      <Route element={<FindPage />} path="find" />
      <Route element={<RegisterPage />} path="register" />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
