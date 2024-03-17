import { Action, createReducer, on } from '@ngrx/store';
import { AppUser } from './Appuser.model';
import { UpdateAppUser } from './appUser.actions';

export interface AppuserState {
  appUser: AppUser | null;
}
export const initialState: AppuserState = {
  appUser: {
    userName: null,
    status: false,
  },
};

export const appuserReducer = createReducer(
  initialState,
  on(UpdateAppUser, (state, newAppUser) => {
    console.log(initialState);

    return {
      appUser: new AppUser(newAppUser.appUser),
    };
  })
);
