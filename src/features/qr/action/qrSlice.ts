import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';
import {AppDispatch, RootState} from '@src/app/redux/store';
import {LOCAL_STORAGE_KEY} from '@src/base/localStorage';
import axios from 'axios';
import {useSelector} from 'react-redux';

interface QrState {
  loading: boolean;
  code: string | null;
}

const initialState = {
  loading: false,
  code: null,
} satisfies QrState as QrState;

const QrSlice = createSlice({
  name: 'qr',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },

    setCode(state, action) {
      state.code = action.payload;
    },
  },
});

export const {setLoading, setCode} = QrSlice.actions;
export default QrSlice.reducer;

const useQrCode = () => {
  return useSelector((state: RootState) => state.qr.code);
};

const useQrCodeLoading = () => {
  return useSelector((state: RootState) => state.qr.loading);
};

export {useQrCode, useQrCodeLoading};

export function fetchQrCode() {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    const token = await AsyncStorage.getItem(LOCAL_STORAGE_KEY.access_token);
    axios
      .get('/api/customers/get-customer-code', {
        headers: {Authorization: 'Bearer ' + token},
      })
      .then(result => {
        dispatch(setLoading(false));
        dispatch(setCode(result.data.code));
      });
  };
}
