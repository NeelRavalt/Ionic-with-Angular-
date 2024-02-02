import { Component, OnInit,inject } from '@angular/core';
import {  Platform } from '@ionic/angular'; //import for use back button
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.page.html',
  styleUrls: ['./employee.page.scss'],
})
export class EmployeePage implements OnInit {
 
  private platform = inject(Platform); //import {inject}{platform} for use back button

  ionicForm: FormGroup;       //use this variable into formGroup
  constructor(public fb: FormBuilder) {}

  ngOnInit() {
    this.ionicForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required,   Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$'),Validators.minLength(10)]],
      dob: ['', [ Validators.required,
        // validates date format yyyy-mm-dd with regular expression
        Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)
    ]],
    button:['male',[Validators.required]]
    });
  }
  submitForm(){
    console.log(this.ionicForm)
    console.log(this.ionicForm.value)
  }

  getBackButtonText() {              //use this for back button on toolbar
    const isIos = this.platform.is('ios')
    return isIos ? 'Inbox' : '';
  }
}
