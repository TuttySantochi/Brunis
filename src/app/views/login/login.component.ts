import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {login} from '../../models/login'
import {LoginService} from '../../services/login.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  isLoading: boolean = false;
  form: FormGroup;

  constructor(private loginService: LoginService,
              private router: Router
  ){
    this.form = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })}


    onSubmit(){
      this.loginService.login(this.form.value)
      .then(()=>{
        this.isLoading = true
        setTimeout(() => {
          this.router.navigate(['/'])
        }, 1500);
      })
      .catch(error => console.log(error)
      )
    }

}
