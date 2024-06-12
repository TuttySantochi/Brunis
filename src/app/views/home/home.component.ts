import { Component, OnInit } from '@angular/core';
import { Work } from 'src/app/models/work';
import { WorksService } from '../../services/works.service';
import { SearchService } from '../../services/search.service';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  selectedFile: File;
  workFotos: any[] = [];
  worksList: Work[] = [];
  form: FormGroup;
  isLoading: boolean = false
  searchText: string


  constructor(
    private WorksServices: WorksService,
    private storage: AngularFireStorage,
    private searchService: SearchService
  ) {
    this.form = new FormGroup({
      clientName: new FormControl('', Validators.required),
      furnitureType: new FormControl('', Validators.required),
      furnitureColor: new FormControl(''),
      woodType: new FormControl(''),
      price: new FormControl(0),
      deadline: new FormControl(''),
      location: new FormControl('', Validators.required),
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
    this.WorksServices.getWorks().snapshotChanges().subscribe(
        data => {
          data.forEach(item => {
            let works = item.payload.doc.data() as Work
            works.id = item.payload.doc.id
            this.worksList.push(works)
          })
        }
      )
      this.searchService.currentData.subscribe(data =>{
        this.searchText = data
      })
  }

  clear() {
    for (let i = 0; i < this.workFotos.length; i++) {
      let storageRef = this.storage.refFromURL(this.workFotos[i].imageURL)
      storageRef.delete()
    }
    this.workFotos = []
    this.form.reset()
  }

  onSubmit() {
    this.isLoading = true
    const work = this.form.value;
    work.pictures = this.workFotos
    this.WorksServices.addWork(work)
    setTimeout(() => {
      window.location.reload()
    }, 1500);
  }

  generateId = () => Date.now().toString(35) + Math.random().toString(36).slice(2)

  async getFotos(event: any) {
    let file = event.target.files[0]
    let storage = getStorage()
    let storageRef = ref(storage, `images/${file.name}`)
    let uploadTask = await uploadBytes(storageRef, file)
    let imageURL = await getDownloadURL(uploadTask.ref)
    let id = this.generateId()
    let mainFoto = false;
    let objFoto = { id, imageURL, mainFoto }
    console.log(objFoto);
    this.workFotos.push(objFoto);
  }

  deleteFoto(id: any) {
    let index = this.workFotos.findIndex(item => item.id === id)
    let picToDelete = this.workFotos[index]
    if (index !== -1) {
      this.workFotos.splice(index, 1)
    }
    if (picToDelete !== undefined) {
      let storageRef = this.storage.refFromURL(picToDelete.imageURL)
      storageRef.delete()
    }
  }

  checkMain(id: string) {
    let index = this.workFotos.findIndex(item => item.id === id)
    if (this.workFotos[index].mainFoto) {
      this.workFotos.forEach((image, i) => {
        if (i !== index) {
          image.mainFoto = false;
        }
      });
    }
  }

  startSpinner(){
      this.isLoading = true
  }

  // searchInfo(){
  //   this.searchService.changeData(this.searchText)
  // }

}
