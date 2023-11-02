import { MdClose } from "react-icons/md";
import React, { useState } from "react";

const ToastSuccess = () => {
  // react hooks ---------------------------------------------------------------------------------------------
  const [isVisible, setIsVisible] = useState(true);

  // functions ----------------------------------------------------------------------------------------
  const closeToast = () => setIsVisible(false);

  // render component ---------------------------------------------------------------------------------
  return (
    isVisible && (
      <div className="toast toast-end toast-top top-28">
        <div className="alert alert-success flex w-40 justify-between rounded-2xl">
          <span>Added to cart.</span>
          <div
            className="cursor-pointer hover:text-base-300"
            onClick={closeToast}
          >
            <MdClose />
          </div>
        </div>
      </div>
    )
  );
};

export default ToastSuccess;
