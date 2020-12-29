const CHANGE_USER_EMAIL = 'CHANGE_USER_EMAIL';

const changeUserEmail = (email: string) => {
    return { type: CHANGE_USER_EMAIL, payload: email };
}

interface IState {
    userName: string;
    email: string;
}

const initialState = {
  userName: 'userApp',
  email: ''
};

interface IAction {
   type: string;
   payload: string;
}

const reducer = (state: IState = initialState, action: IAction) => {
    switch (action.type) {
      case CHANGE_USER_EMAIL: {
        return {
          ...state,
          email: action.payload,
        };
      }
      default:
        return state;
    }
  };
  
  export { changeUserEmail };
  export default reducer;