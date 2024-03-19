"use client";

import BtnSubmitForm from "@/app/components/buttons/BtnSubmitForm";
import React, { useState } from "react";
import InputField from "@/app/components/inputs/InputField";
import InputRadio from "@/app/components/inputs/InputRadio";
import InputTextArea from "@/app/components/inputs/InputTextArea";
import OptionField from "./OptionField";
import { addProduct } from "@/app/components/actions/addProduct"; // server action
import { z } from "zod";

// validation schema (zod) ------------------------------------------------------------------------------------
const productSchema = z.object({
  name: z.string().nonempty("Name is required"),
  category: z.string().nonempty("Category is required"), // change to enum
  description: z.string().nonempty("Description is required"),
  options: z.array(
    z.object({
      type: z.string().optional(),
      name: z.string().optional(),
      imageUrl: z.string().nonempty("Image URL is required"),
      priceSGD: z
        .number()
        .int()
        .min(0, "Price in SGD must be a positive number"),
      priceTWD: z
        .number()
        .int()
        .min(0, "Price in TWD must be a positive number"),
      action: z.string().nonempty("Action is required"), // change to enum
      wishedFor: z.number().int().nonnegative(),
      requested: z.number().int().nonnegative(),
      ordered: z.number().int().nonnegative(),
    }),
  ),
});
// use zod's infer to get the type of the schema for server action usage
export type ProductFields = z.infer<typeof productSchema>;

const AddProductPage = () => {
  // hooks ----------------------------------------------------------------------------------------------------
  const [productFields, setProductFields] = useState({
    name: "",
    category: "Mola",
    description: "",
  }); // to contain main productFields data to create new product
  const [optionFields, setOptionFields] = useState([
    {
      type: "",
      name: "",
      imageUrl: "",
      priceSGD: 0,
      priceTWD: 0,
      action: "Wish",
      // for admin to track productOption-quantities
      wishedFor: 0,
      requested: 0,
      ordered: 0,
    },
  ]); // to contain optionFields data to create new productOptions

  // event handlers -------------------------------------------------------------------------------------------
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    console.log(event.target.id, event.target.value); // debug
    console.log(productFields);
    const { id, value } = event.target;
    setProductFields((prevFields) => ({ ...prevFields, [id]: value }));
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // 1. compile productFields and optionFields into formData
      const formData = { ...productFields, options: optionFields };
      console.log(formData); // debug

      // 2. validate form data before sending to server
      productSchema.parse(formData);
      // + timestamps are automatically added

      // server actions -----------------------------------------------------------------------------------------
      // imported server action to this file without client-side data fetching => protects db credentials
      // => currently in alpha so => next.config.js => const nextConfig = { experimental: { serverActions: true, }, };
      // from @app/components/actions/addProduct.ts
      await addProduct(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // TODO: Handle validation errors
        // Display error messages to admin user
        // Prevent form submission until all errors are resolved
        console.error("Validation error:", error.errors);
      } else {
        // Handle other types of errors
        console.error("Other error:", error);
      }
    }
  };

  // render component -----------------------------------------------------------------------------------------
  return (
    <>
      <div className="mx-10 tracking-wide laptop:mx-0">
        <h1 className="mb-10 text-3xl font-bold">Add new Product</h1>

        <div className="card card-bordered bg-neutral bg-opacity-5 p-4 hover:shadow-md">
          <h1 className="card-title px-3 py-2 text-2xl">Product Information</h1>
          {/* change to "ID" mapped from db's product list */}
          <div className="card-body p-2">
            <form onSubmit={handleFormSubmit}>
              {/* Input: name */}
              <InputField
                size="lg"
                title="Name"
                id="name"
                value={productFields.name}
                placeholder="What would you like to call this product?"
                type="text"
                changeHandler={handleChange}
              />
              {/* Input: Category choices */}
              <InputRadio
                size="lg"
                title="Category"
                selections={["Mola", "Seasonal", "DIY", "Past"]}
                id="category"
                name="category"
                value={productFields.category} // checked: value === selection
                changeHandler={handleChange}
              />
              {/* Input: Description */}
              <InputTextArea
                title="Description"
                id="description"
                value={productFields.description}
                placeholder="Describe the product in the most attractive way possible!"
                changeHandler={handleChange}
              />
              {/* ---------- divider - options below ---------- */}
              <div className="divider"></div>{" "}
              {/* Render (multiple) option fields */}
              <h3 className="mb-4 ml-1 text-xl font-medium">
                Describe Product Options:
              </h3>
              <div className="mb-6 grid grid-cols-1 gap-5 laptop:grid-cols-2">
                {optionFields.map((fields, ind) => (
                  <div key={ind}>
                    <OptionField
                      options={optionFields.length}
                      optionIndex={ind}
                      fields={fields}
                      setOptionFields={setOptionFields}
                    />
                  </div>
                ))}
              </div>
              <BtnSubmitForm className="btn-accent btn-block">
                Add Product
              </BtnSubmitForm>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProductPage;
