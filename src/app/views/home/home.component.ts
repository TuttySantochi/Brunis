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
      location: new FormControl(''),
      type: new FormControl(''),
      elevator: new FormControl(''),
      doors: new FormControl(''),
      walls: new FormControl(''),
      pipes: new FormControl(''),
      wiring: new FormControl(''),
      plinth: new FormControl(''),
      bench: new FormControl(''),
      plugs: new FormControl(''),
      corbel: new FormControl(''),
      picture: new FormControl(''),
      notes: new FormControl(''),
    });
  }
  getWorks(): void {
    this.WorksServices.getWorks().subscribe({
      next: (data: Work[]) =>{
        this.worksList = data
      }
    })
  }

  
  onSubmit (){
    const work = this.form.value;
    console.log(work);
    
    this.WorksServices.addWork(work).subscribe()
  }
  
  ngOnInit(): void {
    this.getWorks();
  }

  // cards = [
  //   {
  //     nombre: 'May Toscano',
  //     tipo: 'Cocina',
  //     color: 'Grafito, Helsinki',
  //     imagen: 'assets/MayToscano.jpeg',
  //   },
  //   {
  //     nombre: 'Rosa Silberstein',
  //     tipo: 'Escritorio',
  //     color: 'Camelia, Grafito',
  //     imagen: 'assets/RositaSilberstein.jpeg',
  //   },
  //   {
  //     nombre: 'Mariano Torres',
  //     tipo: 'Vinoteca',
  //     color: 'Lino Negro',
  //     imagen: 'assets/MarianoTorres.jpg',
  //   },
  //   {
  //     nombre: 'Nadia Atenor',
  //     tipo: 'Rack TV',
  //     color: 'Blanco, Concreto',
  //     imagen: 'assets/NadiaAtenor.jpeg',
  //   },
  //   {
  //     nombre: 'Nacho Arbeloa',
  //     tipo: 'Cama Montessori',
  //     color: 'Seda Giorno',
  //     imagen: 'assets/NachoArbeloa.jpeg',
  //   },
  // ];
}
