import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <nav>
        <Link to="/" className='[&.active]:font-bold'>
        <p>Dashboard</p>
        </Link>
        <div>
          <Link to='/schools' className='[&.active]:font-bold'>
          Schools Management
        </Link>
        
        </div>
    </nav>
  )
}
