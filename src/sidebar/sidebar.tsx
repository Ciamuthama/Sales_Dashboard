import { Link } from 'react-router-dom'
import { MdSchool } from "react-icons/md";
import { MdDashboardCustomize } from "react-icons/md";
export default function Sidebar() {
  return (
    <nav className='min-w-[300px] h-screen shadow-sm rounded-xl border-gray-100 border-[1px]'>
        <div className='px-2 mt-10 flex flex-col gap-10'>
          <Link to="/" >
        <p className='font-bold flex item-bottom gap-4 shadow-sm shadow-gray-100 rounded-xl'> <MdDashboardCustomize size={30}/> Dashboard</p>
        </Link>
        <div>
          <Link to='/schools' >
          <p className='font-bold flex items-center gap-4 shadow-sm shadow-gray-100 rounded-xl'>
          <MdSchool size={30}/>
          Schools Management
          </p>
        </Link>
        </div>
        </div>
    </nav>
  )
}
