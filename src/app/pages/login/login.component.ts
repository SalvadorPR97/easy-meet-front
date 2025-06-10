import { Component } from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AngularToastifyModule, ToastService} from 'angular-toastify';

@Component({
  selector: 'pages-login',
  imports: [
    ReactiveFormsModule,
    AngularToastifyModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public loginForm: FormGroup;
  public sending: boolean = false;

  constructor(private readonly authService: AuthService, private readonly router: Router, private readonly  toastService: ToastService) {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required])
    });
  }

  login (){
    this.sending = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.authService.setToken(response.data.accessToken);
        this.authService.setUserInfo(response.data.user);
        this.router.navigate(['']);
      },
      error: (err) => {
        this.toastService.error(err.error.message);
        this.sending = false;
      }
    });
  }

}
