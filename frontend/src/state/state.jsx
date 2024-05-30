import React, { createContext, useState } from 'react';

const UserContext = createContext();

function UserProvider({ children }) {
  const [data, setData] = useState('thang dep trai');
  console.log(React.version)

  return (
    <UserContext.Provider value={{ data, setData }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };


