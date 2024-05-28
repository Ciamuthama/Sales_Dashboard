import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  return (
    <nav>
        <Link to="/dashboard" className='[&.active]:font-bold'>
        <p>Dashboard</p>
        </Link>
    </nav>
  )
}
