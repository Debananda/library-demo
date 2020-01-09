import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LoginComponent, RegistrationComponent, AuthComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: AuthComponent,
        children: [
          { path: '', redirectTo: 'login' },
          { path: 'login', component: LoginComponent },
          { path: 'register', component: RegistrationComponent }
        ]
      }
    ])
  ],
  exports: [LoginComponent, RegistrationComponent, AuthComponent],
  providers: [AuthService]
})
export class AuthModule {}
