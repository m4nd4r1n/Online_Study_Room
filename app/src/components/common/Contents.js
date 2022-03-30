import tw from 'twrnc';
import { View } from 'react-native';

export const ContentsBlock = ({ children }) => (
  <View style={tw`flex-1 bg-white`}>
    <View
      style={tw`px-4 flex-1 mx-auto w-full items-center justify-center text-center bg-white max-w-2xl`}
    >
      {children}
    </View>
  </View>
);
