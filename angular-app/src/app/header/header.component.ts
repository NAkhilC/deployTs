import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserServiceService } from '../services/userService/user.service.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { UpdateAppUser } from '../store/appUser.actions';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [RouterModule, CommonModule, HttpClientModule],
})
export class HeaderComponent {
  appUser: any;
  constructor(
    public userService: UserServiceService,
    private router: Router,
    private store: Store,
    private http: HttpClient
  ) {}
  ngOnInit() {
    this.userService.appUser$.subscribe((val: any) => {
      this.appUser = val;
    });
  }
  logout() {
    this.http
      .post<any>(
        `${environment.baseUrl}/logout`,
        { data: '' },
        {
          withCredentials: true,
        }
      )
      .subscribe((val) => {
        this.store.dispatch(
          UpdateAppUser({
            appUser: { userName: null, status: false },
          })
        );
        this.router.navigate(['']);
      });
  }
}
