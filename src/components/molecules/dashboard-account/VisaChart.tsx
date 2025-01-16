import React from 'react'
import FirstChart from '../global/FristChart';
import TravelerList from './CurrentTraveler';

const VisaChart = () => {
    const currencyFormatter = (value: number) => `${value} $`;
    return (
      <div className='flex gap-4 mt-5 '>
          <div className='basis-[70%] shadow-md rounded-md py-3 dark:border dark:border-gray-600 dark:shadow-xl dark:rounded-md'> 
          <FirstChart
          apiUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard/dashboard-visa`}
          chartDataKeys={['Income', 'Expense']}
          title="$520.15"
          incomeLabel="Income"
          subtitle='/$454.002'
          expenseLabel="Expense"
          currencyFormatter={currencyFormatter}
        />
          </div>
          <div className='basis-[30%] shadow-md rounded dark:border dark:border-gray-600 dark:shadow-xl dark:rounded-md'>
          <TravelerList
        apiUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard/visa-current-travel`}
        initialCount={6}
        nameKey="name"
        title='Current Travelers'
        emailKey="email"
        amountKey="amount"
        imageKey="image"
      />
          </div>
      </div>
    )
}

export default VisaChart