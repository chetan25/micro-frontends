import { GraphQLClient, gql } from 'graphql-request';
import { ITodo } from '../interfaces/user';

const endpoint = "http://localhost:3333/graphql";

// create a GraphQL client instance to send requests
const client = new GraphQLClient(endpoint, { headers: {} });

export const getTodo = () => {
  const getQuery = gql`
       {
          todos {
              id,
              title,
              description,
              actions,
              endGoal
          }
       }
  `;
  return client.request(getQuery);
};

export const addTodo = (todo: ITodo) => {
  const addTodo = gql`
    mutation RootMutation($title: String!, $description: String!, $endGoal: String, $actions: String) {
      addTodo(addTodo: {title: $title, description: $description, endGoal: $endGoal, actions: $actions}) {
         id
      }
    }
  `;

  return new Promise(async (resolve) => {
    const result = await client.request(addTodo, {
      title: todo.title,
      description: todo.description,
      endGoal: todo.endGoal,
      actions: todo.actions
    });

    setTimeout(() => {
      return resolve(result);
    }, 1500);
  });
  // return client.request(addTodo, {
  //     title: todo.title,
  //     author: todo.author
  //   });
};

export const deleteTodo = (id: string) => {
  const deleteTodoMutation = gql`
    mutation RootMutation($id: String!) {
       deleteTodo(deleteTodo: { id: $id }) {
         id
       }
    }
  `;

  return new Promise(async (resolve) => {
    const result = await client.request(deleteTodoMutation, {id: id});

    setTimeout(() => {
      return resolve(result);
    }, 1500);
  });
};

