import { takeLatest, call, all, put } from 'redux-saga/effects';
import {
  ADD_TODO, addTodoSuccess, addTodoError,
  DELETE_TODO,
  deleteTodoSuccess, deleteTodoError,
  FETCH_TODO, fetchTodoSuccess, fetchTodoError } from './todo-actions';
import { getTodo, addTodo, deleteTodo } from '../../graphql-helpers/helper';
import {ITodo} from "../../interfaces/user";

export function* fetchTodosAsync() {
    try {
      const { todos } = yield call(getTodo);
      yield put(fetchTodoSuccess(todos));
    } catch(err) {
      console.log(err);
        yield put(fetchTodoError());
    }
}

export function* fetchTodosSaga() {
    yield takeLatest(
        FETCH_TODO,
        fetchTodosAsync
    );
}

// function addTodoDummy() {
//   setTimeout(() => addTodo({title: 'test', description: 'test'}));
// }

function* addTodoAsync(payload: {payload: ITodo}) {
  try {
    console.log(payload, 'payload');
    const { payload: newTodo } = payload;
    const {addTodo: { id }} = yield call(addTodo, newTodo);
    const todoAdded = {
      id: id,
      ...newTodo
    };
    yield put(addTodoSuccess(todoAdded));
  } catch(err) {
    console.log(err);
    yield put(addTodoError());
  }
}

export function* addTodoSaga() {
  yield takeLatest(
      // @ts-ignore
    ADD_TODO,
    addTodoAsync
  )
}

function* deleteTodoAsync(payload: {payload: string}) {
  try {
    const { payload: todoId } = payload;
    console.log('fired delete');
    const deleteTodoItem = yield call(deleteTodo, todoId);
    console.log(deleteTodoItem, 'deleteTodoItem');
    yield put(deleteTodoSuccess(todoId));
  } catch(error) {
    console.log(error);
    yield put(deleteTodoError());
  }
}

export function* deleteTodoSaga() {
    yield takeLatest(
        // @ts-ignore
        DELETE_TODO,
      deleteTodoAsync
  );
}

export function* todoSaga() {
    yield all([
        call(fetchTodosSaga),
        call(addTodoSaga),
        call(deleteTodoSaga)
    ]);
}
