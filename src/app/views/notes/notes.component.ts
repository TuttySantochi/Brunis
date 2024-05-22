import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';
import { SearchService } from '../../services/search.service';
import { Note } from '../../models/note';
import Swal from 'sweetalert2'
import { take } from 'rxjs';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  noteToEdit: any;
  noteList: Note[] = [];
  isLoading: boolean = false
  searchText:any;

  constructor(private notesService: NotesService, private searchService: SearchService) { }

  ngOnInit(): void {
    this.notesService.getNotes().snapshotChanges().subscribe(
      data => {
        data.forEach(element => {
          let note = element.payload.doc.data() as Note
          note.id = element.payload.doc.id;
          this.noteList?.push(note);
        });
    })
    this.searchService.currentData.subscribe(data=>{
      this.searchText = data
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

async isDone(id: string){
  try {
    this.noteToEdit = await this.notesService.getNote(id).valueChanges().pipe(take(1)).toPromise()
    if (this.noteToEdit) {
      if (this.noteToEdit.completed) {
        this.noteToEdit.completed = false
        this.isLoading = true
        this.notesService.updateNote(id, this.noteToEdit).finally(()=>{
          window.location.reload()
        })
      } else {
        this.noteToEdit.completed = true
        this.isLoading = true
        this.notesService.updateNote(id, this.noteToEdit).finally(()=>{
          window.location.reload()
        })
      }
    }
  } catch (error) {
    console.log(error);
  }
}

  startSpinner(){
    this.isLoading = true
  }

}
