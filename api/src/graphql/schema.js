const { buildSchema } = require('graphql');

module.exports = buildSchema(`
   type Todos {
     id: String!
     title: String!
     description: String!
     endGoal: String
     actions: String
   }
   type DeletedTodoId {
     id: String!
   }
   input TodoId {
     id: String!
   }
   input AddTodoData {
     title: String!
     description: String!
     endGoal: String
     actions: String
   }
   type RootQuery {
     todos: [Todos]
   }
   type RootMutation {
      addTodo(addTodo: AddTodoData): Todos
      deleteTodo(deleteTodo: TodoId!): DeletedTodoId
   }
   schema {
      query: RootQuery,
      mutation: RootMutation
   }
`);
