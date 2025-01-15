import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import React, { useEffect, useState } from "react";
import { validators, validateRequired } from "./validator";
import { CircleCheck, Eye, EyeOff } from "lucide-react";
import Label from "@/components/atoms/Label";

type FieldOption = {
  value: string;
  label: string;
};

type Field = {
  id: string;
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  options?: FieldOption[];
  className?: string;
};

type FormComponentProps = {
  fields: Field[];
  onSubmit: (formData: Record<string, string>) => void;
  existingUser?: Record<string, string>;
};

const Form: React.FC<FormComponentProps> = ({
  fields,
  onSubmit,
  existingUser,
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    if (existingUser) {
      setFormData((prev) => ({ ...prev, ...existingUser }));
    }
  }, [existingUser]);

  // Handle input changes with real-time validation
  const handleChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    // Real-time validation
    if (validators[name]) {
      const error = validators[name](value, updatedFormData);
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));
    }
  };

  // Handle onBlur validation
  const handleBlur = (
    e: React.FocusEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    // Validate onBlur
    if (validators[name]) {
      const error = validators[name](value, formData);
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    // Validate all fields
    fields.forEach((field) => {
      const value = formData[field.name] || "";

      if (field.required && validateRequired(value)) {
        // Add required field error
        newErrors[field.name] = validateRequired(value);
      } else if (validators[field.name]) {
        // Add field-specific validation error if required validation passed
        const error = validators[field.name](value, formData);
        if (error) {
          newErrors[field.name] = error;
        }
      }
    });

    setFieldErrors(newErrors);

    // Proceed with submission if there are no errors
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  // navigate to the next field field on Enter key press or Tab key press
  const handleKeyDown = (
    e: React.KeyboardEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >,
    index: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const currentField = fields[index];
      const value = formData[currentField.name] || "";

      // Validate current field
      if (currentField.required && validateRequired(value)) {
        setFieldErrors((prevErrors) => ({
          ...prevErrors,
          [currentField.name]: validateRequired(value),
        }));
        return; // Do not proceed to the next field if validation fails
      }

      if (validators[currentField.name]) {
        const error = validators[currentField.name](value, formData);
        if (error) {
          setFieldErrors((prevErrors) => ({
            ...prevErrors,
            [currentField.name]: error,
          }));
          return; // Do not proceed to the next field if validation fails
        }
      }

      // Move to the next field
      const nextField = document.querySelectorAll("input, textarea, select")[
        index + 1
      ] as HTMLElement;
      if (nextField) {
        nextField.focus();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`w-[50%] mx-auto space-y-2`}>
      {fields.map((field, index) => (
        <div key={field.name}>
          <Label htmlFor={field.id} className="block text-sm font-medium mb-1">
            {field.label}
          </Label>

          {field.type === "textarea" ? (
            <textarea
              id={field.id}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={field.placeholder}
              className="w-full p-2 border border-gray-300 rounded"
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ) : field.type === "radio" ? (
            <div className="space-y-2">
              {field.options?.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center space-x-2"
                >
                  <Input
                    id={field.id}
                    type="radio"
                    name={field.name}
                    value={option.value}
                    checked={formData[field.name] === option.value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="h-4 w-4"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          ) : field.type === "select" ? (
            <select
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option disabled>Select {field.label.toLowerCase()}</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <div className="relative">
              <Input
                id={field.id}
                type={
                  field.type === "password" && showPasswords[field.name]
                    ? "text"
                    : field.type
                }
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={(e) => handleKeyDown(e, index)}
                placeholder={field.placeholder}
                className={`w-full p-2 border focus:ring-1 border-gray-300 rounded ${field.className}`}
              />
              {field.type === "password" && formData[field.name] && (
                <Button
                  type="button"
                  className="px-1 py-1 absolute right-2 top-1/2 rounded-full transform -translate-y-1/2 z-10"
                  aria-label={
                    showPasswords[field.name]
                      ? "Hide password"
                      : "Show password"
                  }
                  onClick={() =>
                    setShowPasswords((prev) => ({
                      ...prev,
                      [field.name]: !prev[field.name],
                    }))
                  }
                >
                  {showPasswords[field.name] ? (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-400" />
                  )}
                </Button>
              )}
              {(field.type === "text" ||
                field.type === "email" ||
                field.type === "number") &&
                formData[field.name] && (
                  <CircleCheck
                    className={`absolute right-2 top-1/2 rounded-full transform -translate-y-1/2 w-4 h-4 ${
                      fieldErrors[field.name]
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  />
                )}
            </div>
          )}

          {fieldErrors[field.name] && (
            <p className="text-red-500 font-medium text-sm mt-1">
              {fieldErrors[field.name]}
            </p>
          )}
        </div>
      ))}

      <Button
        type="submit"
        className="bg-blue-500 w-full text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {existingUser ? "Update" : "Add"}
      </Button>
    </form>
  );
};

export default Form;
