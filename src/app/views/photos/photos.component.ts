import { Component, OnInit } from '@angular/core';
import { WorksService } from '../../services/works.service'
import { FormGroup } from '@angular/forms';
import { Work } from '../../models/work'

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  gallery: any[] = []
  fotoForm: FormGroup;

  constructor(private worksService: WorksService) { }

  ngOnInit(): void {
    this.worksService.getWorks().valueChanges().subscribe({
      next: (data: Work[]) => {
        data.forEach(item => {
          item.pictures.forEach(image => {
            let picture = image.imageURL
            let clientName = item.clientName
            let furnitureColor = item.furnitureColor
            let furnitureType = item.furnitureType
            let object = { picture, clientName, furnitureColor, furnitureType }
            this.gallery.push(object)
          })
        })
      }
    })
  }

}
