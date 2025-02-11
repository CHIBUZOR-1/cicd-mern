import React, { createContext, useContext } from 'react'
import axios from 'axios'

const AppContext = createContext();

const AppContextProvider = ({children}) => {
  axios.defaults.withCredentials = true;
  return (
    <AppContext.Provider value={{}}>
      {children}
    </AppContext.Provider>
  )
}

const useAuth = () => useContext(AppContext);
export { useAuth, AppContextProvider  };