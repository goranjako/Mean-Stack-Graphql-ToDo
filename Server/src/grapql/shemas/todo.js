import { gql } from "apollo-server-express";

const todo = gql`
  type Todo {
    id: ID!
    userId: String!
    item: String!
    isCompleted: Boolean!
  }
  extend type Query {

    todo(userId: String): [Todo!]!
  }
 
  type Message {
    message: String!
  }
  input todoInput {
    userId:String!
    item: String!
    isCompleted: Boolean!
  }

  extend type Mutation {
    addTodo(input: todoInput!): Message!
    deleteTodo(id: ID!): Message!
    updateTodo(input: todoInput!, id: ID!): Message!
  }
`;

export default todo;



