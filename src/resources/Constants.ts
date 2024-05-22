import {isIOS} from '@src/base/common';
import {hasNotch} from 'react-native-device-info';

const Constants = {
  keyboardVerticalOffset: isIOS() ? (hasNotch() ? 24 : 0) + 64 : 0,
  termsUrl: '',
  GOOGLE_API_KEY: 'AIzaSyB4yZZRerGOQBPXJZFzgELpVWDg7bl00PY',
};
export default Constants;
