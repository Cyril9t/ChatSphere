

import { LandingPage } from './component/Home'
import { LoginPage } from './component/Logins'
import { SignUp } from './component/SignUp'
import { Route, Routes } from 'react-router-dom'
import { ChatMessage } from './component/Chat'
import { ChatContextProvider } from './Contexts/ChatContext'
function App() {

  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='login' element={<LoginPage />} />
      <Route path='signUp' element={<SignUp />} />
      <Route path='chat' element={<ChatContextProvider><ChatMessage /></ChatContextProvider>} />
    </Routes>
  )
}

export default App
