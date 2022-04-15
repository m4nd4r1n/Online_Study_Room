import tw from 'twrnc';
import { View } from 'react-native';

export const ContentsBlock = ({ center = true, children }) => (
  <View style={tw`flex-1 bg-white`}>
    <View
      style={tw.style(
        `px-4 flex-1 mx-auto w-full items-center text-center bg-white max-w-2xl`,
        center ? 'justify-center' : '',
      )}
    >
      {children}
    </View>
  </View>
);
