import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { SearchService } from '../../services/search.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  form: FormGroup
  isLoading: boolean = false
  searchText:any;

  constructor(private contactService: ContactService,
    private searchService: SearchService) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      location: new FormControl(''),
      phone: new FormControl(0, Validators.required),
      type: new FormControl(''),
      calification:  new FormControl(0)
    })
  }

  ngOnInit(): void {
    this.searchService.currentData.subscribe(data=>{
      this.searchText = data
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
