import { createContext, useEffect, useState } from "react";
import axios from "axios";


export const UserContext = createContext();
const UserProvider = ({ children }) => {
const [userData, setUserData] = useState ();
    
         useEffect(() =>{
           if (localStorage.getItem("user")){
             setUserData(JSON.parse(localStorage.getItem("user")));
               }
                 },[])
                   const updateUserData = newData =>{
                     setUserData(newData);
                      }


return (
          <UserContext.Provider  value={{userData, updateUserData}}>
          {children}
          </UserContext.Provider>
        )
}

export default UserProvider;
