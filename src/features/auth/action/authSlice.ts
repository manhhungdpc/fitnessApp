import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  fullname?: String;
  phone?: String;
  email?: String;
  profilePicture?: String;
  is_staff?: Boolean;
  is_trainer?: Boolean;
  organization?: String;
  locations?: Array<any>;
  is_lifeguard?: Boolean;
  is_cashier?: Boolean;
  can_update_customer?: Boolean;
  can_checkin?: Boolean;
  can_create_receipt?: Boolean;
}

interface UserState {
  user: User | null;
  username?: String | null;
  password?: String | null;
  rememberme: boolean;
}

const initialState = {
  user: null,
  username: null,
  password: null,
  rememberme: true,
} satisfies UserState as UserState;

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },

    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },

    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
  },
});

export const {setUser, setUsername, setPassword} = AuthSlice.actions;
export default AuthSlice.reducer;

// export function fetchAccessToken(username, password) {
//   return async dispatch => {
//     dispatch(prefetchAccessToken());

//     let deviceToken = (await AsyncStorage.getItem('deviceToken')) || '';
//     let deviceType = (await AsyncStorage.getItem('deviceType')) || '';

//     let data = {
//       username: username,
//       password: password,
//       deviceToken: deviceToken,
//       deviceType: deviceType,
//     };

//     axios
//       .post('/api/customers/get-access-token', data)
//       .then(result => {
//         data = result.data || {};
//         if (data.access) {
//           dispatch(loginSuccess(data));
//         } else {
//           dispatch(loginFailed());
//         }
//       })
//       .catch(error => {
//         if (error.response.status) {
//           dispatch(loginFailed());
//         }
//       });
//   };
// }

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

// export function fetchAccountList(phone) {
//   return async (dispatch: AppDispatch, getState: AppState) => {
//     dispatch(prefetchAccountList());

//     let formData = new FormData();
//     formData.append('phone', phone);
//     axios
//       .post('/api/auths/get-user', formData, {
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'multipart/form-data',
//         },
//       })
//       .then(result => {
//         let data = result.data || {};
//         if (data.success) {
//           dispatch(fetchAccountListSuccess(data));
//         } else {
//           dispatch(fetchAccountListFailed(data));
//           dispatch(removeLogged(phone));
//         }
//       })
//       .catch(error => {
//         dispatch(fetchAccountListFailed({errors: 'Đã có lỗi mạng'}));
//       });
//   };
// }

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
