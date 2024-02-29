import { Injectable } from '@angular/core';

const urlNotes= "http://localhost:3000/notes"

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor() { }

  notes: string[] = ['hola tutty'];

  addNote(note: string) {
    this.notes.push(note);
  }
  
}
