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
  isLoading: boolean = false

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
    this.isLoading = true
    this.contactService.addContact(this.form.value)
    setTimeout(() => {
      window.location.reload()
    }, 1500);
  }

  startSpinner(){
    this.isLoading = true
  }

}
