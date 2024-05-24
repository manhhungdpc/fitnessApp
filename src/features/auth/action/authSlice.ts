import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';
import {setAccessToken, setError} from '@src/app/redux/appSlice';
import {AppDispatch, RootState} from '@src/app/redux/store';
import axios from 'axios';
import {baseUrl} from 'index';
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
  fullname?: string;
  phone?: string;
  email?: string;
  profilePicture?: string;
  is_staff?: boolean;
  is_trainer?: boolean;
  organization?: string;
  locations?: any;
  is_lifeguard?: boolean;
  is_cashier?: boolean;
  can_update_customer?: boolean;
  can_checkin?: boolean;
  can_create_receipt?: boolean;
  status?: UserStatus;
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
    dispatch(setLoading(true));
    dispatch(setHelpText({}));

    // let deviceToken = (await DeviceInfo.getDeviceToken()) || '';
    // let deviceType = DeviceInfo.getDeviceType() || '';

    let data = {
      username: username,
      password: password,
      deviceToken: '',
      deviceType: 'ios',
    };

    console.log(username);
    console.log(password);

    axios
      .post(baseUrl + '/api/customers/get-access-token', data)
      .then(async response => {
        const result = response.data || {};
        if (result.access) {
          dispatch(setAccessToken(result.access));
          await AsyncStorage.setItem(
            LOCAL_STORAGE_KEY.access_token,
            result.access,
          );
        } else {
          console.log(result);
          dispatch(setHelpText({password: result.error}));
        }
      })
      .catch(error => {
        if (error.response.status) {
          dispatch(setError(error));
        }
      });
  };
}

// export function logout() {
//   return async dispatch => {
//     let token = await AsyncStorage.getItem('token');
//     let deviceToken = (await AsyncStorage.getItem('deviceToken')) || '';

//     axios
//       .post(
//         '/api/customers/log-out',
//         {deviceToken: deviceToken},
//         {headers: {Authorization: 'Bearer ' + token}},
//       )
//       .then(result => {
//         if (result.data.success) {
//           dispatch(logoutSuccess());
//         } else {
//           dispatch(logoutFailed());
//         }
//       })
//       .catch(error => {
//         //force logout
//         dispatch(logoutSuccess());
//       });
//   };
// }

// export function getUserProfile(numTried = 1) {
//   return async (dispatch, getState) => {
//     let token = await AsyncStorage.getItem('token');
//     axios
//       .get('/api/customers/profile', {
//         headers: {Authorization: 'Bearer ' + token},
//         timeout: 5000,
//       })
//       .then(result => {
//         if (result.status === 200) {
//           dispatch(setUserProfile(result.data));
//           const user = getState().login.user;
//           cacheProfile(user.phone, user.profilePicture);
//         }
//       })
//       .catch(error => {
//         if (error.response === undefined) {
//           return setTimeout(
//             () =>
//               Alert.alert('Lỗi kết nối', 'Vui lòng kiểm tra lại kết nối mạng', [
//                 {
//                   text: 'Kết nối lại',
//                   onPress: () => dispatch(getUserProfile()),
//                 },
//               ]),
//             2000,
//           );
//         }
//         return dispatch(logout());
//         // }
//       });
//   };
// }

export function fetchAccountList(phone: any) {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    dispatch(setHelpText({}));
    let formData = new FormData();
    formData.append('phone', phone);
    axios
      .post(baseUrl + '/api/auths/get-user', formData, {
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
        dispatch(setError(error));
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
    const token = await AsyncStorage.getItem('token');
    let data = new FormData();
    data.append('currentPassword', currentPassword);
    data.append('newPassword', newPassword);
    data.append('confirmNewPassword', confirmNewPassword);
    data.append('username', username);
    axios
      .post(baseUrl + '/api/customers/change-password-first-time', data, {
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
        dispatch(setError(error));
      });
  };
}

// export function updateProfileImage(uri, type) {
//   return async (dispatch, getState) => {
//     const user = getState().login.user;
//     const token = await AsyncStorage.getItem('token');
//     let data = new FormData();

//     if (uri) {
//       data.append('profilePictureDraft', {
//         uri: uri,
//         type: type,
//         name: 'image.jpg',
//       });
//     }

//     axios
//       .post('/api/customers/update-profile-picture', data, {
//         headers: {
//           Authorization: 'Bearer ' + token,
//           Accept: 'application/json',
//           'Content-Type': 'multipart/form-data',
//         },
//       })
//       .then(response => {
//         const result = response.data;
//         if (result.success) {
//           if (!user.is_staff) {
//             Alert.alert(
//               'Tải ảnh thành công',
//               'Ảnh của bạn đã được gửi tới phòng tập. Chúng tôi sẽ xác nhận và phê duyệt ảnh của bạn trong thời gian sớm nhất.',
//             );
//           } else {
//             dispatch(
//               setUserProfilePicture(axios.defaults.baseURL + result.uri),
//             );
//           }
//         } else {
//           Alert.alert('Ảnh bị lỗi, vui lòng upload lại');
//         }
//       })
//       .catch(error => {
//         Alert.alert('Lỗi mạng');
//       });
//   };
// }

// export function doRefreshToken() {
//   return async (dispatch, getState) => {
//     const refreshToken = await AsyncStorage.getItem('refresh');
//     axios
//       .post(
//         'api/token/refresh/',
//         {refresh: refreshToken},
//         {
//           headers: {
//             Accept: 'application/json',
//             timeout: 2000,
//           },
//         },
//       )
//       .then(response => {
//         if (response.status === 200) {
//           let result = response.data;
//           AsyncStorage.setItem('token', result.access);
//         }
//       });
//   };
// }

// export function getProfileLoginThisDevice() {
//   return async dispatch => {
//     const profileStorage = await AsyncStorage.getItem('profile');
//     const profiles = JSON.parse(profileStorage);
//     dispatch(cacheProfileLogin(profiles));
//   };
// }

// export function removeLogged(phone) {
//   return async dispatch => {
//     let profileStorage = await AsyncStorage.getItem('profile');
//     if (profileStorage) {
//       profileStorage = JSON.parse(profileStorage);
//       profileStorage.map((profile, index) => {
//         if (profile.phone === phone) {
//           profileStorage.splice(index, 1);
//           profileStorage = JSON.stringify(profileStorage);
//           AsyncStorage.setItem('profile', profileStorage);
//           return dispatch(getProfileLoginThisDevice());
//         }
//       });
//     }
//   };
// }

// async function cacheProfile(phone, profilePicture) {
//   const newItem = {phone: phone, profilePicture: profilePicture};
//   let profileStorage = await AsyncStorage.getItem('profile');
//   if (profileStorage) {
//     profileStorage = JSON.parse(profileStorage);
//     let exist = false;
//     profileStorage.map(profile => {
//       if (profile.phone === newItem.phone) {
//         profile.profilePicture = newItem.profilePicture;
//         exist = true;
//       }
//     });
//     if (!exist) {
//       profileStorage.push(newItem);
//     }
//   } else {
//     profileStorage = [newItem];
//   }
//   profileStorage = JSON.stringify(profileStorage);
//   AsyncStorage.setItem('profile', profileStorage);
//   return profileStorage;
// }
