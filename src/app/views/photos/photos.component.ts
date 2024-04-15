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
    //       this.galery.push(data[i].pictures);
    //       console.log(typeof(this.fotos));
    //     }
    //   }
    // })
  }

}
