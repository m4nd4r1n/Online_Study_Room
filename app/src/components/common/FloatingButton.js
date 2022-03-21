import React from 'react';
import { FAB, Portal, Provider } from 'react-native-paper';

const FloatingButton = ({ navigate }) => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <Provider>
      <Portal>
        <FAB.Group
          open={open}
          icon="menu"
          actions={[
            {
              icon: 'equalizer',
              label: '랭킹',
              onPress: () => navigate('RankingTab'),
              small: false,
            },
            {
              icon: 'trophy',
              label: '도전과제',
              onPress: () => navigate('AchievementTab'),
              small: false,
            },
            {
              icon: 'home',
              label: 'Home',
              onPress: () => navigate('HomeTab'),
              small: false,
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </Provider>
  );
};

export default FloatingButton;
