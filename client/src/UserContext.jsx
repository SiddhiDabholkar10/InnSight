import { createContext ,useEffect,useState} from "react";
import axios from "axios";
export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [ready,setReady] = useState(false); // To ensure the user state is set before rendering children
    useEffect(() => {
      if(!user){
        axios.get('/profile').then(({data})=>{
          setUser(data);
          setReady(true); // Set ready to true after fetching the user data
        });
        
      }
    },[]);
  return (
    <UserContext.Provider value={{user,setUser,ready}}>
      {children}
    </UserContext.Provider>
  );
}
