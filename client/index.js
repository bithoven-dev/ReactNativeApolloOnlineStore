/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-community/async-storage';

import App from './src/App';
import {name as appName} from './app.json';

Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure()
  .useReactNative()
  .connect();

AppRegistry.registerComponent(appName, () => App);
