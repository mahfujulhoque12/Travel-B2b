import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const useGetContact = () => {
  const [existingUser, setExistingUser] = useState<Record<string, string>>({});
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      const fetchUserData = async (): Promise<Record<string, string>> => {
        try {
          const response = await fetch(`/api/setting?id=${id}`);
          if (response.ok) {
            return await response.json();
          } else {
            console.error("Failed to fetch user data");
            return {};
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          return {};
        }
      };

      fetchUserData().then((data) => setExistingUser(data));
    }
  }, [id]);

  return { id, existingUser };
};

export default useGetContact;
