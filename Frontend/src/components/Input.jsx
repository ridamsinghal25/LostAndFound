import React, { useId } from "react";

function Input({ type = "text", className = "", label, ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        id={id}
        ref={ref}
        className={`${className}`}
        {...props}
      />
    </div>
  );
}

export default React.forwardRef(Input);
