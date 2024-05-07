import { Injectable } from '@angular/core';
import {Stock} from '../models/stock'
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private dbPath = '/stock'
  stockRef: AngularFirestoreCollection<Stock>

  constructor(private fireStore: AngularFirestore) 
  {this.stockRef = fireStore.collection(this.dbPath)}

  getStocks () : AngularFirestoreCollection<Stock>{
    return this.stockRef
  }

  getStock(id: string): AngularFirestoreDocument<Stock> {
    return this.stockRef.doc(id)
  }

  addStock(stock: Stock) {
    return this.stockRef.add({...stock})
  }

  updateStock(id: string, stock: Stock) {
    return this.stockRef.doc(id).update(stock)
  }

  deleteStock(id: string) {
    return this.stockRef.doc(id).delete()
  }

}
