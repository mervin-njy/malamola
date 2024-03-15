import React from "react";
import InputField from "@/app/components/inputs/InputField";
import { IoMdAdd, IoMdRemove } from "react-icons/io";

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
    <div className="rounded-xl border-[1px] border-accent p-5">
      {/* Option Header */}
      <div className="mb-4 flex justify-between">
        <h4 className="ml-1 text-lg font-medium">Option {optionIndex + 1}:</h4>

        {/* Buttons to update option quantity */}
        <div className="flex justify-end gap-2">
          {optionIndex + 1 === options && (
            // if last option, render add button
            <button
              className="btn btn-circle btn-success btn-xs rounded-[30%]"
              onClick={handleAddOption}
            >
              <IoMdAdd size={14} />
            </button>
          )}
          {options > 1 && (
            // if > 1 option, render remove button
            <button
              className="btn btn-circle btn-error btn-xs rounded-[30%]"
              onClick={handleRemoveOption}
            >
              <IoMdRemove size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Input: type (optional - for option labeling, e.g. colour, backing) */}
      <InputField
        title="Type"
        reqBool={false}
        id="type"
        value={fields.type}
        placeholder="Option type if applicable, e.g. colour, backing"
        type="text"
        changeHandler={handleChange}
      />
      {/* Input: name (optional - for only option of product) */}
      <InputField
        title="Name"
        reqBool={options > 1 ? true : false}
        id="name"
        value={fields.name}
        placeholder="What would you like to call this option?"
        type="text"
        changeHandler={handleChange}
      />
      {/* Input: Image Url */}
      <InputField
        title="Image URL"
        id="imageUrl"
        value={fields.imageUrl}
        placeholder="Image URL"
        type="url"
        changeHandler={handleChange}
      />

      {/* Price options */}
      <div className="flex"></div>
      {/* Input: Price (SGD) */}
      <InputField
        title="Price (SGD)"
        id="priceSGD"
        value={fields.priceSGD}
        placeholder="How much in SGD?"
        type="number"
        changeHandler={handleChange}
      />
      {/* Input: Price (TWD) */}
      <InputField
        title="Price (TWD)"
        id="priceTWD"
        value={fields.priceTWD}
        placeholder="How much in TWD?"
        type="number"
        changeHandler={handleChange}
      />
      {/* Input: Action choices */}
      <div className="flex flex-col justify-start p-2 laptop:flex-row">
        <h3 className="mr-4 text-base font-semibold tracking-wide">
          Customer Action:
        </h3>
        {["Wish", "Enquire", "Order"].map((action, ind) => {
          return (
            <div
              key={ind}
              className="laptop:text-md my-1 flex flex-row items-center text-sm laptop:mx-4 laptop:my-0"
            >
              <input
                id="action"
                name={`action-${optionIndex}`} // set unique to each optionField
                type="radio"
                value={action}
                checked={fields.action === action}
                onChange={handleChange}
                className="radio-accent radio radio-xs mr-2 laptop:radio-sm"
              />
              <h4 className="font-medium italic tracking-wide">{action}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OptionField;
