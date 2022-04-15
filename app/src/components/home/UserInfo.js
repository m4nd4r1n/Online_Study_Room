import React from 'react';
import { Text, View } from 'react-native';
import tw from 'twrnc';

const InfoBar = ({ children }) => (
  <View
    style={tw`justify-between flex-row w-full items-center text-center mb-2 border-b border-gray-500 py-3`}
  >
    {children}
  </View>
);

const printExp = (ExpRatio) => {
  const exp = '■';
  let ExpBar = '';
  for (let i = 0; i < ExpRatio * 10; i++) {
    ExpBar += exp;
  }
  return ExpBar;
};

const UserInfo = ({ user }) => {
  const testInfo = { type: 'mentee', name: '김겨울', level: '8', exp: 60 };

  return (
    <InfoBar>
      <View style={tw`flex-0.2`}>
        <Text>{testInfo.name}님</Text>
      </View>
      {
        // 멘티(학생)에게만 레벨, 경험치를 보여줌
        user === '멘티' && (
          <>
            <View style={tw`items-center flex-0.15`}>
              <Text>Lv. {testInfo.level}</Text>
            </View>
            <View style={tw`items-end flex-0.15`}>
              <Text>EXP</Text>
            </View>
            <View style={tw`flex-0.5 text-right`}>
              <Text>{printExp(testInfo.exp / 120)}</Text>
            </View>
            <View style={tw`items-end flex-0.2`}>
              <Text>{testInfo.exp}/120</Text>
            </View>
          </>
        )
      }
    </InfoBar>
  );
};

export default UserInfo;
