import { Injectable } from '@angular/core';
import { Credentials } from '../Models/Credentials';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../app.consts';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }

  UserName: string;

  Login(credentials: Credentials) : Observable<any> {
    var body = { user: credentials.UserName, password: credentials.Password }
    return this.http.post(Globals.BASE_URL + '/users/login', body, { responseType: 'text' })
  }

  get GetUser() {
    return localStorage.getItem('User');
  }

  Logout() {
    localStorage.removeItem('User');
    this.router.navigate(['/login']);
  }
}
