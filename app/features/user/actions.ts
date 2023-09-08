import { createAsyncThunk } from '@reduxjs/toolkit';
import { DriversRSPT } from 'types';
import { changeUserInfo } from './slice';
import cloneDeep from 'lodash/cloneDeep';
import { getStateHandler } from 'utils';
import { ShowPopUpMessage } from 'services';

export const addFavorite = createAsyncThunk(
  'user/ADD_FAVORITE',
  (payload: DriversRSPT, { getState, dispatch }) => {
    const favorites = getStateHandler(getState).user.favorites;

    if (favorites.some((I: DriversRSPT) => payload.driverId === I.driverId)) {
      ShowPopUpMessage('The driver has already been added!', true);
    } else {
      const newDriver = cloneDeep(payload);
      newDriver.isFavorite = true;

      dispatch(changeUserInfo({ key: 'favorites', value: [...favorites, newDriver] }));
      ShowPopUpMessage('The driver added successfully!');
    }
  },
);

export const deleteFavorite = createAsyncThunk(
  'user/DELETE_FAVORITE',
  (payload: DriversRSPT, { getState, dispatch }) => {
    const favorites = getStateHandler(getState).user.favorites;
    const newFavorites = favorites.filter((I: DriversRSPT) => payload.driverId !== I.driverId);

    ShowPopUpMessage('The driver was successfully removed!');
    dispatch(changeUserInfo({ key: 'favorites', value: newFavorites }));
  },
);
