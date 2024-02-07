import { Component, Inject, OnInit,  inject } from '@angular/core';
import * as _ from 'lodash';

import { Platform } from '@ionic/angular';


import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
  ValidatorFn,
} from '@angular/forms';
import { DataService } from '../services/data.service';     //for back button
import { ActivatedRoute } from '@angular/router';           //for back button

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  private data = inject(DataService);                              // import
  private activatedRoute = inject(ActivatedRoute);                //this both for back button
  private platform: Platform;


  ionicForm: FormGroup;
  skills: FormArray;

  constructor(public fb: FormBuilder, platform: Platform) {                 // constructor FormBuilder & Platform
    this.platform = platform;
    this.skills = this.fb.array([]);                                        //formarray = mt fb array
  }
  

  ngOnInit() {
    this.ionicForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      mobile: [
        '',
        [
          Validators.required,
          
        ],
      ],

      skills: this.fb.array([this.createItem()], duplicate()),                 // use Empty array and use duplicate fun for get error of same input
    });                                                                        //createItem use for array inputs validation
  }

  createItem(): FormGroup {
    return this.fb.group({
      email:['', [Validators.required]],
      mobile: ['', ([Validators.required ])],
    });
  }

  get f() {                                                     //formgroup = ionicForm   formArrayName = skills 
    return this.ionicForm.get('skills') as FormArray;            //get  formarray inputs
  }

  addSkills() {
    this.skills = this.ionicForm.get('skills') as FormArray;
    this.skills.push(this.createItem());                            //   createItems inputs push into array
  }

  removeSkill(i: any) {
    this.skills.removeAt(i);
  }

  submitForm() {
    console.log(this.ionicForm);
    console.log(this.ionicForm.value);
  }

  getBackButtonText() {                                        // back buttton
    const isIos = this.platform.is('ios');
    return isIos ? 'Inbox' : '';
  }
}

export function duplicate(): ValidatorFn {
  return (formArray: FormArray) => {         // key => key.value.formcontrol name
    var results = _.groupBy(formArray.controls, item => item.value.email);
    var number = _.groupBy(formArray.controls, item1 => item1.value.mobile);
    
    for (let rs in results) {
      if (results[rs].length > 1) {
        _.forEach(results[rs], function (item) {                  //key
          item.get('email').setErrors({ duplicate: true });       //formcontrol name
        });
      } 
      else {
        _.forEach(results[rs], function (item) {
          item.get('email').setErrors(null);
        });
       }
    }
    for (let rs in number ) {
      if (number[rs].length > 1) {
        _.forEach(number[rs], function (item) {
          item.get('mobile').setErrors({ duplicate: true });
        });
      } 
      else {
        _.forEach(number[rs], function (item) {
          item.get('mobile').setErrors(null);
        });
       }
    }
    return null;
  };
}
