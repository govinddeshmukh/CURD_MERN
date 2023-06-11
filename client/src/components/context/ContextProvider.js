import React, { createContext, useState } from 'react';

export const Adddata = createContext("")
export const Updatedata = createContext("")
export const Deletedata = createContext("")

const ContextProvider = ({children}) => {

    const [udata, setudata] = useState("")
    const [updata, setupdata] = useState("")
    const [deldata, setdeldata] = useState("")

  return (
    <Adddata.Provider value={{udata, setudata}}>
        <Updatedata.Provider value={{updata,setupdata}}>
            <Deletedata.Provider value={{deldata, setdeldata}}>
              {children}
            </Deletedata.Provider>
        </Updatedata.Provider>
    </Adddata.Provider>
  );
}

export default ContextProvider;
