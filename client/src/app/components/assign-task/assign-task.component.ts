import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AllTasksData, Task} from "../../interfaces/task";
import {TaskService} from "../../services/task.service";
import {UserService} from "../../services/user.service";
import {DevelopersData, User, UsersData} from "../../interfaces/user";

@Component({
  selector: 'app-assign-task',
  standalone: true,
  imports: [
    ButtonModule,
    DropdownModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './assign-task.component.html',
  styleUrl: './assign-task.component.css'
})
export class AssignTaskComponent implements OnInit {
  user: User | undefined;
  task: Task | undefined;
  users: User[] = [];
  tasks: Task[] = [];

  constructor(private taskService: TaskService, private userService: UserService) {}

  ngOnInit() {
    this.getDevelopers()
    this.getTasks()
  }

  private getDevelopers() {
    this.userService.findDevelopers().valueChanges.subscribe(
      data =>  {
        const usersData = data.data as DevelopersData
        console.log(data)
        this.users = usersData.developers

      }
    )
  }

  assignTask() {
    console.log(this.user!.email);
    console.log(this.task!.name);

    const assignTask = {
      userEmail: this.user!.email,
      taskName: this.task!.name,
    }

    this.taskService.assignTask(assignTask).subscribe(data => {
      if (data !== null) {
        alert('Asignada');
      } else {
        alert('No se ha asignado');
      }
    })
  }

  private getTasks() {
    this.taskService.getTasks().valueChanges.subscribe(
      data =>  {
        const usersData = data.data as AllTasksData
        this.tasks = usersData.allTasks
      }
    )
  }
}
