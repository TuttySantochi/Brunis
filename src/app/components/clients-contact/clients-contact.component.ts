import { Component, EventEmitter, Output } from '@angular/core';
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
  clientList: Contact[] = []
  allStock: Contact[] = [];


  form: FormGroup;
  searchtext:any;

  @Output() startSpinn = new EventEmitter()


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
    this.contactServices.getContacts().snapshotChanges().subscribe(
      response => {
        if (response) {
          response.forEach(element => {
            let item = element.payload.doc.data() as Contact
            item.id = element.payload.doc.id;
            this.allStock.push(item);
          })
          for (let i = 0; i < this.allStock.length; i++) {
            if (this.allStock[i].type === "client") {
              this.clientList.push(this.allStock[i])
            }
          }
        }
    })  
  }


  setValue(id: string){
    this.contactServices.getContact(id).valueChanges().subscribe(response =>{
      if(response){
        this.idValue = id
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

  onSubmit(){
    this.startSpinn.emit()
    this.contactServices.updateContact(this.idValue, this.form.value)
    Swal.fire({
      icon: 'success',
      title: 'Item Editado!!',
      timer: 1500,
      showConfirmButton: false
    })
    setTimeout(() => {
      window.location.reload()    
    }, 1500);  
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
        this.startSpinn.emit()
        this.deleteWork(id);
      } else if (result.isDismissed) {
        Swal.fire({
          title: 'No se elimino el contacto',
          icon: 'error',
          timer: 1800,
          showConfirmButton: false
        });
      }
    });
  }

  deleteWork(id: string) {
    this.contactServices.deleteContact(id)
    .then(
      () => {
        Swal.fire({
          title:'Eliminado con exito', 
          icon: 'success',
          timer: 1800,
          showConfirmButton: false
        });
        setTimeout(() => {
          window.location.reload();
        }, 1800);
    });
  }


}
