import { Routes } from '@angular/router';
import {AssignTaskComponent} from "./components/assign-task/assign-task.component";
import {ManageAccountComponent} from "./components/manage-account/manage-account.component";
import {ProjectTasksComponent} from "./components/project-tasks/project-tasks.component";
import {CreateTasksComponent} from "./components/create-tasks/create-tasks.component";
import {UserTasksComponent} from "./components/user-tasks/user-tasks.component";
import {UserCrudComponent} from "./components/user-crud/user-crud.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";

export const routes: Routes = [
  { path: '',   redirectTo: 'login ', pathMatch: 'full' },
  { path: 'assign-task', component: AssignTaskComponent },
  { path: 'manage-account', component: ManageAccountComponent },
  { path: 'project-user-tasks', component: ProjectTasksComponent },
  { path: 'create-user-tasks', component: CreateTasksComponent },
  { path: 'user-crud', component: UserCrudComponent  },
  { path: 'tasks', component: UserTasksComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
