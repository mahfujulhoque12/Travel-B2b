import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import React, { useEffect, useState, useCallback } from "react";
import { validators, validateRequired } from "./validators";
import { CircleCheck, Eye, EyeOff } from "lucide-react";
import Label from "@/components/atoms/Label";
import DatePicker from "../global/DatePickerSingle";
import SearchableSelect from "../global/SearchableSelect";

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

// New type for a section of fields
type FieldSection = {
  section: string; // The name of the section
  fields: Field[]; // Array of fields within the section
};

type FormComponentProps = {
  fields: FieldSection[];
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

  // Flatten fields for validation and key navigation
  const flattenedFields = fields.flatMap((section) => section.fields);

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

  // Update date
  const handleDepartureDateChange = useCallback((date: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      birthOfDate: date ? date.toISOString().split("T")[0] : "",
    }));
  }, []);

  const handleDynamicSelectChange =
    (key: string) => (value: { value: string; label: string }) => {
      setFormData((prev) => ({
        ...prev,
        [key]: `${value.value}`,
      }));
    };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    // Validate all fields
    flattenedFields.forEach((field) => {
      const value = formData[field.name] || "";

      if (field.required && validateRequired(value)) {
        newErrors[field.name] = validateRequired(value);
      } else if (validators[field.name]) {
        const error = validators[field.name](value, formData);
        if (error) {
          newErrors[field.name] = error;
        }
      }
    });

    setFieldErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  // Handle navigation on Enter key
  const handleKeyDown = (
    e: React.KeyboardEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >,
    index: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const currentField = flattenedFields[index];
      const value = formData[currentField.name] || "";

      if (currentField.required && validateRequired(value)) {
        setFieldErrors((prevErrors) => ({
          ...prevErrors,
          [currentField.name]: validateRequired(value),
        }));
        return;
      }

      if (validators[currentField.name]) {
        const error = validators[currentField.name](value, formData);
        if (error) {
          setFieldErrors((prevErrors) => ({
            ...prevErrors,
            [currentField.name]: error,
          }));
          return;
        }
      }

      const nextField = document.querySelectorAll("input, textarea, select")[
        index + 1
      ] as HTMLElement;
      if (nextField) {
        nextField.focus();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-8`}>
      {fields.map((section) => (
        <fieldset
          key={section.section}
          className="mb-6 grid grid-cols-2 gap-5 shadow-light-shadow p-3"
        >
          <legend className="text-lg font-semibold mb-2">
            {section.section}
          </legend>
          {section.fields.map((field, index) => (
            <div key={field.name} className="mb-2 relative">
              <Label
                htmlFor={field.id}
                className="block text-xs font-medium absolute -top-[7px] left-[15px] bg-white z-10 px-[3px] text-[#7C7C7C]"
              >
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
              ) : field.type === "date" ? (
                <DatePicker
                  onChange={handleDepartureDateChange}
                  formDate={true}
                />
              ) : field.type === "select" ? (
                <SearchableSelect
                  onChange={handleDynamicSelectChange(field.name)}
                  selectOptions={field.options || []}
                  isSearch={field.name === "country"}
                />
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
                    className={`w-full p-2 border text-sm focus:ring-1 border-gray-300 rounded ${field.className}`}
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
        </fieldset>
      ))}

      <div className="flex justify-end gap-x-2">
        <Button
          type="submit"
          className="bg-transparent border border-gray-500 text-gray-500 px-5 py-2 rounded"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-blue-gradient text-white px-5 py-2 rounded hover:bg-blue-600"
        >
          {existingUser ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default Form;
