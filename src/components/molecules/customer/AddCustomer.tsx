"use client";
import Form from "@/components/molecules/form/Form";
import useGetUser from "@/components/molecules/customer/getUser";
import useAddCustomer from "@/components/molecules/customer/addNewCustomer";
import useEditCustomer from "@/components/molecules/customer/editUser";

const fields = [
  {
    name: "firstName",
    id: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "Enter your first name",
    required: true,
    
  },
  {
    name: "lastName",
    id: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Enter your last name",
    required: true,
   
  },
  {
    id: "username",
    name: "username",
    label: "Username",
    type: "text",
    placeholder: "Enter your username",
    required: true,
    
  },
  {
    name: "email",
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    required: true,
    
  },
];

const AddCustomer = () => {
  const { id, existingUser } = useGetUser();
  const { handleAddUser } = useAddCustomer();
  const { handleEditUser } = useEditCustomer();
  console.log(existingUser);

  return (
    <div className="p-4 flex justify-center h-screen flex-col items-center">
      {id ? (
        // Edit User
        <>
          <h1 className="text-xl font-bold mb-4">Edit User</h1>
          <Form
            fields={fields}
            onSubmit={handleEditUser}
            existingUser={existingUser}
          />
        </>
      ) : (
        // Add User
        <>
          <h1 className="text-xl font-bold mt-8 mb-4">Add User</h1>
          <Form fields={fields} onSubmit={handleAddUser} />
        </>
      )}
    </div>
  );
};
export default AddCustomer;
