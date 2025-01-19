"use client";
import useGetUser from "@/components/molecules/add-customer/getUser";
import useAddCustomer from "@/components/molecules/add-customer/addNewCustomer";
import useEditCustomer from "@/components/molecules/add-customer/editUser";
import TestForm from "./TestForm";

const fields = [
  {
    section: "Personal Details",
    fields: [
      {
        name: "firstName",
        id: "firstName",
        label: "First Name",
        type: "text",
        placeholder: "Enter First Name",
        required: true,
      },
      {
        name: "lastName",
        id: "lastName",
        label: "Last Name",
        type: "text",
        placeholder: "Enter Last Name",
        required: true,
      },
      {
        name: "dob",
        id: "dob",
        label: "Date of Birth",
        type: "date",
        placeholder: "MM.DD.YY",
        required: false,
      },
      {
        name: "passportNo",
        id: "passportNo",
        label: "Passport No",
        type: "text",
        placeholder: "Enter Passport No",
      },
      {
        name: "gender",
        id: "gender",
        label: "Gender",
        type: "select",
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
          { value: "other", label: "Other" },
        ],
        placeholder: "Select Gender",
        required: false,
      },
    ],
  },
  {
    section: "Contact Details",
    fields: [
      {
        name: "email",
        id: "email",
        label: "Email",
        type: "email",
        placeholder: "Enter Email",
        required: true,
      },
      {
        name: "phone",
        id: "phone",
        label: "Phone",
        type: "text",
        placeholder: "Enter Phone Number",
        required: true,
      },
    ],
  },
  {
    section: "Address Details",
    fields: [
      {
        name: "addressLine1",
        id: "addressLine1",
        label: "Address Line 1",
        type: "text",
        placeholder: "Enter Address",
        required: true,
      },
      {
        name: "addressLine2",
        id: "addressLine2",
        label: "Address Line 2",
        type: "text",
        placeholder: "Enter Address",
      },
      {
        name: "state",
        id: "state",
        label: "State",
        type: "select",
        options: [
          { value: "state1", label: "State 1" },
          { value: "state2", label: "State 2" },
        ],
        placeholder: "Select State",
        required: false,
      },
      {
        name: "city",
        id: "city",
        label: "City",
        type: "text",
        placeholder: "Enter City",
        required: true,
      },
      {
        name: "zip",
        id: "zip",
        label: "ZIP / Postal Code",
        type: "text",
        placeholder: "Enter ZIP Code",
        required: true,
      },
      {
        name: "country",
        id: "country",
        label: "Country",
        type: "select",
        options: [
          { value: "country1", label: "Country 1" },
          { value: "country2", label: "Country 2" },
        ],
        placeholder: "Select Country",
        required: false,
      },
    ],
  },
];

const AddCustomer = () => {
  const { id, existingUser } = useGetUser();
  const { handleAddUser } = useAddCustomer();
  const { handleEditUser } = useEditCustomer();

  return (
    <div className="p-4">
      {id ? (
        // Edit User
        <>
          <TestForm
            fields={fields}
            onSubmit={handleEditUser}
            existingUser={existingUser}
          />
        </>
      ) : (
        // Add User
        <>
          <TestForm fields={fields} onSubmit={handleAddUser} />
        </>
      )}
    </div>
  );
};
export default AddCustomer;
