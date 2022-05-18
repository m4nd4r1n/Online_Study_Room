import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStackNavigation } from './navigations/authStack';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from './modules';
import { tempSetUser, check } from './modules/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setCookie } from './libs/api/client';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

async function loadUser() {
  try {
    const cookie = await AsyncStorage.getItem('cookie');
    setCookie(cookie);
    const user = await AsyncStorage.getItem('@user');
    if (!user) return;
    store.dispatch(tempSetUser(JSON.parse(user)));
    store.dispatch(check());
  } catch (e) {
    console.log('localStorage is not working');
  }
}

sagaMiddleware.run(rootSaga);
loadUser();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthStackNavigation />
        <StatusBar style="light" />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
