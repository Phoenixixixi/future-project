import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './layouts/Login'
import LoginForm from './pages/Login/LoginForm'
import RegisterForm from './pages/Login/RegisterForm'

function App() {
  return (
    <Routes>
      <Route path="/sign" element={<Login />}>
        <Route index element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />
      </Route>
    </Routes>
  )
}

export default App
