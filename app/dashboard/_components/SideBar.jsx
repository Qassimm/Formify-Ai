"use client";
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { LibraryBig, LineChart, MessageSquare, Shield } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

const SideBar = () => {

  const path = usePathname();
  useEffect(()=> {
   
  },[path])

  const SideBarMenu = [
    {
      id:1,
      name:"My Forms",
      icon:LibraryBig,
      path:"/dashboard"
    },
    {
      id:2,
      name:"Responses",
      icon:MessageSquare,
      path:"/dashboard/responses"
    },
    {
      id:3,
      name:"Analytics",
      icon:LineChart,
      path:"/dashboard/analytics"
    },
    {
      id:4,
      name:"Upgrade",
      icon:Shield,
      path:"/dashboard/upgrades"
    }
  ]

  return (
    <div className='h-screen  shadow-md'>
      <div className='p-5  text-background'>
        {SideBarMenu.map((menu, index)=>(
          <h2 key={index} className={`flex items-center gap-3 p-4 mb-3 hover:bg-primary rounded-lg cursor-pointer ${
            path == menu.path&&"bg-primary"
          }`}>
            <menu.icon/>
            {menu.name}
          </h2>
        ))}
      </div>

      <div className='fixed bottom-1 p-6 w-64'>
        <Button variant='gradient' className="w-full">+ Create Form</Button>
        <div className='my-7'>
        <Progress value={33}/>
        <h2 className='text-sm mt-2'><strong>2</strong> out of <strong>3</strong> files created</h2>
        <p className='text-sm mt-2'>Upgrade your plan for ulimited AI form builder</p>
      </div>
      </div>
      
    </div>
  )
}

export default SideBar
