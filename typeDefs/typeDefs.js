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
