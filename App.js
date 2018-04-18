/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { Provider } from 'react-redux';
import Router from './Router';
import createEpics from './src/epics';
import reducers from './src/reducers';
import { YellowBox } from 'react-native';

// ignore some warnings...
// this one is related to react-navigation.
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default class App extends Component {
  render() {
    const initialState = {};
    const epics = createEpics();
    const epicMiddleware = createEpicMiddleware(epics);
    const store = createStore(
      reducers,
      initialState,
      composeEnhancers(
        applyMiddleware(epicMiddleware)
      )
    );

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
