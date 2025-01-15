"use client"
import React from 'react'

import { ColumnConfig } from '@/components/molecules/global/Table';
import { accountDashboardData } from '@/data/historyData';
 import AccountCard from '@/components/molecules/account-dashboard/AccountCard';
import AccountChart from '@/components/molecules/account-dashboard/AccountChart';
import RecentHistory from '@/components/molecules/dashboard-account/RecentHistory';
import TravelerList from '@/components/molecules/dashboard-account/CurrentTraveler';
import TopExpence from '@/components/molecules/account-dashboard/TopExpence';




const columns: ColumnConfig[] = [
  { key: "invoiceId", type: "text", label: "Invoice Id" },
  { key: "customerName", type: "text", label: "Customer Name" },
  { key: "trxDate", type: "text", label: "Trx Date" },
  { key: "totalPrice", type: "text", label: "totalPrice" },
  { key: "status", type: "text", label: "Status" },

];



//eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchRecentHistory = async (): Promise<any[]> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new Promise<any[]>((resolve) => {
    setTimeout(() => {
      resolve(accountDashboardData); // Ensure `carRecentHistory` is compatible with `any[]`
    }, 1000); // Simulate a delay
  });
};

const AccountDashboardWrapper = () => {
  return (
    <div className='p-6'>
      <AccountCard/>
      <AccountChart/>

      <div className='flex gap-4 mt-5 '>
        <div className='basis-[70%] shadow-md rounded-md p-3'> 
              <RecentHistory
      title="Recent Transaction"
      subtitle="Last week transaction history"
      columns={columns}
      fetchData={fetchRecentHistory}
      buttonLabel="View All"
      onButtonClick={() => console.log("View All Clicked")}
    /> 
        </div>
        <div className='basis-[30%] shadow-md rounded p-3'>
          <TravelerList
           apiUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/v1/account-dashboard/top-clients`}
           initialCount={5}
           nameKey="name"
           title='Top Clients'
           emailKey="email"
           amountKey="amount"
           imageKey="image"
          />
          <TopExpence/>
        </div>
    </div>

  
    </div>
  )
}

export default AccountDashboardWrapper