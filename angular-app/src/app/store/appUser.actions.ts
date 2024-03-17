import { createAction, props } from '@ngrx/store';
import { AppUser } from './Appuser.model';

export const UpdateAppUser = createAction(
  '[user] Load appuser',
  props<{ appUser: AppUser }>()
);
