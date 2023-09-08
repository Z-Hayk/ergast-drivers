import { DriversRSPT } from 'types';

export interface UserTypes {
  initialScreen: 'Auth' | 'Home';
  favorites: DriversRSPT[];
}

export interface ChangeUserInfoProps {
  key: keyof UserTypes;
  value: string | DriversRSPT[];
}
