"use client";

import BtnSubmitForm from "@/app/components/buttons/BtnSubmitForm";
import React, { useState } from "react";
import InputField from "@/app/components/inputs/InputField";
import InputRadio from "@/app/components/inputs/InputRadio";
import InputTextArea from "@/app/components/inputs/InputTextArea";
import OptionField from "./OptionField";
import { addProduct } from "@/app/components/actions/addProduct"; // server action

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
      preOrdered: 0,
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
    const formData = new FormData(event.currentTarget);

    // validate form data before sending to server

    // server actions -----------------------------------------------------------------------------------------
    // imported server action to this file without client-side data fetching => protects db credentials
    // => currently in alpha so => next.config.js => const nextConfig = { experimental: { serverActions: true, }, };
    // from @app/components/actions/addProduct.ts
    await addProduct(formData);
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
