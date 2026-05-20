import { Edit, Trash } from 'lucide-react'
import React, { useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const FieldEdit = ({defaultValue, onUpdate, deleteField}) => {


  const [label, setLabel] = useState(defaultValue?.formLabel);
  const [placeholder , setPlaceholder] = useState(defaultValue?.placeholderName)

  return (
    <div className='pt-3 pb-4 flex gap-2'>
   <Popover>
  <PopoverTrigger >
   <Edit className='h-5 w-5 hover:text-white cursor-pointer'/>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle className="text-lg">Edit Field</PopoverTitle>
      <PopoverDescription>
        <div>
          <label className='text-md'>Label Name</label>  
          <input className='text-black p-1 border border-accent-content rounded' type="text" defaultValue={label}
          onChange={(e)=> setLabel(e.target.value)} />
        </div>
        <div>
          <label className='text-md'>PlaceholderName</label>  
          <input className='text-black p-1 border border-accent-content rounded' type="text" defaultValue={placeholder}
          onChange={(e)=> setPlaceholder(e.target.value)} />
        </div>
        <Button className='mt-2' onClick={(e) =>onUpdate(
          {
            label:label,
            placeholder:placeholder
          }
        )} size='sm'>Update</Button>
      </PopoverDescription>
    </PopoverHeader>
  </PopoverContent>
</Popover> 

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Trash className='h-5 w-5 text-red-500 hover:text-red-600 cursor-pointer'/>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={() => deleteField()}>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
     
    </div>
  )
}

export default FieldEdit