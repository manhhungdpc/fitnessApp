import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';
import {AppDispatch, RootState} from '@src/app/redux/store';
import {LOCAL_STORAGE_KEY} from '@src/base/localStorage';
import axios from 'axios';
import {useSelector} from 'react-redux';

export interface NewDetails {
  id: number;
  name: string;
  description: string;
  videoUrl: string;
  priority: number;
}
export interface News {
  id: number;
  introImage: string;
  name: string;
  pin: boolean;
  priority: number;
}
interface HomeState {
  detailId?: number;
  loading: boolean;
  news: Array<News>;
  page: number;
  maxPage: number;
  details: NewDetails | null;
}

const initialState = {
  loading: false,
  news: [],
  page: 1,
  maxPage: 1,
  details: null,
} satisfies HomeState as HomeState;

const HomeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },

    setNews(state, action) {
      state.news = action.payload;
    },

    setPage(state, action) {
      state.page = action.payload;
    },

    setMaxPage(state, action) {
      state.maxPage = action.payload;
    },

    setDetails(state, action) {
      state.details = action.payload;
    },

    setDetailId(state, action) {
      state.detailId = action.payload;
    },
  },
});

export const {
  setLoading,
  setNews,
  setDetails,
  setDetailId,
  setPage,
  setMaxPage,
} = HomeSlice.actions;
export default HomeSlice.reducer;

const useHomeLoading = () => {
  return useSelector((state: RootState) => state.home.loading);
};

const useNewsList = () => {
  return useSelector((state: RootState) => state.home.news);
};

const useNewDetails = () => {
  return useSelector((state: RootState) => state.home.details);
};

const useFocusDetailId = () => {
  return useSelector((state: RootState) => state.home.detailId);
};

const useHomePage = () => {
  return useSelector((state: RootState) => state.home.page);
};

const useHomeMaxPages = () => {
  return useSelector((state: RootState) => state.home.maxPage);
};

export {
  useHomeLoading,
  useNewDetails,
  useNewsList,
  useFocusDetailId,
  useHomePage,
  useHomeMaxPages,
};

export function fetchNewsList(page: number) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    let token = await AsyncStorage.getItem(LOCAL_STORAGE_KEY.access_token);
    const currentNews = getState().home.news;
    dispatch(setLoading(true));
    axios
      .get(`/api/events/list?page=${page}`, {
        headers: {Authorization: 'Bearer ' + token},
      })
      .then(response => {
        dispatch(setLoading(false));
        let result = response.data;
        dispatch(setMaxPage(result.maxPages));
        const updatedNews = [...currentNews, ...result.data];
        dispatch(setNews(updatedNews));
      });
  };
}

export function fetchNewsDetails() {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setLoading(true));
    let token = await AsyncStorage.getItem(LOCAL_STORAGE_KEY.access_token);
    const id = getState().home.detailId;
    axios
      .get(`/api/events/detail/${id}`, {
        headers: {Authorization: 'Bearer ' + token},
      })
      .then(response => {
        dispatch(setLoading(false));
        let result = response.data;
        dispatch(setDetails(result));
      });
  };
}
