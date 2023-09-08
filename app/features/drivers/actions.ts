import { createAsyncThunk } from '@reduxjs/toolkit';
import { Drivers, ShowPopUpMessage } from 'services';
import { GetDriversReqRSPT, AsyncStatus } from 'types';
import { getStateHandler } from 'utils';

const PAGINATION_OFFSET = 10;
const PAGINATION_LIMIT = 20;

/**
 * @param res
 * @desc This function is written so that you can view the response data
 */
const FOR_DEBUGGING = (res: GetDriversReqRSPT): void => {
  // eslint-disable-next-line no-console
  console.log('response data: ', res.data);
  // eslint-disable-next-line no-console
  console.log('response data length:', res.data.MRData.DriverTable.Drivers.length);
};

export const getDrivers = createAsyncThunk('drivers/GET_DRIVERS', async () => {
  const limit = PAGINATION_OFFSET;

  try {
    const driversData: GetDriversReqRSPT = await Drivers.getDriversReq({
      limit,
      offset: 0,
    });

    FOR_DEBUGGING(driversData);

    return { data: driversData.data.MRData.DriverTable.Drivers, offset: limit };
  } catch (error) {
    ShowPopUpMessage('Error', true);
  }
});

export const getNextDrivers = createAsyncThunk(
  'drivers/GET_NEXT_DRIVERS',
  async (_, { getState }) => {
    const { offset, data } = getStateHandler(getState).drivers;

    try {
      const driversData: GetDriversReqRSPT = await Drivers.getDriversReq({
        limit: PAGINATION_LIMIT,
        offset,
      });

      FOR_DEBUGGING(driversData);

      const newData = driversData.data.MRData.DriverTable.Drivers;
      const payloadObj = {
        data: [...data, ...(newData || [])],
        stopPagination: false,
        offset: offset + PAGINATION_LIMIT,
      };

      if (newData.length !== PAGINATION_LIMIT) {
        payloadObj.stopPagination = true;
      }

      return payloadObj;
    } catch (error) {
      ShowPopUpMessage('Error', true);
    }
  },
  {
    condition: (_, { getState }) => {
      const drivers = getStateHandler(getState).drivers;
      if (drivers.getNextDriversReqStat === AsyncStatus.LOADING) {
        return false;
      }
    },
  },
);

export const refreshDrivers = createAsyncThunk(
  'drivers/REFRESH_DRIVERS',
  async (_, { getState }) => {
    const { offset } = getStateHandler(getState).drivers;

    try {
      const driversData: GetDriversReqRSPT = await Drivers.getDriversReq({
        limit: offset,
        offset: 0,
      });

      FOR_DEBUGGING(driversData);

      return driversData.data.MRData.DriverTable.Drivers;
    } catch (error) {
      ShowPopUpMessage('Error', true);
    }
  },
);
