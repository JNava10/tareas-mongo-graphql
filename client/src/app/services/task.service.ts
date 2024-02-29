import { Injectable } from '@angular/core';
import {Apollo} from "apollo-angular";
import {RegisterUser} from "../interfaces/user";
import {ADD_TASK, REGISTER} from "../graphql/mutations";
import {AddTask, Task} from "../interfaces/task"
import {ALL_TASKS} from "../graphql/queries";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private apollo: Apollo) {}

  createTask(task: AddTask) {
    return this.apollo
      .mutate({
        mutation: ADD_TASK,
        variables: task
      });
  }

  getTasks() {
    return this.apollo
      .watchQuery({
        query: ALL_TASKS
      });
  }
}
