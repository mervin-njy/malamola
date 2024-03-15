import React, { useState } from "react";
import Image from "next/image";
import InputField from "@/app/components/inputs/InputField";
import InputRadio from "@/app/components/inputs/InputRadio";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { formatImageUrl } from "@/app/helper/format";

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
  // hooks --------------------------------------------------------------------------------------------------
  const [loadImage, setLoadImage] = useState(false); // to load image preview

  // event handlers ------------------------------------------------------------------------------------------
  // removes a specific optionField from optionFields state
  const handleRemoveOption = () => {
    console.log("removing option field ", optionIndex + 1);
    // filter out the optionField at optionIndex
    setOptionFields((prevFields) => {
      return prevFields.filter((_, ind) => ind !== optionIndex);
    });
  };

  // add a new optionField to optionFields state
  const handleAddOption = () => {
    // add at end of optionFields (state) array
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

  const handlePreview = () => {
    console.log("previewing image ", fields.imageUrl);
    setLoadImage(true);
  };

  // change state of individual fields on input change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("changing option field ", optionIndex + 1);
    // update the specific optionField at optionIndex
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
              type="button" // to prevent form submission - only by button type="submit"
              className="btn btn-circle btn-success btn-xs rounded-[30%]"
              onClick={handleAddOption}
            >
              <IoMdAdd size={14} />
            </button>
          )}
          {options > 1 && (
            // if > 1 option, render remove button
            <button
              type="button" // to prevent form submission - only by button type="submit"
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
        placeholder="colour, backing, etc. if applicable"
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
      <div className="flex justify-between">
        <InputField
          title="Image URL"
          id="imageUrl"
          value={fields.imageUrl}
          placeholder="Image URL"
          type="url"
          changeHandler={handleChange}
        />

        <button
          type="button"
          className="btn btn-outline btn-primary btn-sm"
          onClick={handlePreview}
        >
          preview
        </button>
      </div>

      {/* Price options */}
      <div className="flex">
        <div>
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
        </div>

        {/* Preview image based on imageUrl when 'preview' button is clicked*/}
        {loadImage && (
          <Image
            src={formatImageUrl(fields.imageUrl)}
            alt={fields.name}
            width={200}
            height={100}
            className="w-full rounded-[2rem] object-cover tablet:h-56 tablet:rounded-none tablet:p-0"
          />
        )}
      </div>

      {/* Input: Action choices */}
      <InputRadio
        title="Action"
        selections={["Wish", "Enquire", "Order"]}
        id="action"
        name={`action-${optionIndex}`} // set unique to each optionField
        value={fields.action} // checked: value === selection
        changeHandler={handleChange}
      />
    </div>
  );
};

export default OptionField;
