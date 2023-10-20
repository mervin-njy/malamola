"use client";
import React, { ComponentProps } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

type BtnSubmitFormProps = {
  children: React.ReactNode;
  className?: String;
} & ComponentProps<"button">;

const BtnSubmitForm = ({
  children,
  className,
  ...props // this will pass all other props that don't have explicit names in the type extension (ComponentProps<"button">)
}: BtnSubmitFormProps) => {
  // experimental useFormStatus => show loading status even on server component (has to be in a CSR component used in SSR component)
  const { pending } = useFormStatus();

  return (
    <button
      {...props} // this applies the remaining props, but before the important props below that have priority
      className={`btn ${className}`}
      type="submit"
      disabled={pending}
    >
      {pending ? (
        <span className="loading loading-ring loading-md text-secondary"></span>
      ) : (
        children
      )}
    </button>
  );
};

export default BtnSubmitForm;
