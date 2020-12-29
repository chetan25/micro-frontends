import { createSelector } from 'reselect';


const selectUserSelector = (state: {user: {userName: string, email: string}}) => {
    console.log(state, 'rere');
    return state?.user;
};

export const selectEmail = createSelector(
    selectUserSelector,
    (user) => user?.email
);