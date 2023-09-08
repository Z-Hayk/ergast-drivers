import { UserTypes } from 'features/user/types';
import { DriversTypes } from 'features/drivers/types';

export interface RootState {
  user: UserTypes;
  drivers: DriversTypes;
}
