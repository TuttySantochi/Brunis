import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';
import { Note } from '../../models/note';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  noteList: Note[] | undefined = [];

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void {
    this.notesService.getNotes().subscribe({
      next: (data: Note[]) => {
        this.noteList = data
        console.log(data);

      }
    })
  }

  selectWork(id: string): void {
    Swal.fire({
      icon: 'warning',
      title: 'Desea eliminar esta nota?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: 'red'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteNote(id);
      } else if (result.isDismissed) {
        Swal.fire({
          title: 'No se elimino la note',
          icon: 'error',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  }

  deleteNote(id: string) {
    this.notesService.deleteNotes(id).subscribe({
      next: () => {
        Swal.fire({
          title: 'Eliminado con exito',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    });
  }

  isDone(id: string) {
    this.notesService.getNote(id).subscribe({
      next: response => {
        if (!response.completed) {
          response.completed = true
          return this.notesService.updateNote(id, response).subscribe({
            next: () => { window.location.reload() }
          })
        } else {
          response.completed = false
          return this.notesService.updateNote(id, response).subscribe({
            next: () => { window.location.reload() }
          })
        }
      }
    })
  }

}
