import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { ContentsBlock } from '../components/common/Contents';
import { getRanking } from '../libs/api/ranking';
import tw from 'twrnc';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

const TextCenter = ({ children }) => (
  <Text style={tw`flex-1 text-center`}>{children}</Text>
);

const Ranking = () => {
  const setRanking = () => {
    const { data } = useSWR('/api/rank', getRanking);
    return data;
  };
  const ranks = setRanking();

  const [type, setType] = useState('time');
  const [time, setTime] = useState('day');
  const getKey = (index) =>
    `/api/ranking?page=${index + 1}&type=${type}&time=${
      type === 'time' ? time : ''
    }`;
  const { data, size, setSize } = useSWRInfinite(getKey, getRanking, {
    revalidateFirstPage: false,
    dedupingInterval: 0,
  });
  const isEnd = data && data[data.length - 1]?.length < 25;
  const issues = data ? [].concat(...data) : [];
  const onTimeClick = () => {
    if (type !== 'time') setSize(0);
    setType('time');
  };
  const onLevelClick = () => {
    if (type !== 'level') setSize(0);
    setType('level');
    setTime('day');
  };
  const onDayClick = () => {
    if (time !== 'day') setSize(0);
    setTime('day');
  };
  const onWeekClick = () => {
    if (time !== 'week') setSize(0);
    setTime('week');
  };
  const onMonthClick = () => {
    if (time !== 'month') setSize(0);
    setTime('month');
  };
  return (
    <ContentsBlock>
      <View style={tw`h-10 w-full border-b flex-row border-gray-300`}>
        <TouchableOpacity
          style={tw.style(
            'border-b-2 flex-1 justify-center items-center',
            type === 'time'
              ? ' border-cyan-500 text-cyan-400'
              : 'border-transparent text-gray-500 hover:text-gray-400',
          )}
          onPress={onTimeClick}
        >
          <Text
            style={tw.style(
              'text-lg font-medium',
              type === 'time'
                ? ' text-cyan-400'
                : ' text-gray-500 hover:text-gray-400',
            )}
          >
            학습시간
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw.style(
            'border-b-2 flex-1 justify-center items-center',
            type === 'level'
              ? ' border-cyan-500 text-cyan-400'
              : 'border-transparent text-gray-500 hover:text-gray-400',
          )}
          onPress={onLevelClick}
        >
          <Text
            style={tw.style(
              'text-lg font-medium',
              type === 'level'
                ? ' text-cyan-400'
                : ' text-gray-500 hover:text-gray-400',
            )}
          >
            레벨
          </Text>
        </TouchableOpacity>
      </View>
      {type === 'time' && (
        <View style={tw`h-10 w-full border-b flex-row border-gray-300`}>
          <TouchableOpacity
            style={tw.style(
              'border-b-2 flex-1 justify-center items-center',
              time === 'day'
                ? ' border-cyan-500 text-cyan-400'
                : 'border-transparent text-gray-500 hover:text-gray-400',
            )}
            onPress={onDayClick}
          >
            <Text
              style={tw.style(
                'text-sm font-medium',
                time === 'day'
                  ? ' text-cyan-400'
                  : ' text-gray-500 hover:text-gray-400',
              )}
            >
              일간
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw.style(
              'border-b-2 flex-1 justify-center items-center',
              time === 'week'
                ? ' border-cyan-500 text-cyan-400'
                : 'border-transparent text-gray-500 hover:text-gray-400',
            )}
            onPress={onWeekClick}
          >
            <Text
              style={tw.style(
                'text-sm font-medium',
                time === 'week'
                  ? ' text-cyan-400'
                  : ' text-gray-500 hover:text-gray-400',
              )}
            >
              주간
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw.style(
              'border-b-2 flex-1 justify-center items-center',
              time === 'month'
                ? ' border-cyan-500 text-cyan-400'
                : 'border-transparent text-gray-500 hover:text-gray-400',
            )}
            onPress={onMonthClick}
          >
            <Text
              style={tw.style(
                'text-sm font-medium',
                time === 'month'
                  ? ' text-cyan-400'
                  : ' text-gray-500 hover:text-gray-400',
              )}
            >
              월간
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={tw`my-2 h-8 w-full items-center flex-row`}>
        <TextCenter>
          {type === 'time' && time === 'day'
            ? `현재 학습중 ${ranks?.current}명`
            : ''}
        </TextCenter>
        <TextCenter>
          {type === 'time' && time === 'day'
            ? `금일 전체 ${ranks?.today}명`
            : ''}
        </TextCenter>
        <TextCenter>
          나의 등수{' '}
          {type === 'time'
            ? time === 'day'
              ? ranks?.day || 0
              : time === 'week'
              ? ranks?.week || 0
              : time === 'month'
              ? ranks?.month || 0
              : null
            : ranks?.level}
          등
        </TextCenter>
      </View>
      <View
        style={tw`w-full items-center border-b border-gray-300 py-1 flex-row`}
      >
        <TextCenter>등수</TextCenter>
        <TextCenter>정보</TextCenter>
        {type === 'time' ? (
          <TextCenter>학습시간</TextCenter>
        ) : (
          <TextCenter>레벨</TextCenter>
        )}
      </View>
      <ScrollView style={tw`w-full`} showsVerticalScrollIndicator={false}>
        {issues?.map((data, i) => (
          <View
            key={i}
            style={tw`w-full items-center border-b border-gray-300 py-1 flex-row`}
          >
            <View style={tw`flex-1 items-center`}>
              <View
                style={tw.style(
                  `justify-center w-12 h-12 items-center border-cyan-400 rounded-full border-2`,
                )}
              >
                <Text>{i + 1}</Text>
              </View>
            </View>
            <View style={tw`flex-1 justify-center items-center`}>
              <TextCenter>{data?.school}</TextCenter>
              <TextCenter>{data?.name}</TextCenter>
            </View>
            <TextCenter>
              {type === 'time' ? data?.time : data?.level}
            </TextCenter>
          </View>
        ))}
        {!isEnd && (
          <TouchableOpacity
            style={tw`w-full h-10 mt-4`}
            onPress={() => setSize(size + 1)}
          >
            <TextCenter>더보기</TextCenter>
          </TouchableOpacity>
        )}
      </ScrollView>
    </ContentsBlock>
  );
};

export default Ranking;
