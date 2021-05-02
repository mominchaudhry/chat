import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import {useState} from 'react'
import './App.css'
import useLocalStorage from "./hooks/useLocalStorage"
import { ContactsProvider } from "./contexts/ContactsProvider"
import { ConversationsProvider } from "./contexts/ConversationsProvider"
import { SocketProvider } from "./contexts/SocketProvider"

function App() {

  const [token, setToken] = useLocalStorage('token','')
  const [user, setUser] = useLocalStorage('user', {})

  const dashboard = (
    <SocketProvider id={user._id}>
      <ContactsProvider>
        <ConversationsProvider user={user}>
          <Dashboard token={token} setToken={setToken} setUser={setUser} user={user}/>
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  )

  const login = (
    <ContactsProvider>
      <Login setToken={setToken} setUser={setUser}/>
    </ContactsProvider>
  )

  return (
    <div className="app">
      {token.length<1 ? login : dashboard}
    </div>
  );
}

export default App;
