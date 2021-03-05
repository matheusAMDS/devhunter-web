import { gql } from "graphql-request"

const SHOW_JOB = gql`
  query ShowJob($id: String!) {
    job(id: $id) {
      id
      title 
      description
      company
    }
  }
`

export default SHOW_JOB 