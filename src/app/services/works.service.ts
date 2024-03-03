import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Work} from '../models/work'
import {Observable} from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class WorksService {
  
  url: string = "http://localhost:3000/works"

  // constructor(){}

  // async getWorks (): Promise<Work[] | undefined>{
  //   try {
  //     const result = await fetch(this.url)
  //     const works = result.json()
  //     console.log(works);
      
  //     return works
  //   } catch (error) {
  //     console.log(error);   
  //   }
  //   return undefined
  // }

  constructor(private http: HttpClient) {}

  getWorks () : Observable<Work[]>{
    return this.http.get<Work[]>(this.url)
  }

  getWork(id: number): Observable<Work> {
    return this.http.get<Work>(`${this.url}/${id}`);
  }

  addWork(work: Work) {
    return this.http.post(this.url, work);
  }

  updateWork(id: number, work: Work) {
    return this.http.put(`${this.url}/${id}`, work);
  }

  deleteWork(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
