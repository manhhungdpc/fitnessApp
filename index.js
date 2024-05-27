/**
 * @format
 */
import axios from 'axios';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

axios.defaults.baseURL = 'https://erp.alphasius.com/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
export const IMAGE_BASE_URL = 'https://erp.alphasius.com/';
