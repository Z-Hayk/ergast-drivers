import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserTypes, ChangeUserInfoProps } from './types';
import * as UserActions from './actions';

const initialState: UserTypes = {
  initialScreen: 'Auth',
  favorites: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUserInfo: (state: UserTypes, { payload }: PayloadAction<UserTypes>) => ({
      ...state,
      ...payload,
    }),
    changeUserInfo: (state: UserTypes, { payload }: PayloadAction<ChangeUserInfoProps>) => ({
      ...state,
      [payload.key]: payload.value,
    }),
  },
});

export const { addFavorite, deleteFavorite } = UserActions;
export const { setUserInfo, changeUserInfo } = userSlice.actions;
export const userReducer = userSlice.reducer;
