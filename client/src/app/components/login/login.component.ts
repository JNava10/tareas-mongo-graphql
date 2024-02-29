import { Component } from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {AuthService} from "../../services/auth.service";
import {LoginData} from "../../interfaces/loginCredentials";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    ButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  email: string = "";
  password: string = "";

  login() {
    this.authService.login({email: this.email, password: this.password})
      .subscribe(data => {

        const loginData = data.data as LoginData

        localStorage.setItem('token', loginData.login.token);
        localStorage.setItem('email',  loginData.login.email);
      })
  }
}
