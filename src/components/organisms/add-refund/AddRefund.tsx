import RefundFooter from '@/components/molecules/add-refund/RefundFooter'
import RefundHeader from '@/components/molecules/add-refund/RefundHeader'
import RefundInput from '@/components/molecules/add-refund/RefundInput'
import React from 'react'

const AddRefund = () => {
  return (
    <div className="m-5 bg-white shadow-sm rounded-md p-5">
        <div className="p-3 rounded-md shadow-md border">
            <RefundHeader/>
            <RefundInput/>
            <RefundFooter/>
        </div>
    </div>
  )
}

export default AddRefund