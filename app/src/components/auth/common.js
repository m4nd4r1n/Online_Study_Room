import { HelperText } from 'react-native-paper';
import tw from 'twrnc';

export const Error = ({ children }) => (
  <HelperText type="error" style={tw`-mb-2.5`}>
    {children}
  </HelperText>
);
