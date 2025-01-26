
import { Outlet } from 'react-router-dom'
import Header from './Header'

export default function Layout() {
  return (
    <div className='p-4 my-2 flex flex-col min-h-screen gap-2'>
      <Header/>
      <Outlet/>
    </div>
  )
}

