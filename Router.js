import React from 'react';
import { StackNavigator } from 'react-navigation';
import Home from './src/routes/Home';

const Router = StackNavigator({
  Home: { screen: Home, navigationOptions: () => ({ title: 'Home' }) },
});

export default Router;
