import React from 'react'


import SecChart from '../global/SecChart';
import GrowthChart from './GrowthChart';

const AccountChart = () => {
    const currencyFormatter = (value: number) => `${value} $`;
    return (
      <div className='flex gap-4 mt-5 '>
          <div className='basis-[70%] shadow-md rounded-md py-3'> 
          <SecChart
          apiUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/v1/account-dashboard/income`}
          chartDataKeys={['Income', 'Expense']}
          title="$520.15"
          subtitle="/$454.002"
          incomeLabel="Income"
          expenseLabel="Expense"
          currencyFormatter={currencyFormatter}
        />
          </div>
          <div className='basis-[30%] shadow-md rounded'>
          <GrowthChart/>
          </div>
      </div>
    )
}

export default AccountChart