import "./Styling/App.css"
import { UserContext } from "./Data";
import { useState, useEffect, useContext } from 'react'
import Main from "./Components/Main";
import Header from "./Components/Header";

function App() {

  const { Provider: UserInfo } = UserContext
  // this allows us to rename the React Context Provider to something more descriptive
  // example: UserInfo

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  return (
    <div className='App'>
      <UserInfo value={{
        isAuthenticated,
        setAuth: setIsAuthenticated,
        user: currentUser,
        setUser:
          setCurrentUser

      }}
      >
        < Header />
        < Main />
      </UserInfo>

    </div>
  );
}

export default App;
