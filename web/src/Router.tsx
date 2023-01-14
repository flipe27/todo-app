import { Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { Home } from './pages/Home'

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home/:userId" element={<Home />} />
        </Routes>
    )
}
