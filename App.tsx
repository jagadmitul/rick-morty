import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import Home from './src/screens/Home';
import store from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <Home />
    </Provider>
  );
};

export default App;
