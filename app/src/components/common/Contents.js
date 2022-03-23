import tw from 'twrnc';
import { View } from 'react-native';

export const ContentsBlock = ({ children }) => (
  <View
    style={tw`px-4 mx-auto w-full items-center justify-center text-center bg-white`}
  >
    {children}
  </View>
);
