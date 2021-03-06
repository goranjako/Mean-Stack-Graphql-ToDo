import { FilterRootFields, FilterToSchema } from "apollo-server";
import { UserInputError } from "apollo-server-express";
import { items } from "../../config/verify";
import authHeader from "../../config/auth";
import { ApolloError } from "apollo-server-express";

export default {
  Query: {
    //getById
    todo: async (parent, args, { req, Todo }) => {
      await authHeader(req);
      try {
        const todo = await Todo.find({ userId: args.userId });
        return todo;
      } catch (error) {
        throw new UserInputError("Todo not found");
      }
    },
  },
  Mutation: {
    // Insert
    addTodo: async (paren, { input }, { req,Todo }) => {
      await authHeader(req);
      try {
        await items.validate(input, { abortEarly: false });
        const todo = new Todo({
          userId: input.userId,
          item: input.item,
          isCompleted: input.isCompleted,
        });
        const result = await todo.save();
        return  { message: "Successful Create Item" };
      } catch (err) {
        throw new ApolloError(err.message);
      }
    },
    //delete
    deleteTodo: async (parent, { id }, { req, Todo }) => {
      await authHeader(req);
      try {
        const todo = await Todo.deleteOne({ _id: id });
        return { message: "Successful Delete Item" };
      } catch (error) {
        throw new UserInputError("Item not found");
      }
    },
    //update
    updateTodo: async (parent, { id, input }, { req, Todo }) => {
      await authHeader(req);
      try {
        const todo = await Todo.findById({ _id: id }).exec();
        todo.set(input);
        const result = await todo.save();
        return { message: "Successful Update Item" };
      } catch (error) {
        throw new UserInputError("Item not found");
      }
    },
  },
};
