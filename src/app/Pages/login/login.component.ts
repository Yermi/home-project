import { Component, OnInit } from '@angular/core';
import { Credentials } from 'src/app/Models/Credentials';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService, ToastType } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastService
  ) { }

  credentials: Credentials = new Credentials();

  ngOnInit() { }

  Login() {
    console.log(this.credentials.UserName);
    console.log(this.credentials.Password);
    this.loginService.Login(this.credentials).subscribe(
      (next : string) => {
        console.log(next);
        this.toastService.popToast(ToastType.Success, next);
        this.loginService.UserName = this.credentials.UserName;
        localStorage.setItem('User', this.loginService.UserName)
        this.router.navigate(['/secure'])

      },
      (error: HttpErrorResponse) => {
        console.log(error.error);
        this.toastService.popToast(ToastType.Error, error.error);
      })
  }

}
