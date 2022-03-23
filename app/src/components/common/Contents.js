import tw from 'twrnc';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

export const ContentsBlock = ({ children }) => (
  <View
    style={tw`px-4 mx-auto w-full items-center justify-center text-center bg-white`}
  >
    <StatusBar style="auto" />
    {children}
  </View>
);
