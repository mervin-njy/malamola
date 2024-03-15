import React from "react";

interface InputTextAreaProps {
  title: string;
  reqBool?: boolean;
  id: string;
  value?: string | number | null;
  placeholder: string;
  changeHandler?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const InputTextArea: React.FC<InputTextAreaProps> = ({
  title,
  reqBool = true,
  id,
  value = "",
  placeholder = "",
  changeHandler,
}) => {
  return (
    <label className="textarea textarea-bordered textarea-md flex items-center gap-4">
      <h5 className="w-28 self-start font-semibold italic">{title}</h5>
      <textarea
        required={reqBool}
        id={id}
        value={value || ""}
        placeholder={placeholder}
        className="textarea textarea-ghost grow pt-0 font-medium tracking-wide text-accent placeholder:font-normal focus-within:text-accent"
        onChange={changeHandler}
      />
    </label>
  );
};

export default InputTextArea;
