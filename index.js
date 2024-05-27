/**
 * @format
 */
import axios from 'axios';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.headers.post['Content-Type'] = 'application/json';
export const IMAGE_BASE_URL = 'https://erp.alphasius.com/';
