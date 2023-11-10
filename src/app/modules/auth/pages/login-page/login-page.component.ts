import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  errorSession: boolean = false
  formLogin: FormGroup = new FormGroup({})

  constructor(private asAuthService: AuthService, private cookie: CookieService, private router: Router) { }

  ngOnInit(): void {
    this.formLogin = new FormGroup(
      {
        email: new FormControl('', [
          Validators.required,
          Validators.email
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12)
        ])
      }
    )
  }

  sendLogin(): void {
    const { email, password } = this.formLogin.value;
    this.asAuthService.sendCredentials(email, password)
      .subscribe(response => {
        console.log('sesion iniciada ok',response)
        const {data, tokenSesion}= response
        this.cookie.set('token', tokenSesion, 4, '/')
        this.router.navigate(['/', 'tracks'])
        
      },
        err => {
          this.errorSession = true
          console.log('error 🔴🔴')
        })
  }

}
