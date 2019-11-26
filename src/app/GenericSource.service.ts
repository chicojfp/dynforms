import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericSourceService {
  _url: string;
  itens: any;

  constructor(private http: HttpClient) { }

  set url(url: string) {
    if (url) {
      this.http.get(url).subscribe(itens => this.itens = itens);
      this._url = url;
    }
  }

  public getList(): Observable<any> {
    return of(this.itens);
  }
}
