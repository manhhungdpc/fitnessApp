import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';
import {AppDispatch, RootState} from '@src/app/redux/store';
import {LOCAL_STORAGE_KEY} from '@src/base/localStorage';
import axios from 'axios';
import {useSelector} from 'react-redux';

export enum ContractStatus {
  active = 'ACTIVE',
  complete = 'COMPLETE',
  inactive = 'INACTIVE',
  paused = 'Paused',
}

export interface Contract {
  id: number;
  serviceName: string;
  signDate: string | null;
  startDate: string | null;
  owner: string;
  customerPhone: string | null;
  duration: number | null;
  durationUnit: string | null;
  endDate: string | null;
  price: number | null;
  priceOne: number | null;
  status: ContractStatus;
  numberOfPractice: string | null;
  numberOfRemainedPractice: string | null;
  prepaidAmount: number;
  note: string;
}

export interface checkIn {
  receptionist: string;
  contract: string;
  location: string;
  date: string;
  qrCode: string;
  cabinet: string | null;
  customer: string;
}

interface ProfileState {
  loading: boolean;
  contracts?: Array<Contract> | null;
  checkins?: Array<checkIn> | null;
  page?: number | null;
  maxPage?: number | null;
  contractFocusin?: number;
}

const initialState = {
  loading: false,
} satisfies ProfileState as ProfileState;

const ProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },

    setContracts(state, action) {
      state.contracts = action.payload;
    },

    setCheckins(state, action) {
      state.checkins = action.payload;
    },

    setPages(state, action) {
      state.page = action.payload.page;
      state.maxPage = action.payload.maxPage;
    },

    setContractFocusin(state, action) {
      state.contractFocusin = action.payload;
    },
  },
});

export const {
  setLoading,
  setContracts,
  setCheckins,
  setPages,
  setContractFocusin,
} = ProfileSlice.actions;
export default ProfileSlice.reducer;

const useProfileLoading = () => {
  return useSelector((state: RootState) => state.profile.loading);
};

const useProfileContract = () => {
  return useSelector((state: RootState) => state.profile.contracts);
};

const useProfileCheckins = () => {
  return useSelector((state: RootState) => state.profile.checkins);
};

const useProfilePage = () => {
  return useSelector((state: RootState) => state.profile.page);
};

const useProfileMaxPage = () => {
  return useSelector((state: RootState) => state.profile.maxPage);
};

const useProfileContractFocusIn = () => {
  return useSelector((state: RootState) => state.profile.contractFocusin);
};

export {
  useProfileLoading,
  useProfileContract,
  useProfileCheckins,
  useProfilePage,
  useProfileMaxPage,
  useProfileContractFocusIn,
};

export function fetchContractsList() {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    const token = await AsyncStorage.getItem(LOCAL_STORAGE_KEY.access_token);

    axios
      .get('/api/contracts/get-by-customer', {
        headers: {Authorization: 'Bearer ' + token},
      })
      .then(response => {
        dispatch(setLoading(false));
        let result = response.data;
        dispatch(setContracts(result));
      });
  };
}

export function fetchCheckinList(page: number) {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    const token = await AsyncStorage.getItem(LOCAL_STORAGE_KEY.access_token);

    axios
      .get(`/api/customers/checkin-history?page=${page}`, {
        headers: {Authorization: 'Bearer ' + token},
      })
      .then(response => {
        dispatch(setLoading(false));
        let result = response.data;
        dispatch(setCheckins(result.data));
      });
  };
}

export function fetchCheckinInContractList(
  contractFocusin: number,
  page: number,
) {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    const token = await AsyncStorage.getItem(LOCAL_STORAGE_KEY.access_token);

    axios
      .get(`/api/contracts/checkin/${contractFocusin}/${page}`, {
        headers: {Authorization: 'Bearer ' + token},
      })
      .then(response => {
        dispatch(setLoading(false));
        let result = response.data;
        dispatch(setCheckins(result.data));
      });
  };
}
