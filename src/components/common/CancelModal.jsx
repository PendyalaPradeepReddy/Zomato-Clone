import { Button } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";

function CancelModal({ handleModalClose }) {
  const handleCancelOrder = () => {
    toast.warn("Order Cancelled!");
    handleModalClose();
  };
  return (
    <div className="fixed inset-0 overflow-y-auto z-[999]">
      <div className="flex items-center justify-center min-h-screen text-center gap-10">
        {/* overlay bg */}
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
        </div>
        {/* Modal content */}
        <div className="inline-block  bg-white rounded-md text-left overflow-hidden shadow-xl transform transition-all sm:my-24 sm:align-middle w-full md:max-w-xl">
          <div className="bg-blue-800 px-7 pt-5 pb-8">
            <div className="flex justify-center flex-col gap-3">
              <p className="text-xl font-semibold text-gray-50">
                Are you sure you want to cancel your order?
              </p>
              <p className="text-gray-100 text-sm">
                Click the cancel button below to proceed with cancellation.
              </p>
              <div className="flex justify-end gap-3 mt-9">
                <Button onClick={handleModalClose} variant="contained">
                  Back
                </Button>
                <Button
                  onClick={handleCancelOrder}
                  variant="contained"
                  autoFocus
                  color="secondary"
                >
                  Cancel
                </Button>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CancelModal;
