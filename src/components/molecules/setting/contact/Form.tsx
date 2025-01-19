/* eslint-disable @typescript-eslint/no-explicit-any */
import CardDescription from "@/components/atoms/CardDescription";
import CardTitle from "@/components/atoms/CardTitle";
import { Input } from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import React, { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Plus, Pencil } from "lucide-react";
import SearchableSelect from "../../global/SearchableSelect";
import { FormData } from "@/types/api";
import { validators } from "./validator";
import Paragraph from "@/components/atoms/Paragraph";
import { cn } from "@/lib/utils";

interface FormComponentProps {
  onSubmit: (formData: any) => void;
}
const Form: React.FC<FormComponentProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    emails: [""],
    phoneNumbers: [""],
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    isChangingPassword: false,
    addresses: [
      {
        line1: "",
        line2: "",
        state: "",
        city: "",
        country: "",
        zip: "",
      },
    ],
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    // Perform validation
    const error = validators[name]?.(value, formData) || "";
    console.log(error);
    setFieldErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleListChange = (
    index: number,
    type: "emails" | "phoneNumbers",
    value: string
  ) => {
    const updatedList = [...formData[type]];
    updatedList[index] = value;
    setFormData((prev) => ({
      ...prev,
      [type]: updatedList,
    }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Validate onBlur
    const error = validators[name]?.(value, formData) || "";
    setFieldErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  // Add new email/phone field with restriction
  const addNewField = (type: "emails" | "phoneNumbers") => {
    setFormData((prev) => {
      if (prev[type].length >= 2) {
        return prev;
      }
      return {
        ...prev,
        [type]: [...prev[type], ""],
      };
    });
  };

  // Handler for changing password
  const toggleChangePassword = () => {
    setFormData((prev) => ({
      ...prev,
      isChangingPassword: !prev.isChangingPassword,
      newPassword: "",
      confirmPassword: "",
    }));
  };

  // Address handlers
  const handleAddressChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updatedAddresses = [...formData.addresses];
    updatedAddresses[index] = { ...updatedAddresses[index], [name]: value };
    setFormData((prev) => ({
      ...prev,
      addresses: updatedAddresses,
    }));
  };

  const addNewAddress = () => {
    setFormData((prev) => {
      if (prev.addresses.length >= 2) {
        alert("You can only add one address.");
        return prev;
      }
      return {
        ...prev,
        addresses: [
          ...prev.addresses,
          { line1: "", line2: "", state: "", city: "", country: "", zip: "" },
        ],
      };
    });
  };

  const handleDynamicSelectChange =
    (key: string) => (value: { value: string; label: string }) => {
      setFormData((prev) => ({
        ...prev,
        [key]: `${value.value}`,
      }));
    };

  // Remove email/phone field
  const removeField = (type: "emails" | "phoneNumbers") => {
    setFormData((prev) => ({
      ...prev,
      [type]: [""],
    }));
  };

  const removeAddress = (index: number) => {
    setFormData((prev) => {
      const updatedAddresses = prev.addresses.filter((_, i) => i !== index);
      return { ...prev, addresses: updatedAddresses };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(fieldErrors);
    onSubmit(formData);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="shadow-light-shadow space-y-3 px-5 py-6 rounded-lg">
        <CardTitle className="text-lg font-semibold text-[#243045]">
          Full Name
        </CardTitle>
        <div className="flex gap-4">
          <div className="relative w-full">
            <Label
              htmlFor="userFirstName"
              className={cn(
                "block text-xs font-medium absolute -top-[7px] left-[15px] bg-white z-10 px-[3px]",
                fieldErrors.firstName ? "text-red-600" : "text-[#7C7C7C]"
              )}
            >
              Full Name
            </Label>
            <Input
              id="userFirstName"
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`w-full h-10 border text-xs focus:ring-1 rounded placeholder:text-xs ${
                fieldErrors.firstName
                  ? "border-red-500 text-red-500 placeholder:text-red-500 focus:ring-red-500"
                  : "border-gray-300 text-black placeholder:text-black focus:ring-gray-300"
              }`}
            />
            {fieldErrors.firstName && (
              <div className="w-full bg-red-100 border border-red-200 p-2 mt-2">
                <Paragraph className="text-red-600 font-bold text-sm leading-5">
                  {fieldErrors.firstName}
                </Paragraph>
              </div>
            )}
          </div>
          <div className="relative w-full">
            <Label
              htmlFor="userLastName"
              className={cn(
                "block text-xs font-medium absolute -top-[7px] left-[15px] bg-white z-10 px-[3px]",
                fieldErrors.lastName ? "text-red-600" : "text-[#7C7C7C]"
              )}
            >
              Last Name
            </Label>
            <Input
              id="userLastName"
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`w-full h-10 border text-xs focus:ring-1 rounded placeholder:text-xs ${
                fieldErrors.lastName
                  ? "border-red-500 text-red-500 placeholder:text-red-500 focus:ring-red-500"
                  : "border-gray-300 text-black placeholder:text-black focus:ring-gray-300"
              }`}
            />
            {fieldErrors.lastName && (
              <div className="w-full bg-red-100 border border-red-200 p-2 mt-2">
                <Paragraph className="text-red-600 font-bold text-sm leading-5">
                  {fieldErrors.lastName}
                </Paragraph>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Emails */}
      <div className="shadow-light-shadow space-y-3 px-5 py-6 rounded-lg">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold text-[#243045]">
            Email
          </CardTitle>
          <CardDescription className="text-base font-normal text-[#243045]">
            Manage your email address
          </CardDescription>
        </div>
        <div className="flex mb-2 gap-4 items-center">
          <div className="space-y-3 w-full">
            {formData.emails.map((email, index) => (
              <div
                key={index}
                className="relative w-full flex items-center gap-4"
              >
                <div className="w-full">
                  <Label
                    htmlFor={`userEmail${index}`}
                    className="block text-xs font-medium absolute -top-[7px] left-[15px] bg-white z-10 px-[3px] text-[#7C7C7C]"
                  >
                    Email
                  </Label>
                  <Input
                    id={`userEmail${index}`}
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                      handleListChange(index, "emails", e.target.value)
                    }
                    className="p-2 border text-sm focus:ring-1 border-gray-300 rounded"
                  />
                </div>

                {/* Remove button for dynamically added fields */}
                {index > 0 && (
                  <Button
                    type="button"
                    onClick={() => removeField("emails")}
                    className="flex items-center justify-center text-sm text-white font-semibold rounded-md bg-red-500 px-4 h-10"
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            {fieldErrors.email && (
              <div className="w-full bg-red-100 border border-red-200 p-2 mt-2">
                <Paragraph className="text-red-600 font-bold text-sm leading-5">
                  {fieldErrors.email}
                </Paragraph>
              </div>
            )}
          </div>

          {/* Add button for adding a new email */}
          <div className="w-full flex justify-end">
            {formData.emails.length < 2 && (
              <Button
                type="button"
                onClick={() => addNewField("emails")}
                className="flex items-center justify-center bg-blue-gradient text-sm text-white font-semibold rounded-md px-4 h-10"
              >
                <Plus className="rounded-full w-4 h-4" /> Add another email
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Phone Numbers */}
      <div className="shadow-light-shadow space-y-3 px-5 py-6 rounded-lg">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold text-[#243045]">
            Phone
          </CardTitle>
          <CardDescription className="text-base font-normal text-[#243045]">
            Modify your Phone Number
          </CardDescription>
        </div>
        <div className="flex mb-2 gap-4 items-center">
          <div className="space-y-3 w-full">
            {formData.phoneNumbers.map((phone, index) => (
              <div
                key={index}
                className="relative w-full flex items-center gap-4"
              >
                <div className="w-full">
                  <Label
                    htmlFor={`phoneNumber${index}`}
                    className="block text-xs font-medium absolute -top-[7px] left-[15px] bg-white z-10 px-[3px] text-[#7C7C7C]"
                  >
                    Phone *
                  </Label>
                  <Input
                    id={`phoneNumber${index}`}
                    type="number"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) =>
                      handleListChange(index, "phoneNumbers", e.target.value)
                    }
                    className="p-2 border text-sm focus:ring-1 border-gray-300 rounded"
                  />
                </div>

                {/* Remove button for dynamically added fields */}
                {index > 0 && (
                  <Button
                    type="button"
                    onClick={() => removeField("phoneNumbers")}
                    className="flex items-center justify-center text-sm text-white font-semibold rounded-md bg-red-500 px-4 h-10"
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Add button for adding a new phone number */}
          <div className="w-full flex justify-end">
            {formData.phoneNumbers.length < 2 && (
              <Button
                type="button"
                onClick={() => addNewField("phoneNumbers")}
                className="flex items-center justify-center bg-blue-gradient text-sm text-white font-semibold rounded-md px-4 h-10"
              >
                <Plus className="rounded-full w-4 h-4" /> Add another number
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Password */}
      <div className="shadow-light-shadow space-y-3 px-5 py-6 rounded-lg">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold text-[#243045]">
            Password
          </CardTitle>
          <CardDescription className="text-base font-normal text-[#243045]">
            Modify Current Password
          </CardDescription>
        </div>
        <div className="flex mb-2 gap-4 items-center">
          <div className="relative w-full">
            <Label
              htmlFor="password"
              className={cn(
                "block text-xs font-medium absolute -top-[7px] left-[15px] bg-white z-10 px-[3px]",
                fieldErrors.currentPassword ? "text-red-600" : "text-[#7C7C7C]"
              )}
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={formData.currentPassword}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`w-full h-10 border text-xs focus:ring-1 rounded placeholder:text-xs ${
                fieldErrors.currentPassword
                  ? "border-red-500 text-red-500 placeholder:text-red-500 focus:ring-red-500"
                  : "border-gray-300 text-black placeholder:text-black focus:ring-gray-300"
              }`}
            />
            {fieldErrors.currentPassword && (
              <div className="w-full bg-red-100 border border-red-200 p-2 mt-2">
                <Paragraph className="text-red-600 font-bold text-sm leading-5">
                  {fieldErrors.currentPassword}
                </Paragraph>
              </div>
            )}
          </div>
          <div className=" w-full flex justify-end">
            <Button
              type="button"
              onClick={toggleChangePassword}
              className="flex items-center justify-center bg-blue-gradient text-sm text-white font-semibold rounded-md px-4 h-10"
            >
              {formData.isChangingPassword ? (
                "Cancel"
              ) : (
                <>
                  <Pencil className="rounded-full w-4 h-4" />
                  Change
                </>
              )}
            </Button>
          </div>
        </div>
        {formData.isChangingPassword && (
          <div className="mt-4 space-y-2">
            <Input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleInputChange}
              className="p-2 border text-sm focus:ring-1 border-gray-300 rounded"
            />
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="p-2 border text-sm focus:ring-1 border-gray-300 rounded"
            />
          </div>
        )}
      </div>

      {/* Address Details */}
      <div className="shadow-light-shadow space-y-3 px-5 py-6 rounded-lg">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold text-[#243045]">
            Address Details
          </CardTitle>
        </div>
        <div className="space-y-12">
          {formData.addresses.map((address, index) => (
            <div key={index} className="space-y-4">
              <div className="flex gap-4">
                <div className="relative w-full">
                  <Label
                    htmlFor={`addressLine1-${index}`}
                    className="block text-xs font-medium absolute -top-[7px] left-[15px] bg-white z-10 px-[3px] text-[#7C7C7C]"
                  >
                    Address Line 1
                  </Label>
                  <Input
                    id={`addressLine1-${index}`}
                    type="text"
                    name="line1"
                    placeholder="Address Line 1"
                    value={address.line1}
                    onChange={(e) => handleAddressChange(index, e)}
                    className="p-2 border text-sm focus:ring-1 border-gray-300 rounded"
                  />
                </div>
                <div className="relative w-full">
                  <Label
                    htmlFor={`addressLine2-${index}`}
                    className="block text-xs font-medium absolute -top-[7px] left-[15px] bg-white z-10 px-[3px] text-[#7C7C7C]"
                  >
                    Address Line 2
                  </Label>
                  <Input
                    id={`addressLine2-${index}`}
                    type="text"
                    name="line2"
                    placeholder="Address Line 2"
                    value={address.line2}
                    onChange={(e) => handleAddressChange(index, e)}
                    className="p-2 border text-sm focus:ring-1 border-gray-300 rounded"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="relative w-full">
                  <Label
                    htmlFor={`state-${index}`}
                    className="block text-xs font-medium absolute -top-[7px] left-[15px] bg-white z-10 px-[3px] text-[#7C7C7C]"
                  >
                    State
                  </Label>
                  <Input
                    id={`state-${index}`}
                    type="text"
                    name="state"
                    placeholder="State"
                    value={address.state}
                    onChange={(e) => handleAddressChange(index, e)}
                    className="p-2 border text-sm focus:ring-1 border-gray-300 rounded"
                  />
                </div>
                <div className="relative w-full">
                  <Label
                    htmlFor={`city-${index}`}
                    className="block text-xs font-medium absolute -top-[7px] left-[15px] bg-white z-10 px-[3px] text-[#7C7C7C]"
                  >
                    City
                  </Label>
                  <Input
                    id={`city-${index}`}
                    type="text"
                    name="city"
                    placeholder="City"
                    value={address.city}
                    onChange={(e) => handleAddressChange(index, e)}
                    className="p-2 border text-sm focus:ring-1 border-gray-300 rounded"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="relative w-full">
                  <Label
                    htmlFor={`country-${index}`}
                    className="block text-xs font-medium absolute -top-[7px] left-[15px] bg-white z-10 px-[3px] text-[#7C7C7C]"
                  >
                    Country
                  </Label>
                  <SearchableSelect
                    onChange={handleDynamicSelectChange(`country${index}`)}
                    selectOptions={[
                      { value: "country1", label: "Country 1" },
                      { value: "country2", label: "Country 2" },
                    ]}
                    isSearch={true}
                  />
                </div>
                <div className="relative w-full">
                  <Label
                    htmlFor={`zip-${index}`}
                    className="block text-xs font-medium absolute -top-[7px] left-[15px] bg-white z-10 px-[3px] text-[#7C7C7C]"
                  >
                    ZIP / Postal Code
                  </Label>
                  <Input
                    id={`zip-${index}`}
                    type="text"
                    name="zip"
                    placeholder="ZIP / Postal Code"
                    value={address.zip}
                    onChange={(e) => handleAddressChange(index, e)}
                    className="p-2 border text-sm focus:ring-1 border-gray-300 rounded"
                  />
                </div>
              </div>

              {/* Remove Button */}
              {index > 0 && (
                <Button
                  type="button"
                  onClick={() => removeAddress(index)}
                  className="flex items-center justify-center text-sm text-white font-semibold rounded-md bg-red-500 px-4 h-10"
                >
                  Remove Address
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Add Button */}
        {formData.addresses.length < 2 && (
          <Button
            type="button"
            onClick={addNewAddress}
            className="flex items-center justify-center bg-blue-gradient text-sm text-white font-semibold rounded-md px-4 h-10"
          >
            Add another Address
          </Button>
        )}
      </div>

      {/* Submit and Cancel Buttons */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
