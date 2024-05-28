import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from './sidebar/sidebar'
import Dashboard from './components/dashboard/dashboard';
import Modular from './components/schools/modular';

export default function App() {
  return (
<>
<Router>
  <Sidebar/>
    <Routes>
      <Route path='/' Component={Dashboard}/>
      <Route path='/schools' Component={Modular}/>
      </Routes>
  </Router>
</>

  )
}
