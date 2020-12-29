import React, { Suspense, useState, useEffect } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { Store } from 'redux';

import reducer, { changeUserEmail } from './redux/reducer';
import { SelectUser, UpdateUser } from "Shell/SharedStateService";
import { selectEmail } from './redux/userSelector';

 const UserApp = () => {
    const dispatch = useDispatch();
    const email = useSelector(selectEmail);
    const user = SelectUser();
    
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    // const localName = state!.user?.userName;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    // const hostName = state!.host?.userName;
    const [userName, setUserName] = useState(user.name);
    const [formName, setFormName] = useState(user.name);
    const [formEmail, setFormEmail] = useState(email);

    useEffect(() => {
      setUserName(user.name);
      setFormName(user.name);
    }, [user]);

    const updateUser = () => {
      UpdateUser(userName);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormName(e?.target?.value);
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormEmail(e?.target?.value);
    }

    const updateEmail = () => {
      dispatch(changeUserEmail(formEmail));
    };

    return (
      <>
        <h2>{userName} Dashboard</h2>
        <div style={{display: 'flex', columnGap: '3rem', marginBottom: '1rem'}}>
            <label style={{width: '5rem'}}>User Name</label>
            <input type="text" id="username" value={formName} onChange={handleNameChange}/>
            <button onClick={updateUser}>Update</button>
            (Updates Global shared State)
        </div>
        <div style={{display: 'flex', columnGap: '3rem'}}>
            <label style={{width: '5rem'}}>Email</label>
            <input type="text" id="email" value={formEmail} onChange={handleEmailChange}/>
            <button onClick={updateEmail}>Update</button>
            (Updates Local State)
        </div>
      </>
    );
};

type StoreCustom = Store & {
    injectReducer: (key: string, reducer: any) => Record<string, unknown>;
}
const RemoteAppWrapper = (props: {store: StoreCustom}) => {
    const { store } = props;

    useEffect(() => {
      store ? store.injectReducer('user', reducer) : null;
    }, [store]);
  
    return (
        <Provider store={store}>
          <Suspense fallback="Loading...">
            <UserApp />
          </Suspense>
      </Provider>
    );
};

export default RemoteAppWrapper;
  