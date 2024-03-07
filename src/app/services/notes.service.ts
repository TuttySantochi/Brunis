import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../models/note';



@Injectable({
  providedIn: 'root'
})
export class NotesService {

 private urlNotes= "http://localhost:5000/notes"

  constructor(private http:HttpClient) { }


  notes: Note[] = [];

  addNote(note: Note) {
    return this.http.post(this.urlNotes, note);
  }
  
  
}
