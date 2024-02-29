const { gql } = require('graphql-tag')

const typeDefs = gql`
    
    type User {
        _id: String!
        email: String!
        password: String!
        name: String
        surname: String
        secondSurname: String
        realizedTasks: Int
        role: String
    }
    
    type Task {
        _id: String!
        name: String!
        description: String!
        difficulty: String!
        plannedHours: Float!
        workedHours: Float!
        realizedPercentage: Float!
        ended: Boolean!
        userAssigned: String
        assignedAt: String
    }
    
    type LoginCredentials {
        email: String,
        token: String
    }

     type Query {
         user(email: String): User
         users: [User]
         developers: [User]
         ranking: [User]
         task: Task
         allTasks: [Task]
         pendingTasks: [Task]
         realizedTasks: [Task]
         freeTasks: [Task]
         assignedTasks: [Task]
     }

     type Mutation {
         addUser(email: String!, password: String, name: String, surname: String, secondSurname: String): User
         modifyUser(email: String!, password: String, name: String, surname: String, secondSurname: String): Boolean
         deleteUser(email: String!): Boolean
         addTask(name: String, description: String, difficulty: String): Task
         modifyTask(name: String, task: String): Boolean
         deleteTask(name: String): Boolean
         assignTask(taskName: String, userEmail: String): Boolean
         changeTaskProgress(progress: Int, taskName: String): Boolean
         unassignTask(name: String): Boolean
         realizeTask(name: String): Boolean
         login(email: String, password: String): LoginCredentials
         register(email: String, password: String, name: String, surname: String, secondSurname: String): User
     }
`

module.exports = typeDefs;
