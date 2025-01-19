type ValidationFn = (
  value: string,
  formData?: Record<string, string>
) => string;

export const validators: Record<string, ValidationFn> = {
  firstName: (value) =>
    /^[a-zA-Z]{2,}$/.test(value)
      ? ""
      : "First Name must be at least 2 characters and contain only letters.",
  lastName: (value) =>
    /^[a-zA-Z]{2,}$/.test(value)
      ? ""
      : "Last Name must be at least 2 characters and contain only letters.",
  username: (value) =>
    /^[a-zA-Z0-9_]{5,}$/.test(value)
      ? ""
      : "Username must be at least 5 characters long and contain only alphanumeric characters or underscores.",
  email: (value) =>
    /\S+@\S+\.\S+/.test(value) ? "" : "Please enter a valid email address.",
  phone: (value) =>
    /^[0-9]{11}$/.test(value) ? "" : "Phone number must be exactly 11 digits.",
  password: (value) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      value
    )
      ? ""
      : "Password must be strong: 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character.",
  confirmPassword: (value, formData) =>
    value === formData?.password ? "" : "Passwords do not match.",
  creditCard: (value) =>
    /^[0-9]{16}$/.test(value) ? "" : "Credit Card number must be 16 digits.",
};

// General purpose validation function for required fields
export const validateRequired = (value: string): string =>
  value.trim() ? "" : "Field is required.";
