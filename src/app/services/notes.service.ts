import { Injectable } from '@angular/core';
import { Note } from '../models/note';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private dbPath = '/notes'
  notesRef: AngularFirestoreCollection<Note>

  constructor(private fireStore: AngularFirestore) { this.notesRef = fireStore.collection(this.dbPath) }

  addNote(note: Note) {
    return this.notesRef.add({...note});
  }

  getNotes(): AngularFirestoreCollection<Note> {
    return this.notesRef;
  }

  getNote(id: string): AngularFirestoreDocument<Note> {
    return this.notesRef.doc(id)
  }

  deleteNotes(id: string) {
    return this.notesRef.doc(id).delete();
  }

  updateNote(id: string, note: Note) {
    return this.notesRef.doc(id).update(note);
  }

}
