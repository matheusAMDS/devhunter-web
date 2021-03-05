import { gql } from "graphql-request"

const GET_JOBS = gql`
  query IndexJobs($tech: String, $location: String, $page: Int) {
    jobs(tech: $tech, location: $location, page: $page) {
      page
      jobs {
        id
        title 
        company 
        tags 
        location
      } 
    }
  }
`

export default GET_JOBS 