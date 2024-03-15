import React from "react";

interface Fields {
  type: string;
  name: string;
  imageUrl: string;
  priceSGD: number;
  priceTWD: number;
  action: string;
  wishedFor: number;
  requested: number;
  preOrdered: number;
}

// type interface for OptionField props
interface OptionFieldProps {
  options: number;
  optionIndex: number;
  fields: Fields;
  setOptionFields: React.Dispatch<React.SetStateAction<Fields[]>>;
}

const OptionField: React.FC<OptionFieldProps> = ({
  options,
  optionIndex,
  fields,
  setOptionFields,
}) => {
  // event handlers ------------------------------------------------------------------------------------------
  // removes a specific optionField from optionFields state
  const handleRemoveOption = () => {
    console.log("removing option field ", optionIndex + 1);

    setOptionFields((prevFields) => {
      return prevFields.filter((_, ind) => ind !== optionIndex);
    });
  };

  // add a new optionField to optionFields state
  const handleAddOption = () => {
    setOptionFields((prevOptionFields) => [
      ...prevOptionFields,
      {
        type: "",
        name: "",
        imageUrl: "",
        priceSGD: 0,
        priceTWD: 0,
        action: "Wish",
        wishedFor: 0,
        requested: 0,
        preOrdered: 0,
      },
    ]);
  };

  // change state of individual fields on input change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("changing option field ", optionIndex + 1);

    setOptionFields((prevOptionFields) => {
      const updatedFields = [...prevOptionFields];
      updatedFields[optionIndex] = {
        ...updatedFields[optionIndex],
        [event.target.id]: event.target.value,
      };
      return updatedFields;
    });
  };

  // render component ----------------------------------------------------------------------------------------
  return (
    <div className="rounded-xl border-[1px] border-accent p-4">
      {/* Option Heading */}
      <h4 className="mb-3 text-lg font-medium">Option {optionIndex + 1}:</h4>
      {/* Input: type (optional - for option labeling, e.g. colour, backing) */}
      <input
        id="type"
        value={fields.type}
        placeholder="Type of product (e.g. colour, backing) if applicable"
        type="text"
        className="input input-bordered mb-3 w-full"
        onChange={handleChange}
      />
      {/* Input: name (optional - for only option of product) */}
      <input
        required={optionIndex > 0 ? true : false}
        id="name"
        value={fields.name}
        type="text"
        placeholder="Name of option"
        className="input input-bordered mb-3 w-full"
        onChange={handleChange}
      />
      {/* Input: Image Url */}
      <input
        required
        id="imageUrl"
        value={fields.imageUrl}
        type="url"
        placeholder="Image URL"
        className="input input-bordered mb-3 w-full"
        onChange={handleChange}
      />
      {/* Input: Price (SGD) */}
      <input
        required
        id="priceSGD"
        value={fields.priceSGD}
        type="number"
        placeholder="Price (in SGD)"
        className="input input-bordered mb-3 w-full"
        onChange={handleChange}
      />
      {/* Input: Price (TWD) */}
      <input
        required
        id="priceTWD"
        value={fields.priceTWD}
        type="number"
        placeholder="Price (in TWD)"
        className="input input-bordered mb-3 w-full"
        onChange={handleChange}
      />
      {/* Input: Action choices */}
      <div className="mb-3 flex flex-col justify-start p-2 tablet:flex-row">
        <h3 className="mr-4 text-base font-semibold tracking-wide">
          Customer Action:
        </h3>
        {["Wish", "Enquire", "Order"].map((action, ind) => {
          return (
            <div
              key={ind}
              className="my-2 flex flex-row tablet:mx-4 tablet:my-0"
            >
              <input
                id="action"
                name={`action-${optionIndex}`} // set unique to each optionField
                type="radio"
                value={action}
                checked={fields.action === action}
                onChange={handleChange}
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
    </div>
  );
};

export default OptionField;
