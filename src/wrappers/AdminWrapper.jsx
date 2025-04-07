import React from 'react'
import { frontend_assets } from '../assets/frontend_assets/assets'
import { Outlet } from 'react-router-dom'

const AdminWrapper = () => {
  return (
    <div className="font-[sans-serif]">
      <div className="items-center gap-8">
        <Outlet/>
      </div>
    </div>
  )
}

export default AdminWrapper
