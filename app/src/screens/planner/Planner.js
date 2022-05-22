import React, { useState, useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { readPlanner, unloadPlanner } from '../../modules/planner';
import { getUserInfo } from '../../modules/userInfo';
import { changeField } from '../../modules/plan';
import { removePlan } from '../../libs/api/planner';
import { Picker } from '@react-native-picker/picker';

const COLORS = ['bg-cyan-400', 'bg-cyan-100', 'bg-cyan-200', 'bg-cyan-300'];

const Plan = ({ plan, index, deletePlan, plannerOwner }) => {
  const color = COLORS[index % 5];
  return (
    <View
      style={tw.style(
        color,
        'flex-row w-full items-center justify-between rounded-sm p-3',
      )}
    >
      <Text style={tw`mr-auto flex-1`}>{plan.subject}</Text>
      {plannerOwner && (
        <TouchableOpacity
          style={tw`w-6 h-6`}
          onPress={() => deletePlan(plan.subject, index)}
        >
          <MaterialCommunityIcons name="close" size={24} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const PlanList = ({ plans, setShowAddPlan, deletePlan, plannerOwner }) => {
  return (
    <ScrollView style={tw`w-full`} showsVerticalScrollIndicator={false}>
      {plans?.map((plan, index) => (
        <Plan
          plan={plan}
          index={index}
          key={index}
          deletePlan={deletePlan}
          plannerOwner={plannerOwner}
        />
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
              parseInt((hour + minute) * 100) >=
                parseInt(plans[j].startTime.split(':').join('')) &&
              parseInt((hour + minute) * 100) <
                parseInt(plans[j].endTime.split(':').join(''))
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

  const dispatch = useDispatch();
  const { plans, plan, user, info } = useSelector(
    ({ planner, plan, user, userInfo }) => ({
      plans: planner.plans,
      plan: plan.plan,
      user: user.user,
      info: userInfo.info,
    }),
  );

  // 멘토면 멘티ID, 멘티면 본인ID
  const [id, setId] = useState();

  useEffect(() => {
    setId(
      info?.menteeList.length !== 0 ? info?.menteeList[0].id : user?.userId,
    );
  }, [info, user, setId]);

  // 날짜 변경 시 새 플래너 요청, 플랜 날짜 변경
  useEffect(() => {
    dispatch(
      changeField({
        key: 'date',
        value: date,
      }),
    );
    dispatch(
      readPlanner({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        userId: id ? id : user?.userId,
      }),
    );
    return () => {
      dispatch(unloadPlanner());
    };
  }, [dispatch, date, user, id]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowCalendar(false);
    if (currentDate) {
      setDate(currentDate);
    }
  };

  // 삭제요청 전송
  const onRemove = async ({ subject, year, month, day }) => {
    try {
      await removePlan({ subject, year, month, day });
    } catch (e) {
      console.log(e);
    }
  };

  const deletePlan = (subject, index) => {
    Alert.alert('플랜 삭제', `'${subject}' 플랜을 삭제하시겠습니까?`, [
      {
        text: '삭제',
        style: 'destructive',
        onPress: () => {
          // 삭제
          onRemove({
            subject,
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
          }).then(() => {
            // 플래너 다시 로드
            dispatch(
              readPlanner({
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day: date.getDate(),
                userId: id ? id : user?.userId,
              }),
            );
          });
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

  // const [copyPlans, setCopyPlans] = useState([
  //   {
  //     subject: '리액트',
  //     date: date,
  //     startTime: '09:00:00',
  //     endTime: '10:00:00',
  //   },
  //   {
  //     subject: '스프링',
  //     date: date,
  //     startTime: '10:30:00',
  //     endTime: '12:00:00',
  //   },
  //   {
  //     subject: '파이썬',
  //     date: date,
  //     startTime: '14:00:00',
  //     endTime: '15:00:00',
  //   },
  //   {
  //     subject: '산학협력캡스톤설계1',
  //     date: date,
  //     startTime: '16:00:00',
  //     endTime: '17:00:00',
  //   },
  // ]);

  return (
    <Provider>
      <ContentsBlock>
        {user?.role === '멘토' && info?.menteeList.length !== 0 ? (
          <View
            style={tw`w-full h-10 flex-row border border-cyan-600 rounded mt-3 items-center bg-white`}
          >
            <Picker
              style={tw`flex-1`}
              selectedValue={id}
              onValueChange={(value) => {
                setId(value);
              }}
              mode="dropdown"
            >
              {info?.menteeList.map((mentee, index) => (
                <Picker.Item
                  key={index}
                  label={
                    mentee?.school
                      ? `${mentee?.name}(${mentee?.school})`
                      : mentee?.name
                  }
                  value={mentee?.id}
                />
              ))}
            </Picker>
          </View>
        ) : (
          <View style={tw`flex-1 items-center justify-center`}>
            <Text>담당 학생이 존재하지 않습니다.</Text>
            <Button
              icon="restart"
              mode="contained"
              color="#06B6D4"
              style={tw`mt-2`}
              labelStyle={tw`text-white`}
              onPress={() => {
                dispatch(getUserInfo());
              }}
            >
              새로고침
            </Button>
          </View>
        )}
        {info?.menteeList.length !== 0 && (
          <View style={tw`flex-row flex-1`}>
            <View style={tw`flex-1 items-center`}>
              <Text style={tw`mb-2.5 mt-2`}>PLAN</Text>
              <PlanList
                plans={plans}
                setShowAddPlan={setShowAddPlan}
                deletePlan={deletePlan}
                plannerOwner={id && id === user?.userId}
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
              <ScrollView
                style={tw`w-full`}
                showsVerticalScrollIndicator={false}
              >
                <View style={tw`border border-slate-300 w-full`}>
                  {plannerHours.map((hour, i) => (
                    <Table key={i} hour={hour} plans={plans} />
                  ))}
                </View>
              </ScrollView>
            </View>
          </View>
        )}
      </ContentsBlock>
      <AddPlan
        plans={plans}
        visible={showAddPlan}
        setVisible={setShowAddPlan}
        date={date}
      />
    </Provider>
  );
};

export default Planner;
