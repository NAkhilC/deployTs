import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,

  imports: [RouterOutlet, CommonModule, HeaderComponent],
})
export class AppComponent {
  title = 'angular-app';
}
