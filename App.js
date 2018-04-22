/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { HMAC_SECRET } from './src/secrets';
import createQRParserClass from './src/QRParser';
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
    const QRParser = createQRParserClass();
    const parser = new QRParser(HMAC_SECRET);

    const initialState = {};
    const epics = createEpics(parser);
    const epicMiddleware = createEpicMiddleware(epics);
    const store = createStore(
      reducers,
      initialState,
      composeEnhancers(
        applyMiddleware(epicMiddleware)
      )
    );
    const persistor = persistStore(store);

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
    );
  }
}
