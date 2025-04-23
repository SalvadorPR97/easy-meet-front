import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'pages-register',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public maxDate: string = "";
  public sending: boolean = false;
  public registerForm: FormGroup;

  constructor(private readonly fb: FormBuilder, public router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirm: ['', [Validators.required, Validators.minLength(8)]],
      profile_pic: [null],
      dni: [''],
      birthdate: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 14);
    this.maxDate = today.toISOString().split('T')[0];
    const modal = document.getElementById('createUserModal');
    if (modal) {
      modal.addEventListener('hidden.bs.modal', () => {
        // Redirigir a /eventos cuando el modal se cierre
        this.router.navigate(['']);
      });
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.sending = true;
      console.log(this.registerForm.value);
      //TODO logica para enviar al backend
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
