import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {RegisterService} from './services/register.service';

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

  constructor(private readonly fb: FormBuilder, public router: Router, private readonly registerService: RegisterService) {
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
        this.router.navigate(['']);
      });
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.sending = true;
      this.registerService.registerUser(this.registerForm.value).subscribe();
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
