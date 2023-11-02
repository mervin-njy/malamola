import React from "react";

const DeliveryOptions = () => {
  // render component ----------------------------------------------------------------------------------------
  return (
    <div className="collapse w-full rounded-xl border-2 border-accent border-opacity-10 bg-neutral bg-opacity-5 p-5">
      <input type="checkbox" />
      {/* 1. Title */}
      <div className="collapse-title mb-4 text-3xl font-bold tracking-wider">
        <h1>Delivery details</h1>
        <div className="divider" />
      </div>
      <div className="collapse-content"></div>
    </div>
  );
};

export default DeliveryOptions;
