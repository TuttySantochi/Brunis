import { Component, Input, OnInit } from '@angular/core';
import { WorksService } from '../../services/works.service';
import { Work } from '../../models/work';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  mainFoto: any;


  @Input() entradaNombre: string = '';
  @Input() entradaTipo: string = '';
  @Input() entradaColor: string = '';
  @Input() entradaImagen: any[] = [];
  @Input() entradaId: string = '';


  work: Work = {
    id: '',
    clientName: '',
    furnitureType: '',
    furnitureColor: '',
    woodType:'',
    price: 0,
    deadline: '',
    location: '',
    type: '',
    elevator: '',
    doors: '',
    walls: '',
    pipes: '',
    wiring: '',
    plinth: false,
    bench: false,
    plugs: false,
    corbel: false,
    pictures: [],
    notes: '',
  };

  constructor(private WorksServices: WorksService) {}

  ngOnInit(): void {
    // console.log(this.entradaImagen);
    for (let i = 0; i < this.entradaImagen.length; i++) {
      if (this.entradaImagen[i].mainFoto === true) {
        this.mainFoto = this.entradaImagen[i].imageURL;
      }      
    }
  }

  selectWork(id: string){
    Swal.fire({
      icon: 'warning',
      title: 'Desea eliminar este trabajo?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: 'red'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteWork(id);
      } else if (result.isDismissed) {
        Swal.fire({
          title: 'No se elimino el trabajo',
          icon: 'error',
          timer: 1800,
          showConfirmButton: false
        });
      }
    });
  }

  deleteWork(id: string) {
    this.WorksServices.deleteWork(id).subscribe({
      next: () => {
        Swal.fire({
          title:'Eliminado con exito', 
          icon: 'success',
          timer: 1800,
          showConfirmButton: false
        });
        setTimeout(() => {
          window.location.reload();
        }, 1800);
      }
    });
  }


}
