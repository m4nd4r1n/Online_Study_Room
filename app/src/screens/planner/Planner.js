import React, { useState } from 'react';
import {
  Text,
  View,
  Platform,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Button, Provider } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import tw from 'twrnc';
import { ContentsBlock } from '../../components/common/Contents';
import { plannerHours } from '../../libs/constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AddPlan from './AddPlan';

const COLORS = ['bg-cyan-400', 'bg-cyan-100', 'bg-cyan-200', 'bg-cyan-300'];

const Plan = ({ plan, index, deletePlan }) => {
  const color = COLORS[index % 5];
  return (
    <View
      style={tw.style(
        color,
        'flex-row w-full items-center justify-between rounded-sm p-3',
      )}
    >
      <Text style={tw`mr-auto flex-1`}>{plan.subject}</Text>
      <TouchableOpacity
        style={tw`w-6 h-6`}
        onPress={() => deletePlan(plan.subject, index)}
      >
        <MaterialCommunityIcons name="close" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const PlanList = ({ plans, setShowAddPlan, deletePlan }) => {
  return (
    <ScrollView style={tw`w-full`} showsVerticalScrollIndicator={false}>
      {plans?.map((plan, index) => (
        <Plan plan={plan} index={index} key={index} deletePlan={deletePlan} />
      ))}
      <View
        style={tw`bg-gray-700 flex-row w-full items-center justify-between rounded-sm p-3`}
      >
        <Text style={tw`text-center text-white`}>플랜 추가</Text>
        <TouchableOpacity
          style={tw`w-6 h-6`}
          onPress={() => setShowAddPlan(true)}
        >
          <MaterialCommunityIcons name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const Table = ({ hour, plans }) => {
  return (
    <View style={tw`flex-row w-full`}>
      <View
        style={tw.style(
          `h-6 flex-1 border-r items-center justify-center border-slate-300`,
          hour !== '04' && 'border-b',
        )}
      >
        <Text>{hour}</Text>
      </View>
      {['00', '10', '20', '30', '40', '50'].map((minute, i) => {
        let color;
        if (plans) {
          for (let j = 0; j < plans.length; j++) {
            if (
              parseInt(hour + minute) >= parseInt(plans[j].startTime) &&
              parseInt(hour + minute) < parseInt(plans[j].endTime)
            )
              color = COLORS[j];
          }
        }
        return (
          <View
            style={tw.style(
              color,
              'flex-row h-6 flex-1  border-slate-300',
              minute !== '50' && 'border-r',
              hour !== '04' && 'border-b',
            )}
            key={i}
          ></View>
        );
      })}
    </View>
  );
};

const Planner = () => {
  const [date, setDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [showAddPlan, setShowAddPlan] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowCalendar(false);
    if (currentDate) {
      setDate(currentDate);
    }
  };

  const deletePlan = (subject, index) => {
    Alert.alert('플랜 삭제', `'${subject}' 플랜을 삭제하시겠습니까?`, [
      {
        text: '삭제',
        style: 'destructive',
        onPress: () => {
          const newPlans = [...copyPlans];
          newPlans.splice(index, 1);
          setCopyPlans(newPlans);
        },
      },
      { text: '취소' },
    ]);
  };

  const showMode = () => {
    setShowCalendar(true);
  };
  const showDatepicker = () => {
    showMode('date');
  };

  const [copyPlans, setCopyPlans] = useState([
    {
      subject: '리액트',
      date: date,
      startTime: '0900',
      endTime: '1000',
    },
    {
      subject: '스프링',
      date: date,
      startTime: '1030',
      endTime: '1200',
    },
    {
      subject: '파이썬',
      date: date,
      startTime: '1400',
      endTime: '1500',
    },
    {
      subject: '산학협력캡스톤설계1',
      date: date,
      startTime: '1600',
      endTime: '1700',
    },
  ]);

  return (
    <Provider>
      <ContentsBlock>
        <View style={tw`flex-row flex-1`}>
          <View style={tw`flex-1 items-center`}>
            <Text style={tw`mb-2.5 mt-2`}>PLAN</Text>
            <PlanList
              plans={copyPlans}
              setShowAddPlan={setShowAddPlan}
              deletePlan={deletePlan}
            />
          </View>
          <View style={tw`flex-1.5 ml-4 items-center`}>
            {Platform.OS === 'android' && (
              <Button onPress={showDatepicker} color="#06B6D4">
                {date?.getFullYear()}/{date?.getMonth() + 1}/{date?.getDate()}
              </Button>
            )}
            {(showCalendar || Platform.OS === 'ios') && (
              <DateTimePicker
                value={date}
                mode="date"
                is24Hour={true}
                onChange={onChange}
                style={tw`pl-28`}
                locale="ko-KR"
              />
            )}
            <ScrollView style={tw`w-full`} showsVerticalScrollIndicator={false}>
              <View style={tw`border border-slate-300 w-full`}>
                {plannerHours.map((hour, i) => (
                  <Table key={i} hour={hour} plans={copyPlans} />
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </ContentsBlock>
      <AddPlan
        plans={copyPlans}
        visible={showAddPlan}
        setVisible={setShowAddPlan}
        date={date}
      />
    </Provider>
  );
};

export default Planner;
