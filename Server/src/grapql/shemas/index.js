import { gql } from "apollo-server-express";

import user from "./shema";

const base = gql`
  type Query {
    _: String!
  }

  type Mutation {
    _: String!
  }
`;
const typeDefs = [base, user];
export default typeDefs;
