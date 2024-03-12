import { Component, Input, OnInit } from '@angular/core';
import { WorksService } from '../../services/works.service';
import { Work } from '../../models/work';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  @Input() id?: string;

  workInfo?: Work;

  constructor(private worksService: WorksService) {}

  ngOnInit(): void {
    if (this.id) {
      this.worksService.getWork(this.id).subscribe({
        next: (response) => {
          this.workInfo = response;
          console.log(this.workInfo);
          
        },
        error(err) {
          if (err.status === 404) {
            Swal.fire({
              title: 'No se encontro el trabajo',
              icon: 'error',
              timer: 3000,
              showConfirmButton: false,
            });
            setTimeout(() => {
              window.location.href = '/';
            }, 3000);
          }
        },
      });
    } else {
      window.location.href = '/';
    }
  }
}
