import React from "react";

const DeliveryOptions = () => {
  // render component ----------------------------------------------------------------------------------------
  return (
    <div className="w-full rounded-xl border-2 border-accent border-opacity-10 bg-neutral bg-opacity-5 p-5">
      {/* 1. Title */}
      <h1 className="mb-4 text-3xl font-bold tracking-wider">
        Delivery details
      </h1>
      <div className="divider" />

      {/* Form #1: Address*/}
      <div className="collapse collapse-arrow">
        <input type="checkbox" />
        <h2 className="collapse-title w-full text-xl font-semibold tracking-wide">
          Address
        </h2>
        <form className="collapse-content flex flex-col items-end">
          {/* Main address */}
          <input
            required
            name="address"
            placeholder="Your street and street number"
            className="input input-bordered mb-3 w-full"
          />
          {/* Country - to limit to SG & TW */}
          <input
            required
            name="country"
            placeholder="Country (dropdown options for sg & taiwan)"
            className="input input-bordered mb-3 w-full"
          />
          {/* Postal code */}
          <input
            required
            name="postalCode"
            placeholder="Postal code"
            type="number"
            className="input input-bordered mb-3 w-full"
          />
          {/* Additional info */}
          <textarea
            required
            name="notes"
            placeholder="Additional notes"
            className="textarea textarea-bordered mb-3 w-full"
          />
          {/* Button to add addres - will show other address options */}
          <button className="btn btn-accent mt-4">Add Address</button>
        </form>
      </div>

      {/* Form #2: Contact*/}
      <div className="collapse-arrow collapse">
        <input type="checkbox" />
        <h2 className="collapse-title w-full text-xl font-semibold tracking-wide">
          Contact
        </h2>
        <form className="collapse-content flex flex-col items-end">
          {/* Mobile number - add validation */}
          <input
            required
            name="mobile"
            placeholder="Contact number (will add country code)"
            className="input input-bordered mb-3 w-full"
          />
          {/* Country - to limit to SG & TW */}
          <input
            required
            name="email"
            placeholder="Email address"
            type="email"
            className="input input-bordered mb-3 w-full"
          />
          {/* Confirm contact info */}
          <button className="btn btn-accent mt-4">Add Contact</button>
        </form>
      </div>
    </div>
  );
};

export default DeliveryOptions;
