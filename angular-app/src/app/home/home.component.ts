import { Component, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserServiceService } from '../services/userService/user.service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
  ],
})
export class HomeComponent {
  homes: any = [
    //   {
    //     imageUrl: '../../assets/home.jpg',
    //     title: 'Beautiful Home 1',
    //     description: 'A cozy home with a stunning view',
    //     price: 300000,
    //   },
    //   {
    //     imageUrl: '../../assets/home.jpg',
    //     title: 'Spacious Home 2',
    //     description: 'Large rooms with modern amenities',
    //     price: 400000,
    //   },
    //   {
    //     imageUrl: '../../assets/home.jpg',
    //     title: 'Beautiful Home 1',
    //     description: 'A cozy home with a stunning view',
    //     price: 300000,
    //   },
    //   {
    //     imageUrl: '../../assets/home.jpg',
    //     title: 'Spacious Home 2',
    //     description: 'Large rooms with modern amenities',
    //     price: 400000,
    //   },
    //   {
    //     imageUrl: '../../assets/home.jpg',
    //     title: 'Beautiful Home 1',
    //     description: 'A cozy home with a stunning view',
    //     price: 300000,
    //   },
    //   {
    //     imageUrl: '../../assets/home.jpg',
    //     title: 'Spacious Home 2',
    //     description: 'Large rooms with modern amenities',
    //     price: 400000,
    //   },
    //   {
    //     imageUrl: '../../assets/home.jpg',
    //     title: 'Beautiful Home 1',
    //     description: 'A cozy home with a stunning view',
    //     price: 300000,
    //   },
    //   {
    //     imageUrl: '../../assets/home.jpg',
    //     title: 'Spacious Home 2',
    //     description: 'Large rooms with modern amenities',
    //     price: 400000,
    //   },
    //   {
    //     imageUrl: '../../assets/home.jpg',
    //     title: 'Beautiful Home 1',
    //     description: 'A cozy home with a stunning view',
    //     price: 300000,
    //   },
    //   {
    //     imageUrl: '../../assets/home.jpg',
    //     title: 'Spacious Home 2',
    //     description: 'Large rooms with modern amenities',
    //     price: 400000,
    //   },
    //   {
    //     imageUrl: '../../assets/home.jpg',
    //     title: 'Beautiful Home 1',
    //     description: 'A cozy home with a stunning view',
    //     price: 300000,
    //   },
    //   {
    //     imageUrl: '../../assets/home.jpg',
    //     title: 'Spacious Home 2',
    //     description: 'Large rooms with modern amenities',
    //     price: 400000,
    //   },
    //   // Add more homes as needed
  ];

  userService = inject(UserServiceService);

  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.userService.getListings().subscribe((val) => {
      if (val) {
        this.homes = val.data;
        // this.homes?.forEach((home: any) => {
        //   if (home?.images.length > 0) {
        //     home.images.forEach((img: any) => {
        //       img = `../../assets/${img}.jpg`;
        //     });
        //   }
        // });

        // console.log(this.homes);
      }
    });
  }

  getImg(home: any) {
    return `../../assets/${home?.images[0]}.jpg`;
  }
}
