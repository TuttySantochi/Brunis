import { Component, OnInit } from '@angular/core';
import { Work } from 'src/app/models/work';
import { WorksService } from '../../services/works.service';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  worksList: Work[] | undefined = [];
  form: FormGroup;

  constructor(private WorksServices: WorksService) {
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
      picture: new FormControl(''),
      notes: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.getWorks();
  }

  clear(){
    this.form.reset()
    this.ngOnInit()
  }

  getWorks(): void {
    this.WorksServices.getWorks().subscribe({
      next: (data: Work[]) =>{
        this.worksList = data
      }
    })
  }

  // getWork(): void {
  //   this.WorksServices.getWork(this.id).subscribe({
  //     next: (data: Work) =>{

  //     }
  //   })
  // }

  // deleteWork(id: string): void{
  //   this.WorksServices.deleteWork(id).subscribe({
  //     next: ()=>{
  //       this.getWorks()
  //     }
  //   })
  // }
  
  onSubmit (){
    const work = this.form.value;
    console.log(work);
    
    this.WorksServices.addWork(work).subscribe()
    this.clear()
  }

}
