import { Component } from '@angular/core';
import { NotesService } from  'src/app/services/notes.service';
import { Note } from '../../models/note';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.scss']
})
export class AddNotesComponent {

  form: FormGroup;
  constructor(private notesService : NotesService) {
    this.form = new FormGroup ({
      text: new  FormControl(''), 
      completed: new FormControl (false),
    })
    }
    addNote(){      
      const note = this.form.value;
      this.notesService.addNote(note).subscribe();
      window.location.reload();
      }
  
  }