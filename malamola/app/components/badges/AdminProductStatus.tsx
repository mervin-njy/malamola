import React from "react";
import { OptionChoices } from "@prisma/client";
import { IoMdInformationCircle } from "react-icons/io";
import { MdFavorite } from "react-icons/md";
import { BiSolidPurchaseTag } from "react-icons/bi";

// types -----------------------------------------------------------------------------------------------------
interface AdminProductStatusProps {
  action: OptionChoices;
  amount: number;
}

const AdminProductStatus = ({ action, amount }: AdminProductStatusProps) => {
  // TODO:
  // remove badge outline (highligh the badge) for amount > limit (prop)

  // render component ----------------------------------------------------------------------------------------
  return (
    <div className="flex justify-start gap-2">
      {/* a. option wished for by users */}
      {action === "Wish" && (
        <div className="badge badge-error badge-outline p-3">
          <MdFavorite size={20} />
          <p className="ml-2 font-bold tracking-wider text-primary">{amount}</p>
        </div>
      )}
      {/* b. option requested by users */}
      {action === "Enquire" && (
        <div className="badge badge-info badge-outline p-3">
          <IoMdInformationCircle size={20} />
          <p className="ml-2 font-bold tracking-wider text-primary">{amount}</p>
        </div>
      )}
      {/* c. option ordered by users */}
      {action === "Order" && (
        <div className="badge badge-success badge-outline p-3">
          <BiSolidPurchaseTag size={20} />
          <p className="ml-2 font-bold tracking-wider text-primary">{amount}</p>
        </div>
      )}
    </div>
  );
};

export default AdminProductStatus;
