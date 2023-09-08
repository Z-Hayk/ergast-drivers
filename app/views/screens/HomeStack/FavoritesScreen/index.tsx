import React, { FunctionComponent } from 'react';
import { GeneralView, FavoritesList } from 'components';
import * as UserActions from 'features/user/slice';
import { useAction, useSelector } from 'utils';
import { RootState } from 'types';

export const FavoritesScreen: FunctionComponent = () => {
  const favorites = useSelector((state: RootState) => state.user.favorites);

  const deleteFavorite = useAction(UserActions.deleteFavorite);

  return (
    <GeneralView>
      <FavoritesList onDelete={deleteFavorite} data={favorites} />
    </GeneralView>
  );
};
