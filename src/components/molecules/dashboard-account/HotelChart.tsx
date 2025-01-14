import React from 'react'
import FirstChart from '../global/FristChart';
import TravelerList from './CurrentTraveler';

const HotelChart = () => {
    const currencyFormatter = (value: number) => `${value} $`;
    return (
      <div className='flex gap-4 mt-5 '>
          <div className='basis-[70%] shadow-md rounded-md py-3'> 
          <FirstChart
          apiUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard-hotel`}
          chartDataKeys={['Income', 'Expense']}
          title="$520.15"
            subtitle='/$454.002'
          incomeLabel="Income"
          expenseLabel="Expense"
          currencyFormatter={currencyFormatter}
        />
          </div>
          <div className='basis-[30%] shadow-md rounded'>
          <TravelerList
        apiUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/hotel-current-travel`}
        initialCount={6}
        nameKey="name"
        emailKey="email"
        amountKey="amount"
        imageKey="image"
      />
          </div>
      </div>
    )
}

export default HotelChart