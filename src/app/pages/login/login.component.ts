import { Component } from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'pages-login',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public loginForm: FormGroup;
  public sending: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required])
    });
  }

  login (){
    this.sending = true;
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log(response);
        const token = response.data.accessToken; // o donde Laravel te lo devuelva
        console.log(token);
        this.authService.setToken(token);
        this.router.navigate(['']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
