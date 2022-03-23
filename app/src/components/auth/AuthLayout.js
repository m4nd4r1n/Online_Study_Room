import React, { useState, useEffect } from 'react';
import {
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import tw from 'twrnc';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const AuthLayout = ({ children }) => {
  const [keyboardShown, setKeyboardShown] = useState(false);
  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardShown(true);
    });
    const hide = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardShown(false);
    });
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`bg-gray-200 items-center flex-1 justify-center`}
      >
        <View
          style={tw.style('p-8 shadow-md rounded-sm bg-white', {
            width: (SCREEN_WIDTH / 20) * 19,
          })}
        >
          <ScrollView
            scrollEnabled={keyboardShown}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default AuthLayout;
