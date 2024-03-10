import { Component, Input, OnInit } from '@angular/core';
import { WorksService } from '../../services/works.service'

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  @Input() id?: string;

  constructor(private worksService: WorksService){}

  ngOnInit(): void {
    if (this.id){
      this.worksService.getWork(this.id).subscribe()
    }
  }



}
