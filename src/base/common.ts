import {IMAGE_BASE_URL} from 'index';
import moment from 'moment';
import {Platform} from 'react-native';

const isIOS = (): boolean => {
  return Platform.OS === 'ios';
};
const isAndroid = (): boolean => {
  return Platform.OS === 'android';
};

const isToday = (dateString?: string): boolean => {
  if (dateString === undefined || dateString === null) {
    return false;
  }
  return moment().isSame(dateString, 'day');
};

const withTimeout = (millis: number) =>
  new Promise(resolve => setTimeout(resolve, millis));

const getImageWithBaseUrl = (url: string) => {
  return IMAGE_BASE_URL + url;
};

export {isAndroid, isIOS, isToday, withTimeout, getImageWithBaseUrl};
