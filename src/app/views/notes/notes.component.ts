import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';
import  { Note } from '../../models/note';
import  Swal from 'sweetalert2'

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, OnChanges {

  noteList: Note[] | undefined =  [];

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.getNotes();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    window.location.reload();
  }

  getNotes(): void {
    this.notesService.getNotes().subscribe({
      next: (data: Note[]) =>{
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
          timer: 3000,
          showConfirmButton: false
        });
      }
    });
  }

  deleteNote(id: string) {
    this.notesService.deleteNotes(id).subscribe({
      next: () => {
        Swal.fire({
          title:'Eliminado con exito', 
          icon: 'success',
          timer: 3000,
          showConfirmButton: false
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    }); 
  }

// done: boolean = false;

  isDone(id: string){
    this.notesService.getNote(id).subscribe({
      next: response => {
        if(!response.completed){
          response.completed=true
          return this.notesService.updateNote(id, response).subscribe({
            next: ()=>{window.location.reload()}
          })
        }else{
          response.completed=false
          return this.notesService.updateNote(id, response).subscribe({
            next: ()=>{window.location.reload()}
          })
        }
      }})
  }

 }
