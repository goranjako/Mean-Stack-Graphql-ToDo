import { gql } from "apollo-server-express";
import user from "./shema";
import todo from './todo';

const base = gql`
  type Query {
    _: String!
  }

  type Mutation {
    _: String!
  }
`;
const typeDefs = [base, user,todo];
export default typeDefs;
