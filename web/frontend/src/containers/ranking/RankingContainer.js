import React from 'react';
import Ranking from '../../components/ranking/Ranking';
import useSWR from 'swr';

const RankingContainer = () => {
  const { data } = useSWR('/api/rank');

  return <Ranking ranks={data} />;
};

export default RankingContainer;
