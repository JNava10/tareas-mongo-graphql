import { Routes } from '@angular/router';
import {AssignTaskComponent} from "./components/assign-task/assign-task.component";
import {ManageAccountComponent} from "./components/manage-account/manage-account.component";
import {ProjectTasksComponent} from "./components/project-tasks/project-tasks.component";
import {RoleManageComponent} from "./components/role-manage/role-manage.component";
import {TaskCrudComponent} from "./components/task-crud/task-crud.component";
import {TasksComponent} from "./components/tasks/tasks.component";
import {UserCrudComponent} from "./components/user-crud/user-crud.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";

export const routes: Routes = [
  { path: '',   redirectTo: '/login ', pathMatch: 'full' },
  { path: 'assign-task', component: AssignTaskComponent },
  { path: 'manage-account', component: ManageAccountComponent },
  { path: 'project-tasks', component: ProjectTasksComponent },
  { path: 'role-manage', component: RoleManageComponent },
  { path: 'task-crud', component: TaskCrudComponent },
  { path: 'user-crud', component: UserCrudComponent  },
  { path: 'tasks', component: TasksComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
