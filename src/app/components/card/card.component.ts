import { Component, Input } from '@angular/core';
import {WorksService} from '../../services/works.service'
import {Work} from '../../models/work'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  work: Work = {
      id: '',
      clientName: '',
      furnitureType: '',
      furnitureColor: '',
      location: '',
      type: '',
      elevator: '',
      doors: '',
      walls: '',
      pipes: '',
      wiring: '',
      plinth: false,
      bench:  false,
      plugs: false,
      corbel: false,
      picture: '',
      notes: ''
  }
  

  constructor(private WorksServices: WorksService){}
  
  @Input() entradaNombre: string = '';
  @Input() entradaTipo: string = '';
  @Input() entradaColor: string = '';
  @Input() entradaImagen: string = '';
  @Input() entradaId: string = '';

  selectWork(id: string):void{
    this.WorksServices.getWork(id).subscribe({
      next: (data: Work)=>{
        this.work = data
        console.log(this.work);
      }
    })
  }  

  deleteWork(){
    console.log(this.work.id);
    
      this.WorksServices.deleteWork(this.work.id).subscribe({
      next: ()=>{
        window.location.reload()
      }
    })
  }


}
