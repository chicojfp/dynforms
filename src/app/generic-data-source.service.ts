import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GenericDataSourceService {
  _url: string;
  items: any;

  set url(value: string) {
    this._url = value;
    if (!this.items) {
      this.http.get(this._url).subscribe(items => this.items = items);
    }
  }

  constructor(private http: HttpClient) { }

  getData() {
    // console.log(this.items);
    return of(this.items);
  }
}
