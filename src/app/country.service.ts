import { of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor() { }

  public getList() {
    return of(['Brasil', 'Chile', 'Peru', 'Bolívia', 'Uruguai']);
  }
}
