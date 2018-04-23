import React from 'react';
import { StackNavigator } from 'react-navigation';
import Scanner from './src/routes/Scanner';

const Router = StackNavigator({
  Scanner: { screen: Scanner, navigationOptions: () => ({ title: 'Scanner' }) },
});

export default Router;
