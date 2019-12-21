import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  saveClicked = false;
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
    this.saveClicked = true;
    if (this.registrationForm.invalid) {
      return;
    }
    const user = {
      firstName: this.personalControls.firstName.value,
      lastName: this.personalControls.lastName.value,
      email: this.personalControls.email.value,
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
  get personalControls() {
    return (this.registrationForm.get('personalInfo') as FormGroup).controls;
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
