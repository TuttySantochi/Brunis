import { Component, OnInit } from '@angular/core';
import {WorksService} from '../../services/works.service'
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  galery: string[] = []

  fotos: any[] = [];
  
  fotoForm: FormGroup;

  constructor(private worksService: WorksService){
    this.fotoForm = new FormGroup({
      foto: new FormControl(null)
    })
  }

  ngOnInit(): void {
    // this.worksService.getWorks().subscribe({
    //   next: (data) => {
    //     for (let i = 0; i < data.length; i++) {
    //       this.galery.push(data[i].picture);
    //       console.log(typeof(this.fotos));
    //     }
    //   }
    // })
  }

  generateId = () => Date.now().toString(35) + Math.random().toString(36).slice(2)

  getFotos(event: any){
    if(event.target.files){
      let fileList = event.target.files.length
      for (let i = 0; i < fileList; i++) {
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (events:any)=>{
          let foto = events.target.result
          let id = this.generateId()
          let objFoto = {id, foto}
          console.log(objFoto);
          this.fotos.push(objFoto);
        }
      }
    }
  }

  deleteFoto(id: any){
    console.log(id);
    let index = this.fotos.findIndex(item => item.id === id)
    if (index !== -1) {
      this.fotos.splice(index,1)
    }
    console.log(this.fotos);
  }

}
