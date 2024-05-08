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
  isLoading: boolean = false

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    this.notesService.getNotes().snapshotChanges().subscribe(
      data => {
        data.forEach(element => {
          let note = element.payload.doc.data() as Note
          note.id = element.payload.doc.id;
          this.noteList?.push(note);
        });
    })  }


  selectWork(id: string): void {
    Swal.fire({
      icon: 'warning',
      title: 'Desea eliminar esta nota?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: 'red'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true
        this.deleteNote(id);
      } else if (result.isDismissed) {
        Swal.fire({
          title: 'No se elimino la note',
          icon: 'error',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  }

  deleteNote(id: string) {
    this.notesService.deleteNotes(id)
    .then(()=>{
      Swal.fire({
        title: 'Eliminado con exito',
        icon: 'success',
        timer: 1800,
        showConfirmButton: false
      });
      window.location.reload();
    })
  }

  async isDone(id: string) {
    this.notesService.getNote(id).valueChanges().subscribe(
      response => {
        if (response) {
          if (!response.completed) {
            response.completed = true
            this.isLoading = true
            return this.notesService.updateNote(id, response)
            .then(()=>{
              setTimeout(() => {
                window.location.reload()
              }, 1000);
            })
          } else {
            response.completed = false
            this.isLoading = true
            return this.notesService.updateNote(id, response)
            .then(()=>{
              setTimeout(() => {
                window.location.reload()
              }, 1000);
            })
          }
        } else {
          return Swal.fire({
            title: 'Problema para acceder, intente de nuevo',
          icon: 'error',
          timer: 1800,
          showConfirmButton: false
          })
        }
      }
    )
  }

  startSpinner(){
    this.isLoading = true
  }

}
