import { Injectable } from '@angular/core';
import {LoginCredentials, LoginData} from "../interfaces/loginCredentials";
import {HttpClient} from "@angular/common/http";
import {Apollo} from "apollo-angular";
import {MutationResult, Observable} from "@apollo/client";
import {RegisterUser} from "../interfaces/user";
import {REGISTER} from "../graphql/mutations";
import {DEVELOPERS} from "../graphql/queries";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private apollo: Apollo) {}

  register(user: RegisterUser) {
    return this.apollo
      .mutate({
        mutation: REGISTER,
        variables: user,
      });
  }

  findDevelopers() {
    return this.apollo
      .watchQuery({
        query: DEVELOPERS
      });
  }
}
