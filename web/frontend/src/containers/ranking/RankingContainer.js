import React from 'react';
import Ranking from '../../components/ranking/Ranking';
import { getRanking } from '../../lib/api/ranking';
import useSWR from 'swr';

const RankingContainer = () => {
  const { data } = useSWR('/api/rank', getRanking);
  return <Ranking ranks={data} />;
};

export default RankingContainer;
