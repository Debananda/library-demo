import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [LoginComponent, RegistrationComponent, AuthComponent],
  imports: [CommonModule],
  exports: [LoginComponent, RegistrationComponent, AuthComponent]
})
export class AuthModule {}
