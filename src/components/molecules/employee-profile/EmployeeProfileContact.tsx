"use client"
import CardTitle from '@/components/atoms/CardTitle';
import { Input } from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';
import React, { useState } from 'react';

interface Country {
  code: string;
  name: string;
  flag: string;
  prefix: string;
}

const EmployeeProfileContact: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('bd');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const countries: Country[] = [
    { code: 'us', name: 'United States', flag: '🇺🇸', prefix: '+1' },
    { code: 'bd', name: 'Bangladesh', flag: '🇧🇩', prefix: '+880' },
    { code: 'gb', name: 'United Kingdom', flag: '🇬🇧', prefix: '+44' },
  ];

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedCountry(e.target.value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPhoneNumber(e.target.value);
  };


  return (
    <>
      <CardTitle className="text-[#243045] font-semibold font-lg dark:text-white">Contact Details</CardTitle>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Email */}
        <div className="relative w-full border border-gray-300 rounded-lg px-4 pt-4 pb-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
          <Label
            htmlFor="email"
            className="absolute -top-2 left-4 px-2 text-xs font-normal text-gray-500 bg-white dark:text-white dark:bg-darkPrimaryBg"
          >
            Email
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="support@gmail.com"
            className="font-normal lg:text-base text-gray-900 placeholder:text-black dark:placeholder:text-white"
          />
        </div>

        {/* Phone */}
        <div className="relative w-full border border-gray-300 rounded-lg px-4 pt-4 pb-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
          <Label
            htmlFor="phone"
            className="absolute -top-2 left-4 px-2 text-xs font-normal text-gray-500 bg-white dark:text-white dark:bg-darkPrimaryBg"
          >
            Phone
          </Label>
          <div className="flex items-center">
            {/* Country Selector */}
            <select
              id="country"
              value={selectedCountry}
              onChange={handleCountryChange}
              className="bg-transparent text-lg font-medium pr-2 focus:outline-none"
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.prefix}
                </option>
              ))}
            </select>

            {/* Phone Input */}
            <Input
              type="text"
              id="phone"
              placeholder="165285754"
              className="flex-1 font-normal lg:text-base text-gray-900 placeholder:text-black pl-2 dark:placeholder:text-white"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeProfileContact;
