import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  private MyAppUrl = 'https://localhost:44374/';
  private myApiUrl = 'api/CrediCard/'
  constructor(private http: HttpClient) { }

  getListCreditCards(): Observable<any>{
    return this.http.get(this.MyAppUrl + this.myApiUrl);
  }

  removeCreditCard(id: number): Observable<any>{
    return this.http.delete(this.MyAppUrl + this.myApiUrl + id);
  }

  saveCreditCard(creditCard: any): Observable<any>{
    return this.http.post(this.MyAppUrl + this.myApiUrl, creditCard);
  }

  updateCreditCard(id: number, creditCard: any): Observable<any>{
    return this.http.put(this.MyAppUrl + this.myApiUrl + id, creditCard);
  }
}
