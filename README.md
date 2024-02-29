# Requisitos

- MongoDB
- Node.JS

# Instalación
1. En el directorio raiz del proyecto, ejecutar `npm i`.
2. En el subdirectorio `client`, ejecutar `npm i`.

# Ruta
`http://localhost:{puerto}/graphql`

# Consultas
## Programadores
- Consulta: 
```graphql
query Developers {
    allTasks {
    assignedAt
    description
    difficulty
    ended
    name
    plannedHours
    realizedPercentage
    }
}
```
- Resultado:
```graphql
{
  "data": {
    "developers": [
     ...
    ]
  }
}
```
## Tareas asignadas
- Consulta:
```graphql
query AssignedTasks {
    assignedTasks {
        assignedAt
        description
        difficulty
        ended
    }
}
```
- Resultado:
```graphql
{
    "data": {
        "assignedTasks": [
            ...
        ]
    }
}
```

## Todas las tareas
- Consulta:
```graphql
query AllTasks {
    allTasks {
        assignedAt
        description
        difficulty
        ended
    }
}
```
- Resultado:
```graphql
{
    "data": {
        "allTasks": [
            ...
        ]
    }
}
```

## Todas las tareas
- Consulta:
```graphql
query FreeTasks {
    freeTasks {
        assignedAt
        description
        difficulty
        ended
    }
}
```
- Resultado:
```graphql
{
    "data": {
        "freeTasks": [
            ...
        ]
    }
}
```

## Todas las tareas libres
- Consulta:
```graphql
query PendingTasks {
    pendingTasks {
        assignedAt
        description
        difficulty
        ended
    }
}
```
- Resultado:
```graphql
{
    "data": {
        "pendingTasks": [
            ...
        ]
    }
}
```

## Ranking
- Consulta:
```graphql
query Users($count: Int) {
    ranking(count: $count) {
        email
        name
        realizedTasks
    }
}
```
- Resultado:
```graphql
{
    "data": {
        "ranking": [
            ...
        ]
    }
}
```

## Tareas realizadas
- Consulta:
```graphql
query RealizedTasks($email: String) {
    realizedTasks(email: $email) {
        assignedAt
        description
        difficulty
        ended
    }
}
```
- Resultado:
```graphql
{
    "data": {
        "realizedTasks": [
            ...
        ]
    }
}
```

## Usuario
- Consulta:
```graphql
query User($email: String) {
    user(email: $email) {
        _id
        name
        realizedTasks
    }
}
```
- Resultado:
```graphql
{
    "data": {
        "user": [
            ...
        ]
    }
}
```

## Usuarios
- Consulta:
```graphql
query Users {
    users {
        email
        password
        name
        realizedTasks
    }
}
```
- Resultado:
```graphql
{
    "data": {
        "users": [
            ...
        ]
    }
}
```

# Mutaciones
## Programadores
- Mutación:
```graphql
mutation AddTask($name: String, $description: String, $difficulty: String) {
    addTask(name: $name, description: $description, difficulty: $difficulty) {
        _id
        assignedAt
        description
        difficulty
    }
}
```
- Resultado:
```graphql
{
  "data": {
    "developers": [
     ...
    ]
  }
}
```
## Añadir usuario
- Mutación:
```graphql
mutation AddUser($email: String!, $password: String, $name: String) {
    addUser(email: $email, password: $password, name: $name) {
        email
        name
        realizedTasks
        role
    }
}
```

## Añadir tarea
- Mutación:
```graphql
mutation AddTask($taskName: String, $userEmail: String) {
    assignTask(taskName: $taskName, userEmail: $userEmail)
}
```

## Cambiar progreso de tarea
- Mutación:
```graphql
mutation ChangeTaskProgress($progress: Int, $taskName: String) {
    changeTaskProgress(progress: $progress, taskName: $taskName)
}
```

## Borrar tarea
- Mutación:
```graphql
mutation DeleteTask($name: String) {
    deleteTask(name: $name)
}
```

## Borrar usuario
- Mutación:
```graphql
mutation DeleteUser($email: String!) {
    deleteUser(email: $email)
}
```

## Login
- Mutación:
```graphql
mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
        email
        token
    }
}
```

## Modificar tarea
- Mutación:
```graphql
mutation ModifyTask($name: String, $task: String) {
    modifyTask(name: $name, task: $task)
}
```

## Modificar tarea
- Mutación:
```graphql
mutation ModifyTask($name: String, $task: String) {
    modifyTask(name: $name, task: $task)
}
```

## Realizar tarea
- Mutación:
```graphql
mutation RealizeTask($name: String) {
    realizeTask(name: $name)
}
```

## Registro
- Mutación:
```graphql
mutation Register($email: String, $password: String, $name: String) {
    register(email: $email, password: $password, name: $name) {
        email
        name
        password
    }
}
```

## Quitar tarea a usuario
- Mutación:
```graphql
mutation UnassignTask($name: String) {
    unassignTask(name: $name)
}
```

