import React from "react";

interface InputFieldProps {
  size?: string; // "sm" | "lg"
  title: string;
  reqBool?: boolean;
  id: string;
  value?: string | number | null;
  placeholder: string;
  type?: string;
  changeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  size = "sm",
  title,
  reqBool = true,
  id,
  value = "",
  placeholder = "",
  type = "text",
  changeHandler,
}) => {
  return (
    <label
      className={`${
        size === "lg" ? "input-md text-base" : "input-sm"
      } input input-bordered mb-3 flex items-center gap-4`}
    >
      <h5 className={`${size === "lg" ? "w-32" : "w-28"} font-semibold`}>
        {title}
      </h5>
      <input
        required={reqBool}
        id={id}
        value={value || ""}
        placeholder={placeholder}
        type={type}
        className="grow font-medium tracking-wide text-accent placeholder:font-normal"
        onChange={changeHandler}
      />
    </label>
  );
};

export default InputField;
