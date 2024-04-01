import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import {Contact} from '../../models/contact'

@Component({
  selector: 'app-contact-section',
  templateUrl: './contact-section.component.html',
  styleUrls: ['./contact-section.component.scss']
})
export class ContactSectionComponent implements  OnInit {

  clientContact: Contact[] | undefined = []
  providerContact: Contact[] | undefined = []

  constructor(private contactService: ContactService){}

  ngOnInit(): void {
    this.contactService.getContacts().subscribe({
      next: response => {
        for (let i = 0; i < response.length; i++) {
          if (response[i].type === "client"){
            this.clientContact?.push(response[i])
        }else if(response[i].type === "provider"){
          this.providerContact?.push(response[i])
      }
    }}})
  }

}
