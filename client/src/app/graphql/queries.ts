import {gql} from "@apollo/client";

export const ALL_TASKS = gql`
  query Query {
    allTasks {
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

export const DEVELOPERS = gql`
  query Developers {
    developers {
      _id
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
