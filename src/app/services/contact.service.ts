import { Injectable } from '@angular/core';
import { Contact } from '../models/contact'
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private dbPath = '/contacts'
  contactRef: AngularFirestoreCollection<Contact>

  constructor(private fireStore: AngularFirestore) 
  { this.contactRef = fireStore.collection(this.dbPath) }

  getContacts(): AngularFirestoreCollection<Contact> {
    return this.contactRef
  }

  getContact(id: string): AngularFirestoreDocument<Contact> {
    return this.contactRef.doc(id);
  }

  addContact(contact: Contact) {
    return this.contactRef.add({...contact});
  }

  updateContact(id: string, contact: Contact) {
    return this.contactRef.doc(id).update(contact);
  }

  deleteContact(id: string) {
    return this.contactRef.doc(id).delete();
  }


}
