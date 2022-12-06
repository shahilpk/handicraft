import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9@gmail.com]*')]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]

  })
  constructor(private fb: FormBuilder, private api: ServicesService, private router: Router) { }

  ngOnInit(): void {
  }
  register() {
    var name = this.registerForm.value.name
    var username = this.registerForm.value.username
    var email = this.registerForm.value.email
    var password = this.registerForm.value.password

    if (this.registerForm.valid) {
      this.api.register(name, username, email, password)
      .subscribe((result:any)=>{
        alert(result.message)

        this.router.navigateByUrl('')
    },
    // if error
    (result:any)=>{
      alert(result.error.message)
    }
    )
    }
  }
}
