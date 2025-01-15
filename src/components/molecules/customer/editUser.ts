import { useRouter } from "next/navigation";

const useEditCustomer = () => {
  const router = useRouter();

  const handleEditUser = async (data: Record<string, string>) => {
    const response = await fetch("/api/user", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
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

export default useEditCustomer;
