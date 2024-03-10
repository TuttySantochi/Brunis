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

  getNotes () : Observable<Note[]>{
    return this.http.get<Note[]>(this.urlNotes)
  }

  getNote (id: string) : Observable<Note>{
    return this.http.get<Note>(`${this.urlNotes}/${id}`)
  }

  deleteNotes(id: string) {
    return this.http.delete(`${this.urlNotes}/${id}`);
  }

  updateNote(id: string, note: Note) {
    return this.http.put(`${this.urlNotes}/${id}`, note);
  }
  
  
}
