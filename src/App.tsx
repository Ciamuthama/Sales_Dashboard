import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from './sidebar/sidebar'
import Dashboard from './components/dashboard/dashboard';
import Modular from './components/schools/modular';
import Collections from './components/cards/Collections';

export default function App() {
  return (
<Router>
<div className='flex flex-row'>
  <Sidebar/>
    
      <Routes>
      <Route path='/' Component={Dashboard}/>
      <Route path='/schools' Component={Modular}/>
      <Route path='/collection' Component={Collections}/>
      </Routes>
      </div>

  </Router>

  )
}
