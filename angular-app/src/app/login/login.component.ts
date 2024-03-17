import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Store, StoreModule } from '@ngrx/store';
import { UpdateAppUser } from '../store/appUser.actions';
import { UserServiceService } from '../services/userService/user.service.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    StoreModule,
    CommonModule,
  ],
})
export class LoginComponent {
  loginForm: FormGroup;
  signUpForm: FormGroup;
  isLogin: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
    private http: HttpClient,
    private userService: UserServiceService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.signUpForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.userService.appUser$.subscribe((val) => {
      if (val) {
        this.router.navigate(['home']);
      }
    });
    console.log(environment, `${environment.baseUrl}/login`);

    this.http
      .get<any>(`${environment.baseUrl}/login`, {
        withCredentials: true,
      })
      .subscribe((val) => {
        this.store.dispatch(
          UpdateAppUser({
            appUser: { userName: val.name, status: val.name ? true : false },
          })
        );
      });
  }

  isValid(form: string, control: string) {
    if (form === 'signUpForm') {
      return (
        this.signUpForm.get(control)?.valid &&
        this.signUpForm.get(control)?.touched
      );
    } else {
      return (
        this.loginForm.get(control)?.valid &&
        this.loginForm.get(control)?.touched
      );
    }
  }

  onSubmitSignUp() {
    this.http
      .post<any>(
        `${environment.baseUrl}/register`,
        { data: this.signUpForm.value },
        {
          withCredentials: true,
        }
      )
      .subscribe((val) => {
        console.log(val);
      });
  }

  onSubmit() {
    this.http
      .post<any>(
        `${environment.baseUrl}/login`,
        { data: this.loginForm.value },
        {
          withCredentials: true,
        }
      )
      .subscribe((val) => {
        this.store.dispatch(
          UpdateAppUser({
            appUser: { userName: val.name, status: val.name ? true : false },
          })
        );
      });
  }
}
