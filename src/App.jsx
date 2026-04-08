

import { LandingPage } from './component/Home'
import { LoginPage } from './component/Logins'
import { SignUp } from './component/SignUp'
import { Route, Routes } from 'react-router-dom'
import { ChatMessage } from './component/Chat'
function App() {

  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='login' element={<LoginPage />} />
      <Route path='signUp' element={<SignUp />} />
      <Route path='chat' element={<ChatMessage />} />
    </Routes>
  )
}

export default App
