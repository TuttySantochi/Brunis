import { Component, OnInit } from '@angular/core';
import {WorksService} from '../../services/works.service'

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  galery: string[] = []

  constructor(private worksService: WorksService){}

  ngOnInit(): void {
    this.worksService.getWorks().subscribe({
      next: (data) => {
        for (let i = 0; i < data.length; i++) {
          this.galery.push(data[i].picture);
        }
      }
    })
  }


}
