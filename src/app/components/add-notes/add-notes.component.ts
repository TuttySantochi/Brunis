import { Component } from '@angular/core';
import { NotesService } from  'src/app/services/notes.service';


@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.scss']
})
export class AddNotesComponent {

  constructor(public notesService : NotesService) {}

  note: string = '';

  addNote(){
    this.notesService.addNote(this.note);
    this.note = '';
  }
}
