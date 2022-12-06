import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]

  })
  constructor(private fb: FormBuilder, private api: ServicesService, private router: Router) { }

  ngOnInit(): void {
    history.pushState(null,'')
  }
  login() {
    var username = this.loginForm.value.username
    var password = this.loginForm.value.password

    if (this.loginForm.valid) {
      this.api.login(username, password)
        .subscribe((result: any) => {
          // store username in the localstorage
          localStorage.setItem("username", result.username)

          // store token in the localstorage
          localStorage.setItem("token", result.token)

          // store acno in the localstorage
          localStorage.setItem("currentName", result.currentName)
          alert(result.message)
          this.router.navigateByUrl('home')
        },
          // if client error -400
          (result: any) => {
            alert(result.error.message)
          })
    }
    else {
      alert("Invalid form")
    }
  }

}
