import React from "react";

// type interface for OptionField props
interface OptionFieldProps {
  options: number;
  optionIndex: number;
  setOptions: React.Dispatch<React.SetStateAction<number>>;
  setOptionFields: React.Dispatch<React.SetStateAction<never[]>>;
}

const OptionField: React.FC<OptionFieldProps> = ({
  options,
  optionIndex,
  setOptions,
  setOptionFields,
}) => {
  // event handlers ------------------------------------------------------------------------------------------
  const handleRemoveOption = () => {
    setOptions((prev) => prev - 1);
  };
  const handleAddOption = () => {
    setOptions((prev) => prev + 1);
  };

  // render component ----------------------------------------------------------------------------------------
  return (
    <div className="rounded-xl border-[1px] border-accent p-4">
      {/* Option Heading */}
      <h4 className="mb-3 text-lg font-medium">Option {optionIndex + 1}:</h4>
      {/* Input: type (optional - for option labeling, e.g. colour, backing) */}
      <input
        name="type"
        placeholder="Type of product (e.g. colour, backing) if applicable"
        type="text"
        className="input input-bordered mb-3 w-full"
      />
      {/* Input: name (optional - for only option of product) */}
      <input
        required={optionIndex > 0 ? true : false}
        name="name"
        placeholder="Name of option"
        type="text"
        className="input input-bordered mb-3 w-full"
      />
      {/* Input: Image Url */}
      <input
        required
        name="imageUrl"
        placeholder="Image URL"
        type="url"
        className="input input-bordered mb-3 w-full"
      />
      {/* Input: Price (SGD) */}
      <input
        required
        name="price_SGD"
        placeholder="Price (in SGD)"
        type="number"
        className="input input-bordered mb-3 w-full"
      />
      {/* Input: Price (TWD) */}
      <input
        required
        name="price_TWD"
        placeholder="Price (in TWD)"
        type="number"
        className="input input-bordered mb-3 w-full"
      />
      {/* Input: Action choices */}
      <div className="mb-3 flex flex-col justify-start p-2 tablet:flex-row">
        <h3 className="mr-4 text-base font-semibold tracking-wide">
          Customer Action:
        </h3>
        {["Wish", "Enquire", "Order"].map((action, ind) => {
          // FIX NEEDED: each div = 1 input from radio button, shouldn't be affected by other OptionField components
          return (
            <div
              key={ind}
              className="my-2 flex flex-row tablet:mx-4 tablet:my-0"
            >
              <input
                type="radio"
                value={action}
                name="action"
                defaultChecked={ind === 0}
                className="radio-accent radio mr-2"
              />
              <h4 className="font-medium italic tracking-wide">{action}</h4>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end gap-4">
        {optionIndex + 1 === options && (
          // if last option, render add button
          <button
            className="btn btn-success btn-sm w-20"
            onClick={handleAddOption}
          >
            Add
          </button>
        )}
        {options > 1 && (
          // if > 1 option, render remove button
          <button
            className="btn btn-error btn-sm w-20"
            onClick={handleRemoveOption}
          >
            Remove
          </button>
        )}
      </div>
      {/* <div className="mt-4 grid grid-cols-4 gap-3">
        <div className="btn btn-primary" />
        <div className="btn btn-secondary" />
        <div className="btn btn-accent" />
        <div className="btn btn-neutral" />
        <div className="btn btn-success" />
        <div className="btn btn-info" />
        <div className="btn btn-warning" />
        <div className="btn btn-error" />
      </div> */}
    </div>
  );
};

export default OptionField;
