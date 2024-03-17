import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAppState } from 'src/app/store/appUser.selector';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  public appUser$ = this.store.select(selectAppState);

  constructor(private store: Store, private http: HttpClient) {}

  getListings() {
    return this.http.get<any>(`${environment.baseUrl}/home`, {
      withCredentials: true,
    });
  }

  getListingWithId(id: string) {
    return this.http.post<any>(
      `${environment.baseUrl}/getListingWithId`,
      { data: id },
      {
        withCredentials: true,
      }
    );
  }
}
