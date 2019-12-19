import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


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

  getData(): Observable<any> {
    return of(this.items);
  }
}
