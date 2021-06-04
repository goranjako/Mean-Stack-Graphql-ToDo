import {  gql } from 'apollo-server-express';


const user= gql `
type User {
  id:ID!
  fullName:String!
  email:String!,
  password:String!
}
extend type Query {
    userId(id:ID):User!
    login(input:loginInput!):AuthData!
  }
  input userInput {
    fullName:String!
  email:String!,
  password:String!
  }
  input loginInput {
  email:String!,
  password:String!
  }
  type AuthData {
    token: String! 
  }
  extend type Mutation { 
    register(input:userInput!):AuthData!
   
  }
 
`;


export default  user