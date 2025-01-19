import { FormData } from "@/types/api";
type ValidationFn = (value: string, formData?: FormData) => string;

export const validators: Record<string, ValidationFn> = {
  firstName: (value) =>
    /^[a-zA-Z]{2,}$/.test(value)
      ? ""
      : "First Name must be at least 2 characters and contain only letters.",
  lastName: (value) =>
    /^[a-zA-Z]{2,}$/.test(value)
      ? ""
      : "Last Name must be at least 2 characters and contain only letters.",
  email: (value) =>
    /\S+@\S+\.\S+/.test(value) ? "" : "Please enter a valid email address.",
  phoneNumbers: (value) =>
    /^[0-9]{10,15}$/.test(value)
      ? ""
      : "Phone number must be between 10-15 digits.",
  currentPassword: (value) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      value
    )
      ? ""
      : "Password must include uppercase, lowercase, number, and special character.",
};

export const validateRequired = (value: string): string =>
  value.trim() ? "" : "This field is required.";
