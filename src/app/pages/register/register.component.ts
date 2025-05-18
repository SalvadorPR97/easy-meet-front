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
  public provinces: { name: string }[] = [];

  constructor(private readonly fb: FormBuilder, public router: Router, private readonly registerService: RegisterService) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirm: ['', [Validators.required, Validators.minLength(8)]],
      profile_pic: [null],
      city: ['', Validators.required],
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
    this.registerService.getProvinces().subscribe(
      (res) => {
        this.provinces = res;
      }
    )
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.registerForm.patchValue({profile_pic: file});
      this.registerForm.get('profile_pic')?.updateValueAndValidity();
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.sending = true;

      const formData = new FormData();
      for (const key in this.registerForm.value) {
        if (key === 'profile_pic') {
          const file = this.registerForm.get('profile_pic')?.value;
          if (file) {
            formData.append('profile_pic', file);
          }
        } else {
          formData.append(key, this.registerForm.get(key)?.value);
        }
      }

      this.registerService.registerUser(formData).subscribe();
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
