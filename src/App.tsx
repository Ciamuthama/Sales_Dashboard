import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from './sidebar/sidebar'
import Dashboard from './components/dashboard/dashboard';

export default function App() {
  return (
<>
<Router>
  <Sidebar/>
    <Routes>
      <Route path='/dashboard' Component={Dashboard}/>
      </Routes>
  </Router>
</>

  )
}
