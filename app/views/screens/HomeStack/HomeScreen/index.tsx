import React, { FunctionComponent, useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { GeneralView, PageLoader, DriversList } from 'components';
import * as DriversActions from 'features/drivers/slice';
import * as UserActions from 'features/user/slice';
import { AsyncStatus, RootState } from 'types';
import { useAction, useSelector } from 'utils';

const selectDrivers = (state: RootState): RootState['drivers'] => state.drivers;
const driversState = createSelector([selectDrivers], (drivers: RootState['drivers']) => {
  return {
    data: drivers.data,
    stopPagination: drivers.stopPagination,
    getDriversReqStat: drivers.getDriversReqStat,
    isPaginationLoader: drivers.isPaginationLoader,
    refreshDriversReqStat: drivers.refreshDriversReqStat,
  };
});

export const HomeScreen: FunctionComponent = () => {
  const drivers = useSelector(driversState);

  const getDrivers = useAction(DriversActions.getDrivers);
  const getNextDrivers = useAction(DriversActions.getNextDrivers);
  const refreshDrivers = useAction(DriversActions.refreshDrivers);
  const addFavorite = useAction(UserActions.addFavorite);

  useEffect(() => {
    getDrivers();
  }, []);

  return (
    <GeneralView>
      {drivers.getDriversReqStat === AsyncStatus.LOADING ? (
        <PageLoader />
      ) : (
        <DriversList
          onFavorite={addFavorite}
          data={drivers.data}
          stopPagination={drivers.stopPagination}
          isPaginationLoader={drivers.isPaginationLoader}
          isRefreshing={drivers.refreshDriversReqStat === AsyncStatus.LOADING}
          getNextPage={getNextDrivers}
          refreshPage={refreshDrivers}
        />
      )}
    </GeneralView>
  );
};
