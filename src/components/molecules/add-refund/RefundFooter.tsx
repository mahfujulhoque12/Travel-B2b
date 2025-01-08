import { Button } from '@/components/atoms/Button'
import React from 'react'

const RefundFooter = () => {
  return (
    <div className="mt-5 flex justify-end">
        <div className='flex items-center gap-3'>
        <Button className="border rounded-md px-8 py-3 text-sm font-normal text-[#3D3D3D] hover:text-white hover:bg-[#257CEB] transition-all duration-300 shadow-sm">Cancle</Button>
        <Button className="bg-[#257CEB] text-sm font-normal text-white rounded-md px-8 py-3 hover:bg-blue-700 transition-all duration-300 shadow-sm">Submit</Button>
        </div>
    </div>
  )
}

export default RefundFooter