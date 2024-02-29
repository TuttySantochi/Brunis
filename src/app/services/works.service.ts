import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http' 
import {Work} from '../models/work'
import {Observable} from 'rxjs'

const url = "http://localhost:3000/clients"

@Injectable({
  providedIn: 'root'
})
export class WorksService {

  constructor(private http: HttpClient) {}

  getWorks () : Observable<Work[]>{
    return this.http.get<Work[]>(url)
  }

  getWork(id: number): Observable<Work> {
    return this.http.get<Work>(`${url}/${id}`);
  }

  addWork(work: Work) {
    return this.http.post(url, work);
  }

  updateWork(id: number, work: Work) {
    return this.http.put(`${url}/${id}`, work);
  }

  deleteWork(id: number) {
    return this.http.delete(`${url}/${id}`);
  }

}
