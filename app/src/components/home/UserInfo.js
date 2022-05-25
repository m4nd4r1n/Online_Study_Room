import React from 'react';
import { Text, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import tw from 'twrnc';

const InfoBar = ({ children }) => (
  <View
    style={tw`justify-between flex-row w-full items-center text-center mb-2 border-b border-gray-500 py-3`}
  >
    {children}
  </View>
);

const UserInfo = ({ user, info }) => {
  return (
    <InfoBar>
      <View style={tw`flex-0.2`}>
        <Text>{info?.name}님</Text>
      </View>
      {
        // 멘티(학생)에게만 레벨, 경험치를 보여줌
        user?.role === '멘티' && (
          <>
            <View style={tw`items-center flex-0.15`}>
              <Text>Lv. {info?.level}</Text>
            </View>
            <View style={tw`items-end flex-0.15`}>
              <Text>EXP</Text>
            </View>
            <View style={tw`flex-0.5 text-right`}>
              <ProgressBar
                progress={info?.exp ? info?.exp / 120 : 0}
                color="#1a90ff"
                style={tw`rounded-5 m-2 bg-[#E5E7EB]`}
              />
            </View>
            <View style={tw`items-end flex-0.2`}>
              <Text>{info?.exp}/120</Text>
            </View>
          </>
        )
      }
    </InfoBar>
  );
};

export default UserInfo;
