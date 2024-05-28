
import React, { useState } from 'react';
import userContext from './userContext';

function UserState(props) {
    const usr = [
        {
            "name": 'cnckjdfjd',
            "email": 'ad@df.df',
            "note": 'jxhdisuhdf jcfbsjdiffb mckcsdhf nmnbdidf'
        },
        {
            "name": 'cjkdjdnb,kv,dfkvv',
            "email": 'ds@vdf.ff',
            "note": 'kjsdhkfjbmn vjhbfjfebijve viegbrvgiurgvuegvui grhcviubv vhdiuhfnjf'
        }];

    const [users, setUsers] = useState(usr);

    return (
        <userContext.Provider value={{ users, setUsers }}>
            {props.children}
        </userContext.Provider>
    );
}

export default UserState;