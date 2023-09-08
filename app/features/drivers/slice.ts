import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  DriversTypes,
  ChangeDriversInfoProps,
  GetNextDriversProps,
  GetDriversProps,
} from './types';
import * as DriversActions from './actions';
import { AsyncStatus, DriversRSPT } from 'types';

const initialState: DriversTypes = {
  data: [],
  offset: 0,

  stopPagination: false,
  isPaginationLoader: false,

  getDriversReqStat: AsyncStatus.LOADING,
  getNextDriversReqStat: AsyncStatus.NONE,
  refreshDriversReqStat: AsyncStatus.NONE,
};

const driversSlice = createSlice({
  name: 'drivers',
  initialState: initialState,
  reducers: {
    setDriversInfo: (state: DriversTypes, { payload }: PayloadAction<DriversTypes>) => ({
      ...state,
      ...payload,
    }),
    changeDriversInfo: (
      state: DriversTypes,
      { payload }: PayloadAction<ChangeDriversInfoProps>,
    ) => ({
      ...state,
      ...state,
      [payload.key]: payload.value,
    }),
  },
  extraReducers: builder => {
    builder.addCase(
      getDrivers.fulfilled.type,
      (state: DriversTypes, { payload }: PayloadAction<GetDriversProps>) => ({
        ...state,
        data: payload.data,
        offset: payload.offset,
        getDriversReqStat: AsyncStatus.SUCCESS,
      }),
    );
    builder.addCase(getDrivers.rejected.type, (state: DriversTypes) => ({
      ...state,
      getDriversReqStat: AsyncStatus.FAIL,
    }));

    builder.addCase(getNextDrivers.pending.type, (state: DriversTypes) => ({
      ...state,
      isPaginationLoader: true,
      getNextDriversReqStat: AsyncStatus.LOADING,
    }));
    builder.addCase(
      getNextDrivers.fulfilled.type,
      (state: DriversTypes, { payload }: PayloadAction<GetNextDriversProps>) => ({
        ...state,
        data: payload.data,
        offset: payload.offset,
        stopPagination: payload.stopPagination,
        isPaginationLoader: false,
        getNextDriversReqStat: AsyncStatus.SUCCESS,
      }),
    );
    builder.addCase(getNextDrivers.rejected.type, (state: DriversTypes) => ({
      ...state,
      getNextDriversReqStat: AsyncStatus.FAIL,
    }));

    builder.addCase(refreshDrivers.pending.type, (state: DriversTypes) => ({
      ...state,
      refreshDriversReqStat: AsyncStatus.LOADING,
    }));
    builder.addCase(
      refreshDrivers.fulfilled.type,
      (state: DriversTypes, { payload }: PayloadAction<DriversRSPT[]>) => ({
        ...state,
        data: payload,
        refreshDriversReqStat: AsyncStatus.SUCCESS,
      }),
    );
    builder.addCase(refreshDrivers.rejected.type, (state: DriversTypes) => ({
      ...state,
      refreshDriversReqStat: AsyncStatus.FAIL,
    }));
  },
});

export const { getDrivers, getNextDrivers, refreshDrivers } = DriversActions;
export const { changeDriversInfo, setDriversInfo } = driversSlice.actions;
export const driversReducer = driversSlice.reducer;
