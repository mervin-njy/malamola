"use client";

import React, { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

// types -----------------------------------------------------------------------------------------------------
type BtnSubmitFormProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

const BtnSubmitForm = ({
  children,
  className,
  ...props // this will pass all other props that don't have explicit names in the type extension (ComponentProps<"button">)
}: BtnSubmitFormProps) => {
  // experimental FormStatus => show loading status even on server component (has to be in a CSR component used in SSR component)
  const { pending } = useFormStatus();

  // render component ----------------------------------------------------------------------------------------
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
