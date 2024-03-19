import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Stock} from '../models/stock'
import {Observable} from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class StockService {

  private url: string = "http://localhost:5000/stock"


  constructor(private http: HttpClient) { }

  getStocks () : Observable<Stock[]>{
    return this.http.get<Stock[]>(this.url)
  }

  getStock(id: string): Observable<Stock> {
    return this.http.get<Stock>(`${this.url}/${id}`);
  }

  addStock(stock: Stock) {
    return this.http.post(this.url, stock);
  }

  updateStock(id: string, stock: Stock) {
    return this.http.put(`${this.url}/${id}`, stock);
  }

  deleteStock(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
