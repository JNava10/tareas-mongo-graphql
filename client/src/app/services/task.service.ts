import { Injectable } from '@angular/core';
import {Apollo} from "apollo-angular";
import {ADD_TASK, ASSIGN_TASK} from "../graphql/mutations";
import {AddTask, AssignTask, Task} from "../interfaces/task"
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

  assignTask(assignTask: AssignTask) {
    return this.apollo
      .mutate({
        mutation: ASSIGN_TASK,
        variables: assignTask
      });
  }
}
