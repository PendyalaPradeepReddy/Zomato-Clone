import React, { forwardRef, useId } from "react";

function Input({ label, type = "text", className = "", ...props }, ref) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-4 py-2 h-12 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border w-full ${className}`}
        {...props}
        ref={ref}
        id={id}
        autoComplete="off"
      />
    </div>
  );
}

export default forwardRef(Input);
