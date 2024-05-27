import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';
import {AppDispatch, RootState} from '@src/app/redux/store';
import {LOCAL_STORAGE_KEY} from '@src/base/localStorage';
import axios from 'axios';
import {useSelector} from 'react-redux';

export interface Service {
  name: string;
  id: number;
  description: string;
  cover?: string;
}
export interface Course {
  time: string;
  name: string;
  details: string;
  pt: string;
  pt_code: string;
  pt_profileImage: string | null;
}

export interface Schedule {
  id?: number;
  day: string;
  date: string;
  schedules: Array<Course>;
}
interface ScheduleState {
  scheduleId?: number;
  loading: boolean;
  page: number;
  maxPage: number;
  services: Array<Service>;
  schedules: Array<Schedule>;
}

const initialState = {
  loading: false,
  page: 1,
  maxPage: 1,
  schedules: [],
  services: [],
} satisfies ScheduleState as ScheduleState;

const ScheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },

    setPage(state, action) {
      state.page = action.payload;
    },

    setMaxPage(state, action) {
      state.maxPage = action.payload;
    },

    setSchedule(state, action) {
      state.schedules = action.payload;
    },

    setServices(state, action) {
      state.services = action.payload;
    },

    setScheduleId(state, action) {
      state.scheduleId = action.payload;
    },
  },
});

export const {
  setLoading,
  setPage,
  setMaxPage,
  setServices,
  setSchedule,
  setScheduleId,
} = ScheduleSlice.actions;
export default ScheduleSlice.reducer;

const useScheduleLoading = () => {
  return useSelector((state: RootState) => state.schedule.loading);
};

const useScheduleId = () => {
  return useSelector((state: RootState) => state.schedule.scheduleId);
};

const useSchedulePage = () => {
  return useSelector((state: RootState) => state.schedule.page);
};

const useScheduleMaxPages = () => {
  return useSelector((state: RootState) => state.schedule.maxPage);
};

const useServices = () => {
  return useSelector((state: RootState) => state.schedule.services);
};

const useSchedules = () => {
  return useSelector((state: RootState) => state.schedule.schedules);
};

export {
  useScheduleLoading,
  useScheduleId,
  useSchedulePage,
  useScheduleMaxPages,
  useServices,
  useSchedules,
};

export function fetchServices() {
  return async (dispatch: AppDispatch) => {
    let token = await AsyncStorage.getItem(LOCAL_STORAGE_KEY.access_token);
    dispatch(setLoading(true));
    axios
      .get('api/customers/get-active-service-categories', {
        headers: {Authorization: 'Bearer ' + token},
      })
      .then(response => {
        dispatch(setLoading(false));
        let result = response.data;
        dispatch(setServices(result));
      });
  };
}

export function fetchSchedules() {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setLoading(true));
    let token = await AsyncStorage.getItem(LOCAL_STORAGE_KEY.access_token);
    const id = getState().schedule.scheduleId;
    const currentSchedules = getState().schedule.schedules;
    axios
      .get(`api/courses/get-schedules?serviceCategoryId=${id}`, {
        headers: {Authorization: 'Bearer ' + token},
      })
      .then(response => {
        dispatch(setLoading(false));
        let result = response.data;
        dispatch(setMaxPage(result.maxPages));
        const updatedSchedule = [...currentSchedules, ...result.data];
        dispatch(setSchedule(updatedSchedule));
      });
  };
}
