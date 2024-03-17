import { Routes, provideRouter } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideStore, provideState, StoreModule } from '@ngrx/store';
import { appuserReducer } from './app/store/appUser.reducer';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoggedInGuard } from './app/services/authGuard';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './app/login/login.component';
export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./app/login/login.component').then(
            (mod) => mod.LoginComponent
          ),
      },
      {
        path: 'home',
        canActivate: [LoggedInGuard],
        loadComponent: () =>
          import('./app/home/home.component').then((mod) => mod.HomeComponent),
      },
      {
        path: 'homeinfo/:id',
        canActivate: [LoggedInGuard],
        loadComponent: () =>
          import('./app/home-info/home-info.component').then(
            (mod) => mod.HomeInfoComponent
          ),
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'login',
      },
    ],
  },
];
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserAnimationsModule,
      HttpClientModule,
      MatIconModule
    ),
    provideRouter(routes),
    provideStore({ userState: appuserReducer }),
  ],
});
