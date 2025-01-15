import { useRouter } from "next/navigation";

const useAddCustomer = () => {
  const router = useRouter();

  const handleAddUser = async (data: Record<string, string>) => {
    console.log(
      `You have called me Omar with this data: ${JSON.stringify(data)}`
    );
    const response = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      alert("User added successfully!");
      router.push(`/user-list`);
    } else {
      alert("Failed to add user!");
    }
  };

  return { handleAddUser };
};

export default useAddCustomer;
