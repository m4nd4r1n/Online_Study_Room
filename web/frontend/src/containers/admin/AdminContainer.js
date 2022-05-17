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
  );
  const { data: allMenteeList } = useSWR(['/api/admin/mentee', ''], fetcher);

  const testMentorList = [
    { mtrId: 'mentor1@asd.com', name: '멘토1', phone: '010-1111-1111' },
    { mtrId: 'mentor2@asd.com', name: '멘토2', phone: '010-2222-2222' },
    { mtrId: 'mentor3@asd.com', name: '멘토3', phone: '010-3333-3333' },
    { mtrId: 'mentor4@asd.com', name: '멘토4', phone: '010-4444-4444' },
    { mtrId: 'mentor5@asd.com', name: '멘토5', phone: '010-6666-6666' },
    { mtrId: 'mentor6@asd.com', name: '멘토6', phone: '010-7777-7777' },
    { mtrId: 'mentor7@asd.com', name: '멘토7', phone: '010-8888-8888' },
    { mtrId: 'mentor8@asd.com', name: '멘토8', phone: '010-9999-9999' },
    { mtrId: 'mentor9@asd.com', name: '멘토9', phone: '010-0000-0000' },
  ];

  const testMenteeList = [
    {
      mteId: 'mentee1@asd.com',
      name: '멘티1',
      school: '1',
      phone: '010-5555-5555',
    },
    {
      mteId: 'mentee2@asd.com',
      name: '멘티2',
      school: '2',
      phone: '010-5555-5555',
    },
    {
      mteId: 'mentee3@asd.com',
      name: '멘티3',
      school: '3',
      phone: '010-5555-5555',
    },
    {
      mteId: 'mentee4@asd.com',
      name: '멘티4',
      school: '4',
      phone: '010-5555-5555',
    },
    {
      mteId: 'mentee5@asd.com',
      name: '멘티5',
      school: '5',
      phone: '010-6666-6666',
    },
    {
      mteId: 'mentee6@asd.com',
      name: '멘티6',
      school: '6',
      phone: '010-7777-7777',
    },
    {
      mteId: 'mentee7@asd.com',
      name: '멘티7',
      school: '7',
      phone: '010-8888-8888',
    },
    {
      mteId: 'mentee8@asd.com',
      name: '멘티8',
      school: '8',
      phone: '010-9999-9999',
    },
    {
      mteId: 'mentee9@asd.com',
      name: '멘티9',
      school: '9',
      phone: '010-0000-0000',
    },
  ];

  return (
    <Admin
      mentor={mentor}
      setMentor={setMentor}
      mentorList={testMentorList}
      menteeList={testMenteeList}
      allMenteeList={testMenteeList}
    />
  );
};

export default AdminContainer;
