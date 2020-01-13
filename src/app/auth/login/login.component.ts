import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // loginForm = new FormGroup({
  //   userName: new FormControl('', [Validators.required, Validators.email]),
  //   password: new FormControl('', [Validators.required, Validators.minLength(5)])
  // });
  loginForm: FormGroup;
  saveClicked = false;
  errorMessage = null;
  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}
  get f() {
    return this.loginForm.controls;
  }
  ngOnInit() {
    this.authService.error.subscribe(errMsg => {
      this.errorMessage = errMsg;
    });
    this.loginForm = this.formBuilder.group({
      userName: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }
  // fetch() {
  //   this.loginForm.patchValue({ userName: 'test@test123456.com' });
  //   // this.loginForm.setValue({ userName: 'test@test.com', password: '' });
  // }

  login() {
    this.saveClicked = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.f.userName.value, this.f.password.value).subscribe(() => {
      console.log('done');
    });
  }
}
