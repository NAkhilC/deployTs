import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../services/userService/user.service.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './home-info.component.html',
  styleUrl: './home-info.component.scss',
})
export class HomeInfoComponent {
  listingInfo: any;
  currentImageIndex: number = 0;
  nextImgValue: any;
  listingId!: any;
  constructor(
    private router: ActivatedRoute,
    private userService: UserServiceService
  ) {}
  ngOnInit() {
    this.router.queryParams.subscribe((val) => {
      this.listingId = String(this.router.snapshot.params['id']);
    });

    if (this.listingId) {
      this.userService.getListingWithId(this.listingId).subscribe((val) => {
        if (val.data) {
          this.listingInfo = val.data;
          console.log(this.listingInfo);
          this.nextImgValue = this.listingInfo?.images[0];
        }
      });
    }
  }

  nextImg() {
    if (this.listingInfo.images?.length <= this.currentImageIndex + 1) {
      this.currentImageIndex = 0;
    } else {
      ++this.currentImageIndex;
    }
    this.nextImgValue = this.listingInfo.images[this.currentImageIndex];
  }
}
