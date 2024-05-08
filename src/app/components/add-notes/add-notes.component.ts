import { Component, EventEmitter, Output } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.scss']
})
export class AddNotesComponent {

  @Output() startSpinn = new EventEmitter()

  form: FormGroup;
  constructor(private notesService: NotesService) {
    this.form = new FormGroup({
      text: new FormControl(''),
      completed: new FormControl(false),
    })
  }
  
  addNote() {
    this.startSpinn.emit()
    this.notesService.addNote(this.form.value);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

}