import { Component, Input, OnInit } from '@angular/core';
import { WorksService } from '../../services/works.service';
import { Work } from '../../models/work';
import { FormGroup, FormControl } from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/compat/storage'
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import Swal from 'sweetalert2'


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  
  @Input() id: string;

  isLoading: boolean = false
  workFotos: any[] = [];
  workNotes: any[] = [];
  // newWorkNotes: any[] = [];
  workFotosToEdit: any[] = [];
  fotosToDelete: any[] = [];
  newNote: string = '';
  workInfo?: Work;
  form: FormGroup;

  constructor(private worksService: WorksService,
    private storage: AngularFireStorage
  ) {
    this.form = new FormGroup({
      clientName: new FormControl(''),
      furnitureType: new FormControl(''),
      furnitureColor: new FormControl(''),
      woodType: new FormControl(''),
      price: new FormControl(0),
      deadline: new FormControl(''),
      location: new FormControl(''),
      type: new FormControl(''),
      elevator: new FormControl(''),
      doors: new FormControl(''),
      walls: new FormControl(''),
      pipes: new FormControl(''),
      wiring: new FormControl(''),
      plinth: new FormControl(false),
      bench: new FormControl(false),
      plugs: new FormControl(false),
      corbel: new FormControl(false),
      pictures: new FormControl([]),
      notes: new FormControl([])
    });

    this.workInfo = {
      id: '',
      clientName: '',
      furnitureType: '',
      furnitureColor: '',
      woodType: '',
      price: 0,
      deadline: '',
      location: '',
      type: '',
      elevator: '',
      doors: '',
      walls: '',
      pipes: '',
      wiring: '',
      plinth: false,
      bench: false,
      plugs: false,
      corbel: false,
      pictures: [],
      notes: []
    };
  }

  ngOnInit(): void {
    if (this.id) {
      this.worksService.getWork(this.id).valueChanges().subscribe(response => {
        if (response !== undefined) {
          this.workInfo = response;
          for (let i = 0; i < response.pictures.length; i++) {
              this.workFotos.push(response?.pictures[i]);                     
            }
            for (let i = 0; i < response.notes.length; i++) {
              this.workNotes.push(response?.notes[i]);
            }
          } else {
            Swal.fire({
              title: 'Los datos no se cargaron correctamente, intenta de nuevo',
              icon: 'error',
              timer: 1800,
              showConfirmButton: false,
            })
            setTimeout(() => {
              window.location.href = '/'
            }, 1800);
          }
        });
    } else {
      window.location.href = '/';
    }
  }

  setValues(){
    this.worksService.getWork(this.id).valueChanges().subscribe(response => {
      if (response) {
        for (let i = 0; i < response.pictures.length; i++) {
            this.workFotosToEdit.push(response?.pictures[i]);                     
          }
      }
      });
    this.form.setValue({
      clientName: this.workInfo?.clientName,
      furnitureType: this.workInfo?.furnitureType,
      furnitureColor: this.workInfo?.furnitureColor,
      woodType: this.workInfo?.woodType,
      price: this.workInfo?.price,
      deadline: this.workInfo?.deadline,
      location: this.workInfo?.location,
      type: this.workInfo?.type,
      elevator: this.workInfo?.elevator,
      doors: this.workInfo?.doors,
      walls: this.workInfo?.walls,
      pipes: this.workInfo?.pipes,
      wiring: this.workInfo?.wiring,
      plinth: this.workInfo?.plinth,
      bench: this.workInfo?.bench,
      plugs: this.workInfo?.plugs,
      corbel: this.workInfo?.corbel,
      pictures: [],
      notes: []
    })
  }

  generateId = () => Date.now().toString(35) + Math.random().toString(36).slice(2)


  async getFotos(event: any){
    let file = event.target.files[0]
    let storage = getStorage()
    let storageRef = ref(storage, `images/${file.name}`)
    let uploadTask = await uploadBytes(storageRef, file)
    let imageURL = await getDownloadURL(uploadTask.ref)
    let id = this.generateId()
    let mainFoto = false;
    let objFoto = {id, imageURL, mainFoto}
    this.workFotosToEdit.push(objFoto);
    this.fotosToDelete.push(objFoto);
}

deleteFoto(id: string){
  let index = this.workFotosToEdit.findIndex(item => item.id === id)
  if (index !== -1) {
    this.workFotosToEdit.splice(index,1)
  }
  let picToDelete = this.workFotosToEdit[index]
  if (picToDelete !== undefined) {
    let storageRef = this.storage.refFromURL(picToDelete.imageURL)
    storageRef.delete()
  }
}

checkMain (id: string){
  let index = this.workFotosToEdit.findIndex(item => item.id === id)
  if (this.workFotosToEdit[index].mainFoto) {
    this.workFotosToEdit.forEach((image, i) => {
      if (i!== index) {
        image.mainFoto = false;
      }
    });
  }
}

  updateWork(): void{
    this.isLoading = true
    this.form.value.pictures = this.workFotosToEdit
    this.form.value.notes = this.workNotes
    this.worksService.updateWork(this.id, this.form.value)
    setTimeout(() => {
      window.location.reload()
    }, 1500);
  }

  clear(){
    if (this.fotosToDelete) {
      this.fotosToDelete.forEach(image=>{
        let storageRef = this.storage.refFromURL(image.imageURL)
        storageRef.delete();
      })
    }
    this.workFotosToEdit = [];
    this.fotosToDelete = [];
    this.form.reset()
  }

  addNote(){
    if(this.newNote.trim() !== ''){
      let note = this.newNote
      let id = this.generateId()
      let objNote = { id, note }
      this.workNotes.push(objNote)
      this.newNote = ''; 
    } else{
      Swal.fire({
        title: 'No se pudo agregar la nota',
        icon: 'error',
        timer: 1500,
        showConfirmButton: false
      })
    }
  }

  deleteNote(id: string){
    let index = this.workNotes.findIndex(item => item.id === id)
    if (index !== -1) {
      this.workNotes.splice(index, 1)
    }
  }

}
