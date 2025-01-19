import React from "react";

type Field = {
  id: string;
  name: string;
  label: string;
  isSingleLine: boolean;
  value: string;
};

type HouseImageInfoFormProps = {
  fields: Field[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export default function HouseImageInfoForm({ fields, onChange }: HouseImageInfoFormProps) {
  return (
    <div className="mt-2">
      {fields.map((field, index) => (
        <div key={`${field.id}_${index}`} className="mb-4">
          <label htmlFor={field.id} className="text-xs text-[#df754b]">
            {field.label}
          </label>
          {field.isSingleLine ? (
            <input
              type="text"
              id={field.id}
              name={field.name}
              className="p-2 w-full rounded outline-none text-sm"
              value={field.value}
              onChange={onChange}
            />
          ) : (
            <textarea
              id={field.id}
              name={field.name}
              className="py-1 px-2 w-full rounded outline-none text-sm"
              value={field.value}
              onChange={onChange}
            />
          )}
        </div>
      ))}
    </div>
  );
}
