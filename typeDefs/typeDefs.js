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

     type Query {
         user(email: String): User
         users: [User]
     }

     type Mutation {
         addUser(email: String!, password: String, name: String, surname: String, secondSurname: String): User
         modifyUser(email: String!, password: String, name: String, surname: String, secondSurname: String): User
         deleteUser(email: String!): Boolean
     }
`

module.exports = typeDefs;
