const CHANGE_USER_NAME = 'CHANGE_USER_NAME';

const changeUserName = (newName: string) => {
    return { type: CHANGE_USER_NAME, payload: newName };
}

interface IState {
    userName: string;
}

interface IAction {
   type: string;
   payload: string;
}

const reducer = (state: IState, action: IAction) => {
    switch (action.type) {
      case CHANGE_USER_NAME: {
        return {
          ...state,
          appName: action.payload,
        };
      }
    }
    return state;
  };
  
  export { changeUserName };
  export default reducer;