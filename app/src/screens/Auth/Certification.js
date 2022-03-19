import React from 'react';
import IMP, { IMPConst } from 'iamport-react-native';
import { ActivityIndicator } from 'react-native';

const Certification = ({ route, navigation: { navigate } }) => {
  const USERCODE = 'imp34059711';
  const data = {
    merchant_uid: `mid_${new Date().getTime()}`,
    m_redirect_url: IMPConst.M_REDIRECT_URL,
  };
  return (
    <IMP.Certification
      userCode={USERCODE}
      data={data}
      loading={<ActivityIndicator color="white" size="large" />}
      callback={(response) => {
        if (route.params.authType === 'find') {
          navigate('Find', { ...response });
        } else if (route.params.authType === 'register') {
          navigate('Register', { ...response, type: route.params.type });
        }
      }}
    />
  );
};

export default Certification;
