import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';
import {fetch} from '@react-native-community/netinfo';
import {AppStrings, vi} from '@src/resources/Strings';
import {LOCAL_STORAGE_KEY} from '@src/base/localStorage';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from './store';

const APP_STATUS = {
  on_load: 'Loading',
  ready: 'READY',
  obsolete: 'OBSOLETE',
};

interface AppState {
  accessToken: string | null;
  loading: boolean;
  initNotification: any;
  notification: any;
  status: string;
  networkAvailable: boolean;
  checkingNetwork: boolean;
  language: AppStrings;
  error: string | null;
  mediaPlaying?: string;
}

const initialState = {
  accessToken: null,
  loading: true,
  initNotification: false,
  notification: null,
  status: APP_STATUS.on_load,
  networkAvailable: false,
  checkingNetwork: false,
  language: vi,
  error: null,
} satisfies AppState as AppState;

const AppSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },

    setLoadingStatus(state, action) {
      state.loading = action.payload;
    },

    setInitNotification(state, action) {
      state.initNotification = action.payload;
    },

    setNotification(state, action) {
      state.notification = action.payload;
    },

    setNetworkAvailable(state, action) {
      state.networkAvailable = action.payload;
    },

    setCheckingNetwork(state, action) {
      state.checkingNetwork = action.payload;
    },

    setlanguage(state, action) {
      state.language = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    },

    setMediaPlaying(state, action) {
      state.mediaPlaying = action.payload;
    },
  },
});

export const {
  setAccessToken,
  setLoadingStatus,
  setInitNotification,
  setNotification,
  setNetworkAvailable,
  setCheckingNetwork,
  setError,
  setMediaPlaying,
} = AppSlice.actions;
export default AppSlice.reducer;

const useNetworkStatus = () => {
  return useSelector((state: RootState) => state.app.networkAvailable);
};

const useAccessToken = () => {
  return useSelector((state: RootState) => state.app.accessToken);
};

const useAppLoadingStatus = () => {
  return useSelector((state: RootState) => state.app.loading);
};

const useAppLanguage = () => {
  return useSelector((state: RootState) => state.app.language);
};

const useCheckingNetwork = () => {
  return useSelector((state: RootState) => state.app.checkingNetwork);
};

const useAppError = () => {
  return useSelector((state: RootState) => state.app.error);
};

const useMediaPlaying = () => {
  return useSelector((state: RootState) => state.app.mediaPlaying);
};

const useAppDispatch = () => useDispatch<AppDispatch>();

export {
  useNetworkStatus,
  useAccessToken,
  useAppLoadingStatus,
  useAppLanguage,
  useCheckingNetwork,
  useAppDispatch,
  useAppError,
  useMediaPlaying,
};

export function getNetworkStatus() {
  return async (dispatch: (arg0: {payload: any}) => void) => {
    dispatch(setCheckingNetwork(true));
    fetch().then(state => {
      dispatch(setNetworkAvailable(state.isConnected));
      dispatch(setCheckingNetwork(false));
    });
  };
}

export function getToken() {
  return async (dispatch: (arg0: {payload: string}) => void) => {
    let token = await AsyncStorage.getItem(LOCAL_STORAGE_KEY.access_token);
    if (token) {
      dispatch(setAccessToken(token));
    }
  };
}

export function setToken(token: string) {
  return async (dispatch: (arg0: {payload: string}) => void) => {
    dispatch(setAccessToken(setAccessToken(token)));
    await AsyncStorage.setItem(LOCAL_STORAGE_KEY.access_token, token);
  };
}
