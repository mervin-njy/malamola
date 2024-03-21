import React from "react";

interface InputRadioProps {
  size?: string; // "sm" | "lg"
  title: string;
  selections: string[];
  id: string;
  name: string;
  value: string;
  changeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputRadio: React.FC<InputRadioProps> = ({
  size = "sm",
  title,
  selections,
  id,
  name,
  value,
  changeHandler,
}) => {
  return (
    // Group radio buttons as a div
    <div
      className={`${
        size === "lg" ? "mb-3 pl-3 tablet:flex-row" : "laptop:flex-row"
      } flex flex-col justify-start p-2`}
    >
      {/* title of radio selection */}
      <h3
        className={`${
          size === "lg" ? "w-28" : "w-24"
        } mr-4 text-base font-semibold tracking-wide`}
      >
        {title}:
      </h3>

      {/* map radio selections */}
      {selections.map((sel, ind) => {
        return (
          // each radio selection div
          <label
            key={ind}
            className={`${
              size === "lg"
                ? "my-2 tablet:mx-4 tablet:my-0"
                : "my-1 text-sm laptop:mx-4 laptop:my-0 laptop:text-sm"
            } flex flex-row items-center`}
          >
            {/* radio input */}
            <input
              id={id}
              name={name} // set unique to each optionField
              type="radio"
              value={sel}
              checked={value === sel} // changes value to match selection
              onChange={changeHandler}
              className="radio-accent radio radio-xs mr-2 laptop:radio-sm"
            />
            <h4 className="font-medium italic tracking-wide">{sel}</h4>
          </label>
        );
      })}
    </div>
  );
};

export default InputRadio;
