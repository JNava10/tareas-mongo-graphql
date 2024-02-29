import { Component } from '@angular/core';
import {TaskService} from "../../services/task.service";
import {UserService} from "../../services/user.service";
import {DevelopersData, User} from "../../interfaces/user";
import {AllTasksData, Task} from "../../interfaces/task";

@Component({
  selector: 'app-project-user-tasks',
  standalone: true,
  imports: [],
  templateUrl: './project-tasks.component.html',
  styleUrl: './project-tasks.component.css'
})
export class ProjectTasksComponent {
  task: Task | undefined;
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.getTasks()
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


