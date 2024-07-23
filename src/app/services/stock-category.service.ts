import { Injectable } from '@angular/core';
import {StockCategory} from '../models/stockCategory'
import {AngularFirestore,
  AngularFirestoreDocument, 
  AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class StockCategoryService {

  private dbPath = '/stockCategory'
  stockCategoryRef: AngularFirestoreCollection<StockCategory>

  constructor(private fireStore: AngularFirestore) 
  {this.stockCategoryRef = fireStore.collection(this.dbPath)}

  getStocks () : AngularFirestoreCollection<StockCategory>{
    return this.stockCategoryRef
  }

  getStock(id: string): AngularFirestoreDocument<StockCategory> {
    return this.stockCategoryRef.doc(id)
  }

  addStock(stockCategory: StockCategory) {
    return this.stockCategoryRef.add({...stockCategory})
  }

  updateStock(id: string, stockCategory: StockCategory) {
    return this.stockCategoryRef.doc(id).update(stockCategory)
  }

  deleteStock(id: string) {
    return this.stockCategoryRef.doc(id).delete()
  }


}
