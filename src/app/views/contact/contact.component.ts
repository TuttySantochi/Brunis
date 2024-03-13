import { Component } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  form: FormGroup

  constructor(private contactService: ContactService){
    this.form = new FormGroup({
      name: new FormControl(''),
      location: new FormControl(''),
      phone: new FormControl(0),
      type: new FormControl(''),
      calification:  new FormControl(0)
    })
  }

  onSubmit(){
    const contact = this.form.value
    this.contactService.addContact(contact).subscribe()
    window.location.reload()
  }

}
