import { Component, OnInit } from '@angular/core';
import { Work } from 'src/app/models/work';
import { WorksService } from '../../services/works.service';
import { FormControl, FormGroup } from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/compat/storage'
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  selectedFile: File;
  workFotos: any[] = [];
  worksList: Work[] | undefined = [];
  form: FormGroup;

  constructor(
    private WorksServices: WorksService,
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
      notes: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.WorksServices.getWorks().subscribe({
      next: (data: Work[]) =>{
        this.worksList = data
      }
    })  
  }

  clear(){
    this.workFotos = []
    this.form.reset()
  }
  
  onSubmit (){
    console.log(this.workFotos);
    const work = this.form.value;
    work.pictures = this.workFotos
    console.log(work);
    this.WorksServices.addWork(work).subscribe()
    this.workFotos = []
    setTimeout(() => {
      window.location.reload()
    }, 2500);
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
        console.log(objFoto);
        this.workFotos.push(objFoto);
  }

  deleteFoto(id: any){
    let index = this.workFotos.findIndex(item => item.id === id)
    if (index !== -1) {
      this.workFotos.splice(index,1)
    }
    let picToDelete = this.workFotos[index]
    if (picToDelete !== undefined) {
      let storageRef = this.storage.ref(picToDelete.imageURL)
      storageRef.delete()
    }
  }

  checkMain (id: string){
    let index = this.workFotos.findIndex(item => item.id === id)
    if (this.workFotos[index].mainFoto) {
      this.workFotos.forEach((image, i) => {
        if (i!== index) {
          image.mainFoto = false;
        }
      });
    }
  }


}
