import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {LoginData} from "../../interfaces/loginCredentials";
import {Register} from "../../interfaces/user";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
    imports: [
        ButtonModule,
        FormsModule,
        InputTextModule
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private userService: UserService, private router: Router) {}

  email: string = "";
  password: string = "";
  name: string = "";
  surname: string = "";
  secondSurname: string = "";

  register() {
    const userData = {
      email: this.email,
      password: this.password,
      name: this.name,
      surname: this.surname,
      secondSurname: this.secondSurname,
    }

    this.userService.register(userData).subscribe(data => {
      if (data !== null) {
        alert('Registrado');
        this.router.navigate(['/login'])
      } else {
        alert('No se ha registrado');
      }
    })
  }
}
