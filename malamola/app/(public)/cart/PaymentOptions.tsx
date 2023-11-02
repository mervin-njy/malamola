import React from "react";

const PaymentOptions = () => {
  // render component ----------------------------------------------------------------------------------------
  return (
    <div className="w-full rounded-xl border-2 border-accent border-opacity-10 bg-neutral bg-opacity-5 p-5">
      {/* 1. Title */}
      <h1 className="mb-4 text-3xl font-bold tracking-wider">Payment</h1>
      <div className="divider" />

      {/* Form #1: Mode of payment*/}
      <div className="collapse collapse-arrow">
        <input type="checkbox" />
        <h2 className="collapse-title w-full text-xl font-semibold tracking-wide">
          Mode
        </h2>
        <form className="collapse-content flex flex-row justify-between">
          {["Stripe", "Paynow (SGD)", "Credit/Debit Card"].map((mode, ind) => {
            return (
              <div key={ind} className="mr-4 flex flex-row">
                <input
                  type="radio"
                  value={mode}
                  name="mode"
                  className="radio-accent radio mr-2"
                />
                <h4 className="font-medium italic tracking-wide">{mode}</h4>
              </div>
            );
          })}
        </form>
      </div>

      {/* Form #2: Details*/}
      <div className="collapse-arrow collapse">
        <input type="checkbox" />
        <h2 className="collapse-title w-full text-xl font-semibold tracking-wide">
          Details - to change accordingly
        </h2>
        <form className="collapse-content flex flex-col items-end">
          {/* Vouchers */}
          <input
            required
            name="voucher"
            placeholder="Voucher code"
            className="input input-bordered mb-3 w-full"
          />
          {/* Card no. */}
          <input
            required
            name="cardDetails"
            placeholder="Card details"
            type="number"
            className="input input-bordered mb-3 w-full"
          />
          {/* Confirm contact info */}
          <button className="btn btn-accent mt-4">Add Contact</button>
        </form>
      </div>
    </div>
  );
};

export default PaymentOptions;
