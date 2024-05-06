import { Injectable } from '@angular/core';
import {Work} from '../models/work'
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class WorksService {
  
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
    return this.workRef.add({...work});
  }

  updateWork(id: any, work: Work): Promise<void>{
    return this.fireStore.doc(id).update(work);
  }

  deleteWork(id: string): any {
    console.log(id);
    
    return this.workRef.doc(id).delete();
  }

}
