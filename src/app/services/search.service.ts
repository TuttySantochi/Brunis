import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private dataSourse = new BehaviorSubject<any>('')
  currentData = this.dataSourse.asObservable();

  changeData(data: any){
    this.dataSourse.next(data)
  }

  constructor() { }
}
