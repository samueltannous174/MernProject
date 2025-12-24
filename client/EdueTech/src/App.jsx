import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div className="text-3xl font-bold underline">Home</div>} />
      </Routes> 
    </BrowserRouter>
  )
}

export default App
