import { Input } from '@/components/atoms/Input'
 
import EmployeePersonalDetails from '@/components/molecules/employee-profile/EmployeePersonalDetails'
import EmployeeProfileAddress from '@/components/molecules/employee-profile/EmployeeProfileAddress'
import EmployeeProfileContact from '@/components/molecules/employee-profile/EmployeeProfileContact'
import EmployeeProfileDetails from '@/components/molecules/employee-profile/EmployeeProfileDetails'
import EmployeProfileHeader from '@/components/molecules/employee-profile/EmployeProfileHeader'
import React from 'react'
import { IoSearch } from 'react-icons/io5'

const EmployeProfile = () => {
  return (
    <form action="">

 
    <div className="m-5 bg-white dark:bg-darkPrimaryBg  shadow-sm rounded-md p-5">
    {/* search start*/}
   <div className='flex justify-end items-end'>
   <div className="w-56 flex justify-center items-center border rounded-md px-3 text-[#8391A1]">
      <IoSearch />
      <Input
        placeholder="type search..."
        className="text-sm border-none shadow-none"
        
      />
    </div>
   </div>
      {/* search  end*/}


<div className="p-3 rounded-md shadow-md border mt-5">
<EmployeProfileHeader/>
</div>

<div className="p-3 rounded-md shadow-md border mt-5">
<EmployeePersonalDetails/>
</div>

<div className="p-3 rounded-md shadow-md border mt-5">
<EmployeeProfileContact/>
</div>

<div className="p-3 rounded-md shadow-md border mt-5">
<EmployeeProfileDetails/>
</div>

<div className="p-3 rounded-md shadow-md border mt-5">
<EmployeeProfileAddress/>
</div>

</div>
</form>
  )
}

export default EmployeProfile