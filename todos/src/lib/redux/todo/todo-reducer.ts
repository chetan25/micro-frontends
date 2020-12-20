import {
  ADD_TODO,
  FETCH_TODO_SUCCESS,
  FETCH_TODO,
  ADD_TODO_SUCCESS,
  ADD_TODO_ERROR,
  RESET_FORM_STATE,
  DELETE_TODO,
  DELETE_TODO_SUCCESS,
  // DELETE_TODO_ERROR
} from './todo-actions';
import { ITodosState } from '../../interfaces/user';

const defaultState: ITodosState = {
    todos: [],
    isFetching: false,
    isProcessing: false,
    hasError: false,
    addSuccess: false,
    isDeleting: false,
    deleteSuccess: false
}

export interface IAction {
    type: string;
    payload?: any;
}

const todoReducer = (state: ITodosState = defaultState, action: IAction): ITodosState => {
    switch (action.type) {
        case ADD_TODO_SUCCESS:
            return {
                ...state,
              todos: [...state.todos, action.payload],
              isProcessing: false,
                hasError: false,
                addSuccess: true,
                isDeleting: false
            }
        case ADD_TODO_ERROR:
            return {
              ...state,
              isProcessing: false,
              addSuccess: false,
              hasError: true,
              isDeleting: false
            }
        case ADD_TODO:
            return {
              ...state,
              hasError: false,
              addSuccess: false,
              isProcessing: true,
              isDeleting: false
            }
        case FETCH_TODO:
            return {
                ...state,
                isFetching: true,
              hasError: false,
              addSuccess: false,
              isProcessing: false,
              isDeleting: false
            };
        case FETCH_TODO_SUCCESS:
            console.log(action.payload, 'success');
            return {
                ...state,
                todos: action.payload,
                isFetching: false,
                hasError: false,
                isDeleting: false
            };
        case RESET_FORM_STATE:
          return {
            ...state,
            hasError: false,
            addSuccess: false,
            isProcessing: false,
            isDeleting: false
          }
        case DELETE_TODO:
          return {
            ...state,
            hasError: false,
            isProcessing: false,
            isDeleting: true,
            deleteSuccess: false
        }
        case DELETE_TODO_SUCCESS:
          const filteredTodos = state.todos.filter(function( todo ) {
            return todo.id !== action.payload;
          });
          return {
            ...state,
            todos: filteredTodos,
            hasError: false,
            isProcessing: false,
            isDeleting: false,
            deleteSuccess: true
          }
        default:
            return state;
    }
}

export default todoReducer;
