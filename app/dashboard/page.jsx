import { Button } from '@/components/ui/button'
import React from 'react'
import CreateFormComponent from './_components/CreateForm'

const page = () => {
  return (
    <div className='p-10'>
      <h1 className='text-3xl font-bold text-primary-foreground flex justify-between'>Dashboard
        <CreateFormComponent/>
      </h1>
      
    </div>
  )
}

export default page
