import React from 'react';
import { Appbar } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import tw from 'twrnc';

const Header = ({ navigation, route, options, back }) => {
  const title = getHeaderTitle(options, route.name);
  return (
    <Appbar.Header style={tw`bg-cyan-500 android:shadow-2xl`}>
      {back ? (
        <Appbar.BackAction onPress={() => navigation?.goBack()} />
      ) : (
        <Appbar.Action />
      )}
      <Appbar.Content title={title} style={tw`items-center`} />
      {['로그인', '찾기', '본인인증', '회원가입'].includes(title) ? (
        <Appbar.Action />
      ) : (
        <Appbar.Action
          icon="cog"
          onPress={() => navigation.navigate('SettingTab')}
        />
      )}
    </Appbar.Header>
  );
};

export default Header;
