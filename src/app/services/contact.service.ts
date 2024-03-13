import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Contact} from '../models/contact'
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private url: string = "http://localhost:5000/contacts"


  constructor(private http: HttpClient) {}

  getContacts () : Observable<Contact[]>{
    return this.http.get<Contact[]>(this.url)
  }

  getContact(id: string): Observable<Contact> {
    return this.http.get<Contact>(`${this.url}/${id}`);
  }

  addContact(contact: Contact) {
    return this.http.post(this.url, contact);
  }

  updateContact(id: string, contact: Contact) {
    return this.http.put(`${this.url}/${id}`, contact);
  }

  deleteContact(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }


}
