import { GraphQLClient } from "graphql-request"
import { API_URL } from "config"

export default new GraphQLClient(API_URL)