import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Ranking from '../../components/ranking/Ranking';
import { useSelector } from 'react-redux';
import useSWR from 'swr';

const RankingContainer = () => {
  const navigate = useNavigate();
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  const { data } = useSWR('/api/rank');

  useEffect(() => {
    !user && navigate('/login');
  });

  return <Ranking ranks={data} />;
};

export default RankingContainer;
