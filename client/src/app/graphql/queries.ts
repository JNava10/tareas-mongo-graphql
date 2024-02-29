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
