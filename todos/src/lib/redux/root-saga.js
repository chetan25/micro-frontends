import { all, call } from 'redux-saga/effects';
// import { userSaga } from './user/user-sagas';
import { todoSaga } from './todo/todo-sagas';

export default function* rootSaga() {
  yield all([
      // call(userSaga),
      call(todoSaga)
  ]);
}


