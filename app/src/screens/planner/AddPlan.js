import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Button, Modal, Portal } from 'react-native-paper';
import { Error } from '../../components/auth/common';
import tw from 'twrnc';
import { addPlanHours, addPlanMinutes } from '../../libs/constants';
import { Picker } from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';
import { addPlan } from '../../libs/api/planner';
import { readPlanner } from '../../modules/planner';

const AddPlan = ({ id, plans, setVisible, visible, date }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    startHour: addPlanHours[0].value,
    startMinute: addPlanMinutes[0].value,
    endHour: addPlanHours[0].value,
    endMinute: addPlanMinutes[0].value,
  });
  const { startHour, startMinute, endHour, endMinute } = state;
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { subject: '' },
    mode: 'onChange',
  });
  const asyncAdd = async (plan) => {
    try {
      await addPlan(plan);
    } catch (e) {
      console.log(e);
    }
  };
  const onValid = (validForm) => {
    // 백엔드로 전송
    // swr mutate
    const data = {
      ...validForm,
      startTime: startHour + ':' + startMinute + ':00',
      endTime: endHour + ':' + endMinute + ':00',
      date,
    };
    const { startTime, endTime } = {
      startTime: startHour + startMinute,
      endTime: startHour + startMinute,
    };
    if (parseInt(data.startTime) >= parseInt(data.endTime)) {
      Alert.alert('오류', '종료시간을 시작시간 이후로 선택해주세요.');
      return;
    }
    for (let i = 0; i < plans.length; i++) {
      if (
        // 시작시간이 다른 플랜 안쪽
        (parseInt(startTime) >=
          parseInt(plans[i].startTime.split(':').join('')) &&
          parseInt(startTime) <
            parseInt(plans[i].endTime.split(':').join(''))) ||
        // 종료시간이 다른 플랜 안쪽
        (parseInt(endTime) > parseInt(plans[i].startTime.split(':').join('')) &&
          parseInt(endTime) <=
            parseInt(plans[i].endTime.split(':').join(''))) ||
        // 다른 플랜을 포함
        (parseInt(startTime) <=
          parseInt(plans[i].startTime.split(':').join('')) &&
          parseInt(endTime) >= parseInt(plans[i].endTime.split(':').join('')))
      ) {
        Alert.alert('오류', '동시간에 다른 플랜이 존재합니다.');
        return;
      }
    }
    console.log(data);
    asyncAdd(data).then(() => {
      dispatch(
        readPlanner({
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate(),
          userId: id ?? user?.userId,
        }),
      );
      setIsAddPlan(false);
    });
    setVisible(false);
  };
  const onDismiss = () => {
    setVisible(false);
    reset();
  };
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={tw`bg-white p-10 rounded-sm w-11/12`}
        style={tw`items-center`}
      >
        <Controller
          control={control}
          rules={{
            required: '과목을 입력하세요',
            maxLength: {
              message: '최대 입력 길이를 초과하였습니다.',
              value: 30,
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="과목"
              mode="outlined"
              style={tw`bg-white`}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.subject}
              returnKeyType="done"
              activeOutlineColor="#06B6D4"
            />
          )}
          name="subject"
        />
        {errors.subject && <Error>{errors.subject?.message}</Error>}
        <View
          style={tw`w-full flex-row border rounded mt-3 p-2 items-center bg-gray-100`}
        >
          <Text style={tw`mr-4`}>시작</Text>
          <View style={tw`flex-1 border rounded border-gray-300 mx-2 bg-white`}>
            <Picker
              style={tw`-my-2`}
              selectedValue={startHour}
              onValueChange={(value) => {
                setState({ ...state, startHour: value });
              }}
              mode="dropdown"
            >
              {addPlanHours.map((data, i) => (
                <Picker.Item key={i} label={data.label} value={data.value} />
              ))}
            </Picker>
          </View>

          <View style={tw`flex-1 border rounded border-gray-300 bg-white`}>
            <Picker
              style={tw`-my-2`}
              selectedValue={startMinute}
              onValueChange={(value) => {
                setState({ ...state, startMinute: value });
              }}
              mode="dropdown"
            >
              {addPlanMinutes.map((data, i) => (
                <Picker.Item key={i} label={data.label} value={data.value} />
              ))}
            </Picker>
          </View>
        </View>
        <View
          style={tw`w-full flex-row border rounded mt-3 p-2 items-center bg-gray-100`}
        >
          <Text style={tw`mr-4`}>종료</Text>
          <View style={tw`flex-1 border rounded border-gray-300 mx-2 bg-white`}>
            <Picker
              style={tw`-my-2`}
              selectedValue={endHour}
              onValueChange={(value) => {
                setState({ ...state, endHour: value });
              }}
              mode="dropdown"
            >
              {addPlanHours.map((data, i) => (
                <Picker.Item key={i} label={data.label} value={data.value} />
              ))}
            </Picker>
          </View>

          <View style={tw`flex-1 border rounded border-gray-300 bg-white`}>
            <Picker
              style={tw`-my-2`}
              selectedValue={endMinute}
              onValueChange={(value) => {
                setState({ ...state, endMinute: value });
              }}
              mode="dropdown"
            >
              {addPlanMinutes.map((data, i) => (
                <Picker.Item key={i} label={data.label} value={data.value} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={tw`flex-row`}>
          <Button
            mode="contained"
            onPress={handleSubmit(onValid)}
            style={tw.style(`bg-gray-600 mt-3 justify-center flex-1`, {
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            })}
            labelStyle={tw`text-base font-bold`}
          >
            추가
          </Button>
          <Button
            mode="contained"
            onPress={onDismiss}
            style={tw.style(`bg-gray-600 mt-3 justify-center flex-1`, {
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            })}
            labelStyle={tw`text-base font-bold`}
          >
            취소
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default AddPlan;
