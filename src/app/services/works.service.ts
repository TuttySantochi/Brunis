import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc} from '@angular/fire/firestore'
import {Work} from '../models/work'
import {Observable} from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class WorksService {
  
  private url: string = "http://localhost:5000/works"

  constructor(private http: HttpClient, 
    // private firestore: Firestore
  ) {}
  

  getWorks () : Observable<Work[]>{
    return this.http.get<Work[]>(this.url)
  }

  getWork(id: string): Observable<Work> {
    return this.http.get<Work>(`${this.url}/${id}`);
  }

  addWork(work: Work) {
    return this.http.post(this.url, work);
  }

  updateWork(id: string, work: Work) {
    return this.http.put(`${this.url}/${id}`, work);
  }

  deleteWork(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
