import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.registrationForm = this.formBuilder.group(
      {
        personalInfo: new FormGroup({
          firstName: new FormControl('', [Validators.required, Validators.minLength(5)]),
          lastName: new FormControl('', [Validators.required, Validators.minLength(5)]),
          email: new FormControl('', [Validators.required, this.emailValidator])
        }),
        password: new FormControl('', [Validators.required, Validators.minLength(5)]),
        confirmPassword: new FormControl('', [Validators.required])
      },
      { validators: this.mustMatch('confirmPassword', 'password') }
    );
  }

  register() {
    const user = {
      firstName: this.registrationForm.get('personalInfo').get('firstName').value,
      password: this.registrationForm.get('password').value
    };
    console.log(user);
  }

  emailValidator(emailControl: FormControl) {
    const email = emailControl.value;
    if (!email.endsWith('@gmail.com')) {
      return {
        custEmail: 'Invalid Email Domain'
      };
    }
    return null;
  }

  mustMatch(controlName: string, tobeValidatedWith: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[tobeValidatedWith];

      if (control.errors && !control.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        control.setErrors({ mustMatch: true });
      } else {
        control.setErrors(null);
      }
    };
  }
}
