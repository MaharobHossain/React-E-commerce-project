import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'


export const SettingsContext = createContext();

const SettingsProvider = ({children}) =>{
  
   const [settingsData, setSettingsData] = useState();

   useEffect(() =>{
    axios.get('settings?platfrom=web')
    .then(response =>{
      setSettingsData(response.data);
    })
   },[])


  return (
    <SettingsContext.Provider value={settingsData}>
      {children}
    </SettingsContext.Provider>
  )

  }


export default SettingsProvider;
