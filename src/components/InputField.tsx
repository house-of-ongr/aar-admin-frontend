import React from "react";

type InputFieldProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  readOnly: boolean;
  isSingleLine?: boolean;
  id: string;
};

export default function InputField({ label, value, onChange, readOnly, isSingleLine = true, id }: InputFieldProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="text-xs text-[#df754b]">
        {label}
      </label>
      {isSingleLine ? (
        <input
          id={id}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          className={`w-full rounded outline-none transition-all duration-2000 ${
            readOnly ? "bg-[#F8EFE6]" : "px-2 py-1 border-2 border-[#df754b]"
          }`}
        />
      ) : (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          className={`w-full rounded outline-none transition-all duration-2000 ${
            readOnly ? "bg-[#F8EFE6]" : "transition px-2 py-1 border-2 border-[#df754b]"
          }`}
        />
      )}
    </div>
  );
}
