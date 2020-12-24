import React, { useState } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Store } from 'redux';

import reducer, { changeUserName } from './redux/reducer';

 const UserApp = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    console.log(state, 'state user');
    const [remoteAppInput, setRemoteAppInput] = useState('');

    return <h2>Hello</h2>
};

type StoreCustom = Store & {
    injectReducer: (key: string, reducer: any) => {};
}
const RemoteAppWrapper = (props: {store?: StoreCustom}) => {
    const { store } = props;

    useEffect(() => {
      store ? store.injectReducer('user', reducer) : null;
    }, []);
  
    return (
        <Provider store={store || {}}>
        <UserApp />
      </Provider>
    );
};

export default RemoteAppWrapper;
  