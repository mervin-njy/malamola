import React, { useState } from "react";

const ToastSuccess = () => {
  // react hooks ---------------------------------------------------------------------------------------------
  const [isVisible, setIsVisible] = useState(true);

  // functions ----------------------------------------------------------------------------------------
  const closeToast = () => setIsVisible(false);

  // render component ---------------------------------------------------------------------------------
  return (
    isVisible && (
      <div className="toast toast-end toast-top">
        <div className="alert alert-success flex w-40 justify-between rounded-2xl">
          <span>Added to cart.</span>
          <div
            className="cursor-pointer hover:font-black hover:text-warning"
            onClick={closeToast}
          >
            x
          </div>
        </div>
      </div>
    )
  );
};

export default ToastSuccess;
