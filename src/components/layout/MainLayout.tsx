import { Outlet } from 'react-router-dom'
import Header from '../Header'

export const MainLayout = ()=> {
  return (
    <>
    <Header/>
    <div className='px-8'>
    <Outlet/>
    </div>
    </>
  )
}

