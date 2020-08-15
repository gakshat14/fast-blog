import React, { useReducer } from 'react';
import { initialGlobalState, GlobalReducer } from './GlobalReducer';


export const GlobalStateContext = React.createContext(initialGlobalState);
export const GlobalDispatchContext = React.createContext(null);

export function GlobalContext({children}) {
    const [globalState, dispatch] = useReducer(GlobalReducer, initialGlobalState);
    return(
        <GlobalStateContext.Provider value={globalState}>
            <GlobalDispatchContext.Provider value={dispatch}>
                {children}
            </GlobalDispatchContext.Provider>
        </GlobalStateContext.Provider>
    );
}
