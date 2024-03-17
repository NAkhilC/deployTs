import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAppState } from '../store/appUser.selector';
import { AppUser } from '../store/Appuser.model';
import { UserServiceService } from './userService/user.service.service';

@Injectable({ providedIn: 'root' })
export class LoggedInGuard {
  appUser!: AppUser;
  constructor(private store: Store, private userService: UserServiceService) {}
  canActivate(): boolean {
    this.userService.appUser$.subscribe((val) => {
      this.appUser = val;
    });

    if (this.appUser.userName) {
      return true;
    }
    return false;
  }
}
