import React, { useState } from 'react';
import Admin from '../../components/admin/Admin';
import useSWR from 'swr';
import { fetcher } from '../../lib/api/admin';

const AdminContainer = () => {
  const [mentor, setMentor] = useState('');
  const { data: mentorList } = useSWR(['/api/admin/mentor', ''], fetcher);
  const { data: menteeList } = useSWR(
    ['/api/admin/mentee', `?mtrId=${mentor}`],
    fetcher,
    { dedupingInterval: 0, refreshInterval: 1000 },
  );
  const { data: allMenteeList } = useSWR(['/api/admin/mentee', ''], fetcher, {
    dedupingInterval: 0,
    refreshInterval: 1000,
  });
  return (
    <Admin
      mentor={mentor}
      setMentor={setMentor}
      mentorList={mentorList}
      menteeList={menteeList}
      allMenteeList={allMenteeList}
    />
  );
};

export default AdminContainer;
