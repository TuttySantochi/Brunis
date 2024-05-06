import { Component, OnInit } from '@angular/core';
import {WorksService} from '../../services/works.service'
import { FormGroup, FormControl } from '@angular/forms';
import {Work} from '../../models/work'

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  galery: any[] = []
  worksList: Work[] | undefined = [];

  fotoForm: FormGroup;

  constructor(private worksService: WorksService){
    // this.fotoForm = new FormGroup({
    //   foto: new FormControl(null)
    // })
  }

  ngOnInit(): void {
    this.worksService.getWorks().valueChanges().subscribe({
      next: (data: Work[]) => {
        this.worksList = data
        for (let i = 0; i < data.length; i++) {
          this.galery.push(data[i].pictures);
        }
      }
    })
  }

}
