import { createSelector } from 'reselect';
import { ITodosState, ITodo  } from '../../interfaces/user';

const selectorTodos = (state: ITodosState): ITodosState  => {
    console.log(state, 'state');
    return state;
};

export const selectTodos = createSelector(
    [selectorTodos],
    (todos: ITodosState): ITodo[] => todos.todos
);

export const selectIsFetching = createSelector(
    [selectorTodos],
    (todos: ITodosState): boolean|undefined => todos.isFetching
);

export const selectHasError = createSelector(
  [selectorTodos],
  (todos: ITodosState): boolean|undefined => todos.hasError
);

export const selectIsProcessing = createSelector(
  [selectorTodos],
  (todos: ITodosState): boolean|undefined => todos.isProcessing
);

export const selectIsDeleting = createSelector(
  [selectorTodos],
  (todos: ITodosState): boolean|undefined => todos.isDeleting
);

export const selectAddSuccess = createSelector(
  [selectorTodos],
  (todos: ITodosState): boolean|undefined => todos.addSuccess
);
