import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Ranking from '../../components/ranking/Ranking';
import { useSelector } from 'react-redux';

const RankingContainer = () => {
  const navigate = useNavigate();
  const { user } = useSelector(({ user }) => ({ user: user.user }));

  useEffect(() => {
    !user && navigate('/login');
  });

  return <Ranking />;
};

export default RankingContainer;
