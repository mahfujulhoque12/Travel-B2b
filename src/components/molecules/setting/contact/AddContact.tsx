import Form from "./Form";

const AddContact = () => {
  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      const response = await fetch("/api/setting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.text();
        console.log("Response from API:", result);
        alert("Contact added successfully!");
      } else {
        console.error("Error in API response:", response.statusText);
        alert("Failed to add contact.");
      }
    } catch (error) {
      console.error("Error while posting data:", error);
      alert("An error occurred while adding the contact.");
    }
  };

  return <Form onSubmit={onSubmit} />;
};

export default AddContact;
