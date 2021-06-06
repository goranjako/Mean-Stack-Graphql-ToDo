import userResolvers from'./user.resolver';
import todoResolvers from './todo.resolver';
module.exports = {
  // modifier - the name of the type, and each time ANY mutation or subscription that returns a post, it will go through this modifier and apply these modifications
 
  Query: {
    ...userResolvers.Query,
    ...todoResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...todoResolvers.Mutation
   
  }
 
};