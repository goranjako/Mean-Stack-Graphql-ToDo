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
    userId: ID
    item: String!
    isCompleted: Boolean!
  }

  extend type Mutation {
    addTodo(input: todoInput!): Todo!
    deleteTodo(id: ID!): Message!
    updateTodo(updatedTodo: todoInput!, id: ID!): Todo!
  }
`;

export default todo;



