import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {TaskService} from "../../services/task.service";
import {AddTask, AllTasksData, Task} from "../../interfaces/task";
import {DropdownModule} from "primeng/dropdown";

@Component({
  selector: 'app-create-user-tasks',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    DropdownModule
  ],
  templateUrl: './create-tasks.component.html',
  styleUrl: './create-tasks.component.css'
})
export class CreateTasksComponent implements OnInit {
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTasks()
  }

  tasks: Task[] = [];

  private getTasks() {
     this.taskService.getTasks().valueChanges.subscribe(
       data => {
         const allTasksData = data.data as AllTasksData

         this.tasks = allTasksData.allTasks;
       }
     )
  }

  name: string = "";
  description: string = "";
  difficulty: string = "";

  difficulties = [
    's',
    'm',
    'l',
    'xl'
  ];

  deleteTaskSelected: any;

  createTask() {
    const task: AddTask = {
      name: this.name,
      description: this.description,
      difficulty: this.difficulty,
    }

    this.taskService.createTask(task).subscribe(data => {
      if (data !== null) {
        alert('Tarea añadida');
      } else {
        alert('No se ha añadido la tarea');
      }
    })
  }
}
