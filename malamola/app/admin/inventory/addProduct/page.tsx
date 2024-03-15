"use client";

import BtnSubmitForm from "@/app/components/buttons/BtnSubmitForm";
import React, { useState } from "react";
import OptionField from "./OptionField";
import { addProduct } from "@/app/components/actions/addProduct";

const AddProductPage = () => {
  // hooks ----------------------------------------------------------------------------------------------------
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
      <div className="tracking-wide">
        <h1 className="mb-10 text-3xl font-bold">Add new Product</h1>

        <div className="card card-bordered bg-neutral bg-opacity-5 p-4 hover:shadow-md">
          <h1 className="card-title px-3 py-2 text-2xl">Product Information</h1>
          {/* change to "ID" mapped from db's product list */}
          <div className="card-body p-2">
            <form onSubmit={handleFormSubmit}>
              {/* Input: name */}
              <input
                required
                name="name"
                type="text"
                placeholder="Name"
                className="input input-bordered mb-3 w-full"
              />
              {/* Input: Category choices */}
              <div className="mb-3 flex flex-col justify-start p-2 tablet:flex-row">
                <h3 className="mr-4 text-base font-semibold tracking-wide">
                  Category:
                </h3>
                {["Mola", "Seasonal", "DIY", "Past"].map((cat, ind) => {
                  return (
                    <div
                      key={ind}
                      className="my-2 flex flex-row tablet:mx-4 tablet:my-0"
                    >
                      <input
                        name="category"
                        type="radio"
                        value={cat}
                        defaultChecked={ind === 0}
                        className="radio-accent radio mr-2"
                      />
                      <h4 className="font-medium italic tracking-wide">
                        {cat}
                      </h4>
                    </div>
                  );
                })}
              </div>
              {/* Input: Description */}
              <textarea
                required
                name="description"
                placeholder="Description"
                className="textarea textarea-bordered mb-3 w-full"
              />

              {/* Render (multiple) option fields */}
              <h3 className="mb-4 text-xl font-medium">
                Input Product Options:
              </h3>
              <div className="mb-6 grid grid-cols-2 gap-5">
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
