import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStackNavigation } from './navigations/authStack';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from './modules';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

function loadUser() {
  try {
    const user = localStorage.getItem('user');
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
