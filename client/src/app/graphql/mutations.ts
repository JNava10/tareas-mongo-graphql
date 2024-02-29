import {gql} from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
      email
      token
    }
  }
`

export const REGISTER = gql`
  mutation Register($email: String, $password: String, $name: String) {
    register(email: $email, password: $password, name: $name) {
      email
      name
      password
      realizedTasks
      role
      secondSurname
      surname
    }
  }
`

export const ADD_TASK = gql`
  mutation AddTask($name: String, $description: String, $difficulty: String) {
    addTask(name: $name, description: $description, difficulty: $difficulty) {
      assignedAt
      description
      difficulty
      ended
      name
      plannedHours
      realizedPercentage
      userAssigned
      workedHours
    }
  }
`

export const DELETE_TASK = gql`
  mutation DeleteTask($name: String) {
    deleteTask(name: $name)
  }
`

export const ASSIGN_TASK = gql`
  mutation AssignTask($taskName: String, $userEmail: String) {
    assignTask(taskName: $taskName, userEmail: $userEmail)
  }
`
