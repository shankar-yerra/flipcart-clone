// this file is resonsible to show firstname in place of login button after login in an account

import { createContext, useState} from "react";

export const DataContext = createContext(null);

const DataProvider = ({children}) => {
    const [account, setAccount] = useState(''); // states are used to store data of setaccount function inside account

    return (
        <DataContext.Provider value = {{
            account,
            setAccount
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;