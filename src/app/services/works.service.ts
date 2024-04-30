import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Work} from '../models/work'
import {Observable} from 'rxjs'
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class WorksService {
  
  private url: string = "http://localhost:5000/works"
  private dbPath = '/works'
  workRef: AngularFirestoreCollection<Work>
  
  constructor(private fireStore: AngularFirestore) 
  {this.workRef = fireStore.collection(this.dbPath)}


  getWorks () : AngularFirestoreCollection<Work>{
    return this.workRef
  }

  getWork(id: string): AngularFirestoreDocument<Work> {
    return this.fireStore.doc(`${this.dbPath}/${id}`)
  }

  addWork(work: Work): any {
    console.log(work);
    
    return this.workRef.add({...work});
  }

  updateWork(id: any, work: Work): Promise<void>{
    return this.fireStore.doc(id).update(work);
  }

  deleteWork(id: string): any {
    console.log(id);
    
    return this.workRef.doc(id).delete();
  }
  

  // getWorks () : Observable<Work[]>{
  //   return this.http.get<Work[]>(this.url)
  // }

  // getWork(id: string): Observable<Work> {
  //   return this.http.get<Work>(`${this.url}/${id}`);
  // }

  // addWork(work: Work) {
  //   return this.http.post(this.url, work);
  // }

  // updateWork(id: string, work: Work) {
  //   return this.http.put(`${this.url}/${id}`, work);
  // }

  // deleteWork(id: string) {
  //   return this.http.delete(`${this.url}/${id}`);
  // }

}
