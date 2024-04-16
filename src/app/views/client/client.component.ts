import { Component, Input, OnInit } from '@angular/core';
import { WorksService } from '../../services/works.service';
import { Work } from '../../models/work';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  
  @Input() id?: string;

  workFotos: any[] = [];
  workInfo: Work;
  form: FormGroup;

  constructor(private worksService: WorksService) {
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
      notes: new FormControl('')
    });
  }

  ngOnInit(): void {
    if (this.id) {
      this.worksService.getWork(this.id).subscribe({
        next: (response: Work) => {
          this.workInfo = response;
          this.workFotos = response.pictures;          
          console.log(response);
          console.log(this.workFotos);
        }});
    } else {
      window.location.href = '/';
    }
  }

  setValues(){
    this.form.setValue({
      clientName: this.workInfo.clientName,
      furnitureType: this.workInfo.furnitureType,
      furnitureColor: this.workInfo.furnitureColor,
      woodType: this.workInfo.woodType,
      price: this.workInfo.price,
      deadline: this.workInfo.deadline,
      location: this.workInfo.location,
      type: this.workInfo.type,
      elevator: this.workInfo.elevator,
      doors: this.workInfo.doors,
      walls: this.workInfo.walls,
      pipes: this.workInfo.pipes,
      wiring: this.workInfo.wiring,
      plinth: this.workInfo.plinth,
      bench: this.workInfo.bench,
      plugs: this.workInfo.plugs,
      corbel: this.workInfo.corbel,
      pictures: this.workInfo.pictures,
      notes: this.workInfo.notes
    })
  }

  updateWork(){
    this.worksService.updateWork(this.workInfo.id, this.form.value).subscribe()
    window.location.reload()
  }

}
