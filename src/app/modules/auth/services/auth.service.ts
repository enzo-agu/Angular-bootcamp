import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { tap } from 'rxjs/operators'
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly URL = environment.api

  constructor(private http: HttpClient, private cookie: CookieService, private router: Router) {
  }
  sendCredentials(email: string, password: string): Observable<any> {
    const body = {
      email,
      password
    }
    return this.http.post(`${this.URL}/api/1.0/auth/login`, body)
      .pipe(
        tap(
          (response: any) => {
            const { tokenSession } = response
            this.cookie.set('token', tokenSession, 4, '/')
          }
        )
      )
  }

}
