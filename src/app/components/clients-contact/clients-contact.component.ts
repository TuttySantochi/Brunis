import { Component } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/services/contact.service';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-clients-contact',
  templateUrl: './clients-contact.component.html',
  styleUrls: ['./clients-contact.component.scss']
})
export class ClientsContactComponent {

  idValue: string;
  clientList?: Contact[] = []

  form: FormGroup;

  constructor(private contactServices: ContactService){
    this.form = new FormGroup({
      name: new FormControl(''),
      location: new FormControl(''),
      phone: new FormControl(0),
      type: new FormControl(''),
      calification:  new FormControl(0)
    })
  }
  

  ngOnInit(): void {
    this.getContacts()
  }

  getContacts(): void {
    this.contactServices.getContacts().subscribe({
      next: response => {
        for (let i = 0; i < response.length; i++) {
          if (response[i].type === "client") {
            this.clientList?.push(response[i])
          }
        }
      }
    })
  }

  setValue(id: string){
    this.contactServices.getContact(id).subscribe({
      next: (response) =>{
        this.idValue = response.id
        this.form.setValue({
          name: response.name,
          phone: response.phone,
          location: response.location,
          type: response.type,
          calification: response.calification
        })
      }
    })
  }

  onsubmit(){
    let contact = this.form.value
    this.contactServices.updateContact(this.idValue, contact).subscribe()
    window.location.reload()
  }

  selectWork(id: string){
    Swal.fire({
      icon: 'warning',
      title: 'Desea eliminar este contacto?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: 'red'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteWork(id);
      } else if (result.isDismissed) {
        Swal.fire({
          title: 'No se elimino el contacto',
          icon: 'error',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  }

  deleteWork(id: string) {
    this.contactServices.deleteContact(id).subscribe({
      next: () => {
        Swal.fire({
          title:'Eliminado con exito', 
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    });
  }


}
