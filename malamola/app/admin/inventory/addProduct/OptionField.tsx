import React, { useState } from "react";
import Image from "next/image";
import InputField from "@/app/components/inputs/InputField";
import InputRadio from "@/app/components/inputs/InputRadio";
import { IoMdImage, IoMdAdd, IoMdRemove } from "react-icons/io";
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
  ordered: number;
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
  // helper functions ----------------------------------------------------------------------------------------
  const isValidImageUrl = (url: string) => {
    // check if the URL starts with 'http://' or 'https://'
    return url.startsWith("http://") || url.startsWith("https://");
    // TODO: add other validation checks
  };

  // hooks ---------------------------------------------------------------------------------------------------
  const [validUrl, setValidUrl] = useState(true); // store imageUrl validation status
  const [previewUrl, setPreviewUrl] = useState(""); // store imageUrl for image preview
  const [previews, setPreviews] = useState<string[]>([]); // store image preview history => TBD

  // event handlers ------------------------------------------------------------------------------------------
  // removes a specific optionField from optionFields state
  const handleRemoveOption = () => {
    // console.log("removing option field ", optionIndex + 1);
    // filter out the optionField at optionIndex
    setOptionFields((prevFields) => {
      return prevFields.filter((_, ind) => ind !== optionIndex);
    });

    // 1. reset imageUrl for image preview (refresh if removed)
    setPreviewUrl("");
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
        ordered: 0,
      },
    ]);
  };

  // preview image based on imageUrl when 'preview' button is clicked
  const handlePreview = () => {
    setPreviewUrl(""); // reset to refresh image preview
    console.log("previewing image ", fields.imageUrl);

    if (isValidImageUrl(fields.imageUrl)) {
      // 1. set imageUrl for image preview
      setPreviewUrl(fields.imageUrl);

      // 2. add imageUrl to preview history
      // TODO: validate image url
      setPreviews((prevPreviews) => {
        return [...prevPreviews, fields.imageUrl];
      });
    } else {
      // if invalid: set imageUrl validation status to false
      setValidUrl(false);
    }
  };

  // change state of individual fields on input change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("changing option field ", optionIndex + 1);
    const { id, value } = event.target;
    // ensure that priceSGD and priceTWD are not coerced into string
    const parsedValue =
      id === "priceSGD" || id === "priceTWD" ? parseFloat(value) : value;

    // update the specific optionField at optionIndex
    setOptionFields((prevOptionFields) => {
      const updatedFields = [...prevOptionFields];
      updatedFields[optionIndex] = {
        ...updatedFields[optionIndex],
        [id]: parsedValue,
      };
      return updatedFields;
    });
    // 2. reset imageUrl validation status if input of imageUrl changes
    if (event.target.id === "imageUrl") {
      setValidUrl(true);
    }
  };

  // render component ----------------------------------------------------------------------------------------
  return (
    <div className="rounded-xl border-[1px] border-accent p-5">
      {/* Option Header */}
      <div className="mb-4 flex justify-between">
        <h4 className="ml-1 text-lg font-medium">Option {optionIndex + 1}:</h4>

        {/* Buttons to update option quantity ------------------------------------------------------------ */}
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

      {/* Option Fields -------------------------------------------------------------------------------- */}
      <div className="flex justify-between">
        {/* Left: input -------------------------------------------------------------------------------- */}
        <div className="flex flex-col justify-center">
          {/* Input: type (optional - for option labeling, e.g. colour, backing) */}
          <InputField
            title="Type"
            reqBool={false}
            id="type"
            value={fields.type}
            placeholder="Colour, Backing, etc."
            type="text"
            changeHandler={handleChange}
          />
          {/* Input: name (optional - for only option of product) */}
          <InputField
            title="Name"
            reqBool={options > 1 ? true : false}
            id="name"
            value={fields.name}
            placeholder="Name of option"
            type="text"
            changeHandler={handleChange}
          />
          {/* Input: Image Url */}
          <InputField
            title="Image"
            id="imageUrl"
            value={fields.imageUrl}
            placeholder="Image URL"
            type="url"
            changeHandler={handleChange}
          />

          {/* Price options ---------------------------------*/}
          {/* Input: Price (SGD) */}
          <InputField
            title="SGD"
            id="priceSGD"
            value={fields.priceSGD}
            placeholder="How much in SGD?"
            type="number"
            changeHandler={handleChange}
          />
          {/* Input: Price (TWD) */}
          <InputField
            title="NT$"
            id="priceTWD"
            value={fields.priceTWD}
            placeholder="How much in TWD?"
            type="number"
            changeHandler={handleChange}
          />
        </div>

        {/* Right: image preview ----------------------------------------------------------------------- */}
        {/* Preview image based on imageUrl when 'preview' button is clicked*/}
        <div
          className="aspect-w-1 aspect-h-1 relative mb-3 ml-4 w-full hover:rounded-2xl hover:border-[1px] hover:border-accent"
          onClick={handlePreview}
        >
          {/* Placeholder border */}
          <div className="absolute inset-0 rounded-2xl border-[1.8px] border-dashed border-accent"></div>

          {/* a. preview button - if no preview + valid url */}
          {fields.imageUrl && validUrl && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                className="btn btn-circle btn-secondary btn-xs rounded-[30%]"
              >
                <IoMdImage size={14} />
              </button>
            </div>
          )}
          {/* b. Error message - if imageUrl is invalid */}
          {!validUrl && (
            <div className="absolute inset-0 flex items-center">
              <p className="flex justify-center text-xs font-medium text-error">
                Invalid URL
              </p>
            </div>
          )}
          {/* c. Image - if valid */}
          {previewUrl && (
            <Image
              src={formatImageUrl(previewUrl)}
              alt={fields.name}
              layout="fill" // maintain aspect ratio and cover the container + object-cover to fill the container
              className="w-full rounded-2xl object-cover"
            />
          )}
        </div>
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
