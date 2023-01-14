import { BrowserRouter } from 'react-router-dom'
import { Login } from './pages/Login'
import { Router } from './Router'

export function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}
