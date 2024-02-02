import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';        //use Router for navigate
import {                         
  FormGroup,     
  FormBuilder,            // use this for form validation
  Validators,
} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  neelform: FormGroup;                   //use neelform variable into form
  email:any;
  password:any
  formBuilder: any;

  constructor(public fb: FormBuilder, public route: Router) {}     //use Router & formBuilder     

  ngOnInit() {
    this.neelform = this.fb.group({                //use fb (form builder)
      email: ['', [Validators.required,   Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      password: ['', [Validators.required,Validators.minLength(6)]],
      
      
    });
  }

  submitForm() {
    console.log(this.neelform)                
    console.log(this.neelform.value);
    this.route.navigateByUrl('/home');            //navigate into next page.
  }
}
