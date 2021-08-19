import {createContext, useEffect, useState} from 'react';

const AdminCont = createContext();
const {Consumer, Provider} = AdminCont;

const AdminContext = ({children}) => {
  const [token, setToken] = useState(false);

  useEffect(()=> {
    /* User in localStore */
    let localToken = localStorage.getItem(process.env.NEXT_PUBLIC_LOCAL_STORAGE_NAME);
    setToken(localToken);
  }, []);
  
  return (
    <Provider value={{
      token: token,
      setToken: setToken
    }}>
      {children}
    </Provider>
  );
};

export default AdminContext;
export { AdminCont, Consumer };