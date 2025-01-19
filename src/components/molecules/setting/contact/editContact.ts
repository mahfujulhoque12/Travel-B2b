import { useRouter } from "next/navigation";
type Address = {
  line1: string;
  line2: string;
  state: string;
  city: string;
  country: string;
  zip: string;
};

type FormData = {
  firstName: string;
  lastName: string;
  emails: string[];
  phoneNumbers: string[];
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  isChangingPassword: boolean;
  addresses: Address[];
};
const useEditContact = () => {
  const router = useRouter();

  const handleEditUser = async (data: FormData) => {
    const flattenedData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.emails[0] || "",
      phoneNumber: data.phoneNumbers[0] || "",
      addressLine1: data.addresses[0]?.line1 || "",
      addressLine2: data.addresses[0]?.line2 || "",
      state: data.addresses[0]?.state || "",
      city: data.addresses[0]?.city || "",
      country: data.addresses[0]?.country || "",
      zip: data.addresses[0]?.zip || "",
    };

    const response = await fetch("/api/setting", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(flattenedData),
    });

    if (response.ok) {
      alert("User updated successfully!");
      router.push(`/user-list`);
    } else {
      alert("Failed to update user!");
    }
  };

  return { handleEditUser };
};

export default useEditContact;
