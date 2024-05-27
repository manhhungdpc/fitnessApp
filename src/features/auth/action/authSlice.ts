import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';
import {setAccessToken, setError, setToken} from '@src/app/redux/appSlice';
import {AppDispatch, RootState} from '@src/app/redux/store';
import axios from 'axios';
import {useSelector} from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import {LOCAL_STORAGE_KEY} from '@src/base/localStorage';

export enum UserStatus {
  active = 'ACTIVE',
  pending = 'PENDING',
  inactive = 'INACTIVE',
}

export interface HelpText {
  username?: string;
  password?: string;
  re_password?: string;
}

interface User {
  id?: number;
  fullname?: string;
  phone?: string;
  email?: string;
  profilePicture?: string;
  is_staff?: boolean;
  is_trainer?: boolean;
  gender?: string;
  organization?: string;
  locations?: any;
  is_lifeguard?: boolean;
  is_cashier?: boolean;
  can_update_customer?: boolean;
  can_checkin?: boolean;
  can_create_receipt?: boolean;
  status?: UserStatus;
  point?: number;
  referral_timeout?: boolean;
}

interface AuthState {
  user: User | null;
  phone?: string | null;
  username?: string | null;
  password?: string | null;
  rememberme: boolean;
  organization: [] | null;
  onLoading: boolean;
  help_text?: HelpText;
}

const initialState = {
  user: null,
  phone: null,
  username: null,
  password: null,
  rememberme: true,
  organization: null,
  onLoading: false,
} satisfies AuthState as AuthState;

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },

    setOrganization(state, action) {
      state.organization = action.payload;
    },

    setLoading(state, action) {
      state.onLoading = action.payload;
    },

    setUsername(state, action) {
      state.username = action.payload;
    },

    setPassword(state, action) {
      state.password = action.payload;
    },

    setUserAvatar(state, action) {
      if (state.user !== null) {
        state.user.profilePicture = action.payload;
      }
    },

    setHelpText(state, action) {
      state.help_text = action.payload;
    },
  },
});

export const {
  setUser,
  setUsername,
  setPassword,
  setLoading,
  setOrganization,
  setUserAvatar,
  setHelpText,
} = AuthSlice.actions;
export default AuthSlice.reducer;

const useUser = () => {
  return useSelector((state: RootState) => state.auth.user);
};

const useAuthOnLoading = () => {
  return useSelector((state: RootState) => state.auth.onLoading);
};

const useAuthUsername = () => {
  return useSelector((state: RootState) => state.auth.username);
};

const useAuthOrgainization = () => {
  return useSelector((state: RootState) => state.auth.organization);
};

const useHelpText = () => {
  return useSelector((state: RootState) => state.auth.help_text);
};

export {
  useUser,
  useAuthOnLoading,
  useAuthUsername,
  useAuthOrgainization,
  useHelpText,
};

export function fetchAccessToken(username: string, password: string) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch(setHelpText({}));

      // let deviceToken = (await DeviceInfo.getDeviceToken()) || '';
      // let deviceType = DeviceInfo.getDeviceType() || '';

      let data = {
        username: username,
        password: password,
        deviceToken: 'deviceToken',
        deviceType: 'deviceType',
      };

      const response = await axios.post(
        '/api/customers/get-access-token',
        data,
      );
      const result = response.data || {};

      if (result.access) {
        await AsyncStorage.setItem('accessToken', result.access);
        dispatch(setToken(result.access));
      } else {
        dispatch(setHelpText({password: result.error}));
      }
      dispatch(setLoading(false));
    } catch (error: any) {
      dispatch(setLoading(false));
      if (error.response && error.response.status) {
        dispatch(setError(error.response.data)); // Sending specific error data
      } else {
        dispatch(setError({message: 'An unknown error occurred'}));
      }
    }
  };
}

export function logout() {
  return async (dispatch: AppDispatch) => {
    try {
      const token = await AsyncStorage.getItem(LOCAL_STORAGE_KEY.access_token);
      if (token) {
        const result = await axios.post(
          '/api/customers/log-out',
          {},
          {
            headers: {Authorization: 'Bearer ' + token},
          },
        );
        if (result.data.success) {
          dispatch(setAccessToken(null));
          await AsyncStorage.removeItem(LOCAL_STORAGE_KEY.access_token);
        }
      }
    } catch (error) {
      dispatch(setError('Error during logout'));
    }
  };
}

export function getUserProfile() {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const token = getState().app.accessToken;
    axios
      .get('/api/customers/profile', {
        headers: {Authorization: 'Bearer ' + token},
        timeout: 1500,
      })
      .then(result => {
        if (result.status === 200) {
          dispatch(setUser(result.data));
        }
      })
      .catch(error => {
        return dispatch(setError(error.message));
      });
  };
}

export function fetchAccountList(phone: any) {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    dispatch(setHelpText({}));
    let formData = new FormData();
    formData.append('phone', phone);
    axios
      .post('/api/auths/get-user', formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(result => {
        dispatch(setLoading(false));
        let data = result.data || {};
        if (data.success) {
          dispatch(setUsername(data.data[0].username));
          dispatch(
            setUser({
              fullname: data.data[0].fullname,
              status: data.data[0].status,
            }),
          );
        } else {
          dispatch(setHelpText({username: data.errors}));
        }
      })
      .catch(error => {
        return dispatch(setError(error.message));
      });
  };
}

export function changePasswordFirstTime(
  currentPassword: string,
  newPassword: string,
  confirmNewPassword: string,
  username?: string,
) {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    dispatch(setHelpText({}));
    const token = await AsyncStorage.getItem(LOCAL_STORAGE_KEY.access_token);

    let data = new FormData();
    data.append('currentPassword', currentPassword);
    data.append('newPassword', newPassword);
    data.append('confirmNewPassword', confirmNewPassword);
    data.append('username', username);
    axios
      .post('/api/customers/change-password-first-time', data, {
        headers: {
          Authorization: 'Bearer ' + token,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(async response => {
        const result = response.data;
        if (result.status) {
          dispatch(setAccessToken(result.data.token));
          await AsyncStorage.setItem(
            LOCAL_STORAGE_KEY.access_token,
            result.access,
          );
        } else {
          dispatch(setHelpText({re_passwod: result.errors.password}));
        }
      })
      .catch(error => {
        return dispatch(setError(error.message));
      });
  };
}
